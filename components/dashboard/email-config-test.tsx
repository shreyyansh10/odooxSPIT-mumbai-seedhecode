"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Mail, CheckCircle, XCircle, AlertCircle, Settings, Key } from "lucide-react"

export function EmailConfigTest() {
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{
    status: 'success' | 'error' | null
    message: string
  }>({ status: null, message: '' })

  const testEmailConnection = async () => {
    setTesting(true)
    setTestResult({ status: null, message: '' })

    try {
      const response = await fetch('/api/auth/test-email')
      const data = await response.json()

      setTestResult({
        status: data.status,
        message: data.message
      })
    } catch (error) {
      setTestResult({
        status: 'error',
        message: 'Failed to test email connection'
      })
    } finally {
      setTesting(false)
    }
  }

  const getStatusIcon = () => {
    switch (testResult.status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Mail className="w-5 h-5 text-blue-600" />
    }
  }

  const getStatusBadge = () => {
    switch (testResult.status) {
      case 'success':
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-300">Connected</Badge>
      case 'error':
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Email Configuration
        </h3>
        {testResult.status && getStatusBadge()}
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Key className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Gmail Setup Required</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                To enable real OTP emails, configure your Gmail app password in the <code className="bg-blue-600/20 px-1 rounded">.env.local</code> file:
              </p>
              <div className="mt-3 p-3 bg-blue-600/10 rounded font-mono text-sm">
                <div>SMTP_HOST=smtp.gmail.com</div>
                <div>SMTP_PORT=587</div>
                <div>SMTP_USER=your-email@gmail.com</div>
                <div>SMTP_PASS=your-app-password-here</div>
              </div>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                📖 <a 
                  href="https://support.google.com/accounts/answer/185833" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  Learn how to create Gmail App Password
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-sm font-medium">Connection Status</span>
          </div>
          <Button 
            onClick={testEmailConnection} 
            disabled={testing}
            variant="outline"
            size="sm"
          >
            {testing ? 'Testing...' : 'Test Connection'}
          </Button>
        </div>

        {testResult.message && (
          <Alert variant={testResult.status === 'error' ? 'destructive' : 'default'}>
            <AlertCircle className="w-4 h-4" />
            <span>{testResult.message}</span>
          </Alert>
        )}

        {testResult.status === 'success' && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              ✅ Email service is working correctly! OTP emails will be sent to users' email addresses.
            </p>
          </div>
        )}

        {testResult.status === 'error' && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-200">
              ❌ Email configuration failed. Please check your Gmail credentials and app password.
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
