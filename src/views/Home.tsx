import { Link } from "react-router-dom";
import { LuSparkles, LuCrown } from "react-icons/lu";

import { TrustBadges } from "@/components/TrustBadges";
import { Button } from "@/components/ui/button";
import { FeaturedProducts } from "@/components/featured-products";
import { Newsletter } from "@/components/newsletter";
import { CategoryShowcase } from "@/components/category-showcase";
import { HeroSection } from "@/components/hero-section";
import { InstagramFeed } from "@/components/instagram-feed";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <TrustBadges />
      <CategoryShowcase />
      <FeaturedProducts />
      <InstagramFeed />

      <section className="w-full py-16 md:py-24 bg-[#D4AF37]/20 text-[#2C1810] relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Imagen */}
            <div className="mx-auto w-full max-w-[500px] order-2 lg:order-1">
              <div className="relative">
                <img
                  src="https://assets.isu.pub/document-structure/240405232936-b738ae961513affed82474a9bb1b96bc/v1/994c530e45dbe51793b3d29a8944121e.jpeg"
                  width={500}
                  height={600}
                  alt="Imagen de la historia de LÚMINA"
                  className="mx-auto object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute -top-4 -right-4 bg-[#D4AF37] text-white p-4 rounded-full shadow-lg">
                  <LuCrown className="h-8 w-8" />
                </div>
              </div>
            </div>

            {/* Texto */}
            <div className="space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/20 px-4 py-2 text-sm font-medium text-[#2C1810]">
                <LuSparkles className="h-4 w-4" />
                Nuestra Historia
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">
                El lujo también es para ti
              </h2>
              <p className="text-lg md:text-xl text-[#5C4A42] leading-relaxed">
                En LÚMINA creemos que cada mujer merece sentirse extraordinaria.
                Creamos piezas que celebran tu individualidad, combinando
                elegancia atemporal con precios que te permiten brillar sin
                límites.
              </p>
              <div className="space-y-4">
                {[
                  "Materiales de alta calidad",
                  "Diseños únicos y atemporales",
                  "Precios accesibles para todas",
                ].map((text, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-[#D4AF37] rounded-full" />
                    <span className="text-[#5C4A42]">{text}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/about">
                  <Button className="bg-[#2C1810] text-white hover:bg-[#3A221A] px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    Conoce Más
                  </Button>
                </Link>
                <Link to="/collections">
                  <Button
                    variant="outline"
                    className="border-[#2C1810] text-[#2C1810] hover:bg-[#2C1810] hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300"
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
  );
}
