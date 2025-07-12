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
    <footer className="w-full bg-white py-8 md:py-20 lg:py-30 border-t font-paragraph border-[#E7D8CE]">
      <div className="container px-4 md:px-6 flex flex-col justify-between gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Marca */}
          <div className="space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link to="/">
              <img src="/logo.png" alt="Lumina Logo" className="h-10 mx-auto sm:mx-0" />
            </Link>
            <p className="text-[#5C4A42] leading-relaxed">
              Accesorios que honran tu esencia. Hechos para realzar tu luz cada
              día con elegancia.
            </p>
            <div className="flex gap-3 justify-center sm:justify-start">
              {[LuInstagram, LuFacebook, LuTwitter, LuYoutube].map(
                (Icon, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#D4AF37]/10 w-10 hover:text-[#D4AF37] text-[#2C1810] transition-all duration-300 rounded-full"
                  >
                    <Icon />
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Enlaces */}
          <div className="sm:col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  ["Soporte", "/support"],
                ],
              },
              {
                title: "Contacto",
                custom: true,
              },
            ].map((section, i) => (
              <div key={i} className="mb-4 md:mb-0">
                <h4 className="font-bold mb-2 text-lg text-[#2C1810]">
                  {section.title}
                </h4>
                {section.custom ? (
                  <ul className="space-y-3 text-[#5C4A42]">
                    <li className="flex items-center gap-2">
                      <LuPhone className="h-4 w-4 text-[#D4AF37]" />
                      <span className="break-all">+57 (314) 808 - 7646</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <LuMail className="h-4 w-4 text-[#D4AF37]" />
                      <span className="break-all">contacto@nurae.co</span>
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
                ) : (
                  <ul className="space-y-3">
                    {section.links?.map(([label, href], idx) => (
                      <li key={idx}>
                        <Link
                          to={href}
                          className="text-[#5C4A42] hover:text-[#2C1810] transition-colors"
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
        <div className="flex flex-col md:flex-row mt-20 justify-between items-center border-t border-[#E7D8CE] pt-4 gap-4">
          <p className="text-sm text-[#5C4A42] text-center md:text-left">
            © 2025 NURAE. Hecho con amor para mujeres extraordinarias.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
            {["/privacy", "/terms", "/cookies"].map((path, idx) => (
              <Link
                key={idx}
                to={path}
                className="text-[#5C4A42] hover:text-[#2C1810] transition-colors"
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
    </footer>
  );
}
