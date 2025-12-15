"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Small delay to ensure smooth mount
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Navbar />
      <main 
        className={`transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
    {/* Hero Section */}
        <section className="relative w-full overflow-hidden">
          {/* Mobile: 2x2 Grid with Slight Bottom Crop */}
          <div className="grid grid-cols-2 md:hidden">
            {["/g1.jpg", "/g2.jpg", "/g3.jpg", "/g4.jpg"].map((src, i) => (
              <div key={i} className="relative aspect-[3/3.8]">
                <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover object-top" />
              </div>
            ))}
          </div>

          {/* Desktop: Horizontal Row of Portrait Images */}
          <div className="hidden md:grid md:grid-cols-4">
            {["/g1.jpg", "/g2.jpg", "/g3.jpg", "/g4.jpg"].map((src, i) => (
              <div key={i} className="relative aspect-[3/4]">
                <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>

          {/* Overlay Text */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 uppercase tracking-wide">About Revanth</h1>
              <p className="text-lg font-sans opacity-90">Artist, Creator & Visionary</p>
            </div>
          </div>
        </section>
        {/* Biography Section */}
        <section className="pt-8 pb-20 md:pt-12 md:pb-32 px-4 md:px-6 bg-background">


          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Our Story
            </p>

            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">The Artist Behind Revanths Gallery</h2>

            <div className="space-y-6 text-base md:text-lg font-sans leading-relaxed text-foreground">
              <p>
                Revanth is a contemporary artist passionate about creating meaningful visual experiences through
                painting and mixed media. With a unique approach that blends traditional techniques with modern
                aesthetics, each work tells a story of exploration and artistic growth.
              </p>

              <p>
                Based in India, Revanth's artistic journey began with a fascination for color, form, and the emotions
                they convey. Over years of dedicated practice and experimentation, a distinctive style has emerged—one
                that captures the essence of nature, abstraction, and human emotion.
              </p>

              <p>
                The gallery represents a curated collection of original works, each piece a testament to the artist's
                commitment to excellence and creative integrity. From intimate studies to large-scale installations,
                every painting invites viewers to explore new perspectives and find personal meaning.
              </p>

              <p>
                Beyond the studio, Revanth is dedicated to fostering a community of art enthusiasts and collaborators.
                Through commissions, collaborations, and exhibitions, the mission is to bring art closer to those who
                appreciate it.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery of Artist Work */}
        <section className="py-20 md:py-32 px-4 md:px-6 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">
              Studio Moments
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 place-items-center">
              {["/stdio1.jpg", "/stdio2.jpg", "/stdio3.jpg"].map((src, i) => (
                <div
                  key={i}
                  className={`relative h-80 w-full overflow-hidden bg-secondary flex items-center justify-center group transition-all duration-500 ${
                    isLoaded 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ 
                    transitionDelay: isLoaded ? `${i * 150}ms` : '0ms'
                  }}
                >
                  <Image
                    src={src}
                    alt={`Studio moment ${i + 1}`}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 md:py-32 px-4 md:px-6 bg-foreground text-background">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Commission Your Vision</h2>
            <p className="text-lg font-sans mb-8 opacity-90">
              Have a unique idea for a custom artwork? Revanth welcomes commissioned projects and collaborations.
            </p>
            <Link
              href="/commission-art"
              className="inline-block px-8 py-3 bg-background text-foreground text-xs font-sans font-medium tracking-widest uppercase hover:opacity-80 transition-opacity"
            >
              Request a Commission
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}