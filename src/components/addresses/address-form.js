import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, } from "@/schemas/addresses/createAddressSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select";
export function AddressForm({ onSubmit, defaultValues }) {
    const form = useForm({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            name: "",
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            company: "",
            document_type: "",
            document_number: "",
            fiscal_name: "",
            street_address: "",
            apartment: "",
            city: "",
            state: "",
            postal_code: "",
            country: "",
            is_default: false,
            notes: "",
            ...defaultValues,
        },
    });
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsx(FormField, { name: "name", control: form.control, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Nombre de referencia" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Ej: Casa, Oficina, Cliente X", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { name: "company", control: form.control, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Empresa (opcional)" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Nombre de la empresa", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { name: "first_name", control: form.control, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Nombre" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Ej: Juan", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { name: "last_name", control: form.control, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Apellido" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Ej: P\u00E9rez", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { name: "email", control: form.control, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { type: "email", placeholder: "correo@ejemplo.com", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { name: "phone", control: form.control, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Tel\u00E9fono" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "+57 300 1234567", ...field }) }), _jsx(FormMessage, {})] })) })] }), _jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [_jsx(FormField, { name: "document_type", control: form.control, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Tipo de documento" }), _jsxs(Select, { value: field.value ?? "", onValueChange: field.onChange, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecciona un tipo..." }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "CC", children: "C\u00E9dula (CC)" }), _jsx(SelectItem, { value: "NIT", children: "NIT" }), _jsx(SelectItem, { value: "RUC", children: "RUC" }), _jsx(SelectItem, { value: "RFC", children: "RFC" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { name: "document_number", control: form.control, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "N\u00FAmero de documento" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "1234567890", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { name: "fiscal_name", control: form.control, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Raz\u00F3n social" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Nombre legal completo", ...field }) }), _jsx(FormMessage, {})] })) })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsx(FormField, { name: "street_address", control: form.control, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Direcci\u00F3n" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Calle 123 #45-67", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { name: "apartment", control: form.control, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Apartamento (opcional)" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Apto 101", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { name: "city", control: form.control, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Ciudad" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Ej: Medell\u00EDn", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { name: "state", control: form.control, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Departamento / Estado" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Ej: Antioquia", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { name: "postal_code", control: form.control, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "C\u00F3digo Postal" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Ej: 050021", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { name: "country", control: form.control, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Pa\u00EDs" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Ej: Colombia", ...field }) }), _jsx(FormMessage, {})] })) })] }), _jsx(FormField, { name: "is_default", control: form.control, render: ({ field }) => (_jsxs(FormItem, { className: "flex flex-row items-center gap-2", children: [_jsx(FormControl, { children: _jsx(Checkbox, { checked: !!field.value, onCheckedChange: field.onChange }) }), _jsx(FormLabel, { children: "Usar como direcci\u00F3n principal" })] })) }), _jsx(FormField, { name: "notes", control: form.control, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Notas adicionales" }), _jsx(FormControl, { children: _jsx(Textarea, { placeholder: "Instrucciones, puntos de referencia...", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", children: "Guardar Direcci\u00F3n" })] }) }));
}
