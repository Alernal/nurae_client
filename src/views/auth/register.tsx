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
import {
  LuEye,
  LuEyeOff,
  LuMail,
  LuLock,
  LuUser,
} from "react-icons/lu";

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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-50 h-20 mx-auto mb-4">
            <img
              src="/logo.png"
              alt="LÚMINA"
              className="object-contain mx-auto"
            />
          </div>
        </div>

        <Card className="shadow-lg border border-gray-100">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-800 font-semibold">
              Crear cuenta
            </CardTitle>
            <CardDescription className="text-gray-500">
              Ingresa tus datos para registrarte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="first_name" className="text-gray-700">
                  Nombre
                </Label>
                <div className="relative">
                  <LuUser className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="first_name"
                    placeholder="Tu nombre"
                    className="pl-10"
                    {...register("first_name")}
                  />
                </div>
                {errors.first_name && (
                  <p className="text-sm text-red-600">{errors.first_name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <LuMail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Contraseña
                </Label>
                <div className="relative">
                  <LuLock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-yellow-600"
                  >
                    {showPassword ? (
                      <LuEyeOff className="h-4 w-4" />
                    ) : (
                      <LuEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Confirmar contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password_confirmation" className="text-gray-700">
                  Confirmar Contraseña
                </Label>
                <div className="relative">
                  <LuLock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password_confirmation"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    {...register("password_confirmation")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-yellow-600"
                  >
                    {showPassword ? (
                      <LuEyeOff className="h-4 w-4" />
                    ) : (
                      <LuEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password_confirmation && (
                  <p className="text-sm text-red-600">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>

              {/* Aceptar términos */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  className="rounded border-gray-300 mt-1"
                  {...register("termsAccepted")}
                />
                <label htmlFor="termsAccepted" className="text-sm text-gray-600">
                  Acepto los{" "}
                  <Link to="/terms" className="text-[#D4AF37] hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link to="/privacy-policy" className="text-[#D4AF37] hover:underline">
                    política de privacidad
                  </Link>
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="text-sm text-red-600">{errors.termsAccepted.message}</p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-yellow-600 text-white font-medium transition disabled:opacity-70"
                disabled={isPending}
              >
                {isPending ? "Registrando..." : "Registrarse"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Ya tienes cuenta */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="text-[#D4AF37] font-medium hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
