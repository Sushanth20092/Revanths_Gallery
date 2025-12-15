"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface CommissionFormData {
  name: string
  email: string
  whatsapp: string
  description: string
  size: string
  budget: string
  timeline: string
}

export default function CommissionArtPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState<CommissionFormData>({
    name: "",
    email: "",
    whatsapp: "",
    description: "",
    size: "",
    budget: "",
    timeline: "",
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Small delay to ensure smooth mount
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Send to WhatsApp
    const message = `*Commission Inquiry*\n\nName: ${formData.name}\nEmail: ${formData.email}\nWhatsApp: ${formData.whatsapp}\n\nDesired Size: ${formData.size}\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\n\nDescription:\n${formData.description}`
    const encodedMessage = encodeURIComponent(message)
    const adminPhone = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER || "919663608903"
    window.open(`https://wa.me/${adminPhone}?text=${encodedMessage}`, "_blank")

    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", whatsapp: "", description: "", size: "", budget: "", timeline: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <>
      <Navbar />
      <main 
        className={`transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hero */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-background border-b border-border">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Custom Creations
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Commission a Custom Artwork</h1>
            <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed">
              Have a vision in mind? Work with Revanth to create a custom painting or mixed media artwork tailored to
              your space and style.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 md:py-32 px-4 md:px-6 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Fully Custom",
                  description: "Your vision, your style. Complete creative control over size, colors, and concept.",
                },
                {
                  title: "Professional Quality",
                  description: "Handcrafted artwork created with premium materials and expert technique.",
                },
                {
                  title: "Collaborative Process",
                  description: "Work directly with the artist through design, creation, and finalization.",
                },
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className={`p-8 bg-background border border-border transition-all duration-500 ${
                    isLoaded 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ 
                    transitionDelay: isLoaded ? `${index * 150}ms` : '0ms'
                  }}
                >
                  <h3 className="text-lg font-serif font-bold mb-3">{benefit.title}</h3>
                  <p className="text-sm font-sans text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commission Form */}
        <section className="py-20 md:py-32 px-4 md:px-6 bg-background">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">Get Started</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground transition-colors"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              {/* Size */}
              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">
                  Desired Size
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground transition-colors"
                >
                  <option value="">Select a size</option>
                  <option value="small">Small (50x60 cm)</option>
                  <option value="medium">Medium (70x90 cm)</option>
                  <option value="large">Large (90x120 cm)</option>
                  <option value="custom">Custom Size</option>
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground transition-colors"
                >
                  <option value="">Select budget range</option>
                  <option value="15k-25k">₹15,000 - ₹25,000</option>
                  <option value="25k-50k">₹25,000 - ₹50,000</option>
                  <option value="50k-100k">₹50,000 - ₹100,000</option>
                  <option value="100k+">₹100,000+</option>
                </select>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">
                  Desired Timeline
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground transition-colors"
                >
                  <option value="">Select timeline</option>
                  <option value="4-6">4-6 weeks</option>
                  <option value="6-8">6-8 weeks</option>
                  <option value="8-12">8-12 weeks</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">
                  Project Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                  placeholder="Describe your vision, style preferences, colors, mood, and any specific requirements..."
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                {submitted ? (
                  <div className="p-4 bg-green-100 text-green-700 text-sm font-sans text-center">
                    Thank you! Your inquiry has been sent via WhatsApp. We'll get back to you soon.
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-foreground text-background text-xs font-sans font-medium tracking-widest uppercase hover:opacity-80 transition-opacity"
                  >
                    Send Commission Request
                  </button>
                )}
              </div>
            </form>

            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-border text-center">
              <p className="text-sm font-sans text-muted-foreground mb-4">Or reach out directly:</p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER || "919663608903"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-sans font-medium hover:opacity-60 transition-opacity"
                >
                  WhatsApp: +91 96636 08903
                </a>
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL || "revanthacharya9481@gmail.com"}`}
                  className="text-sm font-sans font-medium hover:opacity-60 transition-opacity"
                >
                  Email: revanthacharya9481@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}