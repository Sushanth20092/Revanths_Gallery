"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"

export default function AdminDashboard() {
  const supabase = createClient()

  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    featured: 0,
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchStats = async () => {
    setError("")
    setLoading(true)

    try {
      // Total paintings
      const { count: totalCount, error: totalError } = await supabase
        .from("paintings")
        .select("*", { count: "exact", head: true })

      if (totalError) throw totalError

      // Available paintings
      const { count: availableCount, error: availableError } = await supabase
        .from("paintings")
        .select("*", { count: "exact", head: true })
        .eq("status", "AVAILABLE")

      if (availableError) throw availableError

      // Featured paintings
      const { count: featuredCount, error: featuredError } = await supabase
        .from("paintings")
        .select("*", { count: "exact", head: true })
        .eq("is_featured_home", true)

      if (featuredError) throw featuredError

      setStats({
        total: totalCount ?? 0,
        available: availableCount ?? 0,
        featured: featuredCount ?? 0,
      })
    } catch (err: any) {
      console.error("Dashboard stats error:", err)
      setError(err.message || "Failed to load stats")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground font-sans">Welcome to Revanths Gallery Admin Panel</p>
      </div>

      {/* Show error */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border border-border">
          <p className="text-xs font-sans tracking-widest uppercase text-muted-foreground mb-2">
            Total Paintings
          </p>
          <p className="text-3xl font-serif font-bold">{loading ? "…" : stats.total}</p>
        </div>

        <div className="p-6 border border-border">
          <p className="text-xs font-sans tracking-widest uppercase text-muted-foreground mb-2">
            Available
          </p>
          <p className="text-3xl font-serif font-bold text-green-700">
            {loading ? "…" : stats.available}
          </p>
        </div>

        <div className="p-6 border border-border">
          <p className="text-xs font-sans tracking-widest uppercase text-muted-foreground mb-2">
            Featured
          </p>
          <p className="text-3xl font-serif font-bold text-blue-700">
            {loading ? "…" : stats.featured}
          </p>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/paintings"
          className="p-8 border border-border hover:bg-secondary transition-colors block"
        >
          <h2 className="text-2xl font-serif font-bold mb-2">🎨 Manage Paintings</h2>
          <p className="text-sm font-sans text-muted-foreground">
            Add, edit, or delete paintings. Manage status, set featured images, and upload new artwork.
          </p>
        </Link>

        <div className="p-8 border border-border bg-secondary cursor-not-allowed opacity-50">
          <h2 className="text-2xl font-serif font-bold mb-2">⚙️ Settings</h2>
          <p className="text-sm font-sans text-muted-foreground">
            Coming soon: Configure gallery settings and preferences.
          </p>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-12 p-6 bg-secondary border border-border">
        <h3 className="text-lg font-serif font-bold mb-3">Getting Started</h3>
        <ul className="space-y-2 text-sm font-sans text-muted-foreground">
          <li>• Click on "Manage Paintings" to add, edit, or delete artwork</li>
          <li>• Set a painting as featured to display it on the homepage</li>
          <li>• Upload multiple images per painting for gallery view</li>
          <li>• Track painting status: Available, Sold, Reserved, or Not for Sale</li>
        </ul>
      </div>
    </div>
  )
}
