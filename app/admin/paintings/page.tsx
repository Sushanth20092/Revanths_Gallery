"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
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

// Type for application use (camelCase)
interface Painting {
  id: string
  slug: string
  title: string
  medium: string
  dimensions: string
  year: number | null
  description: string | null
  status: string
  price: number | null
  mainImageUrl: string | null
  additionalImageUrls: string[] | null
  isFeaturedHome: boolean | null
  createdAt: string
  updatedAt: string
}

// Convert database response to camelCase
const convertToCamelCase = (painting: PaintingDB): Painting => ({
  id: painting.id,
  slug: painting.slug,
  title: painting.title,
  medium: painting.medium,
  dimensions: painting.dimensions,
  year: painting.year,
  description: painting.description,
  status: painting.status,
  price: painting.price,
  mainImageUrl: painting.main_image_url,
  additionalImageUrls: painting.additional_image_urls,
  isFeaturedHome: painting.is_featured_home,
  createdAt: painting.created_at,
  updatedAt: painting.updated_at,
})

export default function ManagePaintingsPage() {
  const [paintings, setPaintings] = useState<Painting[]>([])
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [viewPainting, setViewPainting] = useState<Painting | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const { data, error } = await supabase.from("paintings").select("*").order("created_at", { ascending: false })

        if (error) throw error
        
        // Convert snake_case to camelCase
        const convertedData = (data || []).map(convertToCamelCase)
        setPaintings(convertedData)
      } catch (error) {
        console.error("Failed to fetch paintings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPaintings()
  }, [supabase])

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("paintings").delete().eq("id", id)

      if (error) throw error
      setPaintings(paintings.filter((p) => p.id !== id))
      setDeleteConfirm(null)
    } catch (error) {
      console.error("Failed to delete painting:", error)
      alert("Failed to delete painting")
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800"
      case "SOLD":
        return "bg-red-100 text-red-800"
      case "NOT_FOR_SALE":
        return "bg-gray-100 text-gray-800"
      case "RESERVED":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Loading paintings...</p>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Manage Paintings</h1>
          <p className="text-muted-foreground font-sans">Add, edit, or remove paintings from your gallery</p>
        </div>
        <Link
          href="/admin/paintings/new"
          className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-sans font-medium hover:opacity-80 transition-opacity"
        >
          <Plus size={18} />
          Add Painting
        </Link>
      </div>

      {/* Table */}
      {paintings.length > 0 ? (
        <div className="overflow-x-auto border border-border">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-sans font-medium tracking-widest uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-sans font-medium tracking-widest uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-sans font-medium tracking-widest uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-sans font-medium tracking-widest uppercase">
                  Featured
                </th>
                <th className="px-6 py-3 text-left text-xs font-sans font-medium tracking-widest uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paintings.map((painting) => (
                <tr key={painting.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="px-6 py-4">
                    <div className="relative h-16 w-16">
                      <Image
                        src={painting.mainImageUrl || "/placeholder.svg"}
                        alt={painting.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-serif font-semibold">{painting.title}</p>
                    <p className="text-xs text-muted-foreground font-sans">{painting.medium}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-sans font-medium ${getStatusBadgeColor(painting.status)}`}
                    >
                      {painting.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-sans ${painting.isFeaturedHome ? "text-green-700 font-medium" : "text-muted-foreground"}`}
                    >
                      {painting.isFeaturedHome ? "✓ Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewPainting(painting)}
                        className="p-2 hover:bg-secondary transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <Link
                        href={`/admin/paintings/edit/${painting.id}`}
                        className="p-2 hover:bg-secondary transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(painting.id)}
                        className="p-2 hover:bg-red-100 text-red-700 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 border border-border">
          <p className="text-muted-foreground font-sans mb-4">No paintings yet</p>
          <Link
            href="/admin/paintings/new"
            className="inline-block px-6 py-2 bg-foreground text-background text-sm font-sans font-medium hover:opacity-80 transition-opacity"
          >
            Add First Painting
          </Link>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background border border-border p-6 max-w-sm w-full">
            <h3 className="text-lg font-serif font-bold mb-4">Delete Painting?</h3>
            <p className="text-sm font-sans text-muted-foreground mb-6">
              This action cannot be undone. The painting will be permanently deleted.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-border hover:bg-secondary transition-colors text-sm font-sans"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors text-sm font-sans"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Painting Modal */}
      {viewPainting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-background border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl font-serif font-bold">{viewPainting.title}</h3>
              <button
                onClick={() => setViewPainting(null)}
                className="p-2 hover:bg-secondary transition-colors"
                title="Close"
              >
                <Trash2 size={20} className="rotate-45" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Main Image */}
              <div className="relative w-full h-96 bg-secondary border border-border">
                <Image
                  src={viewPainting.mainImageUrl || "/placeholder.svg"}
                  alt={viewPainting.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
                <div>
                  <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-1">
                    Slug
                  </p>
                  <p className="font-sans">{viewPainting.slug}</p>
                </div>
                <div>
                  <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-1">
                    Medium
                  </p>
                  <p className="font-sans">{viewPainting.medium}</p>
                </div>
                <div>
                  <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-1">
                    Dimensions
                  </p>
                  <p className="font-sans">{viewPainting.dimensions || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-1">
                    Year
                  </p>
                  <p className="font-sans">{viewPainting.year || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-1">
                    Status
                  </p>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-sans font-medium ${getStatusBadgeColor(viewPainting.status)}`}
                  >
                    {viewPainting.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-1">
                    Price
                  </p>
                  <p className="font-sans">{viewPainting.price ? `₹${viewPainting.price.toLocaleString()}` : "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-1">
                    Featured on Home
                  </p>
                  <p className="font-sans">{viewPainting.isFeaturedHome ? "✓ Yes" : "No"}</p>
                </div>
                <div>
                  <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-1">
                    Created At
                  </p>
                  <p className="font-sans text-sm">{new Date(viewPainting.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Description */}
              {viewPainting.description && (
                <div className="border-t border-border pt-6">
                  <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-2">
                    Description
                  </p>
                  <p className="font-sans text-muted-foreground">{viewPainting.description}</p>
                </div>
              )}

              {/* Additional Images */}
              {viewPainting.additionalImageUrls && viewPainting.additionalImageUrls.length > 0 && (
                <div className="border-t border-border pt-6">
                  <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-4">
                    Additional Images ({viewPainting.additionalImageUrls.length})
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {viewPainting.additionalImageUrls.map((url, index) => (
                      <div key={index} className="relative h-48 bg-secondary border border-border">
                        <Image
                          src={url || "/placeholder.svg"}
                          alt={`${viewPainting.title} - Image ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 border-t border-border pt-6">
                <Link
                  href={`/admin/paintings/edit/${viewPainting.id}`}
                  className="flex-1 px-6 py-3 bg-foreground text-background text-xs font-sans font-medium tracking-widest uppercase hover:opacity-80 transition-opacity text-center"
                >
                  Edit Painting
                </Link>
                <button
                  onClick={() => setViewPainting(null)}
                  className="flex-1 px-6 py-3 border border-border text-foreground text-xs font-sans font-medium tracking-widest uppercase hover:bg-secondary transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}