import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LuArrowRight } from "react-icons/lu";

export function HeroSection() {
  return (
    <section className="relative w-full flex items-center justify-center bg-white overflow-hidden px-2 md:px-6">
      <div className="container relative">
        <div className="flex flex-col md:flex-row justify-between items-center mx-auto">
          {/* Imagen de la modelo */}
          <div className="w-full md:w-1/2 flex justify-start mb-6 md:mb-0">
            <div className="relative hidden sm:block">
              <img
                src="/hero-model.png"
                alt="Mujer luciendo accesorios dorados NURAE"
                className="
                  object-contain mx-auto
                  max-h-[60vh] md:max-h-[80vh] xl:max-h-[90vh]
                  max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl
                  transition-all duration-300
                "
              />
            </div>
          </div>

          {/* Contenido de texto */}
          <div className="space-y-8 lg:pr-20 md:text-left w-full md:w-1/2">
            <div className="space-y-6">
              <h1 className="text-3xl text-center md:text-5xl xl:text-6xl font-normal text-[var(--color-marron)] leading-tight">
                Que un accesorio
                <span className="block text-center text-[var(--color-amarillo)] text-[2.5rem] md:text-[3rem] xl:text-[70px] font-handwritten font-thin -mt-2">
                  Celebre tu luz
                </span>
              </h1>
              <p className="text-base font-paragraph text-center md:text-lg lg:text-xl text-neutral-700 max-w-xl mx-auto md:mx-0">
                En <strong>NURAE</strong> encuentra accesorios únicos para mujeres que eligen brillar con autenticidad.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                className="w-full sm:w-auto border-2 bg-[var(--color-marron)] z-10 text-white hover:bg-[var(--color-marron)]/90 rounded-full px-6 py-4 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link to="/collections" className="flex items-center justify-center w-full">
                  Explorar colección
                  <LuArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto border-2 border-[var(--color-marron)] z-10 rounded-full text-[var(--color-marron)] px-6 py-4 text-base font-medium shadow-lg hover:bg-amber-50 transition-all duration-300"
              >
                <Link to="/about" className="flex items-center justify-center w-full">
                  Nuestra Historia
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Fade inferior */}
      <div className="absolute z-5 bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
