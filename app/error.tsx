"use client"

import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-serif font-bold mb-4">Oops!</h1>
        <p className="text-lg font-sans text-muted-foreground mb-6">
          Something went wrong. Please try again or return to the home page.
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="flex-1 px-6 py-3 bg-foreground text-background text-xs font-sans font-medium tracking-widest uppercase hover:opacity-80 transition-opacity"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 px-6 py-3 border border-border text-foreground text-xs font-sans font-medium tracking-widest uppercase hover:bg-secondary transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
