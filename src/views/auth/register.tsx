import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "@/schemas/auth-schema";
import { useRegister } from "@/hooks/auth/useRegister";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LuEye, LuEyeOff, LuMail, LuLock, LuUser } from "react-icons/lu";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: registerMutate, isPending } = useRegister();

  const onSubmit = (data: RegisterFormValues) => {
    registerMutate(data, {
      onSuccess: () => navigate("/"),
    });
  };

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
            <CardTitle className="text-2xl text-nurae-brown">
              Registrarse
            </CardTitle>
            <CardDescription className="text-secondary">
              Ingresa tus datos para crear una cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="first_name" className="text-nurae-brown">
                  Nombre
                </Label>
                <div className="relative">
                  <LuUser className="absolute left-3 top-3 h-4 w-4 text-secondary" />
                  <Input
                    id="first_name"
                    placeholder="Nombre"
                    className="pl-10 border-warm-sand focus:border-nurae-brown"
                    {...register("first_name")}
                  />
                  {errors.first_name && (
                    <p className="text-sm text-red-600">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-nurae-brown">
                  Email
                </Label>
                <div className="relative">
                  <LuMail className="absolute left-3 top-3 h-4 w-4 text-secondary" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10 border-warm-sand focus:border-nurae-brown"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-nurae-brown">
                  Contraseña
                </Label>
                <div className="relative">
                  <LuLock className="absolute left-3 top-3 h-4 w-4 text-secondary" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 border-warm-sand focus:border-nurae-brown"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-secondary hover:text-nurae-brown"
                  >
                    {showPassword ? (
                      <LuEyeOff className="h-4 w-4" />
                    ) : (
                      <LuEye className="h-4 w-4" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password_confirmation" className="text-nurae-brown">
                  Confirmar Contraseña
                </Label>
                <div className="relative">
                  <LuLock className="absolute left-3 top-3 h-4 w-4 text-secondary" />
                  <Input
                    id="password_confirmation"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 border-warm-sand focus:border-nurae-brown"
                    {...register("password_confirmation")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-secondary hover:text-nurae-brown"
                  >
                    {showPassword ? (
                      <LuEyeOff className="h-4 w-4" />
                    ) : (
                      <LuEye className="h-4 w-4" />
                    )}
                  </button>
                  {errors.password_confirmation && (
                    <p className="text-sm text-red-600">
                      {errors.password_confirmation.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  className="rounded border-warm-sand mt-1"
                  {...register("termsAccepted")}
                />
                <label
                  htmlFor="termsAccepted"
                  className="text-sm text-secondary"
                >
                  Acepto los{" "}
                  <Link
                    to="/terms"
                    className="text-nurae-brown hover:underline"
                  >
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-nurae-brown hover:underline"
                  >
                    política de privacidad
                  </Link>
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="text-sm text-red-600">
                  {errors.termsAccepted.message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-nurae-gradient hover:opacity-90 text-nurae-charcoal"
                disabled={isPending}
              >
                {isPending ? "Creando cuenta..." : "Crear Cuenta"}
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
  );
}
