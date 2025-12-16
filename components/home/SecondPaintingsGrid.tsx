import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import { staticPaintings } from "@/data/static-paintings"

export function SecondPaintingsGrid() {
  // Memoize paintings 4-7 to avoid re-creating array on every render
  const displayPaintings = useMemo(() => staticPaintings.slice(4, 8), [])

  return (
    <section
      className="py-8 px-4 bg-background viewport-reveal-card"
      data-viewport-reveal="true"
      data-card-index="0"
    >
      <div className="max-w-6xl mx-auto">
        <div className="hidden lg:flex flex-col items-center space-y-20">
          {/* AGAINST THE TIDE — slightly reduced */}
          <div
            className="w-[50%] group cursor-pointer viewport-reveal-card"
            data-viewport-reveal="true"
            data-card-index="0"
          >
            <Link href="/originals">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl transition-shadow duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                <Image
                  src={displayPaintings[0].thumbnailUrl}
                  alt={displayPaintings[0].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <h3 className="text-lg font-serif font-bold text-gray-400 mb-1">
                    {displayPaintings[0].title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {displayPaintings[0].subtitle}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* MIDDLE ROW */}
          <div className="w-full flex justify-center gap-14 items-start">
            {/* UNBOUND — unchanged */}
            <div
              className="w-[30%] group cursor-pointer viewport-reveal-card"
              data-viewport-reveal="true"
              data-card-index="1"
            >
              <Link href="/originals">
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-xl transition-shadow duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                  <Image
                    src={displayPaintings[1].thumbnailUrl}
                    alt={displayPaintings[1].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <h3 className="text-xs font-serif font-bold text-gray-400 mb-1">
                      {displayPaintings[1].title}
                    </h3>
                    <p className="text-[10px] text-gray-400">
                      {displayPaintings[1].subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* WHISPERING FALLS — slightly reduced */}
            <div
              className="w-[40%] mt-10 group cursor-pointer viewport-reveal-card"
              data-viewport-reveal="true"
              data-card-index="2"
            >
              <Link href="/originals">
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl transition-shadow duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                  <Image
                    src={displayPaintings[3].thumbnailUrl}
                    alt={displayPaintings[3].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <h3 className="text-base font-serif font-bold text-gray-400 mb-1">
                      {displayPaintings[3].title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {displayPaintings[3].subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* GENTLE STRENGTH — slightly bigger, under Unbound */}
          <div
            className="relative w-[28%] -left-70 -top-50 group cursor-pointer viewport-reveal-card"
            data-viewport-reveal="true"
            data-card-index="3"
          >
            <Link href="/originals">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-xl transition-shadow duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                <Image
                  src={displayPaintings[2].thumbnailUrl}
                  alt={displayPaintings[2].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <h3 className="text-xs font-serif font-bold text-gray-400 mb-1">
                    {displayPaintings[2].title}
                  </h3>
                  <p className="text-[10px] text-gray-400">
                    {displayPaintings[2].subtitle}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Section 2 – Mobile (Refined & Aesthetic) */}
      <div className="lg:hidden flex flex-col gap-6 px-1">
        {/* AGAINST THE TIDE — HERO */}
        <div
          className="flex justify-center viewport-reveal-card"
          data-viewport-reveal="true"
          data-card-index="0"
        >
          <Link href="/originals" className="w-[90%]">
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl">
              <Image
                src={displayPaintings[0].thumbnailUrl}
                alt={displayPaintings[0].title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 p-4">
                <h3 className="text-sm font-serif font-bold text-gray-300">
                  {displayPaintings[0].title}
                </h3>
              </div>
            </div>
          </Link>
        </div>

        {/* UNBOUND + GENTLE STRENGTH — CALM PAIR */}
        <div className="grid grid-cols-2 gap-3 px-2">
          {/* UNBOUND — bigger */}
          <Link
            href="/originals"
            className="viewport-reveal-card"
            data-viewport-reveal="true"
            data-card-index="2"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-xl">
              <Image
                src={displayPaintings[1].thumbnailUrl}
                alt={displayPaintings[1].title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 p-2.5">
                <h3 className="text-[11px] font-serif font-bold text-gray-300">
                  {displayPaintings[1].title}
                </h3>
              </div>
            </div>
          </Link>

          {/* GENTLE STRENGTH — smaller */}
          <div className="flex items-end">
            <Link
              href="/originals"
              className="w-[82%] viewport-reveal-card"
              data-viewport-reveal="true"
              data-card-index="3"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-xl">
                <Image
                  src={displayPaintings[2].thumbnailUrl}
                  alt={displayPaintings[2].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 p-2">
                  <h3 className="text-[10px] font-serif font-bold text-gray-300">
                    {displayPaintings[2].title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* WHISPERING FALLS — TALL, CENTERED */}
        <div
          className="flex justify-center pt-1 viewport-reveal-card"
          data-viewport-reveal="true"
          data-card-index="4"
        >
          <Link href="/originals" className="w-[82%]">
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary rounded-2xl">
              <Image
                src={displayPaintings[3].thumbnailUrl}
                alt={displayPaintings[3].title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 p-4">
                <h3 className="text-sm font-serif font-bold text-gray-300">
                  {displayPaintings[3].title}
                </h3>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}