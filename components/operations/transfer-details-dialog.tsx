"use client"

import { useStore } from "@/contexts/store-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Package, ArrowRight } from "lucide-react"
import type { Transfer } from "@/lib/store"

interface TransferDetailsDialogProps {
  transfer: Transfer
  onClose: () => void
}

export function TransferDetailsDialog({ transfer, onClose }: TransferDetailsDialogProps) {
  const { products, getLocationStock } = useStore()

  const getProductDetails = (productId: string) => {
    return products.find(p => p.id === productId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Waiting":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="text-lg font-semibold text-foreground">Transfer Details</h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Transfer Summary */}
          <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Transfer Summary</h3>
              <Badge variant="secondary" className={getStatusColor(transfer.status)}>
                {transfer.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Transfer ID:</span>
                <span className="text-foreground ml-2 font-mono">{transfer.id}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Date:</span>
                <span className="text-foreground ml-2">{transfer.date}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Items:</span>
                <span className="text-foreground ml-2 font-medium">{transfer.totalItems}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Quantity:</span>
                <span className="text-foreground ml-2 font-medium">
                  {transfer.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}
                </span>
              </div>
            </div>

            {/* Transfer Route */}
            <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
              <div className="flex-1 text-center">
                <p className="text-xs text-muted-foreground">From</p>
                <p className="font-semibold text-foreground">{transfer.fromLocation}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 text-center">
                <p className="text-xs text-muted-foreground">To</p>
                <p className="font-semibold text-foreground">{transfer.toLocation}</p>
              </div>
            </div>

            {transfer.notes && (
              <div>
                <span className="text-muted-foreground">Notes:</span>
                <p className="text-foreground mt-1 text-sm">{transfer.notes}</p>
              </div>
            )}
          </div>

          {/* Transferred Items */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Transferred Items</h3>
            <div className="space-y-3">
              {transfer.items?.map((item, index) => {
                const product = getProductDetails(item.productId)
                const currentFromStock = getLocationStock(item.productId, transfer.fromLocation)
                const currentToStock = getLocationStock(item.productId, transfer.toLocation)
                
                return (
                  <div key={index} className="bg-secondary/30 rounded-lg p-4 border">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-accent-foreground" />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground">{product?.name || 'Unknown Product'}</h4>
                          <span className="text-sm font-mono text-muted-foreground">{product?.sku}</span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Transferred:</span>
                            <p className="font-semibold text-foreground">
                              {item.quantity} {product?.uom || 'units'}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">From Stock:</span>
                            <p className="font-semibold text-foreground">
                              {currentFromStock} {product?.uom || 'units'}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">To Stock:</span>
                            <p className="font-semibold text-foreground">
                              {currentToStock} {product?.uom || 'units'}
                            </p>
                          </div>
                        </div>

                        {product?.category && (
                          <div className="text-xs text-muted-foreground">
                            Category: {product.category}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Current Stock Status */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Current Stock Levels</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">{transfer.fromLocation}</h4>
                <div className="space-y-1">
                  {transfer.items?.map((item, index) => {
                    const product = getProductDetails(item.productId)
                    const stock = getLocationStock(item.productId, transfer.fromLocation)
                    return (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-blue-700 dark:text-blue-400">{product?.name}</span>
                        <span className="font-mono text-blue-800 dark:text-blue-300">
                          {stock} {product?.uom}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">{transfer.toLocation}</h4>
                <div className="space-y-1">
                  {transfer.items?.map((item, index) => {
                    const product = getProductDetails(item.productId)
                    const stock = getLocationStock(item.productId, transfer.toLocation)
                    return (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-green-700 dark:text-green-400">{product?.name}</span>
                        <span className="font-mono text-green-800 dark:text-green-300">
                          {stock} {product?.uom}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
