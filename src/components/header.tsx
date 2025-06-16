import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuSearch,
  LuHeart,
  LuMenu,
  LuCrown,
  LuSparkles,
  LuGift,
  LuPhone,
  LuMail,
  LuChevronDown,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MiniCart } from "@/components/mini-cart";
import { SearchModal } from "@/components/search-modal";
import { UserMenu } from "@/components/user-menu";
import { useWishlist } from "@/hooks/useWishlist";

const collections = [
  {
    name: "Collares",
    href: "/collections?category=collares",
    description: "Elegancia que abraza tu cuello",
  },
  {
    name: "Aretes",
    href: "/collections?category=aretes",
    description: "Detalles que enmarcan tu belleza",
  },
  {
    name: "Pulseras",
    href: "/collections?category=pulseras",
    description: "Sofisticación en cada movimiento",
  },
  {
    name: "Anillos",
    href: "/collections?category=anillos",
    description: "Pequeñas obras de arte",
  },
];

export function Header() {
  const { items } = useWishlist();
  const itemCount = items.length;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-xl">
      {/* Top Bar */}
      <div className="bg-[#D4AF37] text-white py-2 px-4">
        <div className="container flex items-center justify-between text-sm">
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <LuPhone className="h-4 w-4" />
              <span>+57 1 234 5678</span>
            </div>
            <div className="flex items-center gap-2">
              <LuMail className="h-4 w-4" />
              <span>contacto@nurae.co</span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:mx-0">
            <LuGift className="h-4 w-4" />
            <span className="font-medium">
              Envío gratis en compras mayores a $150.000 COP • Hasta 12 cuotas
            </span>
            <LuSparkles className="h-4 w-4 animate-pulse" />
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span>Síguenos:</span>
            <Link to="#" className="hover:text-pink-200 transition-colors">
              IG
            </Link>
            <Link to="#" className="hover:text-pink-200 transition-colors">
              FB
            </Link>
            <Link to="#" className="hover:text-pink-200 transition-colors">
              TK
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <LuMenu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-full sm:max-w-sm bg-gradient-to-br from-pink-50 to-purple-50"
          >
            <div className="flex flex-col space-y-6 pt-6">
              <Link
                to="/"
                className="flex items-center gap-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LuCrown className="h-8 w-8 text-accent" />
                <span className="font-serif text-2xl font-bold bg-clip-text text-transparent">
                  LÚMINA
                </span>
              </Link>
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Inicio
                </Link>
                <div className="space-y-2">
                  <Link
                    to="/collections"
                    className="text-lg font-medium text-neutral-700 hover:text-primary transition-colors block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Colecciones
                  </Link>
                  <div className="pl-4 space-y-2">
                    {collections.map((collection) => (
                      <Link
                        key={collection.name}
                        to={collection.href}
                        className="text-sm text-neutral-600 hover:text-primary transition-colors block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {collection.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link
                  to="/new"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Novedades
                </Link>
                <Link
                  to="/bestsellers"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Más Vendidos
                </Link>
                <Link
                  to="/blog"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  to="/about"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sobre Nosotros
                </Link>
                <Link
                  to="/contact"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contacto
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            to="/"
            className="font-display font-medium text-gray-700 hover:text-primary transition-all duration-300 relative group"
          >
            Inicio
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gradient transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Collections Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="font-display font-medium text-neutral-700 hover:text-primary transition-all duration-300 relative group p-0 h-auto"
              >
                Colecciones
                <LuChevronDown className="ml-1 h-4 w-4" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nurae-gradient transition-all duration-300 group-hover:w-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[400px] bg-nurae-cream/95 backdrop-blur-md shadow-lg rounded-2xl p-6">
              <div className="space-y-4">
                <DropdownMenuItem asChild className="p-0">
                  <Link
                    to="/collections"
                    className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-400/20 transition-colors text-center"
                  >
                    <span className="font-medium text-neutral-800 text-lg">
                      Ver Todas las Colecciones
                    </span>
                    <span className="text-sm text-neutral-600">
                      Explora nuestra colección completa
                    </span>
                  </Link>
                </DropdownMenuItem>

                <div className="grid grid-cols-3 gap-4">
                  {collections.map((collection) => (
                    <DropdownMenuItem
                      key={collection.name}
                      asChild
                      className="p-0"
                    >
                      <Link
                        to={collection.href}
                        className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-400/20 transition-colors text-center"
                      >
                        <span className="font-medium text-neutral-800">
                          {collection.name}
                        </span>
                        <span className="text-xs text-neutral-600 mt-1">
                          {collection.description}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/new"
            className="font-display font-medium text-gray-700 hover:text-primary transition-all duration-300 relative group"
          >
            Novedades
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gradient transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/bestsellers"
            className="font-display font-medium text-gray-700 hover:text-primary transition-all duration-300 relative group"
          >
            Más Vendidos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gradient transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Logo */}
        <Link to="/" className="flex items-center justify-center group">
          <div className="text-center">
            <img
              src="/logo.png"
              alt="Lumina Logo"
              className="mx-auto h-16 w-full group-hover:scale-110 transition-transform duration-300"
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
          <div className="hidden lg:flex items-center space-x-6 ml-4 pl-4 border-l border-pink-200">
            <Link
              to="/blog"
              className="font-display font-medium text-gray-700 hover:text-primary transition-all duration-300 relative group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gradient transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/about"
              className="font-display font-medium text-gray-700 hover:text-primary transition-all duration-300 relative group"
            >
              Sobre Nosotros
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gradient transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/contact"
              className="font-display font-medium text-gray-700 hover:text-primary transition-all duration-300 relative group"
            >
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gradient transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
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
