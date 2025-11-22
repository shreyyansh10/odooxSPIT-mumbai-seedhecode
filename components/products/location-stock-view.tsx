"use client"

import { useStore } from "@/contexts/store-context"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface LocationStockViewProps {
  product: any
}

export function LocationStockView({ product }: LocationStockViewProps) {
  const { locations } = useStore()

  const getStockColor = (stock: number) => {
    if (stock === 0) return "bg-red-500/20 text-red-600 dark:text-red-400"
    if (stock <= 20) return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
    return "bg-green-500/20 text-green-600 dark:text-green-400"
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <MapPin className="w-4 h-4" />
        Stock by Location
      </div>
      
      <div className="grid gap-2">
        {locations.map((location) => {
          const locationStock = product.locationStock[location.id] || 0
          return (
            <div key={location.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span className="text-sm font-medium">{location.name}</span>
                <Badge variant="outline" className="text-xs">
                  {location.type}
                </Badge>
              </div>
              <Badge className={`${getStockColor(locationStock)} font-semibold`}>
                {locationStock} {product.uom}
              </Badge>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="pt-2 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total Stock:</span>
          <Badge variant="secondary" className="font-semibold">
            {product.stock} {product.uom}
          </Badge>
        </div>
      </div>
    </div>
  )
}
