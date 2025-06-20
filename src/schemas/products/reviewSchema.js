import { z } from "zod";
export const reviewSchema = z.object({
    product_id: z.number({
        required_error: "El producto es obligatorio",
    }),
    rating: z
        .number({
        required_error: "La calificación es obligatoria",
    })
        .min(1, "La calificación mínima es 1")
        .max(5, "La calificación máxima es 5"),
    comment: z
        .string()
        .max(1000, "El comentario no puede superar los 1000 caracteres")
        .optional()
        .nullable(),
});
