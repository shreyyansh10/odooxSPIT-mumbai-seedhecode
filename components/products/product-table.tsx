"use client"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from "lucide-react"

interface Product {
  id: number
  name: string
  sku: string
  category: string
  uom: string
  stock: number
  status: string
}

export function ProductTable({
  products,
  onEdit,
  onDelete,
}: { products: Product[]; onEdit: (p: Product) => void; onDelete: (id: number) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-foreground">Product Name</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">SKU</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">UOM</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Stock</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
              <td className="py-3 px-4">{product.name}</td>
              <td className="py-3 px-4 font-mono text-muted-foreground">{product.sku}</td>
              <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
              <td className="py-3 px-4 text-muted-foreground">{product.uom}</td>
              <td className="py-3 px-4 font-semibold">{product.stock}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === "In Stock"
                      ? "bg-green-500/20 text-green-400"
                      : product.status === "Low Stock"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {product.status}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => onEdit(product)} className="h-8 w-8 p-0">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(product.id)}
                    className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
