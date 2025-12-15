"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Footer } from "@/components/footer"
import { AskForPriceButton } from "@/components/ask-for-price-button"
import { usePaintingsCache } from "@/hooks/usePaintingsCache"
import { createClient } from "@/lib/supabase"
import type { Painting } from "@/lib/types"

export default function PaintingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>("")
  const [painting, setPainting] = useState<Painting | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string>("")
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const { paintings: allPaintings } = usePaintingsCache()
  const supabase = createClient()

  useEffect(() => {
    ;(async () => {
      const { slug: slugParam } = await params
      setSlug(slugParam)

      const foundPainting = allPaintings.find((p) => p.slug === slugParam)
      if (foundPainting) {
        setPainting(foundPainting)
        setSelectedImage(foundPainting.main_image_url || "")
      }

      setIsLoaded(true)
    })()
  }, [params, allPaintings])

  // Close lightbox on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isLightboxOpen])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return

    const rect = imageContainerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsZoomed(true)
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }

  const openLightbox = (image: string) => {
    setLightboxImage(image)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

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

  const allImages = painting ? [painting.main_image_url, ...(painting.additional_image_urls || [])].filter(Boolean) : []
  const selectedImageIndex = allImages.indexOf(selectedImage)

  const goToPreviousImage = () => {
    const prevIndex = (selectedImageIndex - 1 + allImages.length) % allImages.length
    setSelectedImage(allImages[prevIndex])
  }

  const goToNextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % allImages.length
    setSelectedImage(allImages[nextIndex])
  }

  const goToPreviousLightboxImage = () => {
    const currentIndex = allImages.indexOf(lightboxImage)
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length
    setLightboxImage(allImages[prevIndex])
  }

  const goToNextLightboxImage = () => {
    const currentIndex = allImages.indexOf(lightboxImage)
    const nextIndex = (currentIndex + 1) % allImages.length
    setLightboxImage(allImages[nextIndex])
  }

  if (!isLoaded || !painting) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading artwork...</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <main className={`${isLoaded ? "animate-pop-in" : ""}`}>
        {/* Back Button */}
        <div className="relative bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
            <Link
              href="/originals"
              className="inline-flex items-center gap-2 text-sm font-sans text-foreground hover:opacity-60 transition-opacity"
            >
              <ChevronLeft size={18} />
              Back to Gallery
            </Link>
          </div>
        </div>

        {/* Detail Section */}
        <section className="py-8 md:py-16 px-4 md:px-6" style={{ backgroundColor: 'oklch(0.99 0.001 0)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
              {/* Left: Image Gallery */}
              <div>
                {/* Main Image with Smooth Fade Zoom - Square Grid */}
                <div
                  ref={imageContainerRef}
                  className="relative w-full bg-secondary mb-4 overflow-hidden group rounded-2xl"

                  style={{ aspectRatio: '1 / 1' }}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => openLightbox(selectedImage)}
                >
                  <div
                    className="relative w-full h-full transition-all ease-out"
                    style={{
                      transform: isZoomed ? `scale(1.4)` : 'scale(1)',
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                      transitionDuration: '700ms',
                      opacity: isZoomed ? 0.96 : 1,
                      transitionProperty: 'transform, opacity',
                    }}
                  >
                    <Image
                      src={selectedImage || "/placeholder.svg"}
                      alt={painting.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Navigation Arrows - Clickable (Hidden on Mobile) */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          goToPreviousImage()
                        }}
                        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md transition-all z-20"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} strokeWidth={2.5} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          goToNextImage()
                        }}
                        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md transition-all z-20"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} strokeWidth={2.5} />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery - Below Main Image, Centered */}
                {allImages.length > 1 && (
                  <div className="flex justify-center gap-3">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`relative overflow-hidden rounded-2xl transition-all ${
                          selectedImage === image ? 'scale-105' : 'opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                        style={{ 
                          width: '80px',
                          height: '80px',
                        }}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Painting Info */}
              <div>
                {/* Medium */}
                <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-3">
                  {painting.medium}
                </p>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">{painting.title}</h1>

                {/* Status */}
                <div className="mb-4">
                  <span
                    className={`text-sm font-sans font-medium tracking-wide uppercase ${getStatusColor(
                      painting.status,
                    )}`}
                  >
                    {getStatusLabel(painting.status)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-base font-sans leading-relaxed text-foreground mb-6">
                  {painting.description}
                </p>

                {/* Details */}
                <div className="space-y-3 mb-6 py-6 border-t border-b border-border">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-sans font-medium text-muted-foreground">Dimensions</span>
                    <span className="text-sm font-sans text-foreground text-right">{painting.dimensions}</span>
                  </div>
                  {painting.year && (
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-sans font-medium text-muted-foreground">Year</span>
                      <span className="text-sm font-sans text-foreground">{painting.year}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-sans font-medium text-muted-foreground">Medium</span>
                    <span className="text-sm font-sans text-foreground text-right">{painting.medium}</span>
                  </div>
                </div>

                {/* Price Info */}
                {painting.price && (
                  <div className="mb-6">
                    <p className="text-xs font-sans font-medium text-muted-foreground mb-2"> BASE PRICE</p>
                    <p className="text-2xl font-serif font-bold">₹{painting.price.toLocaleString()}</p>
                  </div>
                )}

                {/* Ask for Price Button */}
                <AskForPriceButton
  paintingTitle={painting.title}
  status={painting.status}
  disabled={painting.status === "SOLD" || painting.status === "NOT_FOR_SALE"}
/>
              </div>
            </div>
          </div>
        </section>

        {/* Related Works - Show other database paintings */}
        {allPaintings.length > 1 && (
          <section className="py-16 md:py-24 px-4 md:px-6 bg-background">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 text-center">Related Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {allPaintings
                  .filter((p) => p.slug !== painting.slug)
                  .slice(0, 3)
                  .map((relatedPainting) => (
                    <Link key={relatedPainting.slug} href={`/painting/${relatedPainting.slug}`} className="group">
                      <div 
                        className="relative w-full bg-background mb-3 overflow-hidden rounded-2xl"
                        style={{ aspectRatio: '1 / 1' }}
                      >
                        <Image
                          src={relatedPainting.main_image_url || "/placeholder.svg"}
                          alt={relatedPainting.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                      </div>
                      <h3 className="text-lg font-serif font-bold mb-1 group-hover:opacity-60 transition-opacity">
                        {relatedPainting.title}
                      </h3>
                      <p className="text-sm font-sans text-muted-foreground">{relatedPainting.medium}</p>
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-50"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPreviousLightboxImage()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-50"
                aria-label="Previous image"
              >
                <ChevronLeft size={28} strokeWidth={2} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNextLightboxImage()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-50"
                aria-label="Next image"
              >
                <ChevronRight size={28} strokeWidth={2} />
              </button>
            </>
          )}

          {/* Lightbox Image */}
          <div 
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={lightboxImage || "/placeholder.svg"}
                alt={painting.title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Image Counter */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white text-sm">
              {allImages.indexOf(lightboxImage) + 1} / {allImages.length}
            </div>
          )}
        </div>
      )}

      <Footer />
    </>
  )
}