import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function AboutSection() {
  return (
    <section className="w-full pt-16 bg-[#f3f3f3] relative overflow-hidden">

      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/fondo_about.webp" // <- reemplaza con tu imagen real
          alt="Fondo elegante"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Imagen de mujer */}
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full h-full">
              {/* Fondo decorativo circular (si lo deseas mantener) */}
              <div className="absolute inset-0 z-0">
                <div className="w-72 h-72 bg-gray-300 rounded-full mx-auto blur-xl opacity-30" />
              </div>
              {/* Imagen principal */}
              <img
                src="/images/model_about.png"
                alt="Mujer elegante"
                className="relative z-10 mx-auto max-w-md object-cover"
              />
            </div>
          </div>

          {/* Texto */}
          <div className="space-y-6 order-1 lg:order-2 text-[#2E2E2E]">
            <h2 className="text-4xl md:text-5xl font-semibold">
              <span className="block">La</span>
              <span className="block font-bold">elegancia</span>
              <span className="block italic text-xl mt-2">No tiene límites</span>
            </h2>
            <p className="text-lg md:text-xl mx-auto text-gray-700">
              Cada mujer merece sentirse única. En <strong>NURAE</strong> diseñamos piezas con alma, atemporales, delicadas y accesibles, para que cada día refleje tu estilo con la distinción que te representa.
            </p>
            <div className="flex justify-start">
              <Link to="/about">
                <Button className="bg-transparent border border-[#7D5840] text-[#7D5840] hover:bg-[#7D5840] hover:text-white px-8 py-3 rounded-full transition-all duration-300">
                  Conoce más
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
