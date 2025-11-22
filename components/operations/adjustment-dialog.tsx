"use client"
import { useState } from "react"
import { useStore } from "@/contexts/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

export function AdjustmentDialog({ onClose }: { onClose: () => void }) {
  const { products, locations, addAdjustment, addLedgerEntry, updateLocationStock } = useStore()
  const [productId, setProductId] = useState("")
  const [location, setLocation] = useState("")
  const [reason, setReason] = useState("")
  const [countedQty, setCountedQty] = useState(0)
  const [notes, setNotes] = useState("")

  const product = products.find((p) => p.id === productId)
  const currentQty = product?.locationStock[location] || 0
  const variance = countedQty - currentQty

  const handleCreateAdjustment = () => {
    if (!productId || !location || !reason) {
      alert("Please fill in all required fields")
      return
    }

    const adjustmentId = addAdjustment({
      date: new Date().toISOString().split("T")[0],
      location,
      status: "Done",
      items: [{ productId, countedQuantity: countedQty, variance }],
      reason,
      notes,
    })

    // Update location stock to the counted quantity
    updateLocationStock(productId, location, countedQty, "set")

    addLedgerEntry({
      date: new Date().toISOString().split("T")[0],
      type: "adjustment",
      referenceId: adjustmentId,
      productId,
      quantity: variance,
      toLocation: location,
      notes: `Adjustment: ${reason} - Variance: ${variance}`,
    })

    alert("Adjustment created successfully!")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Create Adjustment</h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <Label htmlFor="product" className="text-sm font-medium text-foreground mb-2">
              Product
            </Label>
            <Select value={productId} onValueChange={setProductId}>
              <SelectTrigger id="product">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} (Current: {p.stock})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location" className="text-sm font-medium text-foreground mb-2">
              Location
            </Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
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
            <Label htmlFor="reason" className="text-sm font-medium text-foreground mb-2">
              Reason for Adjustment
            </Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Damage/Loss">Damage/Loss</SelectItem>
                <SelectItem value="Inventory Count">Inventory Count</SelectItem>
                <SelectItem value="Expired Stock">Expired Stock</SelectItem>
                <SelectItem value="Quality Check">Quality Check</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="current" className="text-sm font-medium text-foreground mb-2">
                Current Qty
              </Label>
              <Input id="current" type="number" value={currentQty} disabled className="bg-secondary/50" />
            </div>
            <div>
              <Label htmlFor="counted" className="text-sm font-medium text-foreground mb-2">
                Counted Qty
              </Label>
              <Input
                id="counted"
                type="number"
                value={countedQty}
                onChange={(e) => setCountedQty(Number.parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
          </div>

          {variance !== 0 && (
            <div
              className={`p-3 rounded-lg text-sm font-medium ${variance > 0 ? "bg-green-500/20 text-green-600 dark:text-green-400" : "bg-red-500/20 text-red-600 dark:text-red-400"}`}
            >
              Variance: {variance > 0 ? "+" : ""}
              {variance}
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="button" onClick={handleCreateAdjustment} className="flex-1">
              Create Adjustment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
