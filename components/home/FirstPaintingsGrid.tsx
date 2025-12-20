import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import { staticPaintings } from "@/data/static-paintings"

export function FirstPaintingsGrid() {
  // Memoize the first 4 paintings to avoid re-creating array on every render
  const displayPaintings = useMemo(() => staticPaintings.slice(0, 4), [])

  return (
         <section className="py-20 md:py-32 px-4 md:px-6 lg:px-12 xl:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
       {/* Desktop: Vertical stacked layout with original sizes */}
        <div className="hidden lg:flex flex-col items-center space-y-20">
          {/* Top row - True Inside and Divine Resonance */}
          <div className="w-full flex justify-center gap-20 items-start">
            {/* True Inside - Left, largest - Original scale 1.06 */}
            <div
              className="w-[39.33%] mt-40 group cursor-pointer viewport-reveal-card"
              data-viewport-reveal="true"
              data-card-index="0"
            >
              <Link href="/originals">
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl scale-[1.06] gpu-card transition-shadow duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                  <Image
                    src={displayPaintings[0].thumbnailUrl || "/placeholder.svg"}
                    alt={displayPaintings[0].title}
                    fill
                    className="object-cover gpu-image transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 92vw"
                    priority
                    loading="eager"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                    <h3 className="text-lg font-serif font-bold text-gray-400 mb-1">{displayPaintings[0].title}</h3>
                    <p className="text-sm font-sans text-gray-400">{displayPaintings[0].subtitle}</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Divine Resonance - Right side, large - Original scale 1.06 */}
            <div
              className="w-[39.33%] group cursor-pointer viewport-reveal-card"
              data-viewport-reveal="true"
              data-card-index="1"
            >
              <Link href="/originals">
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl scale-[1.06] gpu-card transition-shadow duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                  <Image
                    src={displayPaintings[3].thumbnailUrl || '/placeholder.svg'}
                    alt={displayPaintings[3].title}
                    fill
                    className="object-cover gpu-image transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 86vw"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                    <h3 className="text-lg font-serif font-bold text-gray-400 mb-1">
                      {displayPaintings[3].title}
                    </h3>
                    <p className="text-sm font-sans text-gray-400">
                      {displayPaintings[3].subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom row - Crimson Silence and Veil of Emotion */}
          <div className="w-full flex justify-center gap-20 items-start">
            {/* Crimson Silence - Left, medium size - Original size without scale */}
            <div
              className="w-[30%] mt-10 group cursor-pointer viewport-reveal-card"
              data-viewport-reveal="true"
              data-card-index="2"
            >
              <Link href="/originals">
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl gpu-card transition-shadow duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                  <Image
                    src={displayPaintings[2].thumbnailUrl || "/placeholder.svg"}
                    alt={displayPaintings[2].title}
                    fill
                    className="object-cover gpu-image transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 1024px) 18vw, (min-width: 768px) 50vw, 100vw"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                    <h3 className="text-base font-serif font-bold text-gray-400 mb-1">{displayPaintings[2].title}</h3>
                    <p className="text-xs font-sans text-gray-400">{displayPaintings[2].subtitle}</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Veil of Emotion - Right side, smallest - Original scale 1.08 */}
            <div
              className="w-[17.67%]  group cursor-pointer viewport-reveal-card"
              data-viewport-reveal="true"
              data-card-index="3"
            >
              <Link href="/originals">
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl transform scale-[1.08] gpu-card transition-shadow duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                  <Image
                    src={displayPaintings[1].thumbnailUrl || '/placeholder.svg'}
                    alt={displayPaintings[1].title}
                    fill
                    className="object-cover gpu-image transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 1024px) 12vw, (min-width: 768px) 50vw, 82vw"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                    <h3 className="text-base font-serif font-bold text-gray-400 mb-1">
                      {displayPaintings[1].title}
                    </h3>
                    <p className="text-xs font-sans text-gray-400">
                      {displayPaintings[1].subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Tablet: 2-column grid */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
          {displayPaintings.map((painting, index) => (
            <div
              key={painting.slug}
              className="group cursor-pointer viewport-reveal-card"
              data-viewport-reveal="true"
              data-card-index={index}
            >
              <Link href="/originals">
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl gpu-card">
                  <Image 
                    src={painting.thumbnailUrl || "/placeholder.svg"} 
                    alt={painting.title} 
                    fill 
                    className="object-cover gpu-image transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    loading={index === 0 ? "eager" : "lazy"}
                    priority={index === 0}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                    <h3 className="text-lg font-serif font-bold text-gray-400 mb-1">{painting.title}</h3>
                    <p className="text-sm font-sans text-gray-400">{painting.subtitle}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile: 2-column grid */}
        <div className="md:hidden grid grid-cols-2 gap-4 px-1">
          {/* 1. True Inside — HERO (slightly reduced) */}
          <div
            className="col-span-2 flex justify-center viewport-reveal-card"
            data-viewport-reveal="true"
            data-card-index="0"
          >
            <Link href="/originals" className="w-[92%]">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl">
                <Image
                  src={displayPaintings[0].thumbnailUrl}
                  alt={displayPaintings[0].title}
                  fill
                  className="object-cover"
                  sizes="92vw"
                  priority
                  loading="eager"
                />
                <div className="absolute bottom-0 p-4">
                  <h3 className="text-sm font-serif font-bold text-gray-300">
                    {displayPaintings[0].title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* 2. Divine Resonance — LARGE (but smaller than hero) */}
          <div
            className="col-span-2 flex justify-center viewport-reveal-card"
            data-viewport-reveal="true"
            data-card-index="1"
          >
            <Link href="/originals" className="w-[86%]">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl">
                <Image
                  src={displayPaintings[3].thumbnailUrl}
                  alt={displayPaintings[3].title}
                  fill
                  className="object-cover"
                  sizes="86vw"
                  loading="lazy"
                />
                <div className="absolute bottom-0 p-4">
                  <h3 className="text-sm font-serif font-bold text-gray-300">
                    {displayPaintings[3].title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* 3. Crimson Silence — MEDIUM */}
          <div
            className="flex justify-center viewport-reveal-card"
            data-viewport-reveal="true"
            data-card-index="2"
          >
            <Link href="/originals" className="w-full">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-xl">
                <Image
                  src={displayPaintings[2].thumbnailUrl}
                  alt={displayPaintings[2].title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                  loading="lazy"
                />
                <div className="absolute bottom-0 p-3">
                  <h3 className="text-xs font-serif font-bold text-gray-300">
                    {displayPaintings[2].title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* 4. Veil of Emotion — SMALLER than Crimson */}
          <div
            className="flex justify-center viewport-reveal-card"
            data-viewport-reveal="true"
            data-card-index="3"
          >
            <Link href="/originals" className="w-[82%]">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-xl">
                <Image
                  src={displayPaintings[1].thumbnailUrl}
                  alt={displayPaintings[1].title}
                  fill
                  className="object-cover"
                  sizes="41vw"
                  loading="lazy"
                />
                <div className="absolute bottom-0 p-2.5">
                  <h3 className="text-[11px] font-serif font-bold text-gray-300">
                    {displayPaintings[1].title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}