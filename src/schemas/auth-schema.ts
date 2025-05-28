import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    password_confirmation : z.string().min(8, "La confirmación de la contraseña es requerida"),
    termsAccepted: z.literal(true, {
        errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }),
    }),
}).refine((data) => data.password === data.password_confirmation , {
    message: "Las contraseñas no coinciden",
    path: ["confirmed"],
})

export type RegisterFormValues = z.infer<typeof registerSchema>
