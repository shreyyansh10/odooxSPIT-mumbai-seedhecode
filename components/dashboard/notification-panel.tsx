"use client"

import { useState, useEffect } from "react"
import { useStore } from "@/contexts/store-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Mail, Bell, AlertTriangle } from "lucide-react"
import { notificationService, type NotificationSettings, type EmailNotification } from "@/lib/notification-service"
import { EmailConfigTest } from "@/components/dashboard/email-config-test"
import { toast } from "sonner"

export function NotificationPanel() {
  const { products } = useStore()
  const [settings, setSettings] = useState<NotificationSettings>(notificationService.getSettings())
  const [notifications, setNotifications] = useState<EmailNotification[]>([])
  const [newEmail, setNewEmail] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setNotifications(notificationService.getNotifications())
  }, [])

  const handleSettingsChange = (newSettings: NotificationSettings) => {
    setSettings(newSettings)
    notificationService.saveSettings(newSettings)
    toast.success("Notification settings updated")
  }

  const addEmailRecipient = () => {
    if (newEmail && !settings.emailRecipients.includes(newEmail)) {
      const updatedSettings = {
        ...settings,
        emailRecipients: [...settings.emailRecipients, newEmail]
      }
      handleSettingsChange(updatedSettings)
      setNewEmail("")
    }
  }

  const removeEmailRecipient = (email: string) => {
    const updatedSettings = {
      ...settings,
      emailRecipients: settings.emailRecipients.filter(e => e !== email)
    }
    handleSettingsChange(updatedSettings)
  }

  const testNotifications = async () => {
    setLoading(true)
    try {
      await notificationService.checkAndSendAlerts(products)
      setNotifications(notificationService.getNotifications())
      toast.success("Low stock check completed! Check console for demo email alerts.")
    } catch (error) {
      toast.error("Failed to send notifications")
    } finally {
      setLoading(false)
    }
  }

  const getLowStockCount = () => {
    return products.filter(product => {
      if (!product.reorderLevel) return false
      const threshold = product.reorderLevel * (settings.alertThreshold / 100)
      return product.stock <= threshold
    }).length
  }

  return (
    <div className="space-y-6">
      {/* Email Configuration Test */}
      <EmailConfigTest />

      {/* Current Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Status
          </h3>
          <Button 
            onClick={testNotifications} 
            disabled={loading}
            variant="outline"
            className="gap-2"
          >
            <Mail className="w-4 h-4" />
            {loading ? "Checking..." : "Check Now"}
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-4 bg-secondary/30 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {getLowStockCount()}
            </div>
            <p className="text-sm text-muted-foreground">Low Stock Items</p>
          </div>
          <div className="text-center p-4 bg-secondary/30 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {notifications.filter(n => n.status === 'sent').length}
            </div>
            <p className="text-sm text-muted-foreground">Alerts Sent</p>
          </div>
        </div>

        {getLowStockCount() > 0 && (
          <div className="flex items-center gap-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <p className="text-sm text-orange-800 dark:text-orange-300">
              {getLowStockCount()} products are below the alert threshold and need attention.
            </p>
          </div>
        )}
      </Card>

      {/* Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Email Alert Settings</h3>
        
        <div className="space-y-6">
          {/* Enable/Disable */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Enable Low Stock Alerts</label>
              <p className="text-xs text-muted-foreground">Automatically send email alerts for low stock</p>
            </div>
            <Switch
              checked={settings.enableLowStockAlerts}
              onCheckedChange={(checked) => 
                handleSettingsChange({ ...settings, enableLowStockAlerts: checked })
              }
            />
          </div>

          {/* Alert Threshold */}
          <div>
            <label className="text-sm font-medium">Alert Threshold (%)</label>
            <p className="text-xs text-muted-foreground mb-2">
              Send alerts when stock falls below this % of reorder level
            </p>
            <Input
              type="number"
              min="1"
              max="200"
              value={settings.alertThreshold}
              onChange={(e) => 
                handleSettingsChange({ ...settings, alertThreshold: parseInt(e.target.value) || 100 })
              }
              className="w-32"
            />
          </div>

          {/* Check Interval */}
          <div>
            <label className="text-sm font-medium">Check Interval (hours)</label>
            <p className="text-xs text-muted-foreground mb-2">How often to check for low stock</p>
            <Input
              type="number"
              min="1"
              max="168"
              value={settings.checkInterval}
              onChange={(e) => 
                handleSettingsChange({ ...settings, checkInterval: parseInt(e.target.value) || 24 })
              }
              className="w-32"
            />
          </div>

          {/* Email Recipients */}
          <div>
            <label className="text-sm font-medium">Email Recipients</label>
            <p className="text-xs text-muted-foreground mb-3">Who should receive low stock alerts</p>
            
            <div className="flex gap-2 mb-3">
              <Input
                type="email"
                placeholder="admin@company.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addEmailRecipient()}
                className="flex-1"
              />
              <Button onClick={addEmailRecipient} size="sm" className="gap-1">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {settings.emailRecipients.map((email, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {email}
                  <button
                    onClick={() => removeEmailRecipient(email)}
                    className="ml-1 hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Notifications */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
        
        {notifications.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No notifications sent yet</p>
        ) : (
          <div className="space-y-3">
            {notifications.slice(-5).reverse().map((notification) => (
              <div key={notification.id} className="flex items-start justify-between p-3 bg-secondary/30 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.subject}</p>
                  <p className="text-xs text-muted-foreground">To: {notification.recipient}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                <Badge 
                  variant={notification.status === 'sent' ? 'default' : 
                           notification.status === 'failed' ? 'destructive' : 'secondary'}
                >
                  {notification.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
