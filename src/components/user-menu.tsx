import { useState } from "react"
import { LuUser, LuLogIn, LuUserPlus, LuHeart, LuPackage, LuSettings, LuLogOut } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Link} from "react-router-dom"

export function UserMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from your auth context

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-pink-50 hover:text-primary transition-all duration-300 relative group"
        >
          <LuUser className="h-5 w-5" />
          <span className="sr-only">Cuenta de usuario</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-md border border-pink-100" align="end">
        {isLoggedIn ? (
          <>
            <DropdownMenuLabel className="font-serif">Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/account" className="flex items-center gap-2">
                <LuUser className="h-4 w-4" />
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/orders" className="flex items-center gap-2">
                <LuPackage className="h-4 w-4" />
                Mis Pedidos
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/wishlist" className="flex items-center gap-2">
                <LuHeart className="h-4 w-4" />
                Lista de Deseos
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center gap-2">
                <LuSettings className="h-4 w-4" />
                Configuración
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => setIsLoggedIn(false)}>
              <LuLogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel className="font-serif">Bienvenida</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/login" className="flex items-center gap-2">
                <LuLogIn className="h-4 w-4" />
                Iniciar Sesión
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/register" className="flex items-center gap-2">
                <LuUserPlus className="h-4 w-4" />
                Crear Cuenta
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
