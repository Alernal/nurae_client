import { Link } from "react-router-dom";
import { LuSparkles, LuCrown } from "react-icons/lu";
import { TrustBadges } from "@/components/TrustBadges"

import { Button } from "@/components/ui/button"
import { FeaturedProducts } from "@/components/featured-products"
import { Newsletter } from "@/components/newsletter"
import { CategoryShowcase } from "@/components/category-showcase"
import { HeroSection } from "@/components/hero-section"
import { InstagramFeed } from "@/components/instagram-feed";

export default function Home() {
  return (
      <main className="flex-1">
        <HeroSection />
        <TrustBadges />
        <CategoryShowcase />

        <FeaturedProducts />

        <InstagramFeed />

        <section className="w-full py-16 md:py-24 bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="mx-auto w-full max-w-[500px] lg:max-w-none order-2 lg:order-1">
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=600&width=500"
                    width={500}
                    height={600}
                    alt="Imagen de la historia de LÚMINA"
                    className="mx-auto aspect-[4/5] overflow-hidden rounded-2xl object-cover shadow-2xl"
                  />
                  <div className="absolute -top-4 -right-4 bg-accent text-white p-4 rounded-full shadow-lg">
                    <LuCrown className="h-8 w-8" />
                  </div>
                </div>
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium">
                  <LuSparkles className="h-4 w-4" />
                  Nuestra Historia
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold">El lujo también es para ti</h2>
                <p className="text-lg md:text-xl text-pink-100 leading-relaxed">
                  En LÚMINA creemos que cada mujer merece sentirse extraordinaria. Creamos piezas que celebran tu
                  individualidad, combinando elegancia atemporal con precios que te permiten brillar sin límites.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-accent rounded-full"></div>
                    <span className="text-pink-100">Materiales de alta calidad</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-accent rounded-full"></div>
                    <span className="text-pink-100">Diseños únicos y atemporales</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-accent rounded-full"></div>
                    <span className="text-pink-100">Precios accesibles para todas</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/about">
                    <Button className="bg-white text-purple-900 hover:bg-pink-50 px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                      Conoce Más
                    </Button>
                  </Link>
                  <Link to="/collections">
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 rounded-full font-medium transition-all duration-300"
                    >
                      Explorar Colección
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
  )
}
