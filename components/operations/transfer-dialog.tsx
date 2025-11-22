"use client"

import { useState } from "react"
import { useStore } from "@/contexts/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Trash2 } from "lucide-react"

interface TransferItem {
  productId: string
  quantity: number
}

export function TransferDialog({ onClose }: { onClose: () => void }) {
  const { products, locations, addTransfer, addLedgerEntry, updateLocationStock } = useStore()
  const [step, setStep] = useState(1)
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [items, setItems] = useState<TransferItem[]>([{ productId: "", quantity: 0 }])
  const [notes, setNotes] = useState("")

  const handleAddItem = () => {
    setItems([...items, { productId: "", quantity: 0 }])
  }

  const handleRemoveItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx))
  }

  const handleItemChange = (idx: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[idx] = { ...newItems[idx], [field]: field === "quantity" ? Number.parseInt(value) || 0 : value }
    setItems(newItems)
  }

  const handleCreateTransfer = () => {
    if (!fromLocation || !toLocation || items.some((item) => !item.productId || item.quantity <= 0)) {
      alert("Please fill in all required fields")
      return
    }

    const transferId = addTransfer({
      date,
      fromLocation,
      toLocation,
      status: "Done",
      items,
      totalItems: items.length,
      notes,
    })

    items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId)
      if (product) {
        // Subtract from source location and add to destination location
        updateLocationStock(item.productId, fromLocation, item.quantity, "subtract")
        updateLocationStock(item.productId, toLocation, item.quantity, "add")
        
        addLedgerEntry({
          date,
          type: "transfer",
          referenceId: transferId,
          productId: item.productId,
          quantity: item.quantity,
          fromLocation,
          toLocation,
          notes: `Transferred from ${fromLocation} to ${toLocation}`,
        })
      }
    })

    alert("Transfer created successfully!")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="text-lg font-semibold text-foreground">Create Internal Transfer</h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-4 mb-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? "bg-accent" : "bg-secondary"}`} />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Transfer Locations</h3>
              <div>
                <Label htmlFor="from" className="text-sm font-medium text-foreground mb-2">
                  From Location
                </Label>
                <Select value={fromLocation} onValueChange={setFromLocation}>
                  <SelectTrigger id="from">
                    <SelectValue placeholder="Select source location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc.id} value={loc.name}>
                        {loc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="to" className="text-sm font-medium text-foreground mb-2">
                  To Location
                </Label>
                <Select value={toLocation} onValueChange={setToLocation}>
                  <SelectTrigger id="to">
                    <SelectValue placeholder="Select destination location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc.id} value={loc.name}>
                        {loc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="transfer-date" className="text-sm font-medium text-foreground mb-2">
                  Transfer Date
                </Label>
                <Input id="transfer-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Select Products</h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Select value={item.productId} onValueChange={(v) => handleItemChange(idx, "productId", v)}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name} (Stock: {p.stock})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={item.quantity || ""}
                      onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                      className="w-24"
                    />
                    <Button size="sm" variant="ghost" onClick={() => handleRemoveItem(idx)} className="h-10 w-10 p-0">
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

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Review Transfer</h3>
              <div className="bg-secondary/50 rounded-lg p-4 space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">From:</span>
                  <span className="text-foreground ml-2 font-medium">{fromLocation}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">To:</span>
                  <span className="text-foreground ml-2 font-medium">{toLocation}</span>
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
                <p className="text-sm font-medium text-foreground mb-2">Items to Transfer:</p>
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
                else handleCreateTransfer()
              }}
              className="flex-1"
            >
              {step === 3 ? "Create Transfer" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
