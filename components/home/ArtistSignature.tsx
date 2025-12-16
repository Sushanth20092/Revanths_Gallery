import Image from "next/image"

export function ArtistSignature() {
  return (
    <section className="py-8 md:py-12 px-4 md:px-6 bg-secondary flex items-center justify-center">
      <div className="w-full max-w-md md:max-w-lg">
        <Image
          src="/sign.png"
          alt="Artist Signature"
          width={600}
          height={300}
          className="w-full h-auto object-contain animate-fade-up"
        />
      </div>
    </section>
  )
}