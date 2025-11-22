import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  // This is a test endpoint to check localStorage data from the server side
  return NextResponse.json({ message: 'Store test endpoint - check browser localStorage directly' })
}

export async function POST(request: NextRequest) {
  // Test endpoint to simulate stock operations
  try {
    const { action, productId, locationId, quantity, operation } = await request.json()
    
    if (action === 'test-stock-update') {
      // This would test stock update logic
      return NextResponse.json({ 
        message: 'Test completed',
        data: { productId, locationId, quantity, operation }
      })
    }
    
    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
