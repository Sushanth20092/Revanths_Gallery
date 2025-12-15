"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import type { Painting } from "@/lib/types"

const paintingsCache: { data: Painting[] | null; timestamp: number } = {
  data: null,
  timestamp: 0,
}

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function usePaintingsCache() {
  const [paintings, setPaintings] = useState<Painting[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchPaintings = async () => {
      const now = Date.now()

      if (paintingsCache.data && now - paintingsCache.timestamp < CACHE_DURATION) {
        setPaintings(paintingsCache.data)
        setLoading(false)
        return
      }

      try {
        const { data } = await supabase.from("paintings").select("*").order("created_at", { ascending: false })

        paintingsCache.data = data || []
        paintingsCache.timestamp = now
        setPaintings(paintingsCache.data)
      } catch (error) {
        console.error("Failed to fetch paintings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPaintings()
  }, [supabase])

  return { paintings, loading }
}
