import { z } from "zod";

export const imageFileSchema = z
  .custom<File>((file) => file instanceof File, {
    message: "Debe ser un archivo",
  })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "La imagen debe pesar menos de 5MB",
  })
  .refine(
    (file) =>
      ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    {
      message: "Formato no válido. Solo JPG, PNG o WebP",
    }
  );

export const productImagesSchema = z.array(imageFileSchema).min(1, {
  message: "Debes seleccionar al menos una imagen válida",
});

export type ProductImageUploadInput = z.infer<typeof productImagesSchema>;
