import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/fondo_hero.webp"
          alt="Fondo suave"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido principal */}
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Imagen tipo polaroid con padding y margen a la derecha */}
          <div className="w-full md:w-[46%] flex justify-center md:justify-start md:ml-4">
            <div className="bg-white shadow-xl border border-gray-300 rotate-[8deg] w-[280px] md:w-[460px] h-full">
              <div className="aspect-[4/5] overflow-hidden p-6">
                <img
                  src="/images/hero.png"
                  alt="Modelo con accesorios"
                  className="w-full h-full object-cover border-gray-200 border-t border-t-gray-400 border-r border-r-gray-400 border-l border-b"
                />
              </div>
              <div className="py-6 px-3 text-center">
                <p className="text-xs italic text-gray-600 font-handwritten">Julio 2025 · Nueva colección</p>
              </div>
            </div>
          </div>

          {/* Texto principal */}
          <div className="w-full md:w-[54%] text-center md:text-left space-y-6">
            <h1 className="text-4xl m-0 md:text-6xl font-bold text-gray-900 leading-tight">
              Elegancia que inspira
            </h1>
            <p className="text-2xl md:text-4xl m-0 italic text-[var(--color-amarillo)] font-medium font-subtitulo">
              “Accesorios con diseño elegante y accesible.”
            </p>
            <p className="text-lg mt-4 font-parrafo md:text-xl text-gray-700 mx-auto md:mx-0 font-thin">
              Diseños únicos creados para realzar tu belleza cada día. Luce sofisticada, atrévete a destacar.
            </p>

            <div>
              <Link
                to="/collections"
                className="inline-flex items-center justify-center border px-6 py-3 rounded-full text-sm font-medium font-parrafo text-black hover:bg-black hover:text-white transition-all"
              >
                Explorar colección
                <LuArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
