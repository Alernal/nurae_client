import { Link } from "react-router-dom";
import {
  LuPhone,
  LuMail,
  LuMapPin,
} from "react-icons/lu";

export function Footer() {
  return (
    <footer className="w-full bg-black py-12 font-parrafo text-white">
      <div className="container mx-auto px-4 md:px-6 flex flex-col gap-40">

        {/* Contenido principal */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 w-full">
          {/* Enlaces y contacto */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-12 flex-1 mt-10">
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
              <div key={i} className="min-w-[200px]">
                <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">
                  {section.title}
                </h4>
                {section.custom ? (
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <LuPhone className="h-4 w-4" />
                      <span>+57 (314) 808 - 7646</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <LuMail className="h-4 w-4" />
                      <span>contacto@nurae.co</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <LuMapPin className="h-4 w-4 mt-1" />
                      <span>
                        Carrera 16 #15a-144
                        <br />
                        Sincelejo, Colombia 700001
                      </span>
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-3 text-sm">
                    {section.links?.map(([label, href], idx) => (
                      <li key={idx}>
                        <Link
                          to={href}
                          className="hover:text-[#E7D8CE] transition-colors"
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

          {/* Logo alineado a la derecha */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src="/logo.png" alt="NURAE logo" className="h-10 w-auto" />
            </Link>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-[#444] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-white text-center md:text-left">
            © 2025 NURAE. Hecho con amor para mujeres extraordinarias.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            {["/privacy", "/terms", "/cookies"].map((path, idx) => (
              <Link
                key={idx}
                to={path}
                className="hover:text-[#E7D8CE] transition-colors"
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
