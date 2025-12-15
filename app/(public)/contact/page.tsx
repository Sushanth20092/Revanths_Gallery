"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, Phone, Instagram } from "lucide-react"

interface ContactFormData {
  name: string
  email: string
  message: string
}

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Small delay to ensure smooth mount
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Send via WhatsApp
    const message = `*Contact Form Inquiry*\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    const encodedMessage = encodeURIComponent(message)
    const adminPhone = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER || "919663608903"
    window.open(`https://wa.me/${adminPhone}?text=${encodedMessage}`, "_blank")

    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "revanthacharya9481@gmail.com"
  const adminPhone = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER || "919663608903"

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
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-sans font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
            <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed">
              Have a question or want to collaborate? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="py-20 md:py-32 px-4 md:px-6 bg-secondary">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Phone,
                title: "WhatsApp",
                description: "Quick response for inquiries and commissions",
                link: `https://wa.me/${adminPhone}`,
                linkText: "+91 96636 08903",
                external: true,
              },
              {
                icon: Mail,
                title: "Email",
                description: "For detailed inquiries and collaborations",
                link: `mailto:${adminEmail}`,
                linkText: adminEmail,
                external: false,
              },
              {
                icon: Instagram,
                title: "Follow Us",
                description: "Stay updated with new artworks",
                link: "https://instagram.com",
                linkText: "@_revanth___",
                external: true,
              },
            ].map((contact, index) => (
              <div
                key={index}
                className={`p-8 bg-background border border-border text-center transition-all duration-500 ${
                  isLoaded 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4"
                }`}
                style={{ 
                  transitionDelay: isLoaded ? `${index * 150}ms` : '0ms'
                }}
              >
                <contact.icon size={32} className="mx-auto mb-4 text-foreground" />
                <h3 className="text-lg font-serif font-bold mb-2">{contact.title}</h3>
                <p className="text-sm font-sans text-muted-foreground mb-4">{contact.description}</p>
                <a
                  href={contact.link}
                  {...(contact.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-sm font-sans font-medium text-foreground hover:opacity-60 transition-opacity"
                >
                  {contact.linkText}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 md:py-32 px-4 md:px-6 bg-background">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">Name *</label>
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

              {/* Message */}
              <div>
                <label className="block text-xs font-sans font-medium tracking-widest uppercase mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              {/* Submit */}
              {submitted ? (
                <div className="p-4 bg-green-100 text-green-700 text-sm font-sans text-center">
                  Thank you! Your message has been sent via WhatsApp. We'll get back to you soon.
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-foreground text-background text-xs font-sans font-medium tracking-widest uppercase hover:opacity-80 transition-opacity"
                >
                  Send Message
                </button>
              )}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}