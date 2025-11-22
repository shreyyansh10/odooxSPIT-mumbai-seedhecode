import { NextRequest, NextResponse } from 'next/server'
import { serverAuthStore } from '@/lib/server-auth-store'

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      )
    }

    // Get auth data from server-side storage
    const authData = serverAuthStore.getAuthData()
    const user = authData.users[email]

    if (!user) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      )
    }

    if (!user.otpCode || user.otpCode !== otp) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      )
    }

    if (user.otpExpiry && user.otpExpiry < Date.now()) {
      return NextResponse.json(
        { error: 'OTP expired' },
        { status: 400 }
      )
    }

    // Clear OTP after successful verification
    user.otpCode = undefined
    user.otpExpiry = undefined
    serverAuthStore.saveAuthData(authData)

    return NextResponse.json(
      { message: 'OTP verified successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
