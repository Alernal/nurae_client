import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { LuShield, LuBadgeCheck, LuEye, LuEyeOff } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { z } from "zod";
import { changePasswordSchema } from "@/schemas/updateProfileSchema";
import { useChangePassword } from "@/hooks/user/useChangePassword";
export default function ProfileSecurity({ user }) {
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: "",
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const { mutate: changePassword, isPending } = useChangePassword();
    const handlePasswordChange = (field, value) => {
        setPasswords((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const updatePassword = () => {
        try {
            const validated = changePasswordSchema.parse(passwords);
            changePassword({
                current: validated.current,
                new: validated.new,
            }, {
                onSuccess: () => {
                    setPasswords({ current: "", new: "", confirm: "" });
                },
            });
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors = {};
                err.errors.forEach((e) => {
                    fieldErrors[e.path[0]] = e.message;
                });
                setErrors(fieldErrors);
            }
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { className: "border-none shadow-lg", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Cambiar Contrase\u00F1a" }), _jsx(CardDescription, { children: "Actualiza tu contrase\u00F1a para mantener tu cuenta segura" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "current-password", children: "Contrase\u00F1a Actual" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "current-password", type: showCurrentPassword ? "text" : "password", value: passwords.current, onChange: (e) => handlePasswordChange("current", e.target.value), className: "pr-10 border-violet-300 focus-visible:ring-violet-500" }), _jsx("button", { type: "button", onClick: () => setShowCurrentPassword(!showCurrentPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700", children: showCurrentPassword ? (_jsx(LuEyeOff, { size: 16 })) : (_jsx(LuEye, { size: 16 })) })] }), errors.current && (_jsx("p", { className: "text-sm text-red-500", children: errors.current }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "new-password", children: "Nueva Contrase\u00F1a" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "new-password", type: showNewPassword ? "text" : "password", value: passwords.new, onChange: (e) => handlePasswordChange("new", e.target.value), className: "pr-10 border-violet-300 focus-visible:ring-violet-500" }), _jsx("button", { type: "button", onClick: () => setShowNewPassword(!showNewPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700", children: showNewPassword ? _jsx(LuEyeOff, { size: 16 }) : _jsx(LuEye, { size: 16 }) })] }), errors.new && _jsx("p", { className: "text-sm text-red-500", children: errors.new })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "confirm-password", children: "Confirmar Nueva Contrase\u00F1a" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "confirm-password", type: showConfirmPassword ? "text" : "password", value: passwords.confirm, onChange: (e) => handlePasswordChange("confirm", e.target.value), className: "pr-10 border-violet-300 focus-visible:ring-violet-500" }), _jsx("button", { type: "button", onClick: () => setShowConfirmPassword(!showConfirmPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700", children: showConfirmPassword ? (_jsx(LuEyeOff, { size: 16 })) : (_jsx(LuEye, { size: 16 })) })] }), errors.confirm && (_jsx("p", { className: "text-sm text-red-500", children: errors.confirm }))] })] }), _jsx(CardFooter, { children: _jsx(Button, { onClick: updatePassword, className: "w-full bg-violet-600 hover:bg-violet-700", disabled: isPending ||
                                !passwords.current ||
                                !passwords.new ||
                                !passwords.confirm, children: isPending ? "Guardando..." : "Actualizar Contraseña" }) })] }), _jsxs(Card, { className: "border-none shadow-lg mt-6", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Verificaci\u00F3n de Cuenta" }), _jsx(CardDescription, { children: "Estado de verificaci\u00F3n de tu cuenta" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex items-center gap-3", children: user.is_verified ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-green-100 flex items-center justify-center", children: _jsx(LuBadgeCheck, { size: 20, className: "text-green-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Cuenta Verificada" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Tu cuenta ha sido verificada correctamente" })] })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center", children: _jsx(LuShield, { size: 20, className: "text-amber-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Cuenta Pendiente de Verificaci\u00F3n" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Verifica tu cuenta para acceder a todas las funciones" })] })] })) }), !user.is_verified && (_jsx(Button, { variant: "outline", className: "border-violet-300 text-violet-600 hover:bg-violet-50", children: "Verificar Ahora" }))] }) })] })] }));
}
