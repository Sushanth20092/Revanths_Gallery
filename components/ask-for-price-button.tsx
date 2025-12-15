"use client"

interface AskForPriceButtonProps {
  paintingTitle: string
  disabled?: boolean
  status?: string
}

export function AskForPriceButton({ paintingTitle, disabled = false, status }: AskForPriceButtonProps) {
  const handleClick = () => {
    const adminPhone = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER || "919663608903"
    const message = `Hi, I am interested in the painting '${paintingTitle}'. Please share the price and availability.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  const getButtonText = () => {
    if (status === "SOLD") return "Sold"
    if (status === "NOT_FOR_SALE") return "Not for sale"
    if (disabled) return "Not Available"
    return "Ask for Price"
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`px-4 py-2 sm:px-6 sm:py-3 text-[10px] sm:text-xs tracking-wider sm:tracking-widest font-sans font-medium uppercase transition-all rounded-full ${

        disabled
          ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
          : "bg-foreground text-background hover:opacity-80"
      }`}
    >
      {getButtonText()}
    </button>
  )
}