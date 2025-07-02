import { Link } from "react-router-dom";
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
} from "react-icons/lu";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="w-full bg-white py-12 md:py-20">
      <div className="container px-4 md:px-6 flex flex-col gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Marca */}
          <div className="space-y-6 flex flex-col items-start">
            <Link to="/">
              <img src="/logo.png" alt="Lumina Logo" className="h-10" />
            </Link>
            <p className="text-[#5C4A42] leading-relaxed">
              Accesorios que honran tu esencia. Hechos para realzar tu luz cada
              día con elegancia.
            </p>
            <div className="flex gap-4">
              {[LuInstagram, LuFacebook, LuTwitter, LuYoutube].map(
                (Icon, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#D4AF37]/10  w-10 hover:text-[#D4AF37] text-[#2C1810] transition-all duration-300 rounded-full"
                  >
                    <Icon />
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Enlaces */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3">
            {[
              {
                title: "Acerca de Nosotros",
                links: [
                  ["Conoce Nurae", "/about"],
                  ["Contacto", "/contact"],
                  ["Blog", "/blog"],
                ],
              },
              {
                title: "Servicio al Cliente",
                links: [
                  ["Preguntas Frecuentes", "/faq"],
                  ["Despachos y Envíos", "/shipping"],
                  ["Devoluciones", "/returns"],
                  ["Contáctanos", "/support"],
                ],
              },
              {
                title: "Contacto",
                custom: true,
              },
            ].map((section, i) => (
              <div key={i} className="">
                <h4 className="font-bold mb-2 text-lg text-[#2C1810]">
                  {section.title}
                </h4>
                {section.custom ? (
                  <>
                    <ul className="space-y-3 text-[#5C4A42]">
                      <li className="flex items-center gap-2">
                        <LuPhone className="h-4 w-4 text-[#D4AF37]" />
                        +57 (314) 808 - 7646
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
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#E7D8CE] pt-2">
          <p className="text-sm text-[#5C4A42] font-display text-center md:text-left">
            © 2025 NURAE. Hecho con amor para mujeres extraordinarias.
          </p>

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-sm">
            <div className="flex items-center gap-4">
              {["/privacy", "/terms", "/cookies"].map((path, idx) => (
                <Link
                  key={idx}
                  to={path}
                  className="text-[#5C4A42] hover:text-[#2C1810] transition-colors font-display"
                >
                  {path.includes("privacy")
                    ? "Privacidad"
                    : path.includes("terms")
                    ? "Términos"
                    : "Cookies"}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
