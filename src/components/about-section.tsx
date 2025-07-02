import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function AboutSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#fff]/20 text-[#7D5840] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Imagen */}
          <div className="mx-auto w-full max-w-[500px] order-2 lg:order-1">
            <div className="relative">
              <img
                src="/images/inicio.png"
                width={500}
                height={600}
                alt="Imagen de la historia de NURAE"
                className="mx-auto object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Texto */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#5E4536]/10 px-4 py-2 text-sm font-medium text-[#7D5840]">
              Nuestra Historia
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              El lujo también es para ti
            </h2>
            <p className="text-lg md:text-xl text-[#5C4A42] leading-relaxed">
              En <strong>NURAE</strong> creemos que cada mujer merece sentirse extraordinaria.
              Creamos piezas que celebran tu individualidad, combinando
              elegancia atemporal con precios que te permiten brillar sin
              límites.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/about">
                <Button className="bg-[#7D5840] text-white hover:bg-[#3A221A] px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                  Conoce Más
                </Button>
              </Link>
              <Link to="/collections">
                <Button
                  variant="outline"
                  className="border-[#7D5840] text-[#7D5840] hover:bg-[#7D5840] hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300"
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
