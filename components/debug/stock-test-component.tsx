"use client"

import { useStore } from "@/contexts/store-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function StockTestComponent() {
  const { products, updateLocationStock, addProduct, refreshData } = useStore()

  const testStockUpdate = () => {
    console.log('🧪 Starting stock update test...')
    
    // Find or create a test product
    let testProduct = products.find(p => p.name === 'Test Product')
    
    if (!testProduct) {
      console.log('🧪 Creating test product...')
      addProduct({
        name: 'Test Product',
        sku: 'TEST-001',
        category: 'Test',
        uom: 'piece',
        stock: 100,
        reorderLevel: 10,
        locationStock: {}
      })
      
      // Refresh to get the new product
      setTimeout(() => {
        const updatedProducts = JSON.parse(localStorage.getItem('inventory_store') || '{}').products || []
        testProduct = updatedProducts.find((p: any) => p.name === 'Test Product')
        
        if (testProduct) {
          console.log('🧪 Test product created:', testProduct)
          console.log('🧪 Now testing stock update...')
          
          // Test stock update
          updateLocationStock(testProduct.id, 'main-warehouse', 50, 'subtract')
          
          setTimeout(() => {
            const finalProducts = JSON.parse(localStorage.getItem('inventory_store') || '{}').products || []
            const finalTestProduct = finalProducts.find((p: any) => p.name === 'Test Product')
            console.log('🧪 Final test product:', finalTestProduct)
            alert(`Test completed! Product stock: ${finalTestProduct?.stock || 'ERROR'}`)
          }, 100)
        }
      }, 100)
    } else {
      console.log('🧪 Test product exists:', testProduct)
      console.log('🧪 Testing stock update...')
      
      updateLocationStock(testProduct.id, 'main-warehouse', 25, 'subtract')
      
      setTimeout(() => {
        const updatedProducts = JSON.parse(localStorage.getItem('inventory_store') || '{}').products || []
        const updatedTestProduct = updatedProducts.find((p: any) => p.name === 'Test Product')
        console.log('🧪 Updated test product:', updatedTestProduct)
        alert(`Test completed! Product stock: ${updatedTestProduct?.stock || 'ERROR'}`)
      }, 100)
    }
  }

  const clearTestData = () => {
    if (confirm('Clear all localStorage data? This will reset everything.')) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
      <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">🧪 Debug Tools</h3>
      <div className="flex gap-2">
        <Button onClick={testStockUpdate} variant="outline" size="sm">
          Test Stock Update
        </Button>
        <Button onClick={clearTestData} variant="outline" size="sm">
          Reset All Data
        </Button>
        <Button onClick={() => refreshData()} variant="outline" size="sm">
          Force Refresh
        </Button>
      </div>
      <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2">
        Use these tools to test dynamic stock updates. Check browser console for logs.
      </p>
    </Card>
  )
}
