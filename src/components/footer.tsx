import { Link } from "react-router-dom"
import {
  LuCrown,
  LuSparkles,
  LuPhone,
  LuMail,
  LuMapPin,
  LuInstagram,
  LuFacebook,
  LuTwitter,
  LuYoutube,
} from "react-icons/lu"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="w-full bg-[#F5EFE7] border-t border-[#E7D8CE] py-16 md:py-20">
      <div className="container px-4 md:px-6 flex flex-col gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Marca */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative">
                <LuCrown className="h-10 w-10 text-[#D4AF37]" />
                <LuSparkles className="h-5 w-5 text-[#2C1810] absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-[#2C1810] tracking-wider block">NURAE</span>
                <span className="text-xs text-[#5C4A42] font-display tracking-widest">ACCESORIOS</span>
              </div>
            </Link>
            <p className="text-[#5C4A42] leading-relaxed">
              Joyas que celebran tu esencia. Diseñadas para inspirarte a brillar con elegancia todos los días.
            </p>
            <div className="flex gap-4">
              {[LuInstagram, LuFacebook, LuTwitter, LuYoutube].map((Icon, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] text-[#2C1810] transition-all duration-300 rounded-full"
                >
                  <Icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Enlaces */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                title: "Comprar",
                links: [
                  ["Todas las Colecciones", "/collections"],
                  ["Collares", "/collections/necklaces"],
                  ["Aretes", "/collections/earrings"],
                  ["Pulseras", "/collections/bracelets"],
                  ["Anillos", "/collections/rings"],
                  ["Novedades", "/new"],
                  ["Más Vendidos", "/bestsellers"],
                  ["Ofertas", "/sale"],
                ],
              },
              {
                title: "Empresa",
                links: [
                  ["Sobre Nosotros", "/about"],
                  ["Blog", "/blog"],
                  ["Carreras", "/careers"],
                  ["Prensa", "/press"],
                  ["Sostenibilidad", "/sustainability"],
                  ["Contacto", "/contact"],
                ],
              },
              {
                title: "Ayuda",
                links: [
                  ["Preguntas Frecuentes", "/faq"],
                  ["Envíos y Entregas", "/shipping"],
                  ["Devoluciones", "/returns"],
                  ["Guía de Tallas", "/size-guide"],
                  ["Cuidado de Joyas", "/care"],
                  ["Garantía", "/warranty"],
                  ["Soporte", "/support"],
                ],
              },
              {
                title: "Contacto",
                custom: true,
              },
            ].map((section, i) => (
              <div key={i} className="space-y-4">
                <h4 className="font-serif font-bold text-lg text-[#2C1810]">{section.title}</h4>
                {section.custom ? (
                  <>
                    <ul className="space-y-3 text-[#5C4A42]">
                      <li className="flex items-center gap-2">
                        <LuPhone className="h-4 w-4 text-[#D4AF37]" />
                        +57 1 234 5678
                      </li>
                      <li className="flex items-center gap-2">
                        <LuMail className="h-4 w-4 text-[#D4AF37]" />
                        contacto@nurae.co
                      </li>
                      <li className="flex items-start gap-2">
                        <LuMapPin className="h-4 w-4 text-[#D4AF37] mt-1" />
                        <span>
                          Carrera 16 #15a-144
                          <br />
                          Sincelejo, Colombia 700001
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4 space-y-1 text-sm text-[#5C4A42]">
                      <strong className="font-medium">Horarios:</strong>
                      <p>Lun-Vie: 9:00 - 19:00</p>
                      <p>Sáb: 10:00 - 18:00</p>
                      <p>Dom: 11:00 - 17:00</p>
                    </div>
                  </>
                ) : (
                  <ul className="space-y-3">
                    {section.links?.map(([label, href], idx) => (
                      <li key={idx}>
                        <Link
                          to={href}
                          className="text-[#5C4A42] hover:text-[#2C1810] transition-colors font-display"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Parte inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-[#E7D8CE] pt-8">
          <p className="text-sm text-[#5C4A42] font-display text-center md:text-left">
            © 2025 NURAE. Hecho con 💖 para mujeres extraordinarias.
          </p>

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-sm">
            <div className="flex items-center gap-2 text-[#5C4A42] font-display">
              <span>Aceptamos:</span>
              {["VISA", "MC", "AMEX", "PP"].map((label, idx) => (
                <div
                  key={idx}
                  className="h-8 w-12 rounded bg-white text-[#2C1810] border border-[#D4AF37]/30 shadow-sm flex items-center justify-center font-bold text-xs"
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {["/privacy", "/terms", "/cookies"].map((path, idx) => (
                <Link
                  key={idx}
                  to={path}
                  className="text-[#5C4A42] hover:text-[#2C1810] transition-colors font-display"
                >
                  {path.includes("privacy") ? "Privacidad" : path.includes("terms") ? "Términos" : "Cookies"}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
