"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AskForPriceButton } from "@/components/ask-for-price-button"
import { usePaintingsCache } from "@/hooks/usePaintingsCache"
import type { Painting } from "@/lib/types"

export default function OriginalsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { paintings: dynamicPaintings, loading } = usePaintingsCache()

  useEffect(() => {
    // Small delay to ensure smooth mount
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SOLD":
        return "bg-red-100 text-red-700"
      case "NOT_FOR_SALE":
        return "bg-gray-100 text-gray-600"
      case "RESERVED":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-green-100 text-green-700"
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

  return (
    <>
      <Navbar />
      <main 
        className={`transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hero / Header Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Complete Collection
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Originals</h1>
            <p className="text-base font-sans text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore our complete collection of original paintings and commissioned works. Each piece is a unique
              expression of artistic vision.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 md:py-32 px-4 md:px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            {!loading && dynamicPaintings.length > 0 ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {dynamicPaintings.map((painting: Painting, index: number) => (
                    <div
                      key={painting.id}
                      className={`group relative transition-all duration-500 ${
                        isLoaded 
                          ? "opacity-100 translate-y-0" 
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{ 
                        transitionDelay: isLoaded ? `${Math.min(index * 50, 500)}ms` : '0ms'
                      }}
                    >
                      <div className="relative w-full aspect-square overflow-hidden bg-secondary rounded-2xl">
                        <Link href={`/painting/${painting.slug}`}>
                          <Image
                            src={painting.main_image_url || "/placeholder.svg"}
                            alt={painting.title}
                            fill
                            className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 ${painting.status === "SOLD" ? "opacity-70" : ""}`}
                          />
                        </Link>

                        {/* Status Badge - Only show for SOLD, RESERVED, NOT_FOR_SALE */}
                        {painting.status !== "AVAILABLE" && (
                         <div className="absolute top-3 right-3 z-10 hidden sm:block">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium rounded-md ${
                                painting.status === "SOLD" 
                                  ? "bg-gray-800/80 text-white backdrop-blur-sm" 
                                  : getStatusColor(painting.status)
                              }`}
                            >
                              {painting.status === "SOLD" && (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                              {getStatusLabel(painting.status).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Painting Info */}
                      <div className="mt-3 mb-2">
                        <Link href={`/painting/${painting.slug}`}>
                          <h2 className="text-sm md:text-base font-serif font-bold mb-1 group-hover:opacity-60 transition-opacity flex justify-center">
                            {painting.title}
                          </h2>
                        </Link>
                        

                        
                        {painting.price && (
                          <div className="mt-2">
                            <p className="text-[10px] font-sans font-medium tracking-widest uppercase text-muted-foreground mb-0.5 flex justify-center">Base Price</p>
                              <p className="text-base md:text-lg font-serif font-bold text-foreground leading-tight flex justify-center">₹{painting.price.toLocaleString()}</p></div>
                      )}

                        
                        {/* Ask for Price Button - Always visible on mobile, hover on desktop */}
                        <div className="mt-3 md:mt-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-300 flex justify-center">

                          <AskForPriceButton
                            paintingTitle={painting.title}
                            status={painting.status}
                            disabled={painting.status === "SOLD" || painting.status === "NOT_FOR_SALE"}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                </div>

                

                {/* Load More Info */}
                <div className="text-center mt-16 pt-8 border-t border-border">
                  <p className="text-sm font-sans text-muted-foreground mb-4">
                    Showing {dynamicPaintings.length} works in our collection
                  </p>
                  <p className="text-xs font-sans text-muted-foreground">
                    New works added regularly. Check back soon for fresh additions to our gallery.
                  </p>
                </div>
              </>
            ) : !loading ? (
              <div className="text-center py-20">
                <p className="text-lg font-serif font-bold mb-2">No Paintings Yet</p>
                <p className="text-base font-sans text-muted-foreground">
                  Check back soon as our admin adds new artworks to the collection.
                </p>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mb-4"></div>
                <p className="text-base font-sans text-muted-foreground">Loading paintings...</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}