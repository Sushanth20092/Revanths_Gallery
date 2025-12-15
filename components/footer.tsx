import Link from "next/link"
import { Instagram } from "lucide-react"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Originals", href: "/originals" },
  { label: "About", href: "/about" },
  { label: "Commission Arts", href: "/commission-art" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Contact", href: "/contact" },
]

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/_revanth___/",
    icon: Instagram,
  },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:text-center">
            <h3 className="text-lg font-serif font-bold tracking-tight mb-3">
              Revanths Gallery
            </h3>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              Celebrating the intersection of art and vision through original paintings and commissioned works.
            </p>
          </div>

          {/* Links Section */}
          <div className="md:text-center">
            <h4 className="text-xs font-sans font-medium tracking-widest uppercase mb-4">
              Navigation
            </h4>
            <div className="space-y-2 md:flex md:flex-col md:items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-sans text-foreground hover:opacity-60 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Section */}
          <div className="md:text-center">
            <h4 className="text-xs font-sans font-medium tracking-widest uppercase mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4 md:justify-center">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label={link.label}
                  >
                    <Icon
                      size={20}
                      className="text-foreground group-hover:opacity-60 transition-opacity"
                    />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <p className="text-xs font-sans text-muted-foreground text-center">
            © {new Date().getFullYear()} Revanths Gallery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
