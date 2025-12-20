"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [showVideo, setShowVideo] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => setShowVideo(true))
    } else {
      setTimeout(() => setShowVideo(true), 200)
    }
  }, [])

  return (
    <section
      className="
        relative w-full h-screen flex items-center justify-center overflow-hidden
        -mt-20 pt-20
        bg-cover bg-center
      "
      style={{
        backgroundImage: "url('/hero-poster.webp')",
      }}
    >
      {/* VIDEO */}
      {showVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-poster.webp"
          onLoadedData={() => setVideoLoaded(true)}
          className={`
            absolute inset-0 w-full h-full
            object-cover
            object-[25%_50%] md:object-center
            transition-all duration-1000 ease-out
            ${videoLoaded ? "opacity-100" : "opacity-0"}
          `}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 text-center text-white max-w-3xl px-4">
        <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 animate-fade-up">
          Original Paintings & Commissioned Art
        </h1>

        <Link
          href="/originals"
          className="inline-block px-10 py-4 text-lg font-serif tracking-widest uppercase border border-white rounded-2xl hover:bg-white/10 transition-all"
        >
          View Originals
        </Link>
      </div>
    </section>
  )
}
