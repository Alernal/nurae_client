import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { LuUser, LuMail, LuPhone, LuShield, LuPencil, LuSave, LuUsb, LuVariable, } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { updateProfileSchema } from "@/schemas/updateProfileSchema";
import { useUpdateProfile } from "@/hooks/user/useUpdateProfile";
import { z } from "zod";
export default function ProfilePersonalInfo({ user, setUser, isEditing, setIsEditing, }) {
    const { mutate: updateProfile, isPending } = useUpdateProfile();
    const [errors, setErrors] = React.useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };
    const handleGenderChange = (value) => {
        setUser((prev) => ({ ...prev, gender: value }));
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
        }
        catch (err) {
            console.error("Validation error:", err);
            if (err instanceof z.ZodError) {
                const fieldErrors = {};
                err.errors.forEach((error) => {
                    const path = error.path[0];
                    fieldErrors[path] = error.message;
                });
                setErrors(fieldErrors);
            }
        }
    };
    return (_jsxs(Card, { className: "border-none shadow-lg", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Informaci\u00F3n Personal" }), _jsx(CardDescription, { children: "Actualiza tus datos personales" })] }), _jsx(Button, { variant: isEditing ? "default" : "outline", size: "sm", onClick: () => (isEditing ? handleSave() : setIsEditing(true)), className: isEditing ? "bg-violet-600 hover:bg-violet-700" : "", disabled: isPending, children: isEditing ? (_jsxs(_Fragment, { children: [_jsx(LuSave, { className: "mr-2", size: 16 }), "Guardar"] })) : (_jsxs(_Fragment, { children: [_jsx(LuPencil, { className: "mr-2", size: 16 }), "Editar"] })) })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "first_name", className: "flex items-center gap-2", children: [_jsx(LuUser, { size: 16, className: "text-violet-600" }), "Nombre"] }), _jsx(Input, { id: "first_name", name: "first_name", value: user.first_name || "", onChange: handleChange, disabled: !isEditing }), errors.first_name && _jsx("p", { className: "text-sm text-red-500", children: errors.first_name })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "last_name", className: "flex items-center gap-2", children: [_jsx(LuUser, { size: 16, className: "text-violet-600" }), "Apellidos"] }), _jsx(Input, { id: "last_name", name: "last_name", value: user.last_name || "", onChange: handleChange, disabled: !isEditing }), errors.last_name && _jsx("p", { className: "text-sm text-red-500", children: errors.last_name })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "email", className: "flex items-center gap-2", children: [_jsx(LuMail, { size: 16, className: "text-violet-600" }), "Correo Electr\u00F3nico"] }), _jsx(Input, { id: "email", value: user.email || "", disabled: true })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "phone", className: "flex items-center gap-2", children: [_jsx(LuPhone, { size: 16, className: "text-violet-600" }), "Tel\u00E9fono"] }), _jsx(Input, { id: "phone", name: "phone", value: user.phone || "", onChange: handleChange, disabled: !isEditing }), errors.phone && _jsx("p", { className: "text-sm text-red-500", children: errors.phone })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "gender", className: "flex items-center gap-2", children: [user.gender === "male" ? (_jsx(LuUsb, { size: 16, className: "text-violet-600" })) : (_jsx(LuVariable, { size: 16, className: "text-violet-600" })), "G\u00E9nero"] }), _jsxs(Select, { value: user.gender || "", disabled: !isEditing, onValueChange: handleGenderChange, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecciona tu g\u00E9nero" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "male", children: "Masculino" }), _jsx(SelectItem, { value: "female", children: "Femenino" }), _jsx(SelectItem, { value: "other", children: "Otro" })] })] }), errors.gender && _jsx("p", { className: "text-sm text-red-500", children: errors.gender })] })] }), user.role === "admin" && (_jsxs("div", { className: "pt-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(LuShield, { size: 16, className: "text-violet-600" }), _jsx(Label, { htmlFor: "role", className: "font-medium", children: "Rol de Administrador" })] }), _jsx(Switch, { id: "role", checked: true, disabled: true })] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1 ml-6", children: "Los administradores tienen acceso a funciones adicionales" })] }))] })] }));
}
