import { NextRequest, NextResponse } from 'next/server'
import { emailService } from '@/lib/email-service'

export async function POST(request: NextRequest) {
  try {
    const { recipient, products } = await request.json()

    if (!recipient || !products || !Array.isArray(products)) {
      return NextResponse.json(
        { error: 'Recipient and products array are required' },
        { status: 400 }
      )
    }

    const success = await emailService.sendLowStockAlert([recipient], products)

    if (success) {
      return NextResponse.json(
        { message: 'Low stock alert sent successfully' },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: 'Failed to send low stock alert' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Send alert error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
