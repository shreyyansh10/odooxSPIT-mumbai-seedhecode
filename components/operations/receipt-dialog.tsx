"use client"

import { useState } from "react"
import { useStore } from "@/contexts/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Trash2 } from "lucide-react"

interface ReceiptItem {
  productId: string
  quantity: number
  locationId: string
}

export function ReceiptDialog({ onClose }: { onClose: () => void }) {
  const { products, locations, addReceipt, addLedgerEntry, updateLocationStock } = useStore()
  const [step, setStep] = useState(1)
  const [supplier, setSupplier] = useState("")
  const [invoiceNo, setInvoiceNo] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [items, setItems] = useState<ReceiptItem[]>([{ productId: "", quantity: 0, locationId: "" }])
  const [notes, setNotes] = useState("")

  const handleAddItem = () => {
    setItems([...items, { productId: "", quantity: 0, locationId: "" }])
  }

  const handleRemoveItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx))
  }

  const handleItemChange = (idx: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[idx] = { ...newItems[idx], [field]: field === "quantity" ? Number.parseInt(value) || 0 : value }
    setItems(newItems)
  }

  const handleCreateReceipt = () => {
    if (!supplier || !invoiceNo || items.some((item) => !item.productId || item.quantity <= 0 || !item.locationId)) {
      alert("Please fill in all required fields including location")
      return
    }

    const receiptId = addReceipt({
      date,
      supplier,
      status: "Done",
      items,
      totalItems: items.length,
      notes,
    })

    // Update location stock and log each item to ledger
    items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId)
      if (product) {
        // Update location-specific stock
        updateLocationStock(item.productId, item.locationId, item.quantity, 'add')
        
        addLedgerEntry({
          date,
          type: "receipt",
          referenceId: receiptId,
          productId: item.productId,
          quantity: item.quantity,
          toLocation: item.locationId,
          notes: `Receipt from ${supplier}`,
        })
      }
    })

    alert("Receipt created successfully!")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="text-lg font-semibold text-foreground">Create New Receipt</h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Progress */}
          <div className="flex gap-4 mb-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? "bg-accent" : "bg-secondary"}`} />
            ))}
          </div>

          {/* Step 1: Supplier Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Supplier Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="supplier" className="text-sm font-medium text-foreground mb-2">
                    Supplier Name
                  </Label>
                  <Input
                    id="supplier"
                    placeholder="Enter supplier name"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="invoice" className="text-sm font-medium text-foreground mb-2">
                    Invoice Number
                  </Label>
                  <Input
                    id="invoice"
                    placeholder="e.g., INV-12345"
                    value={invoiceNo}
                    onChange={(e) => setInvoiceNo(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="date" className="text-sm font-medium text-foreground mb-2">
                  Receipt Date
                </Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 2: Add Items */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Add Items</h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {items.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2">
                    <Select value={item.productId} onValueChange={(v) => handleItemChange(idx, "productId", v)}>
                      <SelectTrigger className="col-span-5">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name} ({p.sku})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={item.locationId} onValueChange={(v) => handleItemChange(idx, "locationId", v)}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc.id} value={loc.id}>
                            {loc.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity || ""}
                      onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                      className="col-span-3"
                    />
                    <Button size="sm" variant="ghost" onClick={() => handleRemoveItem(idx)} className="col-span-1 h-10 w-10 p-0">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button onClick={handleAddItem} variant="outline" className="w-full gap-2 bg-transparent">
                <Plus className="w-4 h-4" />
                Add Another Item
              </Button>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Review Receipt</h3>
              <div className="bg-secondary/50 rounded-lg p-4 space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Supplier:</span>
                  <span className="text-foreground ml-2 font-medium">{supplier}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Invoice:</span>
                  <span className="text-foreground ml-2 font-medium">{invoiceNo}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Date:</span>
                  <span className="text-foreground ml-2 font-medium">{date}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Items:</span>
                  <span className="text-foreground ml-2 font-medium">{items.length} products</span>
                </p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-sm font-medium text-foreground mb-2">Items:</p>
                <div className="space-y-1 text-sm">
                  {items.map((item) => {
                    const product = products.find((p) => p.id === item.productId)
                    return (
                      <p key={item.productId} className="text-muted-foreground">
                        {product?.name} - {item.quantity} {product?.uom}
                      </p>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (step < 3) setStep(step + 1)
                else handleCreateReceipt()
              }}
              className="flex-1"
            >
              {step === 3 ? "Create Receipt" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
