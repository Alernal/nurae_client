import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LuSparkles, LuArrowRight } from "react-icons/lu";
import { useReviews } from "@/hooks/products/useReviews";

export function HeroSection() {
  const { data: reviews = [], isLoading } = useReviews();

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden p-0">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/portada.png"
          alt="Portada"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl w-full space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-[var(--color-marron)] shadow-sm mx-auto">
            <span>Nueva Colección 2025</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl text-[var(--color-marron)]">
              Deja que un accesorio celebre tu luz.
            </h1>

            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed max-w-xl mx-auto">
              NURAE celebra tu esencia. Accesorios únicos para mujeres que
              eligen brillar con autenticidad.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-[var(--color-marron)] text-white hover:bg-[#231B13]/90 rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/collections">
                Explorar Colección
                <LuArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-2 border-gray-800 rounded-full text-gray-800 px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/about">Nuestra Historia</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
