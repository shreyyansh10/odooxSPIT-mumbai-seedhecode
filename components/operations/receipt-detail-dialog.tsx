"use client"

import { useStore } from "@/contexts/store-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Package, Calendar, User, MapPin, FileText, Printer, Download } from "lucide-react"
import type { Receipt } from "@/lib/store"

interface ReceiptDetailDialogProps {
  receipt: Receipt
  onClose: () => void
}

export function ReceiptDetailDialog({ receipt, onClose }: ReceiptDetailDialogProps) {
  const { products } = useStore()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-500/20 text-green-600 dark:text-green-400"
      case "Waiting":
      case "Ready":
        return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
      case "Draft":
        return "bg-gray-500/20 text-gray-600 dark:text-gray-400"
      case "Canceled":
        return "bg-red-500/20 text-red-600 dark:text-red-400"
      default:
        return "bg-gray-500/20 text-gray-600 dark:text-gray-400"
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    const content = `
RECEIPT DETAILS
===============

Receipt ID: ${receipt.id}
Supplier: ${receipt.supplier}
Date: ${receipt.date}
Status: ${receipt.status}
Total Items: ${receipt.totalItems}

ITEMS:
------
${receipt.items.map(item => {
  const product = products.find(p => p.id === item.productId)
  return `${product?.name || 'Unknown Product'} - ${item.quantity} ${product?.uom || ''}`
}).join('\n')}

Generated on: ${new Date().toLocaleString()}
    `
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `receipt-${receipt.id.slice(0, 8)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Receipt Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <Card className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">#{receipt.id.slice(0, 8)}</h3>
                <p className="text-sm text-muted-foreground">Receipt ID</p>
              </div>
              <Badge variant="secondary" className={getStatusColor(receipt.status)}>
                {receipt.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{receipt.supplier}</p>
                  <p className="text-sm text-muted-foreground">Supplier</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{receipt.date}</p>
                  <p className="text-sm text-muted-foreground">Receipt Date</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Items */}
          <Card className="p-4">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Items ({receipt.totalItems})
            </h4>
            <div className="space-y-3">
              {receipt.items.map((item, index) => {
                const product = products.find(p => p.id === item.productId)
                return (
                  <div key={index} className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{product?.name || 'Unknown Product'}</p>
                      <p className="text-sm text-muted-foreground">
                        SKU: {product?.sku || 'N/A'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{item.quantity} {product?.uom || ''}</p>
                      <p className="text-sm text-muted-foreground">Quantity</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleDownload} className="gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button variant="outline" onClick={handlePrint} className="gap-2">
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
