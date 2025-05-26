import {Link} from "react-router-dom"
import { LuCrown, LuSparkles, LuPhone, LuMail, LuMapPin, LuInstagram, LuFacebook, LuTwitter, LuYoutube } from "react-icons/lu"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="w-full border-t border-pink-100 bg-gradient-to-br from-pink-50 to-purple-50 py-16 md:py-20">
      <div className="container auto flex flex-col gap-16 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative">
                <LuCrown className="h-10 w-10 text-accent" />
                <LuSparkles className="h-5 w-5 text-secondary absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <span className="font-serif text-3xl font-bold bg-luxury-gradient bg-clip-text text-transparent tracking-wider block">
                  LÚMINA
                </span>
                <span className="text-xs text-gray-500 font-display tracking-widest">LUXURY ACCESSIBLE</span>
              </div>
            </Link>
            <p className="text-gray-600 leading-relaxed">
              Accesorios de lujo accesible para mujeres que brillan con luz propia. Cada pieza está diseñada para
              celebrar tu individualidad y elevar tu estilo cotidiano.
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-pink-100 hover:text-primary transition-all duration-300 rounded-full"
              >
                <LuInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-pink-100 hover:text-primary transition-all duration-300 rounded-full"
              >
                <LuFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-pink-100 hover:text-primary transition-all duration-300 rounded-full"
              >
                <LuTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-pink-100 hover:text-primary transition-all duration-300 rounded-full"
              >
                <LuYoutube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-lg text-primary">Comprar</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/collections" className="text-gray-600 hover:text-primary transition-colors font-display">
                    Todas las Colecciones
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collections/necklaces"
                    className="text-gray-600 hover:text-primary transition-colors font-display"
                  >
                    Collares
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collections/earrings"
                    className="text-gray-600 hover:text-primary transition-colors font-display"
                  >
                    Aretes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collections/bracelets"
                    className="text-gray-600 hover:text-primary transition-colors font-display"
                  >
                    Pulseras
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collections/rings"
                    className="text-gray-600 hover:text-primary transition-colors font-display"
                  >
                    Anillos
                  </Link>
                </li>
                <li>
                  <Link to="/new" className="text-gray-600 hover:text-primary transition-colors font-display">
                    Novedades
                  </Link>
                </li>
                <li>
                  <Link to="/bestsellers" className="text-gray-600 hover:text-primary transition-colors font-display">
                    Más Vendidos
                  </Link>
                </li>
                <li>
                  <Link to="/sale" className="text-gray-600 hover:text-primary transition-colors font-display">
                    Ofertas
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif font-bold text-lg text-primary">Empresa</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-primary transition-colors font-display">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-600 hover:text-primary transition-colors font-display">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-600 hover:text-primary transition-colors font-display">
                    Carreras
                  </Link>
                </li>
                <li>
                  <Link to="/press" className="text-gray-600 hover:text-primary transition-colors font-display">
                    Prensa
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sustainability"
                    className="text-gray-600 hover:text-primary transition-colors font-display"
                  >
                    Sostenibilidad
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors font-display">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif font-bold text-lg text-primary">Ayuda</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/faq" className="text-gray-600 hover:text-primary transition-colors font-display">
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-gray-600 hover:text-primary transition-colors font-display">
                    Envíos y Entregas
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="text-gray-600 hover:text-primary transition-colors font-display">
                    Devoluciones
                  </Link>
                </li>
                <li>
                  <Link to="/size-guide" className="text-gray-600 hover:text-primary transition-colors font-display">
                    Guía de Tallas
                  </Link>
                </li>
                <li>
                  <Link to="/care" className="text-gray-600 hover:text-primary transition-colors font-display">
                    Cuidado de Joyas
                  </Link>
                </li>
                <li>
                  <Link to="/warranty" className="text-gray-600 hover:text-primary transition-colors font-display">
                    Garantía
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-gray-600 hover:text-primary transition-colors font-display">
                    Soporte
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif font-bold text-lg text-primary">Contacto</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-600">
                  <LuPhone className="h-4 w-4 text-primary" />
                  <span className="font-display">+57 1 234 5678</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <LuMail className="h-4 w-4 text-primary" />
                  <span className="font-display">hola@lumina.co</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <LuMapPin className="h-4 w-4 text-primary mt-1" />
                  <span className="font-display">
                    Carrera 11 #93-07
                    <br />
                    Zona Rosa, Bogotá
                    <br />
                    Colombia 110221
                  </span>
                </li>
              </ul>
              <div className="space-y-2">
                <h5 className="font-display font-semibold text-gray-800">Horarios de Atención</h5>
                <p className="text-sm text-gray-600 font-display">
                  Lun - Vie: 9:00 AM - 7:00 PM
                  <br />
                  Sáb: 10:00 AM - 6:00 PM
                  <br />
                  Dom: 11:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-pink-200 pt-8">
          <p className="text-sm text-gray-500 font-display">
            © 2025 LÚMINA. Todos los derechos reservados. Hecho con 💖 para mujeres extraordinarias.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 font-display">
              <span>Aceptamos:</span>
              <div className="flex gap-2">
                <div className="h-8 w-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded text-white text-xs flex items-center justify-center font-bold">
                  VISA
                </div>
                <div className="h-8 w-12 bg-gradient-to-r from-red-600 to-orange-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  MC
                </div>
                <div className="h-8 w-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded text-white text-xs flex items-center justify-center font-bold">
                  AMEX
                </div>
                <div className="h-8 w-12 bg-gradient-to-r from-green-600 to-green-800 rounded text-white text-xs flex items-center justify-center font-bold">
                  PP
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-primary transition-colors font-display">
                Privacidad
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-primary transition-colors font-display">
                Términos
              </Link>
              <Link to="/cookies" className="text-gray-500 hover:text-primary transition-colors font-display">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
