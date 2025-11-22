"use client"

import { useStore } from "@/contexts/store-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Trash2, Edit2 } from "lucide-react"
import { ProductDialog } from "@/components/products/product-dialog"
import { LocationStockView } from "@/components/products/location-stock-view"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function ProductsPage() {
  const { products, deleteProduct, updateProduct } = useStore()
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [showDialog, setShowDialog] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())

    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter

    let matchesStock = true
    if (stockFilter === "instock") matchesStock = p.stock > 20
    if (stockFilter === "lowstock") matchesStock = p.stock > 0 && p.stock <= 20
    if (stockFilter === "outofstock") matchesStock = p.stock === 0

    return matchesSearch && matchesCategory && matchesStock
  })

  const categories = Array.from(new Set(products.map((p) => p.category)))

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setShowDialog(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
    }
  }

  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.stock > 20).length,
    lowStock: products.filter((p) => p.stock > 0 && p.stock <= 20).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-500/20 text-red-600 dark:text-red-400" }
    if (stock < 20) return { label: "Low Stock", color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" }
    return { label: "In Stock", color: "bg-green-500/20 text-green-600 dark:text-green-400" }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-2">Manage your inventory products and categories</p>
        </div>
        <Button
          onClick={() => {
            setEditingProduct(null)
            setShowDialog(true)
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Total Products</p>
          <p className="text-2xl font-bold text-foreground mt-1">{stats.total}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">In Stock</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.inStock}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Low Stock</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{stats.lowStock}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Out of Stock</p>
          <p className="text-2xl font-bold text-destructive mt-1">{stats.outOfStock}</p>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 border border-border bg-card/50">
        <div className="space-y-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by product name or SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-input border border-input rounded-lg text-foreground text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-3 py-2 bg-input border border-input rounded-lg text-foreground text-sm"
            >
              <option value="all">All Stock Levels</option>
              <option value="instock">In Stock</option>
              <option value="lowstock">Low Stock</option>
              <option value="outofstock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">SKU</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Total Stock</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Locations</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const statusInfo = getStockStatus(product.stock)
                  return (
                    <tr key={product.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{product.name}</td>
                      <td className="py-3 px-4 font-mono text-xs text-muted-foreground">{product.sku}</td>
                      <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                      <td className="py-3 px-4 font-semibold">{product.stock} {product.uom}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(product.locationStock || {}).map(([locationId, stock]) => {
                            if (stock > 0) {
                              return (
                                <Badge key={locationId} variant="outline" className="text-xs">
                                  {locationId}: {stock}
                                </Badge>
                              )
                            }
                            return null
                          })}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className={statusInfo.color}>
                          {statusInfo.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(product)} className="h-8 w-8 p-0">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(product.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showDialog && <ProductDialog product={editingProduct} onClose={() => setShowDialog(false)} />}
    </div>
  )
}
