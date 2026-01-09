"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
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
      <main className="min-h-screen bg-background flex items-center justify-center px-4 md:px-6 py-12">
        <div className="w-full max-w-md">
          <button
            onClick={() => router.push("/")}
            className="mb-6 flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-foreground/5 rounded-full">
              <Lock className="w-8 h-8 text-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Admin Login</h1>
            <p className="text-sm font-sans text-muted-foreground">Sign in to manage paintings and gallery content</p>
          </div>

          <div className="bg-secondary/30 backdrop-blur-sm border border-border rounded-lg p-8 shadow-lg">
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-xs font-sans font-medium tracking-widest uppercase mb-2 text-foreground/80">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-sans font-medium tracking-widest uppercase mb-2 text-foreground/80">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                    className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm font-sans">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold">!</span>
                  </div>
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full px-6 py-3 bg-foreground text-background rounded text-sm font-sans font-medium tracking-wider uppercase hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs font-sans text-muted-foreground text-center leading-relaxed">
              Need access? Contact admin at{" "}
              <a href="mailto:revanthacharya9481@gmail.com" className="font-medium text-foreground hover:underline">
                revanthacharya9481@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}