"use client"

import { useStore } from "@/contexts/store-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Eye } from "lucide-react"
import { DeliveryDialog } from "@/components/operations/delivery-dialog"
import { DeliveryDetailDialog } from "@/components/operations/delivery-detail-dialog"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import type { Delivery } from "@/lib/store"

export default function DeliveriesPage() {
  const { deliveries } = useStore()
  const [search, setSearch] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null)

  const filteredDeliveries = deliveries.filter(
    (d) => d.id.toLowerCase().includes(search.toLowerCase()) || d.customer.toLowerCase().includes(search.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-500/20 text-green-600 dark:text-green-400"
      case "Ready":
        return "bg-blue-500/20 text-blue-600 dark:text-blue-400"
      case "Waiting":
      case "Draft":
        return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
      case "Canceled":
        return "bg-red-500/20 text-red-600 dark:text-red-400"
      default:
        return "bg-gray-500/20 text-gray-600 dark:text-gray-400"
    }
  }

  const stats = {
    total: deliveries.length,
    done: deliveries.filter((d) => d.status === "Done").length,
    ready: deliveries.filter((d) => d.status === "Ready").length,
    totalItems: deliveries.reduce((sum, d) => sum + d.totalItems, 0),
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Deliveries</h1>
          <p className="text-muted-foreground mt-2">Outgoing stock shipments to customers</p>
        </div>
        <Button onClick={() => setShowDialog(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Delivery
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Total Deliveries</p>
          <p className="text-2xl font-bold text-foreground mt-1">{stats.total}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.done}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Ready to Ship</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats.ready}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Total Items</p>
          <p className="text-2xl font-bold text-foreground mt-1">{stats.totalItems}</p>
        </Card>
      </div>

      <Card className="p-6 border border-border bg-card/50">
        <div className="mb-6">
          <div className="flex-1 relative max-w-sm">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by delivery ID or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Delivery ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Items</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliveries.length > 0 ? (
                filteredDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs">{delivery.id.slice(0, 8)}</td>
                    <td className="py-3 px-4">{delivery.customer}</td>
                    <td className="py-3 px-4 text-muted-foreground">{delivery.date}</td>
                    <td className="py-3 px-4">{delivery.totalItems}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className={getStatusColor(delivery.status)}>
                        {delivery.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedDelivery(delivery)}
                        className="gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    No deliveries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showDialog && <DeliveryDialog onClose={() => setShowDialog(false)} />}
      {selectedDelivery && (
        <DeliveryDetailDialog
          delivery={selectedDelivery}
          onClose={() => setSelectedDelivery(null)}
        />
      )}
    </div>
  )
}
