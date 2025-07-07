import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuSearch,
  LuHeart,
  LuSparkles,
  LuGift,
  LuPhone,
  LuMail,
  LuCrown,
  LuMenu,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { MiniCart } from "@/components/mini-cart";
import { SearchModal } from "@/components/search-modal";
import { UserMenu } from "@/components/user-menu";
import { useWishlist } from "@/hooks/useWishlist";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Header() {
  const { items } = useWishlist();
  const itemCount = items.length;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-md">
      {/* Top Bar */}
      <div className="bg-[#5E4536] text-white py-2 px-4 text-xs lg:text-sm xl:text-base hidden xl:block">
        <div className="container flex items-center justify-between">

          {/* Contacto */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <LuPhone className="h-4 w-4" />
              <span>+57 (314) 808 - 7646</span>
            </div>
            <div className="flex items-center gap-2">
              <LuMail className="h-4 w-4" />
              <span>contacto@nurae.co</span>
            </div>
          </div>

          {/* Promoción */}
          <div className="flex items-center gap-2">
            <LuGift className="h-4 w-4" />
            <span>Envío gratis en compras mayores a $150.000 COP • Hasta 4 cuotas</span>
            <LuSparkles className="h-4 w-4 animate-pulse" />
          </div>

          {/* Redes sociales */}
          <div className="flex items-center gap-2 text-sm">
            <span>Síguenos:</span>
            <Link to="#" className="hover:text-pink-200 transition-colors">
              <FaInstagram />
            </Link>
            <Link to="#" className="hover:text-pink-200 transition-colors">
              <FaFacebook />
            </Link>
            <Link to="#" className="hover:text-pink-200 transition-colors">
              <FaTiktok />
            </Link>
          </div>

        </div>
      </div>

      {/* Main Header */}
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <LuMenu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-full sm:max-w-sm bg-white w-2/3"
          >
            <div className="flex flex-col space-y-3 pt-2">
              <Link
                to="/"
                className="flex items-center gap-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="font-serif text-2xl font-bold bg-clip-text text-transparent">
                  LÚMINA
                </span>
              </Link>
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-lg  text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  to="/blog"
                  className="text-lg  text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  to="/about"
                  className="text-lg  text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sobre Nosotros
                </Link>
                <Link
                  to="/contact"
                  className="text-lg  text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contacto
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-gray-900 text-sm">
          <Link
            to="/"
            className="hover:text-gray-600 transition-all duration-300 relative group"
          >
            Inicio
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EFEAAE] transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/about"
            className=" hover:text-gray-700 transition-all duration-300 relative group"
          >
            Nosotros
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EFEAAE] transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/blog"
            className=" hover:text-gray-700 transition-all duration-300 relative group"
          >
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EFEAAE] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Logo */}
        <Link to="/" className="flex items-center justify-center group">
          <div className="text-center">
            <img
              src="/logo.png"
              alt="Lumina Logo"
              className="mx-auto h-6 w-full"
            />
          </div>
        </Link>

        {/* Right Navigation */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-pink-50 hover:text-primary transition-all duration-300 relative group"
            onClick={() => setIsSearchOpen(true)}
          >
            <LuSearch className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>

          {/* User Menu */}
          <UserMenu />

          {/* Wishlist */}
          <Link to="/wishlist">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-warm-sand/20 hover:text-secondary transition-all duration-300 relative group"
            >
              <LuHeart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Lista de deseos</span>
            </Button>
          </Link>

          {/* Cart */}
          <MiniCart />

          {/* Desktop Additional Navigation */}
          {/* <div className="hidden lg:flex items-center space-x-6 ml-4 pl-4 border-l border-pink-200">
            <Link
              to="/blog"
              className=" text-gray-700 hover:text-primary transition-all duration-300 relative group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gradient transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/about"
              className=" text-gray-700 hover:text-primary transition-all duration-300 relative group"
            >
              Sobre Nosotros
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gradient transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/contact"
              className=" text-gray-700 hover:text-primary transition-all duration-300 relative group"
            >
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gradient transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div> */}
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}
