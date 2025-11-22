"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, MapPin, Package, Bell } from "lucide-react"
import { NotificationPanel } from "@/components/dashboard/notification-panel"

const demoWarehouses = [
  { id: 1, name: "Main Warehouse", location: "Downtown", capacity: 10000, used: 6500, status: "Active" },
  { id: 2, name: "Secondary Storage", location: "Industrial Zone", capacity: 5000, used: 3200, status: "Active" },
  { id: 3, name: "Production Facility", location: "North District", capacity: 8000, used: 4100, status: "Active" },
]

const demoLocations = [
  { id: 1, name: "Main Store", warehouse: "Main Warehouse", capacity: 2000, used: 1500, type: "Storage" },
  { id: 2, name: "Production Rack", warehouse: "Main Warehouse", capacity: 3000, used: 2100, type: "Production" },
  { id: 3, name: "Shipping Area", warehouse: "Main Warehouse", capacity: 2000, used: 800, type: "Shipping" },
  { id: 4, name: "Quality Lab", warehouse: "Secondary Storage", capacity: 1000, used: 300, type: "Testing" },
  { id: 5, name: "Storage A", warehouse: "Secondary Storage", capacity: 2000, used: 1500, type: "Storage" },
  { id: 6, name: "Storage B", warehouse: "Secondary Storage", capacity: 2000, used: 1400, type: "Storage" },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("warehouses")
  const [warehouses, setWarehouses] = useState(demoWarehouses)
  const [locations, setLocations] = useState(demoLocations)
  const [showWarehouseDialog, setShowWarehouseDialog] = useState(false)
  const [showLocationDialog, setShowLocationDialog] = useState(false)

  const getCapacityColor = (used: number, capacity: number) => {
    const percent = (used / capacity) * 100
    if (percent < 50) return "bg-green-500"
    if (percent < 80) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage warehouses, locations, and system configuration</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border">
        <button
          onClick={() => setActiveTab("warehouses")}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === "warehouses"
              ? "border-accent text-accent"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Warehouses
          </div>
        </button>
        <button
          onClick={() => setActiveTab("locations")}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === "locations"
              ? "border-accent text-accent"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Locations
          </div>
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === "notifications"
              ? "border-accent text-accent"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </div>
        </button>
      </div>

      {/* Warehouses Tab */}
      {activeTab === "warehouses" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">Warehouses</h2>
            <Button onClick={() => setShowWarehouseDialog(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Warehouse
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {warehouses.map((warehouse) => {
              const capacityPercent = (warehouse.used / warehouse.capacity) * 100
              return (
                <Card key={warehouse.id} className="p-6 border border-border bg-card/50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{warehouse.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{warehouse.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Capacity</span>
                        <span className="text-sm font-semibold text-foreground">{capacityPercent.toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getCapacityColor(warehouse.used, warehouse.capacity)}`}
                          style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {warehouse.used} / {warehouse.capacity} units
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          warehouse.status === "Active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {warehouse.status}
                      </span>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Locations Tab */}
      {activeTab === "locations" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">Locations</h2>
            <Button onClick={() => setShowLocationDialog(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Location
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Location Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Warehouse</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Capacity</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Usage</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location) => {
                  const capacityPercent = (location.used / location.capacity) * 100
                  return (
                    <tr key={location.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{location.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{location.warehouse}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-secondary text-foreground font-medium">
                          {location.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{location.capacity}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getCapacityColor(location.used, location.capacity)}`}
                              style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {capacityPercent.toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Email Notifications</h2>
            <p className="text-muted-foreground mt-1">Configure automated email alerts for low stock and other events</p>
          </div>
          
          <NotificationPanel />
        </div>
      )}
    </div>
  )
}
