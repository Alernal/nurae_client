import { z } from "zod";
export const addressSchema = z
    .object({
    name: z
        .string()
        .min(1, "El nombre de la dirección es obligatorio")
        .max(255),
    first_name: z
        .string()
        .min(1, "El nombre es obligatorio")
        .max(100),
    last_name: z
        .string()
        .min(1, "El apellido es obligatorio")
        .max(100),
    email: z
        .string()
        .min(1, "El correo es obligatorio")
        .email("Correo no válido")
        .max(255),
    phone: z
        .string()
        .min(1, "El teléfono es obligatorio")
        .max(20),
    company: z.string().max(255).optional().nullable(),
    document_type: z
        .enum(["CC", "NIT", "RUC", "RFC"])
        .optional()
        .nullable(),
    document_number: z
        .string()
        .max(30)
        .optional()
        .nullable(),
    fiscal_name: z
        .string()
        .max(255)
        .optional()
        .nullable(),
    street_address: z
        .string()
        .min(1, "La dirección es obligatoria")
        .max(255),
    apartment: z.string().max(50).optional().nullable(),
    city: z.string().min(1, "La ciudad es obligatoria").max(100),
    state: z.string().min(1, "El departamento es obligatorio").max(100),
    postal_code: z.string().min(1, "El código postal es obligatorio").max(20),
    country: z.string().min(1, "El país es obligatorio").max(100),
    is_default: z.boolean().optional(),
    notes: z.string().optional().nullable(),
})
    .superRefine((data, ctx) => {
    // Si se indica document_type, el número debe estar presente
    if (data.document_type && !data.document_number?.trim()) {
        ctx.addIssue({
            path: ["document_number"],
            code: z.ZodIssueCode.custom,
            message: "El número de documento es obligatorio si se indica el tipo",
        });
    }
    // Si el tipo es NIT, fiscal_name es obligatorio
    if (data.document_type === "NIT" && !data.fiscal_name?.trim()) {
        ctx.addIssue({
            path: ["fiscal_name"],
            code: z.ZodIssueCode.custom,
            message: "La razón social es obligatoria si el tipo de documento es NIT",
        });
    }
});
