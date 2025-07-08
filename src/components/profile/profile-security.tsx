import { useState } from "react";
import { LuShield, LuBadgeCheck, LuEye, LuEyeOff } from "react-icons/lu";
import { useResendVerification } from "@/hooks/user/useResendVerification";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { changePasswordSchema } from "@/schemas/updateProfileSchema";
import { useChangePassword } from "@/hooks/user/useChangePassword";

interface ProfileSecurityProps {
  user: {
    is_verified: boolean;
  };
}

export default function ProfileSecurity({ user }: ProfileSecurityProps) {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const { mutate: resendVerification, isPending: isSendingEmail } = useResendVerification();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: changePassword, isPending } = useChangePassword();

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updatePassword = () => {
    try {
      const validated = changePasswordSchema.parse(passwords);
      changePassword(
        {
          current: validated.current,
          new: validated.new,
        },
        {
          onSuccess: () => {
            setPasswords({ current: "", new: "", confirm: "" });
          },
        }
      );
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          fieldErrors[e.path[0]] = e.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <>
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>Cambiar Contraseña</CardTitle>
          <CardDescription>
            Actualiza tu contraseña para mantener tu cuenta segura
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Contraseña Actual</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={passwords.current}
                onChange={(e) =>
                  handlePasswordChange("current", e.target.value)
                }
                className="pr-10 border-violet-300 focus-visible:ring-violet-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showCurrentPassword ? (
                  <LuEyeOff size={16} />
                ) : (
                  <LuEye size={16} />
                )}
              </button>
            </div>
            {errors.current && (
              <p className="text-sm text-red-500">{errors.current}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">Nueva Contraseña</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={passwords.new}
                onChange={(e) => handlePasswordChange("new", e.target.value)}
                className="pr-10 border-violet-300 focus-visible:ring-violet-500"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
              </button>
            </div>
            {errors.new && <p className="text-sm text-red-500">{errors.new}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) =>
                  handlePasswordChange("confirm", e.target.value)
                }
                className="pr-10 border-violet-300 focus-visible:ring-violet-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <LuEyeOff size={16} />
                ) : (
                  <LuEye size={16} />
                )}
              </button>
            </div>
            {errors.confirm && (
              <p className="text-sm text-red-500">{errors.confirm}</p>
            )}
          </div>

          {/* ... Requisitos visuales de la contraseña (como ya los tienes) */}
        </CardContent>

        <CardFooter>
          <Button
            onClick={updatePassword}
            className="w-full bg-violet-600 hover:bg-violet-700"
            disabled={
              isPending ||
              !passwords.current ||
              !passwords.new ||
              !passwords.confirm
            }
          >
            {isPending ? "Guardando..." : "Actualizar Contraseña"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-none shadow-lg mt-6">
        <CardHeader>
          <CardTitle>Verificación de Cuenta</CardTitle>
          <CardDescription>Estado de verificación de tu cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {user.is_verified ? (
                <>
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <LuBadgeCheck size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Cuenta Verificada</p>
                    <p className="text-sm text-muted-foreground">
                      Tu cuenta ha sido verificada correctamente
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <LuShield size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">
                      Cuenta Pendiente de Verificación
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Verifica tu cuenta para acceder a todas las funciones
                    </p>
                  </div>
                </>
              )}
            </div>
            {!user.is_verified && (
              <Button
                variant="outline"
                className="border-violet-300 text-violet-600 hover:bg-violet-50"
                disabled={isSendingEmail}
                onClick={() => resendVerification(user.email)}
              >
                {isSendingEmail ? "Enviando..." : "Verificar Ahora"}
              </Button>

            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
