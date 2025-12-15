export interface Painting {
  id: string
  slug: string
  title: string
  medium: string
  dimensions: string
  year?: number
  description: string
  status: "AVAILABLE" | "SOLD" | "NOT_FOR_SALE" | "RESERVED"
  price?: number
  main_image_url: string  // Changed from mainImageUrl
  additional_image_urls: string[]  // Changed from additionalImageUrls
  is_featured_home: boolean  // Changed from isFeaturedHome
  created_at: string  // Changed from createdAt
  updated_at: string  // Changed from updatedAt
}

export interface StaticPainting {
  slug: string
  title: string
  subtitle: string
  status: "AVAILABLE" | "SOLD" | "NOT_FOR_SALE" | "RESERVED"
  thumbnailUrl: string
}
