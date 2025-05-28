import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LuSparkles, LuCrown, LuGift, LuStar, LuHeart } from "react-icons/lu"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="w-full py-20 md:py-28 bg-[#F5EFE7] relative overflow-hidden text-[#2C1810]">
      {/* Floating Icons */}
      <div className="absolute top-12 left-10 text-[#D4AF37] opacity-40 animate-float">
        <LuSparkles className="h-10 w-10" />
      </div>
      <div className="absolute bottom-12 right-10 text-[#D4AF37] opacity-30 animate-float" style={{ animationDelay: "1s" }}>
        <LuCrown className="h-12 w-12" />
      </div>
      <div className="absolute top-1/3 right-1/4 text-[#D4AF37] opacity-30 animate-float" style={{ animationDelay: "2s" }}>
        <LuStar className="h-8 w-8" />
      </div>
      <div className="absolute bottom-1/3 left-1/4 text-[#D4AF37] opacity-30 animate-float" style={{ animationDelay: "0.5s" }}>
        <LuHeart className="h-6 w-6" />
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center text-center space-y-12">
          <div className="space-y-8 max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium shadow-md border border-[#D4AF37]/30 text-[#2C1810]">
              <LuGift className="h-5 w-5" />
              <span className="font-display text-base">Únete a nuestra comunidad VIP</span>
              <LuSparkles className="h-5 w-5 animate-pulse" />
            </div>

            <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight text-[#2C1810]">
              Sé la primera en brillar
            </h2>

            <p className="text-xl md:text-2xl text-[#5C4A42] leading-relaxed font-light">
              Accede a colecciones exclusivas, descuentos especiales y tips para brillar cada día.
            </p>
          </div>

          {!submitted ? (
            <div className="w-full max-w-lg space-y-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="email"
                  placeholder="tu-email@ejemplo.com"
                  className="h-14 rounded-xl border border-[#D4AF37]/30 bg-white px-6 text-base text-[#2C1810] placeholder:text-[#5C4A42] shadow-sm focus:border-[#D4AF37]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Button
                  type="submit"
                  className="w-full h-14 bg-[#D4AF37] hover:bg-[#c79e2f] text-white rounded-xl text-lg font-medium shadow-md transition duration-300 group"
                >
                  Unirme a LÚMINA VIP
                  <LuCrown className="ml-2 h-5 w-5 group-hover:animate-bounce" />
                </Button>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex flex-col items-center gap-2 p-4 bg-white/80 rounded-xl border border-[#D4AF37]/20 shadow-sm">
                  <div className="h-2 w-2 bg-[#D4AF37] rounded-full" />
                  <span>Ofertas exclusivas hasta 40% OFF</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-white/80 rounded-xl border border-[#D4AF37]/20 shadow-sm">
                  <div className="h-2 w-2 bg-[#2C1810] rounded-full" />
                  <span>Acceso anticipado a colecciones</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-white/80 rounded-xl border border-[#D4AF37]/20 shadow-sm">
                  <div className="h-2 w-2 bg-[#5C4A42] rounded-full" />
                  <span>Tips de estilo y contenido VIP</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-10 rounded-3xl max-w-lg w-full shadow-lg border border-[#D4AF37]/30">
              <div className="text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center">
                  <LuCrown className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2C1810]">¡Bienvenida a LÚMINA VIP!</h3>
                <p className="text-base text-[#5C4A42] leading-relaxed">
                  Gracias por unirte. Pronto recibirás correos con contenido exclusivo solo para ti.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-[#D4AF37] font-medium bg-[#FDF5D7] rounded-full px-4 py-2">
                  <LuSparkles className="h-4 w-4" />
                  <span>Revisa tu email para confirmar tu suscripción</span>
                  <LuSparkles className="h-4 w-4" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
