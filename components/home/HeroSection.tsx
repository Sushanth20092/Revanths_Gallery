import Link from "next/link"

export function HeroSection() {
  return (
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
  )
}