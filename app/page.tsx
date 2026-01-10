"use client"

import Link from "next/link"
import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Preloader from "@/components/Preloader"

import { usePaintingsCache } from "@/hooks/usePaintingsCache"
import { HeroSection } from "@/components/home/HeroSection"
import { FirstPaintingsGrid } from "@/components/home/FirstPaintingsGrid"
import { ArtistSignature } from "@/components/home/ArtistSignature"
import { FeaturedPainting } from "@/components/home/FeaturedPainting"
import { SecondPaintingsGrid } from "@/components/home/SecondPaintingsGrid"
import { InstagramSection } from "@/components/home/InstagramSection"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [preloadDone, setPreloadDone] = useState(false)

  const { paintings: dynamicPaintings } = usePaintingsCache()
  const featuredPaintings = dynamicPaintings
    .filter((p) => p.is_featured_home)
    .slice(0, 2)

  const observerRef = useRef<IntersectionObserver | null>(null)
  const setupCompleteRef = useRef(false)

  // Mount + preload timing
  useEffect(() => {
    setMounted(true)

    // Check if user navigated from another page (not a refresh)
    const navigatedFromPage = sessionStorage.getItem('navigated-from-page')
    
    if (navigatedFromPage) {
      // Skip preloader animation - user came from another page
      setIsLoaded(true)
      setPreloadDone(true)
      // Clear the flag
      sessionStorage.removeItem('navigated-from-page')
      return
    }

    // Show preloader on first load or refresh
    // Animation sequence:
    // 0.0s - 0.8s: Blur reveal
    // 0.9s - 3.1s: Letters slide SLOWLY to edges (2.2s duration)
    // 1.8s onwards: Content starts fading in, preloader background fades
    // 3.1s: Letters fully off screen at edges
    
    // Start showing content and fading preloader background while letters slide
    const contentTimer = setTimeout(() => {
      setIsLoaded(true)
      setPreloadDone(true) // Start fading preloader background
    }, 1800) // Content and background fade starts during slide

    return () => {
      clearTimeout(contentTimer)
    }
  }, [])

  // Set flag when navigating away from home page
  useEffect(() => {
    const handleLinkClick = () => {
      sessionStorage.setItem('navigated-from-page', 'true')
    }

    // Listen for all link clicks
    const links = document.querySelectorAll('a[href^="/"]')
    links.forEach(link => {
      link.addEventListener('click', handleLinkClick)
    })

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleLinkClick)
      })
    }
  }, [mounted])

  const setupScrollReveal = useCallback(() => {
    if (setupCompleteRef.current) return

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const cards = document.querySelectorAll<HTMLElement>(
          '[data-viewport-reveal="true"]'
        )

        if (cards.length === 0 || observerRef.current) return

        cards.forEach((card) => {
          const index = Number(card.dataset.cardIndex || "0")
          card.style.transitionDelay = `${index * 120}ms`
        })

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const target = entry.target as HTMLElement
                requestAnimationFrame(() => {
                  target.dataset.visible = "true"
                })
                observer.unobserve(target)
              }
            })
          },
          {
            threshold: 0.16,
            rootMargin: "50px",
          }
        )

        observerRef.current = observer
        cards.forEach((card) => observer.observe(card))
        setupCompleteRef.current = true
      })
    })
  }, [])

  useEffect(() => {
    if (!mounted || !isLoaded) return

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
      {/* Preloader Overlay */}
      <Preloader done={preloadDone} />

      <Navbar />

      <main className={`pt-20 ${isLoaded ? "animate-pop-in" : "opacity-0"}`}>
        {/* Hero Section */}
        <HeroSection />

        {/* First Paintings Grid */}
        <FirstPaintingsGrid />

        {/* Artist Signature */}
        <ArtistSignature />

        {/* Featured Painting 1 */}
        {featuredPaintings.length > 0 && (
          <FeaturedPainting painting={featuredPaintings[0]} />
        )}

        {/* Second Paintings Grid */}
        <SecondPaintingsGrid />

        {/* Featured Painting 2 */}
        {featuredPaintings.length > 1 && (
          <FeaturedPainting painting={featuredPaintings[1]} />
        )}

        {/* View All Works */}
        <section className="pt-6 pb-16 md:pt-8 md:pb-24 px-4 md:px-6">
          <div className="flex justify-center">
            <Link
              href="/originals"
              className="
                inline-flex items-center justify-center
                px-8 py-3
                text-xs font-sans font-medium tracking-widest uppercase
                rounded-full border border-muted-foreground
                text-muted-foreground
                hover:border-foreground hover:text-foreground
                transition-all
              "
            >
              View All Works
            </Link>
          </div>
        </section>

        {/* Instagram Section */}
        <InstagramSection />
      </main>

      <Footer />
    </>
  )
}