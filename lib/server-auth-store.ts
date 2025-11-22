import fs from 'fs'
import path from 'path'

const AUTH_DATA_FILE = path.join(process.cwd(), 'data', 'auth.json')

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(AUTH_DATA_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

const defaultAuthData = {
  users: {
    "demo@example.com": { password: "demo123", name: "Demo User", role: "admin" },
    "yuganshvthacker@gmail.com": { password: "", name: "Yugansh Thacker", role: "admin" },
  }
}

export const serverAuthStore = {
  getAuthData: () => {
    ensureDataDir()
    try {
      if (fs.existsSync(AUTH_DATA_FILE)) {
        const data = fs.readFileSync(AUTH_DATA_FILE, 'utf8')
        return JSON.parse(data)
      } else {
        // Create default data file
        fs.writeFileSync(AUTH_DATA_FILE, JSON.stringify(defaultAuthData, null, 2))
        return defaultAuthData
      }
    } catch (error) {
      console.error('Error reading auth data:', error)
      return defaultAuthData
    }
  },

  saveAuthData: (data: any) => {
    ensureDataDir()
    try {
      fs.writeFileSync(AUTH_DATA_FILE, JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('Error saving auth data:', error)
    }
  }
}
