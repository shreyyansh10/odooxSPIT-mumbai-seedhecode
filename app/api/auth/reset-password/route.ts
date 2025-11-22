import { NextRequest, NextResponse } from 'next/server'
import { serverAuthStore } from '@/lib/server-auth-store'

export async function POST(request: NextRequest) {
  try {
    const { email, newPassword } = await request.json()

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: 'Email and new password are required' },
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

    // Update password
    user.password = newPassword
    
    // Remove temporary flag if it exists
    if (user.isTemporary) {
      delete user.isTemporary
    }

    serverAuthStore.saveAuthData(authData)

    return NextResponse.json(
      { message: 'Password reset successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
