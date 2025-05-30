import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(255, "El nombre no debe superar los 255 caracteres"),

  slug: z
    .string()
    .min(1, "El slug es obligatorio")
    .max(250, "El slug no debe superar los 250 caracteres"),

  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
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
    .max(5, "La talla no debe superar los 5 caracteres")
    .regex(/^[\w\s]{1,10}$/i, "Formato de talla no válido")
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

  images: z
    .any()
    .transform((val) => (Array.isArray(val) ? val : []))
    .optional()
    .refine(
      (files: File[] | undefined) =>
        !files ||
        files.length === 0 ||
        files.every((file) => file.size <= MAX_IMAGE_SIZE),
      {
        message: "Cada imagen debe pesar máximo 5MB",
      }
    )
    .refine(
      (files: File[] | undefined) =>
        !files ||
        files.length === 0 ||
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      {
        message: "Solo se permiten imágenes JPG, PNG o WebP",
      }
    ),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
