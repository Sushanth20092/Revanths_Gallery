"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsOfServicePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Small delay to ensure smooth mount
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Navbar />
      <main 
        className={`transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Header */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-background border-b border-border">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Terms of Service</h1>
            <p className="text-sm font-sans text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32 px-4 md:px-6 bg-background">
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                title: "1. Agreement to Terms",
                content:
                  "By accessing and using Revanths Gallery website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
              },
              {
                title: "2. Use License",
                content:
                  "Permission is granted to temporarily download one copy of the materials (information or software) on Revanths Gallery for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:\n• Modify or copy the materials\n• Use the materials for any commercial purpose or for any public display\n• Attempt to decompile or reverse engineer any software contained on the website\n• Transfer the materials to another person or 'mirror' the materials on any other server",
              },
              {
                title: "3. Artwork Ownership",
                content:
                  "All artwork, images, and content displayed on Revanths Gallery are original works created by Revanth. Ownership and copyright of all artworks remain with the artist unless explicitly stated otherwise. Purchasers receive artwork as physical objects but not copyright or reproduction rights unless agreed upon in writing.",
              },
              {
                title: "4. Commissions",
                content:
                  "Commission orders require a deposit to initiate the project. The deposit is non-refundable once the artist begins work. The commissioned artwork remains the intellectual property of the artist, though the physical piece is transferred to the client upon full payment.",
              },
              {
                title: "5. Payment Terms",
                content:
                  "All prices are listed in Indian Rupees (₹). Payment is due upon purchase or as specified in commission agreements. The artist reserves the right to refuse service or cancel orders.",
              },
              {
                title: "6. Shipping and Delivery",
                content:
                  "Artwork will be carefully packaged and shipped to the provided address. The buyer is responsible for any shipping costs. While the artist takes precautions to protect artwork during transit, liability for damage during shipping is limited.",
              },
              {
                title: "7. Returns and Refunds",
                content:
                  "Original artwork sales are generally final. Returns or exchanges are not accepted unless the artwork arrives damaged. Commissions are non-refundable once work has begun.",
              },
              {
                title: "8. Limitation of Liability",
                content:
                  "The materials on Revanths Gallery website are provided on an 'as is' basis. Revanth makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
              },
              {
                title: "9. Intellectual Property Rights",
                content:
                  "All artwork, designs, and content on this website are protected by copyright. Unauthorized reproduction or distribution is prohibited.",
              },
              {
                title: "10. Changes to Terms",
                content:
                  "Revanth reserves the right to modify these terms at any time. Changes will be effective immediately upon posting to the website.",
              },
              {
                title: "11. Contact Information",
                content:
                  "For questions about these terms or any concerns, please contact:\n\nRevanths Gallery\nWhatsApp: +91 96636 08903\nEmail: revanthacharya9481@gmail.com",
              },
            ].map((section, index) => (
              <div 
                key={index}
                className={`transition-all duration-500 ${
                  isLoaded 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4"
                }`}
                style={{ 
                  transitionDelay: isLoaded ? `${Math.min(index * 80, 400)}ms` : '0ms'
                }}
              >
                <h2 className="text-xl font-serif font-bold mb-3">{section.title}</h2>
                <p className="text-base font-sans text-foreground leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}