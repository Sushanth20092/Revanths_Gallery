"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Upload, X } from "lucide-react"
import { createClient } from "@/lib/supabase"

// Type for database response (snake_case)
interface PaintingDB {
  id: string
  slug: string
  title: string
  medium: string
  dimensions: string
  year: number | null
  description: string | null
  status: string
  price: number | null
  main_image_url: string | null
  additional_image_urls: string[] | null
  is_featured_home: boolean | null
  created_at: string
  updated_at: string
}

export default function EditPaintingPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    medium: "",
    dimensions: "",
    year: new Date().getFullYear(),
    description: "",
    status: "AVAILABLE",
    price: "",
    isFeaturedHome: false,
  })

  const [mainImage, setMainImage] = useState<File | null>(null)
  const [additionalImages, setAdditionalImages] = useState<File[]>([])
  const [existingAdditionalImages, setExistingAdditionalImages] = useState<string[]>([])
  const [mainImagePreview, setMainImagePreview] = useState<string>("")
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchPainting = async () => {
      try {
        const { id: paintingId } = await params
        setId(paintingId)

        const { data, error: fetchError } = await supabase.from("paintings").select("*").eq("id", paintingId).single()

        if (fetchError) throw fetchError

        const painting = data as PaintingDB
        
        setFormData({
          title: painting.title,
          slug: painting.slug,
          medium: painting.medium,
          dimensions: painting.dimensions || "",
          year: painting.year || new Date().getFullYear(),
          description: painting.description || "",
          status: painting.status,
          price: painting.price?.toString() || "",
          isFeaturedHome: painting.is_featured_home || false,
        })

        setMainImagePreview(painting.main_image_url || "")
        setExistingAdditionalImages(painting.additional_image_urls || [])
        setAdditionalImagePreviews(painting.additional_image_urls || [])
      } catch (err) {
        console.error("Error fetching painting:", err)
        setError("Failed to load painting")
      } finally {
        setLoading(false)
      }
    }

    fetchPainting()
  }, [params, supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setMainImage(file)
      const preview = URL.createObjectURL(file)
      setMainImagePreview(preview)
    }
  }

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAdditionalImages((prev) => [...prev, ...files])
    files.forEach((file) => {
      const preview = URL.createObjectURL(file)
      setAdditionalImagePreviews((prev) => [...prev, preview])
    })
  }

  const removeAdditionalImage = (index: number) => {
    const isExisting = index < existingAdditionalImages.length
    
    if (isExisting) {
      // Remove from existing images
      setExistingAdditionalImages((prev) => prev.filter((_, i) => i !== index))
    } else {
      // Remove from new images
      const newImageIndex = index - existingAdditionalImages.length
      setAdditionalImages((prev) => prev.filter((_, i) => i !== newImageIndex))
    }
    
    // Remove from previews
    setAdditionalImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSaving(true)

    try {
      let mainImageUrl = mainImagePreview

      // Upload new main image if changed
      if (mainImage) {
        const timestamp = Date.now()
        const mainImagePath = `paintings/${timestamp}-main-${mainImage.name}`
        const { error: uploadError } = await supabase.storage.from("paintings").upload(mainImagePath, mainImage)

        if (uploadError) {
          console.error("Main image upload error:", uploadError)
          throw uploadError
        }

        const { data: mainImageData } = supabase.storage.from("paintings").getPublicUrl(mainImagePath)
        mainImageUrl = mainImageData.publicUrl
      }

      // Upload new additional images
      const newAdditionalImageUrls: string[] = []
      for (let i = 0; i < additionalImages.length; i++) {
        const file = additionalImages[i]
        const timestamp = Date.now()
        const path = `paintings/${timestamp}-additional-${i}-${file.name}`
        const { error: addError } = await supabase.storage.from("paintings").upload(path, file)

        if (addError) {
          console.error(`Additional image ${i} upload error:`, addError)
          throw addError
        }

        const { data } = supabase.storage.from("paintings").getPublicUrl(path)
        newAdditionalImageUrls.push(data.publicUrl)
      }

      // Combine existing and new additional images
      const allAdditionalImages = [...existingAdditionalImages, ...newAdditionalImageUrls]

      // Update painting with snake_case column names
      const { error: updateError } = await supabase
        .from("paintings")
        .update({
          title: formData.title,
          slug: formData.slug,
          medium: formData.medium,
          dimensions: formData.dimensions,
          year: formData.year,
          description: formData.description,
          status: formData.status,
          price: formData.price ? Number.parseFloat(formData.price) : null,
          main_image_url: mainImageUrl,
          additional_image_urls: allAdditionalImages,
          is_featured_home: formData.isFeaturedHome,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (updateError) {
        console.error("Database update error:", updateError)
        throw updateError
      }

      router.push("/admin/paintings")
    } catch (err) {
      console.error("Error updating painting:", err)
      setError(err instanceof Error ? err.message : "Failed to update painting")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Loading painting...</p>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8">
      {/* Back Button */}
      <Link
        href="/admin/paintings"
        className="flex items-center gap-2 text-sm font-sans mb-8 hover:opacity-60 transition-opacity"
      >
        <ChevronLeft size={18} />
        Back to Paintings
      </Link>

      {/* Form */}
      <div className="max-w-2xl">
        <h1 className="text-3xl font-serif font-bold mb-2">Edit Painting</h1>
        <p className="text-muted-foreground font-sans mb-8">Update painting details and images</p>

        {error && <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6 border border-border p-6 md:p-8">
          {/* Title */}
          <div>
            <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground transition-colors"
              placeholder="Enter painting title"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground transition-colors"
              placeholder="painting-slug"
            />
          </div>

          {/* Medium */}
          <div>
            <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">Medium *</label>
            <input
              type="text"
              name="medium"
              value={formData.medium}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground transition-colors"
              placeholder="e.g., OIL ON CANVAS 80x100 CM"
            />
          </div>

          {/* Dimensions */}
          <div>
            <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">Dimensions</label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground transition-colors"
              placeholder="e.g., 80 x 100 cm"
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
              placeholder="Enter painting description"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground transition-colors"
            >
              <option value="AVAILABLE">Available</option>
              <option value="SOLD">Sold</option>
              <option value="NOT_FOR_SALE">Not for Sale</option>
              <option value="RESERVED">Reserved</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground transition-colors"
              placeholder="Optional: Enter price"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              name="isFeaturedHome"
              checked={formData.isFeaturedHome}
              onChange={handleChange}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="featured" className="text-sm font-sans cursor-pointer">
              Feature on Homepage
            </label>
          </div>

          {/* Main Image Upload */}
          <div>
            <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">Main Image</label>
            <div className="border-2 border-dashed border-border p-6 text-center hover:border-foreground transition-colors cursor-pointer">
              <input
                type="file"
                onChange={handleMainImageChange}
                accept="image/*"
                className="hidden"
                id="main-image-input"
              />
              <label htmlFor="main-image-input" className="cursor-pointer block">
                <Upload size={24} className="mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-sans text-muted-foreground">Click to update main image</p>
              </label>
            </div>
            {mainImagePreview && (
              <div className="mt-4 relative h-48 bg-secondary border border-border overflow-hidden">
                <img
                  src={mainImagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Additional Images */}
          <div>
            <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">
              Additional Images
            </label>
            <div className="border-2 border-dashed border-border p-6 text-center hover:border-foreground transition-colors cursor-pointer">
              <input
                type="file"
                onChange={handleAdditionalImagesChange}
                accept="image/*"
                multiple
                className="hidden"
                id="additional-images-input"
              />
              <label htmlFor="additional-images-input" className="cursor-pointer block">
                <Upload size={24} className="mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-sans text-muted-foreground">Click to add more images</p>
              </label>
            </div>
            {additionalImagePreviews.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-sans text-muted-foreground mb-2">
                  {existingAdditionalImages.length} existing image(s), {additionalImages.length} new image(s)
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {additionalImagePreviews.map((preview, index) => (
                    <div key={index} className="relative h-32 bg-secondary border border-border overflow-hidden">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 hover:bg-red-700 transition-colors"
                        title="Remove image"
                      >
                        <X size={16} />
                      </button>
                      {index < existingAdditionalImages.length && (
                        <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-1">
                          Existing
                        </span>
                      )}
                      {index >= existingAdditionalImages.length && (
                        <span className="absolute bottom-1 left-1 bg-green-600 text-white text-xs px-2 py-1">
                          New
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 bg-foreground text-background text-xs font-sans font-medium tracking-widest uppercase hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <Link
              href="/admin/paintings"
              className="flex-1 px-6 py-3 border border-border text-foreground text-xs font-sans font-medium tracking-widest uppercase hover:bg-secondary transition-colors text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}