// Email notification service for low stock alerts
export interface EmailNotification {
  id: string
  recipient: string
  subject: string
  body: string
  status: 'pending' | 'sent' | 'failed'
  createdAt: string
  sentAt?: string
}

const NOTIFICATION_STORAGE_KEY = "email_notifications"
const NOTIFICATION_SETTINGS_KEY = "notification_settings"

export interface NotificationSettings {
  enableLowStockAlerts: boolean
  emailRecipients: string[]
  alertThreshold: number // percentage of reorder level
  checkInterval: number // hours
  lastCheck?: string
}

export const notificationService = {
  getSettings: (): NotificationSettings => {
    const adminEmail = process.env.ADMIN_EMAIL || 'yuganshvthacker@gmail.com'
    if (typeof window === "undefined") return {
      enableLowStockAlerts: true,
      emailRecipients: [adminEmail],
      alertThreshold: 100, // 100% of reorder level
      checkInterval: 24
    }
    
    try {
      const settings = localStorage.getItem(NOTIFICATION_SETTINGS_KEY)
      const adminEmail = 'yuganshvthacker@gmail.com'
      return settings ? JSON.parse(settings) : {
        enableLowStockAlerts: true,
        emailRecipients: [adminEmail],
        alertThreshold: 100,
        checkInterval: 24
      }
    } catch {
      const adminEmail = 'yuganshvthacker@gmail.com'
      return {
        enableLowStockAlerts: true,
        emailRecipients: [adminEmail],
        alertThreshold: 100,
        checkInterval: 24
      }
    }
  },

  saveSettings: (settings: NotificationSettings) => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(settings))
    } catch {
      console.error("Failed to save notification settings")
    }
  },

  getNotifications: (): EmailNotification[] => {
    if (typeof window === "undefined") return []
    try {
      const notifications = localStorage.getItem(NOTIFICATION_STORAGE_KEY)
      return notifications ? JSON.parse(notifications) : []
    } catch {
      return []
    }
  },

  saveNotifications: (notifications: EmailNotification[]) => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(notifications))
    } catch {
      console.error("Failed to save notifications")
    }
  },

  createLowStockAlert: (products: any[], settings: NotificationSettings): EmailNotification[] => {
    const lowStockProducts = products.filter(product => {
      if (!product.reorderLevel) return false
      const threshold = product.reorderLevel * (settings.alertThreshold / 100)
      return product.stock <= threshold
    })

    if (lowStockProducts.length === 0) return []

    const alerts: EmailNotification[] = []
    
    settings.emailRecipients.forEach(recipient => {
      const alert: EmailNotification = {
        id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        recipient,
        subject: `🚨 Low Stock Alert - ${lowStockProducts.length} Products Need Attention`,
        body: `
LOW STOCK ALERT
===============

The following products are running low and need to be restocked:

${lowStockProducts.map(product => 
  `• ${product.name} (${product.sku})
    Current Stock: ${product.stock} ${product.uom}
    Reorder Level: ${product.reorderLevel} ${product.uom}
    Category: ${product.category}`
).join('\n\n')}

Please review and place orders as needed.

---
This is an automated alert from StockMaster Inventory Management System
Generated on: ${new Date().toLocaleString()}
        `,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      alerts.push(alert)
    })

    return alerts
  },

  sendAlert: async (alert: EmailNotification): Promise<boolean> => {
    try {
      // Extract product data from alert body for better email formatting
      const lowStockProducts = alert.body.match(/• (.+?) \((.+?)\)\s+Current Stock: (.+?) (.+?)\s+Reorder Level: (.+?) (.+?)\s+Category: (.+?)$/gm)
      
      let products: any[] = []
      if (lowStockProducts) {
        products = lowStockProducts.map(match => {
          const parts = match.match(/• (.+?) \((.+?)\)\s+Current Stock: (.+?) (.+?)\s+Reorder Level: (.+?) (.+?)\s+Category: (.+?)$/)
          if (parts) {
            return {
              name: parts[1],
              sku: parts[2],
              stock: parseInt(parts[3]) || 0,
              uom: parts[4],
              reorderLevel: parseInt(parts[5]) || 0,
              category: parts[7]
            }
          }
          return null
        }).filter(Boolean)
      }

      // If we're in a server environment, use the email service
      if (typeof window === "undefined") {
        const { emailService } = await import('@/lib/email-service')
        const success = await emailService.sendLowStockAlert([alert.recipient], products)
        
        if (success) {
          alert.status = 'sent'
          alert.sentAt = new Date().toISOString()
          return true
        } else {
          alert.status = 'failed'
          return false
        }
      } else {
        // Client-side fallback - make API call
        try {
          const response = await fetch('/api/notifications/send-alert', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              recipient: alert.recipient,
              products: products
            }),
          })

          if (response.ok) {
            alert.status = 'sent'
            alert.sentAt = new Date().toISOString()
            return true
          } else {
            alert.status = 'failed'
            return false
          }
        } catch (error) {
          console.error('Failed to send email alert via API:', error)
          alert.status = 'failed'
          return false
        }
      }
    } catch (error) {
      console.error('Failed to send email alert:', error)
      alert.status = 'failed'
      return false
    }
  },

  checkAndSendAlerts: async (products: any[]): Promise<void> => {
    const settings = notificationService.getSettings()
    
    if (!settings.enableLowStockAlerts) return
    
    // Check if enough time has passed since last check
    if (settings.lastCheck) {
      const lastCheck = new Date(settings.lastCheck)
      const now = new Date()
      const hoursSinceLastCheck = (now.getTime() - lastCheck.getTime()) / (1000 * 60 * 60)
      
      if (hoursSinceLastCheck < settings.checkInterval) {
        return // Not time for next check yet
      }
    }

    const alerts = notificationService.createLowStockAlert(products, settings)
    
    if (alerts.length === 0) {
      // Update last check time even if no alerts
      settings.lastCheck = new Date().toISOString()
      notificationService.saveSettings(settings)
      return
    }

    const existingNotifications = notificationService.getNotifications()
    
    // Send alerts
    for (const alert of alerts) {
      await notificationService.sendAlert(alert)
      existingNotifications.push(alert)
    }
    
    notificationService.saveNotifications(existingNotifications)
    settings.lastCheck = new Date().toISOString()
    notificationService.saveSettings(settings)
  }
}
