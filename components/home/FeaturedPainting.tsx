import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { AskForPriceButton } from "@/components/ask-for-price-button"
import TiltedImage from "@/components/TiltedImage"

interface Painting {
  slug: string
  title: string
  subtitle?: string
  description?: string
  medium?: string
  price?: number
  status?: string
  main_image_url?: string
  additional_image_urls?: string[]
}

interface FeaturedPaintingProps {
  painting: Painting
}

export function FeaturedPainting({ painting }: FeaturedPaintingProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <section className="py-20 md:py-32 px-6 md:px-10 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
          {/* Image Gallery with Tilt Effect */}
          <div className="relative w-full max-w-2xl md:max-w-xl mx-auto lg:mx-0 [perspective:1200px]">
            {/* Main Image Container with Tilt */}
            <TiltedImage
              src={(painting.additional_image_urls && painting.additional_image_urls.length > 0 
                ? [painting.main_image_url, ...painting.additional_image_urls][selectedImage]
                : painting.main_image_url) || "/placeholder.svg"}
              alt={painting.title}
              rotateAmplitude={12}
              scaleOnHover={1.08}
            />

            {/* Thumbnails - Desktop: Vertical right edge, Mobile: Horizontal below center */}
            {painting.additional_image_urls && painting.additional_image_urls.length > 0 && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex justify-center gap-3 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-8 md:left-auto md:flex-col md:gap-4">
                {[painting.main_image_url, ...painting.additional_image_urls].map((imageUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-2xl transition-all duration-300 bg-white ${
                      selectedImage === index
                        ? 'shadow-xl scale-110'
                        : 'shadow-md hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={`${painting.title} view ${index + 1}`}
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
              {painting.medium}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
              {painting.title}
            </h2>
            <p className="hidden md:block text-base md:text-lg font-sans leading-relaxed text-foreground mb-8">
              {painting.description}
            </p>

            {/* Base Price */}
            {painting.price && (
              <div className="mb-6">
                <p className="text-xs font-sans font-medium tracking-wide uppercase text-muted-foreground mb-2">
                  Base Price
                </p>
                <p className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  ₹{painting.price.toLocaleString('en-IN')}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 items-stretch md:items-start">
              <AskForPriceButton
                paintingTitle={painting.title}
                disabled={painting.status === "SOLD" || painting.status === "NOT_FOR_SALE"}
              />
              <Link 
                href={`/painting/${painting.slug}`}
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
  )
}