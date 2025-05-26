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
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section className="w-full py-20 md:py-28 bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-luxury-gradient opacity-10"></div>

      {/* Floating Elements */}
      <div className="absolute top-16 left-16 text-pink-300 animate-float">
        <LuSparkles className="h-12 w-12" />
      </div>
      <div className="absolute bottom-16 right-16 text-purple-300 animate-float" style={{ animationDelay: "1s" }}>
        <LuCrown className="h-16 w-16" />
      </div>
      <div className="absolute top-1/3 right-1/4 text-amber-300 animate-float" style={{ animationDelay: "2s" }}>
        <LuStar className="h-10 w-10" />
      </div>
      <div className="absolute bottom-1/3 left-1/4 text-rose-300 animate-float" style={{ animationDelay: "0.5s" }}>
        <LuHeart className="h-8 w-8" />
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-10 text-center">
          <div className="space-y-8 max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-sm px-8 py-4 text-sm font-medium text-primary shadow-xl border border-pink-200">
              <LuGift className="h-6 w-6" />
              <span className="font-display text-lg">Únete a nuestra comunidad VIP</span>
              <LuSparkles className="h-6 w-6 animate-pulse" />
            </div>

            <h2 className="text-5xl md:text-7xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent leading-tight">
              Sé la primera en brillar
            </h2>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
              Recibe acceso exclusivo a nuevas colecciones, ofertas especiales y contenido inspirador diseñado para
              mujeres extraordinarias como tú.
            </p>
          </div>

          {!submitted ? (
            <div className="w-full max-w-lg space-y-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="tu-email@ejemplo.com"
                    className="h-16 rounded-2xl border-2 border-pink-200 bg-white/90 backdrop-blur-sm px-8 text-lg placeholder:text-gray-400 focus:border-primary focus:ring-primary shadow-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-16 bg-luxury-gradient hover:opacity-90 text-white rounded-2xl text-xl font-medium shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  Unirme a LÚMINA VIP
                  <LuCrown className="ml-3 h-6 w-6 group-hover:animate-bounce" />
                </Button>
              </form>

              <div className="space-y-6">
                <p className="text-sm text-gray-600">
                  Al suscribirte, aceptas nuestra política de privacidad y términos de servicio.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="flex flex-col items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-pink-200">
                    <div className="h-3 w-3 bg-primary rounded-full"></div>
                    <span className="font-medium text-gray-700">Ofertas exclusivas hasta 40% OFF</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-pink-200">
                    <div className="h-3 w-3 bg-secondary rounded-full"></div>
                    <span className="font-medium text-gray-700">Acceso anticipado a colecciones</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-pink-200">
                    <div className="h-3 w-3 bg-accent rounded-full"></div>
                    <span className="font-medium text-gray-700">Contenido VIP y styling tips</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/95 backdrop-blur-sm p-10 rounded-3xl max-w-lg w-full shadow-2xl border border-pink-200">
              <div className="text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-luxury-gradient rounded-full flex items-center justify-center">
                  <LuCrown className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-gray-800">¡Bienvenida a LÚMINA VIP!</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Gracias por unirte a nuestra comunidad. Pronto recibirás contenido exclusivo y ofertas especiales
                  diseñadas especialmente para ti.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium bg-pink-50 rounded-full px-4 py-2">
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
