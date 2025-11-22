"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { store } from "@/lib/store"
import type { Product, Receipt, Delivery, Transfer, Adjustment, LedgerEntry, Location } from "@/lib/store"

interface StoreContextType {
  products: Product[]
  receipts: Receipt[]
  deliveries: Delivery[]
  transfers: Transfer[]
  adjustments: Adjustment[]
  ledger: LedgerEntry[]
  locations: Location[]
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  addReceipt: (receipt: Omit<Receipt, "id">) => string
  updateReceipt: (id: string, updates: Partial<Receipt>) => void
  addDelivery: (delivery: Omit<Delivery, "id">) => string
  updateDelivery: (id: string, updates: Partial<Delivery>) => void
  addTransfer: (transfer: Omit<Transfer, "id">) => string
  updateTransfer: (id: string, updates: Partial<Transfer>) => void
  addAdjustment: (adjustment: Omit<Adjustment, "id">) => string
  addLedgerEntry: (entry: Omit<LedgerEntry, "id">) => void
  updateLocationStock: (productId: string, locationId: string, quantity: number, operation: 'add' | 'subtract' | 'set') => void
  getLocationStock: (productId: string, locationId: string) => number
  getLowStockProducts: () => Product[]
  getLocationStockSummary: (locationId: string) => any[]
  getStats: () => any
  refreshData: () => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [storeData, setStoreData] = useState<any>(null)
  const [updateTrigger, setUpdateTrigger] = useState(0)

  const refreshData = useCallback(() => {
    const data = store.getStore()
    // Create a completely new object to force React re-render
    setStoreData({ 
      ...data, 
      products: data.products.map(p => ({ ...p, locationStock: { ...p.locationStock } })),
      deliveries: [...data.deliveries],
      receipts: [...data.receipts],
      transfers: [...data.transfers],
      adjustments: [...data.adjustments],
      ledger: [...data.ledger]
    })
    // Also trigger a counter update to ensure re-render
    setUpdateTrigger(prev => prev + 1)
  }, [])

  useEffect(() => {
    // Migrate existing products to have proper locationStock
    store.migrateProductLocationStock()
    refreshData()
  }, [refreshData])

  const addProduct = useCallback(
    (product: Omit<Product, "id">) => {
      store.addProduct(product)
      refreshData()
    },
    [refreshData],
  )

  const updateProduct = useCallback(
    (id: string, updates: Partial<Product>) => {
      store.updateProduct(id, updates)
      refreshData()
    },
    [refreshData],
  )

  const deleteProduct = useCallback(
    (id: string) => {
      store.deleteProduct(id)
      refreshData()
    },
    [refreshData],
  )

  const addReceipt = useCallback(
    (receipt: Omit<Receipt, "id">) => {
      const newReceipt = store.addReceipt(receipt)
      refreshData()
      return newReceipt.id
    },
    [refreshData],
  )

  const updateReceipt = useCallback(
    (id: string, updates: Partial<Receipt>) => {
      store.updateReceipt(id, updates)
      refreshData()
    },
    [refreshData],
  )

  const addDelivery = useCallback(
    (delivery: Omit<Delivery, "id">) => {
      const newDelivery = store.addDelivery(delivery)
      refreshData()
      return newDelivery.id
    },
    [refreshData],
  )

  const updateDelivery = useCallback(
    (id: string, updates: Partial<Delivery>) => {
      store.updateDelivery(id, updates)
      refreshData()
    },
    [refreshData],
  )

  const addTransfer = useCallback(
    (transfer: Omit<Transfer, "id">) => {
      const newTransfer = store.addTransfer(transfer)
      refreshData()
      return newTransfer.id
    },
    [refreshData],
  )

  const updateTransfer = useCallback(
    (id: string, updates: Partial<Transfer>) => {
      store.updateTransfer(id, updates)
      refreshData()
    },
    [refreshData],
  )

  const addAdjustment = useCallback(
    (adjustment: Omit<Adjustment, "id">) => {
      const newAdjustment = store.addAdjustment(adjustment)
      refreshData()
      return newAdjustment.id
    },
    [refreshData],
  )

  const addLedgerEntry = useCallback(
    (entry: Omit<LedgerEntry, "id">) => {
      store.addLedgerEntry(entry)
      refreshData()
    },
    [refreshData],
  )

  const updateLocationStock = useCallback(
    (productId: string, locationId: string, quantity: number, operation: 'add' | 'subtract' | 'set') => {
      store.updateLocationStock(productId, locationId, quantity, operation)
      refreshData()
    },
    [refreshData],
  )

  const getStats = useCallback(() => {
    return store.getOperationStats()
  }, [])

  const value: StoreContextType = {
    products: storeData?.products || [],
    receipts: storeData?.receipts || [],
    deliveries: storeData?.deliveries || [],
    transfers: storeData?.transfers || [],
    adjustments: storeData?.adjustments || [],
    ledger: storeData?.ledger || [],
    locations: storeData?.locations || [],
    addProduct,
    updateProduct,
    deleteProduct,
    addReceipt,
    updateReceipt,
    addDelivery,
    updateDelivery,
    addTransfer,
    updateTransfer,
    addAdjustment,
    addLedgerEntry,
    updateLocationStock,
    getLocationStock: store.getLocationStock,
    getLowStockProducts: store.getLowStockProducts,
    getLocationStockSummary: store.getLocationStockSummary,
    getStats,
    refreshData,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within StoreProvider")
  }
  return context
}
