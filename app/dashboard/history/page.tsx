"use client"

import { useStore } from "@/contexts/store-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Download } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function HistoryPage() {
  const { ledger, products } = useStore()
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredLedger = ledger.filter(
    (entry) =>
      (filterType === "all" || entry.type === filterType) && entry.date.toLowerCase().includes(search.toLowerCase()),
  )

  // Sort by date descending
  const sortedLedger = [...filteredLedger].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const getTypeColor = (type: string) => {
    switch (type) {
      case "receipt":
        return "bg-blue-500/20 text-blue-600 dark:text-blue-400"
      case "delivery":
        return "bg-green-500/20 text-green-600 dark:text-green-400"
      case "transfer":
        return "bg-purple-500/20 text-purple-600 dark:text-purple-400"
      case "adjustment":
        return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-600 dark:text-gray-400"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "receipt":
        return "📥"
      case "delivery":
        return "📦"
      case "transfer":
        return "🔄"
      case "adjustment":
        return "⚖️"
      default:
        return "📋"
    }
  }

  const stats = {
    total: ledger.length,
    receipts: ledger.filter((e) => e.type === "receipt").length,
    deliveries: ledger.filter((e) => e.type === "delivery").length,
    transfers: ledger.filter((e) => e.type === "transfer").length,
  }

  const exportReport = (type: 'daily' | 'monthly' | 'custom') => {
    let reportData = sortedLedger
    let filename = `inventory-report-${type}`
    
    if (type === 'daily') {
      const today = new Date().toISOString().split('T')[0]
      reportData = sortedLedger.filter(entry => entry.date.startsWith(today))
      filename = `inventory-daily-report-${today}`
    } else if (type === 'monthly') {
      const thisMonth = new Date().toISOString().slice(0, 7)
      reportData = sortedLedger.filter(entry => entry.date.startsWith(thisMonth))
      filename = `inventory-monthly-report-${thisMonth}`
    }
    
    const csvContent = [
      'Date,Type,Product,Quantity,Reference ID,Notes',
      ...reportData.map(entry => {
        const product = products.find(p => p.id === entry.productId)
        return `${entry.date},${entry.type},"${product?.name || 'Unknown Product'}",${entry.quantity},${entry.referenceId},"${entry.notes}"`
      })
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportAllData = () => {
    const content = `
INVENTORY MANAGEMENT REPORT
===========================
Generated on: ${new Date().toLocaleString()}

SUMMARY:
--------
Total Transactions: ${stats.total}
Receipts: ${stats.receipts}
Deliveries: ${stats.deliveries}
Transfers: ${stats.transfers}

DETAILED LEDGER:
----------------
${sortedLedger.map(entry => {
  const product = products.find(p => p.id === entry.productId)
  return `${entry.date} | ${entry.type.toUpperCase()} | ${product?.name || 'Unknown Product'} | ${entry.quantity} | ${entry.notes}`
}).join('\n')}
    `
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `complete-inventory-report-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Stock Ledger</h1>
          <p className="text-muted-foreground mt-2">Complete log of all inventory operations and transactions</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent" onClick={exportAllData}>
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Total Transactions</p>
          <p className="text-2xl font-bold text-foreground mt-1">{stats.total}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Receipts</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats.receipts}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Deliveries</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.deliveries}</p>
        </Card>
        <Card className="p-4 border border-border bg-card/50">
          <p className="text-muted-foreground text-sm">Transfers</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">{stats.transfers}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 border border-border bg-card/50">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by date..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-input border border-input rounded-lg text-foreground"
            >
              <option value="all">All Types</option>
              <option value="receipt">Receipts</option>
              <option value="delivery">Deliveries</option>
              <option value="transfer">Transfers</option>
              <option value="adjustment">Adjustments</option>
            </select>
          </div>
        </div>

        {/* Timeline */}
        {sortedLedger.length > 0 ? (
          <div className="space-y-4">
            {sortedLedger.map((entry, index) => {
              const product = products.find((p) => p.id === entry.productId)
              return (
                <div key={`history-entry-${entry.id}-${index}-${entry.date.replace(/[^0-9]/g, '')}`} className="flex gap-4 pb-4 border-b border-border last:border-0">
                  <div className="pt-1">
                    <div className="text-2xl">{getTypeIcon(entry.type)}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {product?.name} - {entry.notes}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{entry.date}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Badge variant="secondary" className={getTypeColor(entry.type)}>
                          {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                        </Badge>
                        <span
                          className={`font-semibold text-sm ${entry.quantity < 0 ? "text-destructive" : "text-green-600 dark:text-green-400"}`}
                        >
                          {entry.quantity > 0 ? "+" : ""}
                          {entry.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">No transactions found</div>
        )}
      </Card>

      {/* Export Options */}
      <Card className="p-6 border border-border bg-card/50">
        <h2 className="text-lg font-semibold text-foreground mb-4">Generate Reports</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="w-full justify-center gap-2 h-12 bg-transparent"
            onClick={() => exportReport('daily')}
          >
            <Download className="w-4 h-4" />
            Daily Report
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-center gap-2 h-12 bg-transparent"
            onClick={() => exportReport('monthly')}
          >
            <Download className="w-4 h-4" />
            Monthly Report
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-center gap-2 h-12 bg-transparent"
            onClick={() => exportReport('custom')}
          >
            <Download className="w-4 h-4" />
            Custom Period
          </Button>
        </div>
      </Card>
    </div>
  )
}
