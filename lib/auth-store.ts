// Authentication store with OTP support
export interface AuthUser {
  id: string
  email: string
  name: string
  role: "admin" | "manager" | "staff"
}

interface AuthStore {
  users: Map<string, { password: string; name: string; role: string; otpCode?: string; otpExpiry?: number }>
  currentUser: AuthUser | null
}

const AUTH_STORAGE_KEY = "auth_store"
const OTP_EXPIRY = 5 * 60 * 1000 // 5 minutes

export const authStore = {
  initializeAuth: () => {
    if (typeof window === "undefined") return
    const existing = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!existing) {
      const initialAuth = {
        users: {
          "demo@example.com": { password: "demo123", name: "Demo User", role: "admin" },
          "yuganshvthacker@gmail.com": { password: "", name: "Yugansh Thacker", role: "admin" },
        },
      }
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(initialAuth))
    }
  },

  getAuthData: () => {
    if (typeof window === "undefined") return { users: {}, currentUser: null }
    authStore.initializeAuth()
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEY)
      return data ? JSON.parse(data) : { users: {}, currentUser: null }
    } catch {
      return { users: {}, currentUser: null }
    }
  },

  saveAuthData: (data: any) => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data))
    } catch {
      console.error("Failed to save auth data")
    }
  },

  signup: (email: string, password: string, name: string): AuthUser => {
    const data = authStore.getAuthData()
    if (data.users[email]) {
      throw new Error("Email already registered")
    }
    data.users[email] = { password, name, role: "staff" }
    authStore.saveAuthData(data)
    return { id: email, email, name, role: "staff" as const }
  },

  login: (email: string, password: string) => {
    const data = authStore.getAuthData()
    const user = data.users[email]
    if (!user || user.password !== password) {
      throw new Error("Invalid email or password")
    }
    const authUser: AuthUser = { id: email, email, name: user.name, role: user.role as AuthUser['role'] }
    data.currentUser = authUser
    authStore.saveAuthData(data)
    return authUser
  },

  logout: () => {
    const data = authStore.getAuthData()
    data.currentUser = null
    authStore.saveAuthData(data)
  },

  getCurrentUser: () => {
    const data = authStore.getAuthData()
    return data.currentUser
  },

  requestOTP: async (email: string) => {
    try {
      const response = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP')
      }

      return true
    } catch (error) {
      console.error('OTP request failed:', error)
      throw error
    }
  },

  verifyOTP: async (email: string, otp: string) => {
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify OTP')
      }

      return true
    } catch (error) {
      console.error('OTP verification failed:', error)
      throw error
    }
  },

  resetPassword: async (email: string, newPassword: string) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password')
      }

      return true
    } catch (error) {
      console.error('Password reset failed:', error)
      throw error
    }
  },
}
