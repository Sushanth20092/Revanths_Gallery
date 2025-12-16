"use client"

import Link from "next/link"
import { useEffect, useState, useRef, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { usePaintingsCache } from "@/hooks/usePaintingsCache"
import { HeroSection } from "@/components/home/HeroSection"
import { FirstPaintingsGrid } from "@/components/home/FirstPaintingsGrid"
import { ArtistSignature } from "@/components/home/ArtistSignature"
import { FeaturedPainting } from "@/components/home/FeaturedPainting"
import { SecondPaintingsGrid } from "@/components/home/SecondPaintingsGrid"
import { InstagramSection } from "@/components/home/InstagramSection"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { paintings: dynamicPaintings } = usePaintingsCache()
  const featuredPaintings = dynamicPaintings.filter((p) => p.is_featured_home).slice(0, 2)
  
  const observerRef = useRef<IntersectionObserver | null>(null)
  const setupCompleteRef = useRef(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setIsLoaded(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const setupScrollReveal = useCallback(() => {
    // Prevent multiple setups
    if (setupCompleteRef.current) return
    
    // Wait for DOM to be fully ready
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const cards = document.querySelectorAll<HTMLElement>('[data-viewport-reveal="true"]')
        
        // Exit if no cards found or observer already exists
        if (cards.length === 0 || observerRef.current) return

        // Set transition delays
        cards.forEach((card) => {
          const index = Number(card.dataset.cardIndex || "0")
          card.style.transitionDelay = `${index * 120}ms`
        })

        // Create single observer with optimized settings
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const target = entry.target as HTMLElement
                // Use requestAnimationFrame to avoid layout thrashing
                requestAnimationFrame(() => {
                  target.dataset.visible = "true"
                })
                observer.unobserve(target)
              }
            })
          },
          {
            threshold: 0.16,
            rootMargin: '50px'
          }
        )

        observerRef.current = observer

        // Observe all cards
        cards.forEach((card) => observer.observe(card))
        
        setupCompleteRef.current = true
      })
    })
  }, [])

  useEffect(() => {
    if (!mounted || !isLoaded) return

    // Setup with slight delay to ensure DOM is ready
    const timeoutId = setTimeout(setupScrollReveal, 100)

    return () => {
      clearTimeout(timeoutId)
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      setupCompleteRef.current = false
    }
  }, [mounted, isLoaded, setupScrollReveal])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Navbar />
      <main className={`pt-20 ${isLoaded ? "animate-pop-in" : "opacity-0"}`}>
        {/* Hero Section */}
        <HeroSection />

        {/* First 4 Paintings Grid */}
        <FirstPaintingsGrid />

        {/* Artist Signature Section */}
        <ArtistSignature />

        {/* First Featured Painting */}
        {featuredPaintings.length > 0 && (
          <FeaturedPainting painting={featuredPaintings[0]} />
        )}

        {/* Next 4 Paintings Grid */}
        <SecondPaintingsGrid />

        {/* Second Featured Painting */}
        {featuredPaintings.length > 1 && (
          <FeaturedPainting painting={featuredPaintings[1]} />
        )}

        {/* View All Works Button */}
        <section className="pt-6 pb-16 md:pt-8 md:pb-24 px-4 md:px-6">
          <div className="flex justify-center">
            <Link
              href="/originals"
              className="inline-flex items-center justify-center
        px-8 py-3
        text-xs font-sans font-medium tracking-widest uppercase
        rounded-full border border-muted-foreground text-muted-foreground
        hover:border-foreground hover:text-foreground
        transition-all"
            >
              View All Works
            </Link>
          </div>
        </section>

        {/* Follow Us / Instagram Section */}
        <InstagramSection />
      </main>
      <Footer />
    </>
  )
}