import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LuSparkles, LuCrown, LuHeart, LuStar, LuGem } from "react-icons/lu"

export function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-34 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100"></div>
      <div className="absolute inset-0 bg-jewel-gradient opacity-10"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-pink-300 animate-float">
        <LuSparkles className="h-8 w-8" />
      </div>
      <div className="absolute bottom-32 right-20 text-purple-300 animate-float" style={{ animationDelay: "1s" }}>
        <LuCrown className="h-12 w-12" />
      </div>
      <div className="absolute top-1/2 left-1/4 text-amber-300 animate-float" style={{ animationDelay: "2s" }}>
        <LuHeart className="h-6 w-6" />
      </div>
      <div className="absolute top-1/3 right-1/3 text-emerald-300 animate-float" style={{ animationDelay: "0.5s" }}>
        <LuStar className="h-10 w-10" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 text-blue-300 animate-float" style={{ animationDelay: "1.5s" }}>
        <LuGem className="h-7 w-7" />
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-primary shadow-lg border border-pink-200">
              <LuSparkles className="h-5 w-5 animate-pulse" />
              <span className="font-display">Nueva Colección Primavera 2025</span>
              <LuSparkles className="h-5 w-5 animate-pulse" />
            </div>

            <div className="gap-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
                <span className="bg-luxury-gradient bg-clip-text text-transparent block">Brilla</span>
                <span className="text-gray-800 block">con tu propia</span>
                <span className="bg-jewel-gradient bg-clip-text text-transparent block">luz</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl font-light">
                Descubre accesorios únicos que celebran tu individualidad.{" "}
                <span className="font-medium text-primary">Lujo accesible</span> para mujeres que no temen brillar.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/collections">
                <Button className="bg-luxury-gradient hover:opacity-90 text-white px-10 py-6 rounded-full text-xl font-medium shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  Explorar Colección
                  <LuSparkles className="ml-3 h-6 w-6 group-hover:animate-spin" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-6 rounded-full text-xl font-medium transition-all duration-300 bg-white/80 backdrop-blur-sm"
                >
                  Nuestra Historia
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-12 pt-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary font-serif">15K+</div>
                <div className="text-sm text-gray-600 font-display">Mujeres felices</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary font-serif flex items-center gap-1">
                  4.9
                  <LuStar className="h-6 w-6 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-sm text-gray-600 font-display">Calificación promedio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent font-serif">800+</div>
                <div className="text-sm text-gray-600 font-display">Diseños únicos</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full max-w-[600px] lg:max-w-none">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-luxury-gradient rounded-3xl blur-3xl opacity-30 animate-pulse scale-110"></div>

              {/* Main Image */}
              <div className="relative">
                <img
                  src="https://img.freepik.com/fotos-premium/modelo-moda-accesorios-elegantes-pendientes-joyeria-moda-mujer-hermosa-piel-limpia-fresca_378307-1386.jpg"
                  width={600}
                  height={700}
                  alt="Modelo usando accesorios LÚMINA"
                  className="relative aspect-[6/7] overflow-hidden rounded-3xl object-cover shadow-2xl border-4 border-white/50"
                />

                {/* Floating Badges */}
                <div className="absolute -top-6 -right-6 bg-accent text-white p-6 rounded-full shadow-xl animate-bounce">
                  <LuCrown className="h-10 w-10" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-secondary text-white p-5 rounded-full shadow-xl animate-float">
                  <LuHeart className="h-8 w-8" />
                </div>
                <div
                  className="absolute top-1/4 -left-4 bg-primary text-white p-4 rounded-full shadow-xl animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <LuSparkles className="h-6 w-6" />
                </div>
                <div
                  className="absolute bottom-1/3 -right-4 bg-jewel-emerald text-white p-4 rounded-full shadow-xl animate-float"
                  style={{ animationDelay: "2s" }}
                >
                  <LuGem className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
