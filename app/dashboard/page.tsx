"use client"

import { useStore } from "@/contexts/store-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import Link from "next/link"
import { ShoppingCart, TrendingDown, Repeat2, ArrowDownUp } from "lucide-react"
import { LowStockAlerts } from "@/components/dashboard/low-stock-alerts"
import { DashboardFilters } from "@/components/dashboard/dashboard-filters"
import { PurchaseSuggestions } from "@/components/dashboard/purchase-suggestions"
import { useState, useEffect } from "react"
import { notificationService } from "@/lib/notification-service"

export default function DashboardPage() {
  const { products, receipts, deliveries, transfers, adjustments, getStats } = useStore()
  const stats = getStats()
  
  const [filters, setFilters] = useState({
    search: '',
    documentType: 'all',
    status: 'all',
    warehouse: 'all',
    category: 'all',
    dateFrom: null as Date | null,
    dateTo: null as Date | null,
  })

  // Auto-check for low stock notifications on dashboard load
  useEffect(() => {
    const checkNotifications = async () => {
      try {
        await notificationService.checkAndSendAlerts(products)
      } catch (error) {
        console.error('Failed to check notifications:', error)
      }
    }

    if (products.length > 0) {
      checkNotifications()
    }
  }, [products])

  const clearFilters = () => {
    setFilters({
      search: '',
      documentType: 'all',
      status: 'all',
      warehouse: 'all',
      category: 'all',
      dateFrom: null,
      dateTo: null,
    })
  }

  // Generate chart data from operations
  const operationCounts = [
    { name: "Receipts", count: receipts.length, color: "#06b6d4" },
    { name: "Deliveries", count: deliveries.length, color: "#3b82f6" },
    { name: "Transfers", count: transfers.length, color: "#8b5cf6" },
    { name: "Adjustments", count: adjustments.length, color: "#ec4899" },
  ]

  const stockDistribution = [
    { name: "In Stock", value: products.filter((p) => p.stock > 20).length, color: "#06b6d4" },
    { name: "Low Stock", value: products.filter((p) => p.stock > 0 && p.stock <= 20).length, color: "#f59e0b" },
    { name: "Out of Stock", value: products.filter((p) => p.stock === 0).length, color: "#ef4444" },
  ]

  const kpiData = [
    {
      label: "Total Products",
      value: stats.totalProducts.toString(),
      change: "+0%",
      icon: "📦",
    },
    {
      label: "Low Stock Items",
      value: stats.lowStockItems.toString(),
      change: stats.lowStockItems > 0 ? "-" + stats.lowStockItems : "0",
      icon: "⚠️",
    },
    {
      label: "Pending Receipts",
      value: stats.pendingReceipts.toString(),
      change: "+1",
      icon: "📥",
    },
    {
      label: "Pending Deliveries",
      value: stats.pendingDeliveries.toString(),
      change: "+0",
      icon: "📦",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's your inventory overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, idx) => (
          <Card key={idx} className="p-6 border border-border bg-card/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">{kpi.label}</p>
                <p className="text-2xl font-bold text-foreground mt-2">{kpi.value}</p>
                <p className="text-xs text-accent mt-1">{kpi.change}</p>
              </div>
              <div className="text-3xl">{kpi.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <DashboardFilters 
        filters={filters} 
        onFiltersChange={setFilters} 
        onClearFilters={clearFilters} 
      />

      {/* Low Stock Alerts */}
      <LowStockAlerts />

      {/* Purchase Suggestions */}
      <PurchaseSuggestions />

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Operations Chart */}
        <Card className="lg:col-span-2 p-6 border border-border bg-card/50">
          <h2 className="text-lg font-semibold text-foreground mb-6">Operations Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={operationCounts}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--foreground)" }}
              />
              <Bar dataKey="count" fill="var(--accent)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Stock Distribution */}
        <Card className="p-6 border border-border bg-card/50">
          <h2 className="text-lg font-semibold text-foreground mb-6">Stock Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stockDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {stockDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--foreground)" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-sm">
            {stockDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-semibold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 border border-border bg-card/50">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/dashboard/receipts">
            <Button variant="outline" className="w-full justify-start bg-transparent gap-2 h-10">
              <ShoppingCart className="w-4 h-4" />
              New Receipt
            </Button>
          </Link>
          <Link href="/dashboard/deliveries">
            <Button variant="outline" className="w-full justify-start bg-transparent gap-2 h-10">
              <TrendingDown className="w-4 h-4" />
              New Delivery
            </Button>
          </Link>
          <Link href="/dashboard/transfers">
            <Button variant="outline" className="w-full justify-start bg-transparent gap-2 h-10">
              <Repeat2 className="w-4 h-4" />
              New Transfer
            </Button>
          </Link>
          <Link href="/dashboard/adjustments">
            <Button variant="outline" className="w-full justify-start bg-transparent gap-2 h-10">
              <ArrowDownUp className="w-4 h-4" />
              Adjust Stock
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
