"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ORIGINALS", href: "/originals" },
  { label: "ABOUT", href: "/about" },
  { label: "COMMISSION ARTS", href: "/commission-art" },
  { label: "TERMS OF SERVICE", href: "/terms-of-service" },
  { label: "CONTACT", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  
  // Initialize state based on current page - prevents flash
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isTransparent, setIsTransparent] = useState(() => {
    // Initialize correctly on first render
    if (typeof window !== 'undefined') {
      return isHomePage && window.scrollY < 50
    }
    return isHomePage
  })
  const [lastScrollY, setLastScrollY] = useState(0)

  // Update state when pathname changes
  useEffect(() => {
    const currentScrollY = window.scrollY
    
    if (!isHomePage) {
      // Non-home pages: always solid background, always visible
      setIsTransparent(false)
      setIsVisible(true)
    } else {
      // Home page: transparent at top, visible based on scroll
      setIsTransparent(currentScrollY < 50)
      setIsVisible(true)
    }
    
    setLastScrollY(currentScrollY)
    setIsOpen(false)
  }, [isHomePage])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (isHomePage) {
        // Home page behavior: transparent at top, hide/show on scroll
        setIsTransparent(currentScrollY < 50)
        setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50)
      } else {
        // Non-home pages: always solid and visible
        setIsVisible(true)
        setIsTransparent(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, isHomePage])

  // Navbar should NOT be transparent when mobile menu is open
  const effectiveTransparent = isTransparent && !isOpen

  return (
    <>
      {/* Spacer for non-home pages to push content below navbar */}
      {!isHomePage && <div className="h-20" />}
      
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          effectiveTransparent
            ? "bg-transparent border-transparent"
            : "bg-background border-b border-border"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className={`text-2xl font-serif font-bold tracking-tight transition-colors duration-500 ${
                effectiveTransparent ? "text-white" : "text-foreground"
              }`}
            >
              Revanths Gallery
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-sans font-medium tracking-widest hover:opacity-60 relative group transition-all duration-500 ${
                    effectiveTransparent ? "text-white" : "text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ${
                      effectiveTransparent ? "bg-white" : "bg-foreground"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 transition-colors duration-500 ${
                effectiveTransparent ? "text-white" : "text-foreground"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Absolutely Positioned */}
        <div
          className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`py-4 space-y-3 border-t transition-colors duration-500 ${
              effectiveTransparent
                ? "border-white/20 bg-black/95 backdrop-blur-sm"
                : "border-border bg-background"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-xs font-sans font-medium tracking-widest hover:opacity-60 transition-all duration-500 py-2 ${
                    effectiveTransparent ? "text-white" : "text-foreground"
                  } ${
                    isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: isOpen ? `${index * 50}ms` : "0ms" }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-500"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}