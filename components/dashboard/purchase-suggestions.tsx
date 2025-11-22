"use client"

import { useStore } from "@/contexts/store-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package, AlertTriangle, CheckCircle } from "lucide-react"
import { useState } from "react"

interface PurchaseSuggestion {
  product: any
  suggestedQuantity: number
  urgency: 'high' | 'medium' | 'low'
  reason: string
}

export function PurchaseSuggestions() {
  const { getLowStockProducts, products } = useStore()
  const [showAll, setShowAll] = useState(false)
  
  const generatePurchaseSuggestions = (): PurchaseSuggestion[] => {
    const lowStockProducts = getLowStockProducts()
    
    return lowStockProducts.map(product => {
      const deficit = (product.reorderLevel || 0) - product.stock
      const suggestedQuantity = Math.max(deficit * 2, product.reorderLevel || 50) // Order 2x deficit or reorder level
      
      let urgency: 'high' | 'medium' | 'low' = 'medium'
      let reason = `Stock below reorder level (${product.reorderLevel})`
      
      if (product.stock === 0) {
        urgency = 'high'
        reason = 'Out of stock - urgent reorder needed'
      } else if (product.stock <= (product.reorderLevel || 0) * 0.5) {
        urgency = 'high'
        reason = 'Critically low stock'
      } else if (product.stock <= (product.reorderLevel || 0) * 0.8) {
        urgency = 'medium'
        reason = 'Stock running low'
      } else {
        urgency = 'low'
        reason = 'Preventive reorder suggested'
      }
      
      return {
        product,
        suggestedQuantity,
        urgency,
        reason
      }
    }).sort((a, b) => {
      const urgencyOrder = { high: 3, medium: 2, low: 1 }
      return urgencyOrder[b.urgency] - urgencyOrder[a.urgency]
    })
  }

  const suggestions = generatePurchaseSuggestions()
  const displayedSuggestions = showAll ? suggestions : suggestions.slice(0, 5)

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'low': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertTriangle className="w-4 h-4" />
      case 'medium': return <Package className="w-4 h-4" />
      case 'low': return <CheckCircle className="w-4 h-4" />
      default: return <Package className="w-4 h-4" />
    }
  }

  if (suggestions.length === 0) {
    return (
      <Card className="p-6 border border-border bg-card/50">
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-2">All Stock Levels Good</h3>
          <p className="text-muted-foreground text-sm">No purchase suggestions at this time</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 border border-border bg-card/50">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Purchase Suggestions</h3>
              <p className="text-sm text-muted-foreground">
                {suggestions.length} product{suggestions.length > 1 ? 's' : ''} recommended for reorder
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            {suggestions.filter(s => s.urgency === 'high').length} Urgent
          </Badge>
        </div>

        {/* Suggestions List */}
        <div className="space-y-3">
          {displayedSuggestions.map((suggestion, index) => (
            <div key={suggestion.product.id} className="flex items-center justify-between p-4 bg-background/80 rounded-lg border border-border">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={getUrgencyColor(suggestion.urgency)}>
                    {getUrgencyIcon(suggestion.urgency)}
                    {suggestion.urgency.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <p className="font-medium text-foreground">{suggestion.product.name}</p>
                  <p className="text-xs text-muted-foreground">SKU: {suggestion.product.sku}</p>
                  <p className="text-xs text-muted-foreground mt-1">{suggestion.reason}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Stock</p>
                    <p className="font-semibold text-foreground">{suggestion.product.stock} {suggestion.product.uom}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Suggested Order</p>
                    <p className="font-semibold text-blue-600 dark:text-blue-400">
                      {suggestion.suggestedQuantity} {suggestion.product.uom}
                    </p>
                  </div>
                  <Button size="sm" className="gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Order
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less */}
        {suggestions.length > 5 && (
          <div className="text-center pt-4 border-t border-border">
            <Button 
              variant="ghost" 
              onClick={() => setShowAll(!showAll)}
              className="gap-2"
            >
              {showAll ? 'Show Less' : `Show All ${suggestions.length} Suggestions`}
            </Button>
          </div>
        )}

        {/* Summary Actions */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button variant="outline" className="flex-1 gap-2">
            <Package className="w-4 h-4" />
            Export Purchase List
          </Button>
          <Button className="flex-1 gap-2">
            <ShoppingCart className="w-4 h-4" />
            Create Purchase Orders
          </Button>
        </div>
      </div>
    </Card>
  )
}
