import { NextResponse } from 'next/server'
import { emailService } from '@/lib/email-service'

export async function GET() {
  try {
    const isConnected = await emailService.testConnection()
    
    if (isConnected) {
      return NextResponse.json(
        { 
          status: 'success',
          message: 'Email service is configured correctly' 
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { 
          status: 'error',
          message: 'Email service configuration failed. Please check your .env.local file.' 
        },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Email service test failed. Please check your SMTP configuration.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
