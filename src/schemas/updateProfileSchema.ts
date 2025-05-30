import { z } from "zod";

export const updateProfileSchema = z.object({
  first_name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no debe superar los 50 caracteres"),
  last_name: z
    .string()
    .max(50, "El apellido no debe superar los 50 caracteres")
    .optional(),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Teléfono no válido")
    .optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z
  .object({
    current: z.string().min(1, "La contraseña actual es obligatoria"),
    new: z
      .string()
      .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe incluir al menos una letra mayúscula")
      .regex(/[0-9]/, "Debe incluir al menos un número"),
    confirm: z.string(),
  })
  .refine((data) => data.new === data.confirm, {
    path: ["confirm"],
    message: "Las contraseñas no coinciden",
  });

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
