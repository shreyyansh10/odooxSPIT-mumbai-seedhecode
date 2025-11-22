"use client"

import { useState } from "react"
import { useStore } from "@/contexts/store-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Eye } from "lucide-react"
import { ReceiptDialog } from "@/components/operations/receipt-dialog"
import { ReceiptDetailDialog } from "@/components/operations/receipt-detail-dialog"
import { Badge } from "@/components/ui/badge"
import type { Receipt } from "@/lib/store"

export default function ReceiptsPage() {
  const { receipts, addLedgerEntry } = useStore()
  const [search, setSearch] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null)

  const filteredReceipts = receipts.filter(
    (r) => r.id.toLowerCase().includes(search.toLowerCase()) || r.supplier.toLowerCase().includes(search.toLowerCase()),
  )

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

  const stats = {
    total: receipts.length,
    done: receipts.filter((r) => r.status === "Done").length,
    waiting: receipts.filter((r) => r.status === "Waiting" || r.status === "Draft").length,
    totalItems: receipts.reduce((sum, r) => sum + r.totalItems, 0),
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Receipts</h1>
          <p className="text-muted-foreground mt-2">Incoming stock from suppliers and vendors</p>
        </div>
        <Button onClick={() => setShowDialog(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Receipt
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Total Receipts</p>
          <p className="text-2xl font-bold text-foreground mt-1">{stats.total}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.done}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{stats.waiting}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Total Items</p>
          <p className="text-2xl font-bold text-foreground mt-1">{stats.totalItems}</p>
        </Card>
      </div>

      {/* Search and Table */}
      <Card className="p-6 border border-border bg-card/50">
        <div className="mb-6">
          <div className="flex-1 relative max-w-sm">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by receipt ID or supplier..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Receipt ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Supplier</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Items</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReceipts.length > 0 ? (
                filteredReceipts.map((receipt) => (
                  <tr key={receipt.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs">{receipt.id.slice(0, 8)}</td>
                    <td className="py-3 px-4">{receipt.supplier}</td>
                    <td className="py-3 px-4 text-muted-foreground">{receipt.date}</td>
                    <td className="py-3 px-4">{receipt.totalItems}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className={getStatusColor(receipt.status)}>
                        {receipt.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedReceipt(receipt)}
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
                    No receipts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showDialog && <ReceiptDialog onClose={() => setShowDialog(false)} />}
      {selectedReceipt && (
        <ReceiptDetailDialog
          receipt={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  )
}
