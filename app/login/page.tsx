"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { data: admin, error: queryError } = await supabase
        .from("admins")
        .select("id, email, password_hash")
        .eq("email", email.toLowerCase())
        .single()

      if (queryError || !admin) {
        setError("Invalid email or password")
        setLoading(false)
        return
      }

      // For now, direct comparison for security - should use proper hashing
      if (admin.password_hash !== password) {
        setError("Invalid email or password")
        setLoading(false)
        return
      }

      localStorage.setItem("adminToken", admin.id)
      localStorage.setItem("adminEmail", admin.email)

      router.push("/admin")
    } catch (err) {
      console.error("Login error:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background flex items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">Admin Login</h1>
            <p className="text-sm font-sans text-muted-foreground">Sign in to manage paintings and gallery content</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {error && <div className="p-3 bg-red-100 text-red-700 text-sm font-sans">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-foreground text-background text-xs font-sans font-medium tracking-widest uppercase hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-xs font-sans text-muted-foreground text-center">
              Contact admin at <span className="font-medium">revanthacharya9481@gmail.com</span> for access credentials.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
