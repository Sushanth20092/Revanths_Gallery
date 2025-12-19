"use client"

import { useEffect, useState, useRef } from "react"

function InstagramReels() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState<boolean[]>(() => [false, false])

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

  const play = (i: number) => mounted && !isMobile && videoRefs.current[i]?.play()
  const pause = (i: number) => mounted && !isMobile && videoRefs.current[i]?.pause()

  if (!mounted) {
    return (
      <div className="flex justify-center mb-12 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-lg md:max-w-2xl w-full">
          {videos.map((v) => (
            <div key={v.id} className="bg-muted rounded-3xl aspect-9/16" />
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
            onMouseEnter={() => play(index)}
            onMouseLeave={() => pause(index)}
          >
            {!videoLoaded[index] && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
            <video
              ref={(el) => {
                videoRefs.current[index] = el
              }}
              onLoadedData={() => {
                setVideoLoaded((prev) => {
                  const next = [...prev]
                  next[index] = true
                  return next
                })
              }}
              src={video.src}
              loop
              muted
              playsInline
              className="w-full h-auto"
              style={{
                opacity: videoLoaded[index] ? 1 : 0,
                transition: "opacity 800ms ease-in-out",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function InstagramSection() {
  return (
    <section
      className="py-20 md:py-32 px-4 md:px-6 bg-secondary viewport-reveal-card"
      data-viewport-reveal="true"
      data-card-index="0"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Connect With Us
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Follow Our Journey
          </h2>
          <p className="text-base font-sans text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stay updated with our latest works, studio moments, and artistic discoveries.
            Follow us on Instagram for daily inspiration.
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
  )
}