import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuArrowLeft, LuUpload, LuX, LuBookImage } from "react-icons/lu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { createProductSchema, } from "@/schemas/products/createProductSchema";
import { useCreateProduct } from "@/hooks/products/useCreateProduct";
const availableMaterials = [
    { value: "oro", label: "Oro" },
    { value: "plata", label: "Plata" },
    { value: "platino", label: "Platino" },
    { value: "acero_inoxidable", label: "Acero Inoxidable" },
    { value: "titanio", label: "Titanio" },
    { value: "rodio", label: "Rodio" },
    { value: "paladio", label: "Paladio" },
    { value: "cobre", label: "Cobre" },
    { value: "laton", label: "Latón" },
    { value: "bronce", label: "Bronce" },
    { value: "niquel", label: "Níquel" },
];
const availableCategories = [
    { value: "anillos", label: "Anillos" },
    { value: "collares", label: "Collares" },
    { value: "pulseras", label: "Pulseras" },
    { value: "aretes", label: "Aretes" },
    { value: "dijes", label: "Dijes" },
    { value: "relojes", label: "Relojes" },
    { value: "broches", label: "Broches" },
    { value: "piercings", label: "Piercings" },
    { value: "gemelos", label: "Gemelos" },
    { value: "otros", label: "Otros" },
];
export default function CreateProduct() {
    const navigate = useNavigate();
    const [imagePreviews, setImagePreviews] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const { mutate: createProduct, isLoading } = useCreateProduct();
    const { register, handleSubmit, setValue, watch, formState: { errors }, } = useForm({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: "",
            slug: "",
            price: "",
            original_price: "",
            size: "2 cm",
            material: "oro",
            description: "",
            in_stock: true,
            stock_count: "0",
            category: "pulseras",
            images: [],
        },
    });
    const generateSlug = (name) => name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .substring(0, 250);
    const onSubmit = (data) => {
        createProduct({ data, images: imageFiles }, {
            onSuccess: () => navigate("/admin/products"),
        });
    };
    const handleImageUpload = (e) => {
        const files = e.target.files;
        if (!files)
            return;
        const selectedFiles = Array.from(files);
        setImageFiles(selectedFiles);
        setValue("images", selectedFiles, { shouldValidate: true });
        const previews = [];
        selectedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    previews.push(reader.result.toString());
                    if (previews.length === selectedFiles.length) {
                        setImagePreviews(previews);
                    }
                }
            };
            reader.readAsDataURL(file);
        });
    };
    const removeImage = (index) => {
        const updatedPreviews = [...imagePreviews];
        const updatedFiles = [...imageFiles];
        updatedPreviews.splice(index, 1);
        updatedFiles.splice(index, 1);
        setImagePreviews(updatedPreviews);
        setImageFiles(updatedFiles);
    };
    return (_jsxs("div", { className: "container mx-auto p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { variant: "outline", size: "icon", onClick: () => navigate("/admin/products"), children: _jsx(LuArrowLeft, { className: "h-4 w-4" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Crear Nuevo Producto" }), _jsx("p", { className: "text-muted-foreground", children: "A\u00F1ade un nuevo producto a tu cat\u00E1logo" })] })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "lg:col-span-2", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Informaci\u00F3n del Producto" }), _jsx(CardDescription, { children: "Detalles b\u00E1sicos sobre el producto" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Nombre del Producto *" }), _jsx(Input, { id: "name", ...register("name"), onChange: (e) => {
                                                            setValue("name", e.target.value);
                                                            setValue("slug", generateSlug(e.target.value));
                                                        } }), errors.name && (_jsx("p", { className: "text-sm text-red-600", children: errors.name.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "slug", children: "Slug *" }), _jsx(Input, { id: "slug", ...register("slug") }), errors.slug && (_jsx("p", { className: "text-sm text-red-600", children: errors.slug.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "description", children: "Descripci\u00F3n" }), _jsx(Textarea, { id: "description", ...register("description"), rows: 5 }), errors.description && (_jsx("p", { className: "text-sm text-red-600", children: errors.description.message }))] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "price", children: "Precio *" }), _jsx(Input, { id: "price", type: "number", step: "0.01", ...register("price") }), errors.price && (_jsx("p", { className: "text-sm text-red-600", children: errors.price.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "original_price", children: "Precio Original" }), _jsx(Input, { id: "original_price", type: "number", step: "0.01", ...register("original_price") }), errors.original_price && (_jsx("p", { className: "text-sm text-red-600", children: errors.original_price.message })), _jsx("p", { className: "text-sm text-muted-foreground", children: "Opcional. Usado para mostrar descuentos." })] })] })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Inventario y Variantes" }), _jsx(CardDescription, { children: "Gestiona el stock y las variantes" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "in_stock", children: "Disponible en Stock" }), _jsx(Switch, { id: "in_stock", checked: watch("in_stock"), onCheckedChange: (val) => setValue("in_stock", val) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "stock_count", children: "Cantidad en Stock *" }), _jsx(Input, { id: "stock_count", type: "number", ...register("stock_count") }), errors.stock_count && (_jsx("p", { className: "text-sm text-red-600", children: errors.stock_count.message }))] }), _jsx(Separator, {}), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "size", children: "Talla" }), _jsx(Input, { id: "size", name: "size", placeholder: "Ej: 52mm o 18cm", value: watch("size"), onChange: (e) => setValue("size", e.target.value) }), errors.size && (_jsx("p", { className: "text-sm text-red-600", children: errors.size.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Material" }), _jsxs(Select, { value: watch("material"), onValueChange: (val) => setValue("material", val), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecciona un material" }) }), _jsx(SelectContent, { children: availableMaterials.map((material) => (_jsx(SelectItem, { value: material.value, children: material.label }, material.value))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Categoria" }), _jsxs(Select, { value: watch("category"), onValueChange: (val) => setValue("category", val), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecciona una categoria" }) }), _jsx(SelectContent, { children: availableCategories.map((category) => (_jsx(SelectItem, { value: category.value, children: category.label }, category.value))) })] })] })] })] }), _jsxs(Card, { className: "lg:col-span-3", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Im\u00E1genes del Producto" }), _jsx(CardDescription, { children: "Sube im\u00E1genes para mostrar tu producto" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 gap-6", children: [_jsx("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors", children: _jsxs("div", { className: "flex flex-col items-center justify-center space-y-2", children: [_jsx("div", { className: "bg-secondary rounded-full p-3", children: _jsx(LuUpload, { className: "h-6 w-6 text-primary" }) }), _jsx("div", { className: "text-xl font-medium", children: "Arrastra im\u00E1genes aqu\u00ED o haz clic para seleccionar" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Soporta JPG, PNG o WebP. M\u00E1ximo 5MB por imagen." }), _jsx(Input, { id: "image-upload", type: "file", accept: "image/*", multiple: true, className: "hidden", onChange: handleImageUpload }), _jsx(Button, { type: "button", variant: "outline", onClick: () => document.getElementById("image-upload")?.click(), children: "Seleccionar Im\u00E1genes" })] }) }), imagePreviews.length > 0 && (_jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "font-medium", children: ["Im\u00E1genes seleccionadas (", imagePreviews.length, ")"] }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4", children: imagePreviews.map((image, index) => (_jsxs("div", { className: "relative group", children: [_jsx("div", { className: "aspect-square rounded-md overflow-hidden border bg-background", children: _jsx("img", { src: image || "/placeholder.svg", alt: `Imagen ${index + 1}`, width: 200, height: 200, className: "object-cover w-full h-full" }) }), _jsx(Button, { type: "button", variant: "destructive", size: "icon", className: "absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity", onClick: () => removeImage(index), children: _jsx(LuX, { className: "h-3 w-3" }) })] }, index))) })] })), errors.images && (_jsx("p", { className: "text-sm text-red-600 mt-2", children: errors.images.message })), imageFiles.length === 0 && (_jsxs("div", { className: "flex flex-col items-center justify-center p-8 text-center text-muted-foreground", children: [_jsx(LuBookImage, { className: "h-10 w-10 mb-2" }), _jsx("p", { children: "No hay im\u00E1genes seleccionadas" })] }))] }) })] })] }), _jsxs("div", { className: "mt-6 flex justify-end gap-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => navigate("/admin/products"), disabled: isLoading, children: "Cancelar" }), _jsx(Button, { type: "submit", disabled: isLoading, children: isLoading ? "Guardando..." : "Guardar Producto" })] })] })] }));
}
