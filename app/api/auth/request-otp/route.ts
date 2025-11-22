import { NextRequest, NextResponse } from 'next/server'
import { emailService } from '@/lib/email-service'
import { serverAuthStore } from '@/lib/server-auth-store'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Get auth data
    const authData = serverAuthStore.getAuthData()
    
    // Generate OTP
    const otp = Math.random().toString().slice(2, 8)
    const otpExpiry = Date.now() + (5 * 60 * 1000) // 5 minutes

    // Check if user exists, if not create a temporary entry for OTP
    let user = authData.users[email]
    if (!user) {
      // Create temporary user entry for password reset
      authData.users[email] = {
        password: '', // Will be set when they reset password
        name: email.split('@')[0], // Use email prefix as name
        role: 'staff', // Default role
        isTemporary: true // Mark as temporary until password is set
      }
      user = authData.users[email]
    }

    // Store OTP in auth data
    user.otpCode = otp
    user.otpExpiry = otpExpiry
    serverAuthStore.saveAuthData(authData)

    // Send OTP email
    const emailSent = await emailService.sendOTP(email, otp)

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send OTP email. Please check your email configuration.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'OTP sent successfully to your email' },
      { status: 200 }
    )
  } catch (error) {
    console.error('OTP request error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please check your email configuration.' },
      { status: 500 }
    )
  }
}
