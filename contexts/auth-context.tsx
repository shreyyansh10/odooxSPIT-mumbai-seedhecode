"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { authStore, type AuthUser } from "@/lib/auth-store"

interface AuthContextType {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<AuthUser>
  signup: (email: string, password: string, name: string) => Promise<AuthUser>
  logout: () => void
  requestOTP: (email: string) => Promise<void>
  verifyOTP: (email: string, otp: string) => Promise<void>
  resetPassword: (email: string, newPassword: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    authStore.initializeAuth()
    const currentUser = authStore.getCurrentUser()
    setUser(currentUser)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const authUser = authStore.login(email, password)
      setUser(authUser)
      return authUser
    } catch (err: any) {
      setError(err.message || "Login failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signup = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const authUser = authStore.signup(email, password, name)
      setUser(authUser)
      return authUser
    } catch (err: any) {
      setError(err.message || "Signup failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    authStore.logout()
    setUser(null)
  }, [])

  const requestOTP = useCallback(async (email: string) => {
    setIsLoading(true)
    setError(null)
    try {
      await authStore.requestOTP(email)
    } catch (err: any) {
      setError(err.message || "OTP request failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const verifyOTP = useCallback(async (email: string, otp: string) => {
    setIsLoading(true)
    setError(null)
    try {
      authStore.verifyOTP(email, otp)
    } catch (err: any) {
      setError(err.message || "OTP verification failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const resetPassword = useCallback(async (email: string, newPassword: string) => {
    setIsLoading(true)
    setError(null)
    try {
      authStore.resetPassword(email, newPassword)
    } catch (err: any) {
      setError(err.message || "Password reset failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    requestOTP,
    verifyOTP,
    resetPassword,
    isLoading,
    error,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
