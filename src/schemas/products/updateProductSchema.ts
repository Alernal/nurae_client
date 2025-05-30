import { z } from "zod"

export const updateProductSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(255, "El nombre no debe superar los 255 caracteres"),

  slug: z
    .string()
    .min(1, "El slug es obligatorio")
    .max(250, "El slug no debe superar los 250 caracteres"),

  price: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "El precio debe ser un número válido mayor o igual a 0",
    }),

  original_price: z
    .string()
    .optional()
    .refine(
      (val) =>
        val === undefined ||
        val === "" ||
        (!isNaN(Number(val)) && Number(val) >= 0),
      {
        message:
          "El precio original debe ser un número válido mayor o igual a 0",
      }
    ),

  size: z
    .string()
    .max(10, "La talla no debe superar los 10 caracteres")
    .optional(),

  color: z
    .string()
    .max(20, "El color no debe superar los 20 caracteres")
    .optional(),

  description: z
    .string()
    .max(1000, "La descripción no debe superar los 1000 caracteres")
    .optional(),

  in_stock: z.boolean(),

  stock_count: z
    .string()
    .refine(
      (val) =>
        !isNaN(Number(val)) &&
        Number(val) >= 0 &&
        Number.isInteger(Number(val)),
      {
        message:
          "La cantidad en stock debe ser un número entero mayor o igual a 0",
      }
    ),
})

export type UpdateProductFormValues = z.infer<typeof updateProductSchema>
