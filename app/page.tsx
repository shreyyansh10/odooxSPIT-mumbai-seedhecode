import Link from "next/link"
import { ArrowRight, Package, Zap, BarChart3, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">StockMaster</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground text-balance leading-tight">
            Modern Inventory <span className="text-accent">Management</span> System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Digitize and streamline all stock-related operations. Replace manual registers with real-time, centralized
            inventory tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 bg-transparent">
              Watch Demo <Zap className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
            <BarChart3 className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Real-Time Dashboard</h3>
            <p className="text-muted-foreground">Monitor KPIs, stock levels, and pending operations at a glance</p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
            <Package className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Stock Operations</h3>
            <p className="text-muted-foreground">
              Manage receipts, deliveries, transfers, and adjustments effortlessly
            </p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
            <Lock className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Secure & Scalable</h3>
            <p className="text-muted-foreground">Enterprise-grade security with multi-warehouse support</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-muted-foreground text-sm">
          <p>© 2025 StockMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
