import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LuMapPin,
  LuPackage,
  LuLogOut,
  LuMenu,
  LuX,
  LuUser,
  LuHouse,
} from "react-icons/lu";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLogout } from "@/hooks/auth/useLogout";

const navigation = [
  { name: "Perfil", path: "profile", icon: LuUser },
  { name: "Mis Pedidos", path: "orders", icon: LuPackage },
  { name: "Direcciones", path: "addresses", icon: LuMapPin },
];

export function ClientSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const user = useAuthStore((state) => state.user);
  const { mutate: logoutMutate, isPending } = useLogout();

  const basePath = `/${user?.role || "client"}`;

  return (
    <>
      {/* Botón menú móvil (igual al admin) */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white border border-gray-300 shadow-md"
        >
          {isMobileMenuOpen ? <LuX className="h-5 w-5" /> : <LuMenu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Fondo oscuro en móvil */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar (misma sombra/animación que admin) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header centrado con logo (sin bordes, como admin) */}
          <div className="mt-10 flex items-center justify-center px-6 py-4">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="h-8 object-contain" />
            </Link>
          </div>

          {/* Usuario (estilo admin) */}
          <div className="px-6 py-4">
            <div className="flex items-center gap-3">
              {user?.profile_image_url ? (
                <img
                  src={`https://api.nurae.com.co/${user.profile_image_url}`}
                  alt="Avatar"
                  className="w-10 h-10 object-cover rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-600 flex items-center justify-center">
                  <LuUser className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <Link to={`${basePath}/profile`} className="hover:underline">
                  <p className="font-medium text-gray-800">
                    {user?.first_name} {user?.last_name}
                  </p>
                </Link>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navegación (mismo estilo de activo que admin: bg-black text-white shadow) */}
          <nav className="flex-1 px-6 py-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const href = `${basePath}/${item.path}`;
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={item.name}
                  to={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors duration-200",
                    isActive ? "bg-black text-white shadow" : "text-gray-700 hover:bg-gray-100"
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

          {/* Ver tienda (como admin: rounded-none y centrado) */}
          <div className="p-6 -mb-10">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant="outline"
                className="w-full text-gray-700 flex justify-center rounded-none"
              >
                <LuHouse className="w-4 h-4 mr-2" />
                Ver tienda
              </Button>
            </Link>
          </div>

          {/* Logout (mismo estilo que admin) */}
          <div className="p-6">
            <Button
              variant="outline"
              className="w-full justify-center text-red-600 border-red-200 hover:bg-red-600 hover:text-white rounded-none"
              onClick={() => logoutMutate()}
              disabled={isPending}
            >
              <LuLogOut className="w-4 h-4 mr-2" />
              {isPending ? "Cerrando sesión..." : "Cerrar Sesión"}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
