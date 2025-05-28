import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LuEye, LuEyeOff, LuMail, LuLock } from "react-icons/lu"
import { useAuthStore } from "@/stores/useAuthStore"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleLogin = async () => {
    setIsLoading(true)
  }

  return (
    <div className="min-h-screen bg-nurae-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="relative w-48 h-16 mx-auto mb-4">
            <img src="/logo.jpg" alt="NURAE" className="object-contain" />
          </div>
          <p className="text-nurae-cream">Accede a tu cuenta</p>
        </div>

        <Card className="border-warm-sand/20 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-nurae-brown">Bienvenido</CardTitle>
            <CardDescription className="text-secondary">Inicia sesión en tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
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

              <Button
                type="submit"
                className="w-full bg-nurae-gradient hover:opacity-90 text-nurae-charcoal"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-nurae-cream text-sm">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-nurae-charcoal hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
