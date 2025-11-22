// Data store for managing inventory state with localStorage persistence
export interface Product {
  id: string
  name: string
  sku: string
  category: string
  uom: string
  stock: number
  locationStock: { [locationId: string]: number }
  reorderLevel?: number
  lastRestockDate?: string
}

export interface Location {
  id: string
  name: string
  type: string
  capacity: number
  currentUsage: number
}

export interface Warehouse {
  id: string
  name: string
  locations: string[]
}

export interface Receipt {
  id: string
  date: string
  supplier: string
  status: "Draft" | "Waiting" | "Ready" | "Done" | "Canceled"
  items: { productId: string; quantity: number; receivedQuantity?: number }[]
  totalItems: number
  notes: string
}

export interface Delivery {
  id: string
  date: string
  customer: string
  status: "Draft" | "Waiting" | "Ready" | "Done" | "Canceled"
  items: { productId: string; quantity: number; deliveredQuantity?: number }[]
  totalItems: number
  notes: string
}

export interface Transfer {
  id: string
  date: string
  fromLocation: string
  toLocation: string
  status: "Draft" | "Waiting" | "Ready" | "Done" | "Canceled"
  items: { productId: string; quantity: number }[]
  totalItems: number
  notes: string
}

export interface Adjustment {
  id: string
  date: string
  location: string
  status: "Draft" | "Done" | "Canceled"
  items: { productId: string; countedQuantity: number; variance: number }[]
  reason: string
  notes: string
}

export interface LedgerEntry {
  id: string
  date: string
  type: "receipt" | "delivery" | "transfer" | "adjustment"
  referenceId: string
  productId: string
  quantity: number
  fromLocation?: string
  toLocation?: string
  notes: string
}

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "manager" | "staff"
  createdAt: string
}

interface InventoryStore {
  user: User | null
  products: Product[]
  warehouses: Warehouse[]
  locations: Location[]
  receipts: Receipt[]
  deliveries: Delivery[]
  transfers: Transfer[]
  adjustments: Adjustment[]
  ledger: LedgerEntry[]
}

const STORAGE_KEY = "inventory_store"

const defaultStore: InventoryStore = {
  user: null,
  products: [
    { 
      id: "1", name: "Steel Rods", sku: "SR-001", category: "Raw Materials", uom: "kg", stock: 450,
      locationStock: { "main-warehouse": 300, "warehouse-2": 100, "production-floor": 50 }, reorderLevel: 100
    },
    { 
      id: "2", name: "Aluminum Sheets", sku: "AS-002", category: "Raw Materials", uom: "sheet", stock: 120,
      locationStock: { "main-warehouse": 80, "warehouse-2": 40 }, reorderLevel: 50
    },
    { 
      id: "3", name: "Plastic Frames", sku: "PF-003", category: "Components", uom: "piece", stock: 8,
      locationStock: { "production-floor": 8 }, reorderLevel: 20
    },
    { 
      id: "4", name: "Rubber Seals", sku: "RS-004", category: "Components", uom: "piece", stock: 0,
      locationStock: {}, reorderLevel: 25
    },
    { 
      id: "5", name: "Copper Wire", sku: "CW-005", category: "Raw Materials", uom: "kg", stock: 320,
      locationStock: { "main-warehouse": 200, "production-floor": 120 }, reorderLevel: 75
    },
  ],
  warehouses: [
    {
      id: "main-warehouse",
      name: "Main Warehouse",
      locations: ["main-warehouse", "warehouse-2"],
    },
    {
      id: "production-floor",
      name: "Production Floor",
      locations: ["production-floor"],
    },
  ],
  locations: [
    { id: "main-warehouse", name: "Main Warehouse", type: "Storage", capacity: 1000, currentUsage: 450 },
    { id: "warehouse-2", name: "Warehouse 2", type: "Storage", capacity: 500, currentUsage: 120 },
    { id: "production-floor", name: "Production Floor", type: "Production", capacity: 300, currentUsage: 200 },
  ],
  receipts: [],
  deliveries: [],
  transfers: [],
  adjustments: [],
  ledger: [],
}

