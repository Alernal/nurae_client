import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LuSparkles, LuArrowRight } from "react-icons/lu"

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[80vh] py-8 flex items-center overflow-hidden bg-nurae-cream">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://img.pikbest.com/wp/202344/old-vintage-paper-texture-book-pages-captivating-backgrounds_9924752.jpg!w700wp')] bg-cover bg-center opacity-10"></div>

      {/* Content Container */}
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-nurae-brown border border-nurae-sand shadow-sm">
              <LuSparkles className="h-4 w-4 text-nurae-gold" />
              <span>Nueva Colección Primavera 2025</span>
              <LuSparkles className="h-4 w-4 text-nurae-gold" />
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-nurae-brown">
                Brilla <span className="text-nurae-brown">con tu propia</span>{" "}
                <span className="text-nurae-brown">luz</span>
              </h1>

              <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed max-w-xl">
                Descubre accesorios únicos que celebran tu individualidad. Lujo accesible para mujeres que no necesitan
                permiso para brillar.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-nurae-brown text-white hover:bg-nurae-brown/90 rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/collections">
                  Explorar Colección
                  <LuArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-2 border-nurae-brown text-nurae-brown hover:bg-nurae-brown/10 rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/about">Nuestra Historia</Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                    style={{
                      backgroundImage: `url('/placeholder.svg?height=100&width=100&query=woman%20portrait%20${i}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ))}
              </div>
              <div className="text-sm">
                <p className="font-medium text-nurae-brown">+2,500 clientes felices</p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-nurae-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-nurae-brown-light">4.9/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[60vh] lg:h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.joyeriadiana.com.co/wp-content/uploads/2022/05/alexandra-pereira_231b9c42_1080x1350.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

            {/* Product Tag */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-nurae-brown">Collar Constelación Dorada</h3>
                  <p className="text-sm text-nurae-brown-light">Colección Astral</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-nurae-brown-light line-through">$220.000</p>
                  <p className="font-bold text-lg text-nurae-brown">$175.000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
