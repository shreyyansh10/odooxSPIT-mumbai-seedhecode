"use client"

import { useState, useEffect } from "react"
import { useStore } from "@/contexts/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, Package, FileText, Truck, Repeat, Settings, History } from "lucide-react"
import Link from "next/link"

interface SearchResult {
  id: string
  title: string
  subtitle: string
  type: 'product' | 'receipt' | 'delivery' | 'transfer' | 'adjustment' | 'history'
  href: string
  badge?: string
}

export function GlobalSearch() {
  const { products, receipts, deliveries, transfers, adjustments, ledger } = useStore()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    if (search.length < 2) {
      setResults([])
      return
    }

    const searchTerm = search.toLowerCase()
    const allResults: SearchResult[] = []

    // Generate a unique timestamp for this search session
    const searchId = Date.now().toString()

    // Search Products
    products.forEach((product, index) => {
      if (
        product.name.toLowerCase().includes(searchTerm) ||
        product.sku.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      ) {
        allResults.push({
          id: `product-${product.id}-${searchId}-${index}`,
          title: product.name,
          subtitle: `SKU: ${product.sku} • Stock: ${product.stock} ${product.uom}`,
          type: 'product',
          href: '/dashboard/products',
          badge: product.category
        })
      }
    })

    // Search Receipts
    receipts.forEach((receipt, index) => {
      if (
        receipt.supplier.toLowerCase().includes(searchTerm) ||
        receipt.id.toLowerCase().includes(searchTerm)
      ) {
        allResults.push({
          id: `receipt-${receipt.id}-${searchId}-${index}`,
          title: `Receipt from ${receipt.supplier}`,
          subtitle: `${receipt.date} • ${receipt.totalItems} items`,
          type: 'receipt',
          href: '/dashboard/receipts',
          badge: receipt.status
        })
      }
    })

    // Search Deliveries
    deliveries.forEach((delivery, index) => {
      if (
        delivery.customer.toLowerCase().includes(searchTerm) ||
        delivery.id.toLowerCase().includes(searchTerm)
      ) {
        allResults.push({
          id: `delivery-${delivery.id}-${searchId}-${index}`,
          title: `Delivery to ${delivery.customer}`,
          subtitle: `${delivery.date} • ${delivery.totalItems} items`,
          type: 'delivery',
          href: '/dashboard/deliveries',
          badge: delivery.status
        })
      }
    })

    // Search Transfers
    transfers.forEach((transfer, index) => {
      if (
        transfer.fromLocation.toLowerCase().includes(searchTerm) ||
        transfer.toLocation.toLowerCase().includes(searchTerm) ||
        transfer.id.toLowerCase().includes(searchTerm)
      ) {
        allResults.push({
          id: `transfer-${transfer.id}-${searchId}-${index}`,
          title: `Transfer: ${transfer.fromLocation} → ${transfer.toLocation}`,
          subtitle: `${transfer.date} • ${transfer.items.length} items`,
          type: 'transfer',
          href: '/dashboard/transfers',
          badge: transfer.status
        })
      }
    })

    // Search Adjustments
    adjustments.forEach((adjustment, index) => {
      if (
        adjustment.location.toLowerCase().includes(searchTerm) ||
        adjustment.id.toLowerCase().includes(searchTerm)
      ) {
        allResults.push({
          id: `adjustment-${adjustment.id}-${searchId}-${index}`,
          title: `Adjustment at ${adjustment.location}`,
          subtitle: `${adjustment.date} • ${adjustment.items.length} items`,
          type: 'adjustment',
          href: '/dashboard/adjustments',
          badge: adjustment.reason
        })
      }
    })

    // Search History/Ledger
    ledger.forEach((entry, index) => {
      const product = products.find(p => p.id === entry.productId)
      if (
        product?.name.toLowerCase().includes(searchTerm) ||
        entry.notes.toLowerCase().includes(searchTerm) ||
        entry.referenceId.toLowerCase().includes(searchTerm)
      ) {
        allResults.push({
          id: `history-${entry.id}-${searchId}-${index}`,
          title: `${product?.name || 'Unknown Product'} - ${entry.type}`,
          subtitle: `${entry.date} • ${entry.quantity > 0 ? '+' : ''}${entry.quantity} • ${entry.notes}`,
          type: 'history',
          href: '/dashboard/history',
          badge: entry.type
        })
      }
    })

    // Results are already unique, just slice them
    const uniqueResults = allResults
    
    setResults(uniqueResults.slice(0, 20))
  }, [search, products, receipts, deliveries, transfers, adjustments, ledger])

  const getIcon = (type: string) => {
    switch (type) {
      case 'product': return <Package className="w-4 h-4" />
      case 'receipt': return <FileText className="w-4 h-4" />
      case 'delivery': return <Truck className="w-4 h-4" />
      case 'transfer': return <Repeat className="w-4 h-4" />
      case 'adjustment': return <Settings className="w-4 h-4" />
      case 'history': return <History className="w-4 h-4" />
      default: return <Search className="w-4 h-4" />
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'product': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'receipt': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'delivery': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
      case 'transfer': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      case 'adjustment': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'history': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full md:w-80 justify-start gap-2 text-muted-foreground">
          <Search className="w-4 h-4" />
          Search everything...
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Search products, operations, history..." 
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {results.length === 0 && search.length >= 2 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            
            {results.length > 0 && (
              <CommandGroup heading="Results">
                {results.map((result, index) => (
                  <CommandItem key={result.id} asChild>
                    <Link 
                      href={result.href}
                      className="flex items-center gap-3 p-2 w-full"
                      onClick={() => setOpen(false)}
                    >
                      <div className={`p-1.5 rounded ${getBadgeColor(result.type)}`}>
                        {getIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {result.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {result.subtitle}
                        </p>
                      </div>
                      {result.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {result.badge}
                        </Badge>
                      )}
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
