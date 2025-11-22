"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Filter, X, Calendar as CalendarIcon, Search } from "lucide-react"
import { format } from "date-fns"

interface DashboardFiltersProps {
  filters: {
    search: string
    documentType: string
    status: string
    warehouse: string
    category: string
    dateFrom: Date | null
    dateTo: Date | null
  }
  onFiltersChange: (filters: any) => void
  onClearFilters: () => void
}

export function DashboardFilters({ filters, onFiltersChange, onClearFilters }: DashboardFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const documentTypes = [
    { value: "all", label: "All Documents" },
    { value: "receipts", label: "Receipts" },
    { value: "deliveries", label: "Deliveries" },
    { value: "transfers", label: "Transfers" },
    { value: "adjustments", label: "Adjustments" },
  ]

  const statuses = [
    { value: "all", label: "All Statuses" },
    { value: "draft", label: "Draft" },
    { value: "waiting", label: "Waiting" },
    { value: "ready", label: "Ready" },
    { value: "done", label: "Done" },
    { value: "canceled", label: "Canceled" },
  ]

  const warehouses = [
    { value: "all", label: "All Warehouses" },
    { value: "w1", label: "Main Warehouse" },
    { value: "w2", label: "Production Floor" },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Raw Materials", label: "Raw Materials" },
    { value: "Components", label: "Components" },
    { value: "Finished Goods", label: "Finished Goods" },
  ]

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'search') return typeof value === 'string' && value.length > 0
    if (key === 'dateFrom' || key === 'dateTo') return value !== null
    return value !== 'all'
  }).length

  return (
    <Card className="p-6 border border-border bg-card/50">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Filters</h3>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-accent/20 text-accent">
                {activeFiltersCount} active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? 'Simple' : 'Advanced'}
            </Button>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Basic Filters */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search operations..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Document Type */}
          <Select value={filters.documentType} onValueChange={(value) => updateFilter('documentType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Document Type" />
            </SelectTrigger>
            <SelectContent>
              {documentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="grid md:grid-cols-4 gap-4 pt-4 border-t border-border">
            {/* Warehouse */}
            <Select value={filters.warehouse} onValueChange={(value) => updateFilter('warehouse', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Warehouse" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map((warehouse) => (
                  <SelectItem key={warehouse.value} value={warehouse.value}>
                    {warehouse.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category */}
            <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date From */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateFrom ? format(filters.dateFrom, "PPP") : "From date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.dateFrom || undefined}
                  onSelect={(date) => updateFilter('dateFrom', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Date To */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateTo ? format(filters.dateTo, "PPP") : "To date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.dateTo || undefined}
                  onSelect={(date) => updateFilter('dateTo', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
            {filters.search && (
              <Badge variant="secondary" className="gap-1">
                Search: {filters.search}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => updateFilter('search', '')}
                />
              </Badge>
            )}
            {filters.documentType !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Type: {documentTypes.find(t => t.value === filters.documentType)?.label}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => updateFilter('documentType', 'all')}
                />
              </Badge>
            )}
            {filters.status !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Status: {statuses.find(s => s.value === filters.status)?.label}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => updateFilter('status', 'all')}
                />
              </Badge>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
