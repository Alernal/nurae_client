import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LuEye, LuEyeOff, LuMail, LuLock, LuUser, LuPhone } from "react-icons/lu"
import { useAuthStore } from "@/stores/useAuthStore"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleRegister = async () => {
    setIsLoading(true)
  }

  return (
    <div className="min-h-screen bg-nurae-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-20">
          <div className="relative w-48 h-16 mx-auto mb-4">
            <img src="/logo.jpg" alt="NURAE" className="object-contain" />
          </div>
        </div>

        <Card className="border-warm-sand/20 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-nurae-brown">Registrarse</CardTitle>
            <CardDescription className="text-secondary">Ingresa tus datos para crear una cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-nurae-brown">Nombre</Label>
                  <div className="relative">
                    <LuUser className="absolute left-3 top-3 h-4 w-4 text-secondary" />
                    <Input
                      id="firstName"
                      placeholder="Nombre"
                      className="pl-10 border-warm-sand focus:border-nurae-brown"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-nurae-brown">Apellido</Label>
                  <Input
                    id="lastName"
                    placeholder="Apellido"
                    className="border-warm-sand focus:border-nurae-brown"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-nurae-brown">Email</Label>
                <div className="relative">
                  <LuMail className="absolute left-3 top-3 h-4 w-4 text-secondary" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10 border-warm-sand focus:border-nurae-brown"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-nurae-brown">Teléfono</Label>
                <div className="relative">
                  <LuPhone className="absolute left-3 top-3 h-4 w-4 text-secondary" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+57 300 123 4567"
                    className="pl-10 border-warm-sand focus:border-nurae-brown"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-nurae-brown">Contraseña</Label>
                <div className="relative">
                  <LuLock className="absolute left-3 top-3 h-4 w-4 text-secondary" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 border-warm-sand focus:border-nurae-brown"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-secondary hover:text-nurae-brown"
                  >
                    {showPassword ? <LuEyeOff className="h-4 w-4" /> : <LuEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-warm-sand" required />
                <label className="text-sm text-secondary">
                  Acepto los{" "}
                  <Link to="/terms" className="text-nurae-brown hover:underline">términos y condiciones</Link>{" "}
                  y la{" "}
                  <Link to="/privacy-policy" className="text-nurae-brown hover:underline">política de privacidad</Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-nurae-gradient hover:opacity-90 text-nurae-charcoal"
                disabled={isLoading}
              >
                {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-nurae-cream text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-nurae-charcoal hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
