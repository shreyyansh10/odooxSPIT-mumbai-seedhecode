"use client"

import { useStore } from "@/contexts/store-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Eye } from "lucide-react"
import { TransferDialog } from "@/components/operations/transfer-dialog"
import { TransferDetailsDialog } from "@/components/operations/transfer-details-dialog"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import type { Transfer } from "@/lib/store"

export default function TransfersPage() {
  const { transfers } = useStore()
  const [search, setSearch] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null)

  const filteredTransfers = transfers.filter(
    (t) =>
      t.id.toLowerCase().includes(search.toLowerCase()) || t.fromLocation.toLowerCase().includes(search.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-500/20 text-green-600 dark:text-green-400"
      case "Ready":
      case "Waiting":
        return "bg-blue-500/20 text-blue-600 dark:text-blue-400"
      case "Draft":
        return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
      case "Canceled":
        return "bg-red-500/20 text-red-600 dark:text-red-400"
      default:
        return "bg-gray-500/20 text-gray-600 dark:text-gray-400"
    }
  }

  const stats = {
    total: transfers.length,
    done: transfers.filter((t) => t.status === "Done").length,
    pending: transfers.filter((t) => t.status === "Waiting" || t.status === "Draft").length,
    totalMoved: transfers.reduce((sum, t) => sum + t.totalItems, 0),
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Internal Transfers</h1>
          <p className="text-muted-foreground mt-2">Move stock between locations and warehouses</p>
        </div>
        <Button onClick={() => setShowDialog(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Transfer
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Total Transfers</p>
          <p className="text-2xl font-bold text-foreground mt-1">{stats.total}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.done}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{stats.pending}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Total Moved</p>
          <p className="text-2xl font-bold text-foreground mt-1">{stats.totalMoved}</p>
        </Card>
      </div>

      <Card className="p-6 border border-border bg-card/50">
        <div className="mb-6">
          <div className="flex-1 relative max-w-sm">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by transfer ID or location..."
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
                <th className="text-left py-3 px-4 font-semibold text-foreground">Transfer ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">From</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">To</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Items</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransfers.length > 0 ? (
                filteredTransfers.map((transfer) => (
                  <tr key={transfer.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs">{transfer.id.slice(0, 8)}</td>
                    <td className="py-3 px-4">{transfer.fromLocation}</td>
                    <td className="py-3 px-4">{transfer.toLocation}</td>
                    <td className="py-3 px-4 text-muted-foreground">{transfer.date}</td>
                    <td className="py-3 px-4">{transfer.totalItems}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className={getStatusColor(transfer.status)}>
                        {transfer.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedTransfer(transfer)
                          setShowDetailsDialog(true)
                        }}
                        className="gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    No transfers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showDialog && <TransferDialog onClose={() => setShowDialog(false)} />}
      {showDetailsDialog && selectedTransfer && (
        <TransferDetailsDialog 
          transfer={selectedTransfer} 
          onClose={() => {
            setShowDetailsDialog(false)
            setSelectedTransfer(null)
          }} 
        />
      )}
    </div>
  )
}
