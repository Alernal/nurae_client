import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function AboutSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#fff]/20 text-[#7D5840] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Imagen */}
          <div className="mx-auto w-full order-2 lg:order-1">
            <div className="relative">
              <img
                src="/images/inicio.png"
                alt="Imagen de la historia de NURAE"
                className="mx-auto w-100 object-contain rounded-2xl shadow-xl bg-[#7D5840]"
              />
            </div>
          </div>

          {/* Texto */}
          <div className="space-y-6 order-1 lg:order-2">
            <img
              src="/favicon.png"
              alt="NURAE favicon"
              className="w-20 h-20 mx-auto mb-10"
            />
            <h2 className="text-4xl text-center font-handwritten md:text-5xl font-bold">
              El lujo también es para ti
            </h2>
            <p className="text-lg font-paragraph md:text-xl text-gray-700 text-center">
              En <strong>NURAE</strong> creemos que cada mujer merece sentirse extraordinaria.
              Creamos piezas que celebran tu individualidad, combinando
              elegancia atemporal con precios que te permiten brillar sin
              límites.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
              <Link to="/about" className="w-full sm:w-auto flex-1">
              <Button
                className="w-full bg-[#7D5840] text-white hover:bg-[#7D5840]/80 hover:scale-105 hover:shadow-2xl px-8 py-3 rounded-full font-medium shadow-lg transition-all duration-300 cursor-pointer"
              >
                Conoce Más
              </Button>
              </Link>
              <Link to="/collections" className="w-full sm:w-auto flex-1">
              <Button
                variant="outline"
                className="w-full border-[#7D5840] text-[#7D5840] hover:bg-white/60 hover:scale-105 hover:shadow-2xl px-8 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer"
              >
                Explorar Colección
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
