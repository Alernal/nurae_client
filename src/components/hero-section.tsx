import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LuArrowRight } from "react-icons/lu";

export function HeroSection() {
  return (
    <section className="relative w-full flex items-center justify-center bg-white overflow-hidden px-4 py-10 lg:py-0">
      <div className="container relative">
        <div className="flex lg:flex-row flex-col justify-between items-center mx-auto">
          {/* Imagen de la modelo */}
          <div className="relative order-1">
            <div className="relative order-1 hidden sm:block">
              <div className="relative">
                <img
                  src="/hero-model.png"
                  alt="Mujer luciendo accesorios dorados NURAE"
                  className="w-full max-h-[100vh] object-contain mx-auto"
                />
              </div>
            </div>

          </div>

          {/* Contenido de texto */}
          <div className="space-y-8 text-center order-2">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl xl:text-7xl font-medium text-[var(--color-marron)] leading-tight">
                Que un accesorio
                <span className="block text-[var(--color-amarillo)] text-[48px] lg:text-[70px] font-handwritten font-thin -mt-2">
                  Celebre tu luz
                </span>
              </h1>

              <p className="text-base lg:text-xl text-neutral-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
                En <strong>NURAE</strong> encuentra accesorios únicos para mujeres que eligen brillar con autenticidad.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                className="bg-[var(--color-marron)] z-10 text-white hover:bg-[var(--color-marron)]/90 rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link to="/collections">
                  Explorar colección
                  <LuArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-2 border-[var(--color-marron)] z-10 rounded-full text-[var(--color-marron)] px-8 py-6 text-lg font-medium shadow-lg hover:bg-amber-50 transition-all duration-300"
              >
                <Link to="/about">Nuestra Historia</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Fade inferior */}
      <div className="absolute z-5 bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
