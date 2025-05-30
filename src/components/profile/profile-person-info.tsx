import React from "react";
import {
  LuUser,
  LuMail,
  LuPhone,
  LuShield,
  LuPencil,
  LuSave,
  LuUsb,
  LuVariable,
} from "react-icons/lu";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { updateProfileSchema, type UpdateProfileFormValues } from "@/schemas/updateProfileSchema";
import { useUpdateProfile } from "@/hooks/user/useUpdateProfile";
import { z } from "zod";

interface ProfilePersonalInfoProps {
  user: UpdateProfileFormValues;
  setUser: React.Dispatch<React.SetStateAction<UpdateProfileFormValues>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfilePersonalInfo({
  user,
  setUser,
  isEditing,
  setIsEditing,
}: ProfilePersonalInfoProps) {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [errors, setErrors] = React.useState<Partial<Record<keyof UpdateProfileFormValues, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setUser((prev) => ({ ...prev, gender: value as any }));
  };

  const handleSave = () => {
    try {
      const validated = updateProfileSchema.parse(user); // zod validation
      updateProfile(validated, {
        onSuccess: () => {
          setIsEditing(false);
          setErrors({});
        },
      });
    } catch (err) {
      console.error("Validation error:", err);
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof UpdateProfileFormValues, string>> = {};
        err.errors.forEach((error) => {
          const path = error.path[0] as keyof UpdateProfileFormValues;
          fieldErrors[path] = error.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Información Personal</CardTitle>
          <CardDescription>Actualiza tus datos personales</CardDescription>
        </div>
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={isEditing ? "bg-violet-600 hover:bg-violet-700" : ""}
          disabled={isPending}
        >
          {isEditing ? (
            <>
              <LuSave className="mr-2" size={16} />
              Guardar
            </>
          ) : (
            <>
              <LuPencil className="mr-2" size={16} />
              Editar
            </>
          )}
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name" className="flex items-center gap-2">
              <LuUser size={16} className="text-violet-600" />
              Nombre
            </Label>
            <Input
              id="first_name"
              name="first_name"
              value={user.first_name || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.first_name && <p className="text-sm text-red-500">{errors.first_name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name" className="flex items-center gap-2">
              <LuUser size={16} className="text-violet-600" />
              Apellidos
            </Label>
            <Input
              id="last_name"
              name="last_name"
              value={user.last_name || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <LuMail size={16} className="text-violet-600" />
            Correo Electrónico
          </Label>
          <Input id="email" value={user.email || ""} disabled />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <LuPhone size={16} className="text-violet-600" />
              Teléfono
            </Label>
            <Input
              id="phone"
              name="phone"
              value={user.phone || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="flex items-center gap-2">
              {user.gender === "male" ? (
                <LuUsb size={16} className="text-violet-600" />
              ) : (
                <LuVariable size={16} className="text-violet-600" />
              )}
              Género
            </Label>
            <Select
              value={user.gender || ""}
              disabled={!isEditing}
              onValueChange={handleGenderChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tu género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Masculino</SelectItem>
                <SelectItem value="female">Femenino</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
          </div>
        </div>

        {user.role === "admin" && (
          <div className="pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LuShield size={16} className="text-violet-600" />
                <Label htmlFor="role" className="font-medium">
                  Rol de Administrador
                </Label>
              </div>
              <Switch id="role" checked disabled />
            </div>
            <p className="text-sm text-muted-foreground mt-1 ml-6">
              Los administradores tienen acceso a funciones adicionales
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
