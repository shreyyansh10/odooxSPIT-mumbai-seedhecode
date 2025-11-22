"use client"

import { useStore } from "@/contexts/store-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"  
import { AlertTriangle, Package, ArrowRight } from "lucide-react"
import Link from "next/link"

export function LowStockAlerts() {
  const { getLowStockProducts } = useStore()
  const lowStockProducts = getLowStockProducts()

  if (lowStockProducts.length === 0) {
    return null
  }

  return (
    <Card className="p-6 border-l-4 border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Low Stock Alert</h3>
            <p className="text-sm text-muted-foreground">
              {lowStockProducts.length} product{lowStockProducts.length > 1 ? 's' : ''} need restocking
            </p>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="space-y-3">
          {lowStockProducts.slice(0, 3).map((product) => (
            <div key={product.id} className="flex items-center justify-between p-3 bg-background/80 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                <div>
                  <p className="font-medium text-foreground text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">
                    {product.stock} {product.uom}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Reorder at: {product.reorderLevel} {product.uom}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {lowStockProducts.length > 3 && (
            <div className="text-center pt-2">
              <Link href="/dashboard/products?filter=lowstock">
                <Button variant="outline" size="sm" className="gap-2">
                  View All {lowStockProducts.length} Items
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
