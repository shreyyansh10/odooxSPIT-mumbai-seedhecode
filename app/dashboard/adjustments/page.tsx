"use client"

import { useStore } from "@/contexts/store-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { AdjustmentDialog } from "@/components/operations/adjustment-dialog"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function AdjustmentsPage() {
  const { adjustments } = useStore()
  const [search, setSearch] = useState("")
  const [showDialog, setShowDialog] = useState(false)

  const filteredAdjustments = adjustments.filter(
    (a) => a.id.toLowerCase().includes(search.toLowerCase()) || a.reason.toLowerCase().includes(search.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-500/20 text-green-600 dark:text-green-400"
      case "Draft":
        return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
      case "Canceled":
        return "bg-red-500/20 text-red-600 dark:text-red-400"
      default:
        return "bg-gray-500/20 text-gray-600 dark:text-gray-400"
    }
  }

  const stats = {
    total: adjustments.length,
    done: adjustments.filter((a) => a.status === "Done").length,
    draft: adjustments.filter((a) => a.status === "Draft").length,
    totalVariance: adjustments.reduce((sum, a) => sum + a.items.reduce((s, item) => s + item.variance, 0), 0),
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Adjustments</h1>
          <p className="text-muted-foreground mt-2">Stock count corrections and discrepancies</p>
        </div>
        <Button onClick={() => setShowDialog(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Adjustment
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Total Adjustments</p>
          <p className="text-2xl font-bold text-foreground mt-1">{stats.total}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.done}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Draft</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{stats.draft}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Total Variance</p>
          <p
            className={`text-2xl font-bold mt-1 ${stats.totalVariance < 0 ? "text-destructive" : "text-green-600 dark:text-green-400"}`}
          >
            {stats.totalVariance > 0 ? "+" : ""}
            {stats.totalVariance}
          </p>
        </Card>
      </div>

      <Card className="p-6 border border-border bg-card/50">
        <div className="mb-6">
          <div className="flex-1 relative max-w-sm">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by adjustment ID or reason..."
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
                <th className="text-left py-3 px-4 font-semibold text-foreground">Adjustment ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Reason</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Variance</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdjustments.length > 0 ? (
                filteredAdjustments.map((adjustment) => (
                  <tr key={adjustment.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs">{adjustment.id.slice(0, 8)}</td>
                    <td className="py-3 px-4">{adjustment.reason}</td>
                    <td className="py-3 px-4">{adjustment.location}</td>
                    <td className="py-3 px-4">
                      {adjustment.items.reduce((s, item) => s + item.variance, 0) > 0 ? "+" : ""}
                      {adjustment.items.reduce((s, item) => s + item.variance, 0)}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{adjustment.date}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className={getStatusColor(adjustment.status)}>
                        {adjustment.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    No adjustments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showDialog && <AdjustmentDialog onClose={() => setShowDialog(false)} />}
    </div>
  )
}
