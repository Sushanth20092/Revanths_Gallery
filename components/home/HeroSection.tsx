"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden -mt-20 pt-20">
      {/* VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.jpg" // 👈 IMPORTANT (first frame image)
        onCanPlayThrough={() => setVideoLoaded(true)}
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-all duration-1000 ease-out
          ${videoLoaded
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-105 translate-y-8"}
        `}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 text-center text-white max-w-3xl px-4">
        <h1
          className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Original Paintings & Commissioned Art
        </h1>

        <Link
          href="/originals"
          className="
            inline-block
            px-10 py-4
            text-white
            text-lg
            font-serif
            tracking-widest
            uppercase
            border
            border-white
            rounded-2xl
            bg-transparent
            hover:bg-white/10
            transition-all
            duration-300
            animate-fade-up
          "
          style={{ animationDelay: "0.3s" }}
        >
          View Originals
        </Link>
      </div>
    </section>
  )
}
