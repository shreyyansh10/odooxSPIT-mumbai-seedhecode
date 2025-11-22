"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useStore } from "@/contexts/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import type { Product } from "@/lib/store"

export function ProductDialog({
  product,
  onClose,
}: {
  product?: Product | null
  onClose: () => void
}) {
  const { addProduct, updateProduct } = useStore()
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    sku: "",
    category: "",
    uom: "piece",
    stock: 0,
    locationStock: {},
    reorderLevel: 20,
  })

  useEffect(() => {
    if (product) {
      setFormData(product)
    }
  }, [product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.sku || !formData.category) {
      alert("Please fill in all required fields")
      return
    }

    if (product) {
      updateProduct(product.id, formData as Partial<Product>)
      alert("Product updated successfully!")
    } else {
      addProduct(formData as Omit<Product, "id">)
      alert("Product added successfully!")
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">{product ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-foreground mb-2">
              Product Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="e.g., Steel Rods"
              required
            />
          </div>

          <div>
            <Label htmlFor="sku" className="text-sm font-medium text-foreground mb-2">
              SKU / Code
            </Label>
            <Input
              id="sku"
              name="sku"
              value={formData.sku || ""}
              onChange={handleChange}
              placeholder="e.g., SR-001"
              required
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-medium text-foreground mb-2">
              Category
            </Label>
            <Input
              id="category"
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              placeholder="e.g., Raw Materials"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="uom" className="text-sm font-medium text-foreground mb-2">
                Unit of Measure
              </Label>
              <Select
                name="uom"
                value={formData.uom || "piece"}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, uom: value }))}
              >
                <SelectTrigger id="uom">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="piece">piece</SelectItem>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="liter">liter</SelectItem>
                  <SelectItem value="meter">meter</SelectItem>
                  <SelectItem value="sheet">sheet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="stock" className="text-sm font-medium text-foreground mb-2">
                Initial Stock
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock || 0}
                onChange={handleChange}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="reorderLevel" className="text-sm font-medium text-foreground mb-2">
              Reorder Level (Low Stock Alert)
            </Label>
            <Input
              id="reorderLevel"
              name="reorderLevel"
              type="number"
              value={formData.reorderLevel || ""}
              onChange={handleChange}
              placeholder="20"
            />
          </div>

          <div className="flex gap-2 pt-4 border-t border-border">
            <Button type="submit" className="flex-1">
              {product ? "Update Product" : "Add Product"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
