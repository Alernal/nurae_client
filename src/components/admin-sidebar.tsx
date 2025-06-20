import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuPackage,
  LuShoppingCart,
  LuUsers,
  LuLogOut,
  LuMenu,
  LuX,
  LuUser,
  LuHouse,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLogout } from "@/hooks/auth/useLogout";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LuLayoutDashboard },
  { name: "Perfil", href: "/admin/profile", icon: LuUser },
  { name: "Clientes", href: "/admin/users", icon: LuUsers },
  { name: "Productos", href: "/admin/products", icon: LuPackage },
  { name: "Pedidos", href: "/admin/orders", icon: LuShoppingCart },
];

export function AdminSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const user = useAuthStore((state) => state.user);
  const { mutate: logoutMutate, isPending } = useLogout();

  return (
    <>
      {/* Botón menú móvil */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white border border-gray-300 shadow-md"
        >
          {isMobileMenuOpen ? (
            <LuX className="h-5 w-5" />
          ) : (
            <LuMenu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Fondo oscuro en móvil */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 h-screen bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <img src="/logo.png" alt="NURAE" className="h-8 object-contain" />
            </Link>
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-800 border border-blue-200"
            >
              Admin
            </Badge>
          </div>

          {/* Usuario */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              {user?.profile_image_url ? (
                <img
                  src={`http://127.0.0.1:8000${user.profile_image_url}`}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                  <LuUser className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <Link to="/admin/profile" className="hover:underline">
                  <p className="font-medium text-gray-800">
                    {user?.first_name} {user?.last_name}
                  </p>
                </Link>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navegación */}
          <nav className="flex-1 px-6 py-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-700 hover:bg-gray-100"
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

          {/* Ver tienda */}
          <div className="p-6 border-t border-gray-200">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant="outline"
                className="w-full justify-start text-gray-700"
              >
                <LuHouse className="w-4 h-4 mr-2" />
                Ver tienda
              </Button>
            </Link>
          </div>

          {/* Logout */}
          <div className="p-6 border-t border-gray-200">
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-600 hover:text-white"
              onClick={() => logoutMutate()}
              disabled={isPending}
            >
              <LuLogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
