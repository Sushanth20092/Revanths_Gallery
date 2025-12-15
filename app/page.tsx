"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AskForPriceButton } from "@/components/ask-for-price-button"
import { staticPaintings } from "@/data/static-paintings"
import { usePaintingsCache } from "@/hooks/usePaintingsCache"
import TiltedImage from "@/components/TiltedImage"

// Instagram Reels Component
function InstagramReels() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  const videos = [
    { src: "/insta2.mp4", id: 1 },
    { src: "/insta1.mp4", id: 2 },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [mounted])

  useEffect(() => {
    if (!mounted || !isMobile) return

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = containerRefs.current.findIndex((ref) => ref === entry.target)
        const video = videoRefs.current[index]
        
        if (video) {
          if (entry.isIntersecting) {
            video.play()
          } else {
            video.pause()
          }
        }
      })
    }, options)

    containerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      observer.disconnect()
    }
  }, [mounted, isMobile])

  const handleMouseEnter = (index: number) => {
    if (mounted && !isMobile && videoRefs.current[index]) {
      videoRefs.current[index]?.play()
    }
  }

  const handleMouseLeave = (index: number) => {
    if (mounted && !isMobile && videoRefs.current[index]) {
      videoRefs.current[index]?.pause()
    }
  }

  if (!mounted) {
    return (
      <div className="flex justify-center mb-12 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-lg md:max-w-2xl w-full">
          {videos.map((video) => (
            <div key={video.id} className="relative bg-muted overflow-hidden rounded-3xl aspect-[9/16]" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center mb-12 px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-lg md:max-w-2xl w-full">
        {videos.map((video, index) => (
          <div
            key={video.id}
            ref={(el) => {
              containerRefs.current[index] = el
            }}
            className="relative bg-muted overflow-hidden rounded-3xl"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <video
              ref={(el) => {
                videoRefs.current[index] = el
              }}
              src={video.src}
              loop
              muted
              playsInline
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { paintings: dynamicPaintings } = usePaintingsCache()
  const featuredPaintings = dynamicPaintings.filter((p) => p.is_featured_home).slice(0, 2)
  
  // State for image gallery in featured paintings
  const [selectedImage1, setSelectedImage1] = useState(0)
  const [selectedImage2, setSelectedImage2] = useState(0)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setIsLoaded(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SOLD":
        return "text-red-600"
      case "NOT_FOR_SALE":
        return "text-gray-400"
      case "RESERVED":
        return "text-orange-600"
      default:
        return "text-green-700"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "NOT_FOR_SALE":
        return "Not for Sale"
      default:
        return status
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <Navbar />
      <main className={`pt-20 ${isLoaded ? "animate-pop-in" : "opacity-0"}`}>
        {/* Hero Section */}
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden -mt-20 pt-20">
          <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover">
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />

          <div className="relative z-10 text-center text-white max-w-3xl px-4">
            <p className="text-xs font-sans font-medium tracking-widest uppercase mb-6 opacity-90 animate-fade-up">
              {/* Revanths Gallery */}
            </p>
            <h1
              className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Original Paintings & Commissioned Art
            </h1>
            <p
              className="text-lg md:text-xl font-sans leading-relaxed mb-8 opacity-90 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
            </p>

            <br />
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

       {/* First 4 Paintings Grid */}
<section className="py-20 md:py-32 px-4 md:px-6 bg-background">
  <div className="max-w-7xl mx-auto">
    {/* Desktop: Flexible grid with proportional scaling */}
    <div className="hidden lg:grid grid-cols-10 gap-6 items-start">
      {/* True Inside - Largest (8000 cm²) - 1.0× scale - spans 4 columns */}
      <div className="col-span-4 group cursor-pointer animate-fade-up" style={{ animationDelay: '0s' }}>
        <Link href="/originals">
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl">
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]" />
            <Image
              src={staticPaintings[0].thumbnailUrl || "/placeholder.svg"}
              alt={staticPaintings[0].title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <h3 className="text-lg font-serif font-bold text-white mb-1">{staticPaintings[0].title}</h3>
              <p className="text-sm font-sans text-white/80">{staticPaintings[0].subtitle}</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Right side with three paintings */}
      <div className="col-span-6 grid grid-cols-5 gap-6">
        {/* Crimson Silence - Medium (3716 cm²) - 0.68× scale - spans 2.5 columns */}
        <div className="col-span-2 group cursor-pointer animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <Link href="/originals">
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]" />
              <Image
                src={staticPaintings[2].thumbnailUrl || "/placeholder.svg"}
                alt={staticPaintings[2].title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <h3 className="text-base font-serif font-bold text-white mb-1">{staticPaintings[2].title}</h3>
                <p className="text-xs font-sans text-white/80">{staticPaintings[2].subtitle}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Divine Resonance - Medium (3716 cm²) - 0.68× scale - spans 2.5 columns */}
        <div className="col-span-2 group cursor-pointer animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Link href="/originals">
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]" />
              <Image
                src={staticPaintings[3].thumbnailUrl || "/placeholder.svg"}
                alt={staticPaintings[3].title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <h3 className="text-base font-serif font-bold text-white mb-1">{staticPaintings[3].title}</h3>
                <p className="text-xs font-sans text-white/80">{staticPaintings[3].subtitle}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Veil of Emotion - Smallest (1247 cm²) - 0.39× scale - spans 1 column, positioned bottom-right */}
        <div className="col-span-1 col-start-5 group cursor-pointer animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link href="/originals">
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]" />
              <Image
                src={staticPaintings[1].thumbnailUrl || "/placeholder.svg"}
                alt={staticPaintings[1].title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <h3 className="text-sm font-serif font-bold text-white mb-1">{staticPaintings[1].title}</h3>
                <p className="text-xs font-sans text-white/80">{staticPaintings[1].subtitle}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>

    {/* Tablet: 2-column grid */}
    <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
      {staticPaintings.slice(0, 4).map((painting, index) => (
        <div key={painting.slug} className="group cursor-pointer animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <Link href="/originals">
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]" />
              <Image src={painting.thumbnailUrl || "/placeholder.svg"} alt={painting.title} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <h3 className="text-lg font-serif font-bold text-white mb-1">{painting.title}</h3>
                <p className="text-sm font-sans text-white/80">{painting.subtitle}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>

    {/* Mobile: 2-column grid */}
    <div className="grid md:hidden grid-cols-2 gap-4">
      {staticPaintings.slice(0, 4).map((painting, index) => (
        <div key={painting.slug} className="group cursor-pointer animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <Link href="/originals">
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]" />
              <Image src={painting.thumbnailUrl || "/placeholder.svg"} alt={painting.title} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <h3 className="text-sm font-serif font-bold text-white mb-1">{painting.title}</h3>
                <p className="text-xs font-sans text-white/80">{painting.subtitle}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
</section>
        {/* Artist Signature Section */}
        <section className="py-8 md:py-12 px-4 md:px-6 bg-secondary flex items-center justify-center">
          <div className="w-full max-w-md md:max-w-lg">
            <Image
              src="/sign.png"
              alt="Artist Signature"
              width={600}
              height={300}
              className="w-full h-auto object-contain animate-fade-up"
            />
          </div>
        </section>

        {/* First Featured Painting - Image LEFT, Details RIGHT */}
        {featuredPaintings.length > 0 && (
          <section className="py-20 md:py-32 px-6 md:px-10 lg:px-16 bg-background">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
                
                {/* Image Gallery with Tilt Effect */}
                <div className="relative w-full max-w-2xl md:max-w-xl mx-auto lg:mx-0 [perspective:1200px]">
                  {/* Main Image Container with Tilt */}
                  <TiltedImage
                    src={(featuredPaintings[0].additional_image_urls && featuredPaintings[0].additional_image_urls.length > 0 
                      ? [featuredPaintings[0].main_image_url, ...featuredPaintings[0].additional_image_urls][selectedImage1]
                      : featuredPaintings[0].main_image_url) || "/placeholder.svg"}
                    alt={featuredPaintings[0].title}
                    rotateAmplitude={12}
                    scaleOnHover={1.08}
                  />

                  {/* Thumbnails - Desktop: Vertical right edge, Mobile: Horizontal below center */}
                  {featuredPaintings[0].additional_image_urls && featuredPaintings[0].additional_image_urls.length > 0 && (
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex justify-center gap-3 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-8 md:left-auto md:flex-col md:gap-4">
                      {[featuredPaintings[0].main_image_url, ...featuredPaintings[0].additional_image_urls].map((imageUrl, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage1(index)}
                          className={`relative w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-2xl transition-all duration-300 bg-white ${
                            selectedImage1 === index
                              ? 'shadow-xl scale-110'
                              : 'shadow-md hover:shadow-lg hover:scale-105'
                          }`}
                        >
                          <Image
                            src={imageUrl || "/placeholder.svg"}
                            alt={`${featuredPaintings[0].title} view ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center mt-16 md:mt-0">
                  <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-4">
                    {featuredPaintings[0].medium}
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                    {featuredPaintings[0].title}
                  </h2>
                  <p className="hidden md:block text-base md:text-lg font-sans leading-relaxed text-foreground mb-8">
                    {featuredPaintings[0].description}
                  </p>

                  {/* Base Price */}
                  {featuredPaintings[0].price && (
                    <div className="mb-6">
                      <p className="text-xs font-sans font-medium tracking-wide uppercase text-muted-foreground mb-2">
                        Base Price
                      </p>
                      <p className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                        ₹{featuredPaintings[0].price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 items-stretch md:items-start">
                    <AskForPriceButton
                      paintingTitle={featuredPaintings[0].title}
                      disabled={featuredPaintings[0].status === "SOLD" || featuredPaintings[0].status === "NOT_FOR_SALE"}
                    />
                    <Link 
                      href={`/painting/${featuredPaintings[0].slug}`}
                      className="inline-flex items-center justify-center
    px-4 py-2 sm:px-6 sm:py-3
    min-w-[180px]
    text-[10px] sm:text-xs
    tracking-wider sm:tracking-widest
    font-sans font-medium uppercase
    rounded-full border border-foreground
    hover:bg-foreground hover:text-background
    transition-all"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Next 4 Paintings Grid */}
        <section className="py-20 md:py-32 px-4 md:px-6 bg-background">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {staticPaintings.slice(4, 9).map((painting, index) => (
        <div
          key={painting.slug}
          className="group cursor-pointer animate-fade-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <Link href="/originals">
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl">
              {/* Shadow layer – hover only */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]" />
              
              <Image
                src={painting.thumbnailUrl || "/placeholder.svg"}
                alt={painting.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Gradient Overlay - appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Text Content - slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <h3 className="text-lg font-serif font-bold text-white mb-1">
                  {painting.title}
                </h3>
                <p className="text-sm font-sans text-white/80">
                  {painting.subtitle}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* Second Featured Painting - Image LEFT, Details RIGHT */}
        {featuredPaintings.length > 1 && (
          <section className="py-20 md:py-32 px-6 md:px-10 lg:px-16 bg-background">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
                
                {/* Image Gallery with Tilt Effect */}
                <div className="relative w-full max-w-2xl md:max-w-xl mx-auto lg:mx-0 [perspective:1200px]">
                  {/* Main Image Container with Tilt */}
                  <TiltedImage
                    src={(featuredPaintings[1].additional_image_urls && featuredPaintings[1].additional_image_urls.length > 0 
                      ? [featuredPaintings[1].main_image_url, ...featuredPaintings[1].additional_image_urls][selectedImage2]
                      : featuredPaintings[1].main_image_url) || "/placeholder.svg"}
                    alt={featuredPaintings[1].title}
                    rotateAmplitude={12}
                    scaleOnHover={1.08}
                  />

                  {/* Thumbnails - Desktop: Vertical right edge, Mobile: Horizontal below center */}
                  {featuredPaintings[1].additional_image_urls && featuredPaintings[1].additional_image_urls.length > 0 && (
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex justify-center gap-3 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-8 md:left-auto md:flex-col md:gap-4">
                      {[featuredPaintings[1].main_image_url, ...featuredPaintings[1].additional_image_urls].map((imageUrl, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage2(index)}
                          className={`relative w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-2xl transition-all duration-300 bg-white ${
                            selectedImage2 === index
                              ? 'shadow-xl scale-110'
                              : 'shadow-md hover:shadow-lg hover:scale-105'
                          }`}
                        >
                          <Image
                            src={imageUrl || "/placeholder.svg"}
                            alt={`${featuredPaintings[1].title} view ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center mt-16 md:mt-0">
                  <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-4">
                    {featuredPaintings[1].medium}
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                    {featuredPaintings[1].title}
                  </h2>
                  <p className="hidden md:block text-base md:text-lg font-sans leading-relaxed text-foreground mb-8">
                    {featuredPaintings[1].description}
                  </p>

                  {/* Base Price */}
                  {featuredPaintings[1].price && (
                    <div className="mb-6">
                      <p className="text-xs font-sans font-medium tracking-wide uppercase text-muted-foreground mb-2">
                        Base Price
                      </p>
                      <p className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                        ₹{featuredPaintings[1].price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 items-stretch md:items-start">
                    <AskForPriceButton
                      paintingTitle={featuredPaintings[1].title}
                      disabled={featuredPaintings[1].status === "SOLD" || featuredPaintings[1].status === "NOT_FOR_SALE"}
                    />
                    <Link 
                      href={`/painting/${featuredPaintings[1].slug}`}
                      className="inline-flex items-center justify-center
    px-4 py-2 sm:px-6 sm:py-3
    min-w-[180px]
    text-[10px] sm:text-xs
    tracking-wider sm:tracking-widest
    font-sans font-medium uppercase
    rounded-full border border-foreground
    hover:bg-foreground hover:text-background
    transition-all"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

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
        <section className="py-20 md:py-32 px-4 md:px-6 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-4">
                Connect With Us
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Follow Our Journey</h2>
              <p className="text-base font-sans text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Stay updated with our latest works, studio moments, and artistic discoveries. Follow us on Instagram for
                daily inspiration.
              </p>
            </div>

            <InstagramReels />

            <div className="text-center">
              <a
                href="https://www.instagram.com/_revanth___/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-foreground text-background text-xs font-sans font-medium tracking-widest uppercase rounded-full hover:opacity-80 transition-all"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}