export const store = {
  getStore: (): InventoryStore => {
    if (typeof window === "undefined") return defaultStore
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : defaultStore
    } catch {
      return defaultStore
    }
  },

  setStore: (data: InventoryStore) => {
    if (typeof window === "undefined") return
    try {
      // Create a deep copy to ensure we're storing a clean object
      const cleanData = JSON.parse(JSON.stringify(data))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanData))
    } catch {
      console.error("Failed to save store")
    }
  },

  updateUser: (user: User | null) => {
    const current = store.getStore()
    current.user = user
    store.setStore(current)
  },

  addProduct: (product: Omit<Product, "id">) => {
    const current = store.getStore()
    const newProduct = { 
      ...product, 
      id: Date.now().toString(),
      // Initialize locationStock with the initial stock in main-warehouse
      locationStock: {
        "main-warehouse": product.stock || 0,
        ...product.locationStock
      }
    }
    current.products.push(newProduct)
    store.setStore(current)
    return newProduct
  },

  updateProduct: (id: string, updates: Partial<Product>) => {
    const current = store.getStore()
    const product = current.products.find((p) => p.id === id)
    if (product) {
      Object.assign(product, updates)
      store.setStore(current)
    }
  },

  deleteProduct: (id: string) => {
    const current = store.getStore()
    current.products = current.products.filter((p) => p.id !== id)
    store.setStore(current)
  },

  addReceipt: (receipt: Omit<Receipt, "id">) => {
    const current = store.getStore()
    const newReceipt = { ...receipt, id: Date.now().toString() }
    current.receipts.push(newReceipt)
    store.setStore(current)
    return newReceipt
  },

  updateReceipt: (id: string, updates: Partial<Receipt>) => {
    const current = store.getStore()
    const receipt = current.receipts.find((r) => r.id === id)
    if (receipt) {
      Object.assign(receipt, updates)
      store.setStore(current)
    }
  },

  addDelivery: (delivery: Omit<Delivery, "id">) => {
    const current = store.getStore()
    const newDelivery = { ...delivery, id: Date.now().toString() }
    current.deliveries.push(newDelivery)
    store.setStore(current)
    return newDelivery
  },

  updateDelivery: (id: string, updates: Partial<Delivery>) => {
    const current = store.getStore()
    const delivery = current.deliveries.find((d) => d.id === id)
    if (delivery) {
      Object.assign(delivery, updates)
      store.setStore(current)
    }
  },

  addTransfer: (transfer: Omit<Transfer, "id">) => {
    const current = store.getStore()
    const newTransfer = { ...transfer, id: Date.now().toString() }
    current.transfers.push(newTransfer)
    store.setStore(current)
    return newTransfer
  },

  updateTransfer: (id: string, updates: Partial<Transfer>) => {
    const current = store.getStore()
    const transfer = current.transfers.find((t) => t.id === id)
    if (transfer) {
      Object.assign(transfer, updates)
      store.setStore(current)
    }
  },

  addAdjustment: (adjustment: Omit<Adjustment, "id">) => {
    const current = store.getStore()
    const newAdjustment = { ...adjustment, id: Date.now().toString() }
    current.adjustments.push(newAdjustment)
    store.setStore(current)
    return newAdjustment
  },

  addLedgerEntry: (entry: Omit<LedgerEntry, "id">) => {
    const current = store.getStore()
    const newEntry = { ...entry, id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` }
    current.ledger.push(newEntry)
    store.setStore(current)
  },

  updateLocationStock: (productId: string, locationId: string, quantity: number, operation: 'add' | 'subtract' | 'set') => {
    const current = store.getStore()
    const productIndex = current.products.findIndex(p => p.id === productId)
    if (productIndex === -1) return

    // Create a completely new product object to ensure React detects changes
    const product = { ...current.products[productIndex] }
    
    // Initialize locationStock if it doesn't exist
    if (!product.locationStock) {
      product.locationStock = {
        "main-warehouse": product.stock || 0
      }
    }

    // Create new locationStock object
    product.locationStock = { ...product.locationStock }
    
    const currentLocationStock = product.locationStock[locationId] || 0
    
    switch (operation) {
      case 'add':
        product.locationStock[locationId] = currentLocationStock + quantity
        break
      case 'subtract':
        const newStock = Math.max(0, currentLocationStock - quantity)
        product.locationStock[locationId] = newStock
        break
      case 'set':
        product.locationStock[locationId] = quantity
        break
    }

    // Recalculate total stock from all locations
    product.stock = Object.values(product.locationStock).reduce((sum, stock) => sum + stock, 0)
    
    // Replace the product in the array with the new object
    current.products[productIndex] = product
    
    store.setStore(current)
  },

  getLocationStock: (productId: string, locationId: string): number => {
    const current = store.getStore()
    const product = current.products.find(p => p.id === productId)
    return product?.locationStock[locationId] || 0
  },

  getLowStockProducts: (): Product[] => {
    const current = store.getStore()
    return current.products.filter(p => p.reorderLevel && p.stock <= p.reorderLevel)
  },

  getLocationStockSummary: (locationId: string) => {
    const current = store.getStore()
    return current.products.map(product => ({
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      stock: product.locationStock[locationId] || 0,
      uom: product.uom
    })).filter(item => item.stock > 0)
  },

  // Utility function to migrate existing products to have proper locationStock
  migrateProductLocationStock: () => {
    const current = store.getStore()
    let hasChanges = false
    
    current.products.forEach(product => {
      if (!product.locationStock || Object.keys(product.locationStock).length === 0) {
        product.locationStock = {
          "main-warehouse": product.stock || 0
        }
        hasChanges = true
      }
    })
    
    if (hasChanges) {
      store.setStore(current)
    }
  },

  getOperationStats: () => {
    const current = store.getStore()
    return {
      totalProducts: current.products.length,
      lowStockItems: current.products.filter((p) => p.stock < 20).length,
      outOfStockItems: current.products.filter((p) => p.stock === 0).length,
      pendingReceipts: current.receipts.filter((r) => r.status === "Waiting" || r.status === "Draft").length,
      pendingDeliveries: current.deliveries.filter((d) => d.status === "Waiting" || d.status === "Draft").length,
      scheduledTransfers: current.transfers.filter((t) => t.status === "Waiting" || t.status === "Draft").length,
    }
  },
}
