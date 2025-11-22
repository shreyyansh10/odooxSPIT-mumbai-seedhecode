"use client"

import { useState } from "react"
import { useStore } from "@/contexts/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Trash2 } from "lucide-react"

interface DeliveryItem {
  productId: string
  quantity: number
}

export function DeliveryDialog({ onClose }: { onClose: () => void }) {
  const { products, addDelivery, addLedgerEntry, updateLocationStock } = useStore()
  const [step, setStep] = useState(1)
  const [customer, setCustomer] = useState("")
  const [orderNo, setOrderNo] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [items, setItems] = useState<DeliveryItem[]>([{ productId: "", quantity: 0 }])
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

  const handleCreateDelivery = () => {
    if (!customer || !orderNo || items.some((item) => !item.productId || item.quantity <= 0)) {
      alert("Please fill in all required fields")
      return
    }

    const deliveryId = addDelivery({
      date,
      customer,
      status: "Done",
      items,
      totalItems: items.length,
      notes,
    })

    items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId)
      if (product) {
        // Subtract delivered quantity from stock (assume delivery is from Main Warehouse)
        updateLocationStock(item.productId, "main-warehouse", item.quantity, "subtract")
        
        addLedgerEntry({
          date,
          type: "delivery",
          referenceId: deliveryId,
          productId: item.productId,
          quantity: -item.quantity,
          fromLocation: "main-warehouse",
          toLocation: "customer",
          notes: `Delivered to ${customer}`,
        })
      }
    })

    alert("Delivery created successfully!")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="text-lg font-semibold text-foreground">Create New Delivery</h2>
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
              <h3 className="font-semibold text-foreground">Customer Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer" className="text-sm font-medium text-foreground mb-2">
                    Customer Name
                  </Label>
                  <Input
                    id="customer"
                    placeholder="Enter customer name"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="order" className="text-sm font-medium text-foreground mb-2">
                    Order Number
                  </Label>
                  <Input
                    id="order"
                    placeholder="e.g., ORD-12345"
                    value={orderNo}
                    onChange={(e) => setOrderNo(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="date" className="text-sm font-medium text-foreground mb-2">
                  Delivery Date
                </Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Select Items</h3>
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
              <h3 className="font-semibold text-foreground">Review Delivery</h3>
              <div className="bg-secondary/50 rounded-lg p-4 space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="text-foreground ml-2 font-medium">{customer}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Order:</span>
                  <span className="text-foreground ml-2 font-medium">{orderNo}</span>
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
                <p className="text-sm font-medium text-foreground mb-2">Items to Deliver:</p>
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
                else handleCreateDelivery()
              }}
              className="flex-1"
            >
              {step === 3 ? "Create Delivery" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
