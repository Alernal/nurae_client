import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LuMapPin,
  LuCreditCard,
  LuPackage,
  LuSettings,
  LuLogOut,
  LuMenu,
  LuX,
  LuUser,
  LuHeadphones,
  LuHouse,
} from "react-icons/lu";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";

const navigation = [
  {
    name: "Perfil",
    path: "profile",
    icon: LuUser,
  },
  {
    name: "Mis Pedidos",
    path: "orders",
    icon: LuPackage,
  },
  {
    name: "Direcciones",
    path: "addresses",
    icon: LuMapPin,
  },
  {
    name: "Métodos de Pago",
    path: "payments",
    icon: LuCreditCard,
  },
  {
    name: "Soporte",
    path: "support",
    icon: LuHeadphones,
  },
  {
    name: "Configuración",
    path: "settings",
    icon: LuSettings,
  },
];

export function ClientSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const user = useAuthStore((state) => state.user);

  const basePath = `/${user?.role || "client"}`; // fallback a 'client' si no está definido

  return (
    <>
      {/* Botón menú móvil */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white border-nurae-sand shadow-lg"
        >
          {isMobileMenuOpen ? <LuX className="h-5 w-5" /> : <LuMenu className="h-5 w-5" />}
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 h-screen bg-white border-r border-nurae-sand transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-nurae-sand">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="NURAE" className="h-8 object-contain" />
            </Link>
            <Badge
              variant="outline"
              className="bg-nurae-sand text-nurae-charcoal border-nurae-sand"
            >
              {user?.role === "admin" ? "Admin" : "Cliente"}
            </Badge>
          </div>

          {/* Usuario */}
          <div className="px-6 py-4 border-b border-nurae-sand">
            <div className="flex items-center gap-3">
              {user?.profile_image_url ? (
                <img
                  src={`http://127.0.0.1:8000${user.profile_image_url}`}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-nurae-gradient rounded-full flex items-center justify-center">
                  <LuUser className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <Link to={`${basePath}/profile`} className="hover:underline">
                  <p className="font-medium text-nurae-brown">
                    {user?.first_name} {user?.last_name}
                  </p>
                </Link>
                <p className="text-sm text-neutral-500">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navegación */}
          <nav className="flex-1 px-6 py-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const href = `${basePath}/${item.path}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={item.name}
                  to={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-nurae-gradient text-white shadow-lg"
                      : "text-neutral-700 hover:bg-nurae-sand hover:text-nurae-brown"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Acciones rápidas */}
          <div className="p-6 border-t border-nurae-sand">
            <div className="space-y-3">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full justify-start border-nurae-sand text-nurae-brown"
                >
                  <LuHouse className="w-4 h-4 mr-2" />
                  Ver tienda
                </Button>
              </Link>
            </div>
          </div>

          {/* Logout */}
          <div className="p-6 border-t border-nurae-sand">
            <Button
              variant="outline"
              className="w-full justify-start border-destructive text-destructive hover:bg-destructive hover:text-white"
            >
              <LuLogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
