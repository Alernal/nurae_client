import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth-schema";
import { useLogin } from "@/hooks/auth/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { LuEye, LuEyeOff, LuMail, LuLock } from "react-icons/lu";
export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const { mutate: loginMutate, isPending } = useLogin();
    const onSubmit = (data) => {
        loginMutate(data, {
            onSuccess: async () => {
                navigate("/");
            },
        });
    };
    return (_jsx("div", { className: "min-h-screen bg-white flex items-center justify-center p-4", children: _jsxs("div", { className: "w-full max-w-md", children: [_jsx("div", { className: "text-center mb-8", children: _jsx("div", { className: "w-50 h-20 mx-auto mb-4", children: _jsx("img", { src: "/logo.png", alt: "L\u00DAMINA", className: "object-contain mx-auto" }) }) }), _jsxs(Card, { className: "shadow-lg border border-gray-100", children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx(CardTitle, { className: "text-2xl text-gray-800 font-semibold", children: "Bienvenido" }), _jsx(CardDescription, { className: "text-gray-500", children: "Inicia sesi\u00F3n en tu cuenta para continuar" })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", className: "text-gray-700", children: "Email" }), _jsxs("div", { className: "relative", children: [_jsx(LuMail, { className: "absolute left-3 top-3 h-4 w-4 text-gray-400" }), _jsx(Input, { id: "email", type: "email", placeholder: "tu@email.com", className: "pl-10 outline-none focus:outline-none focus:ring-0", tabIndex: -1, ...register("email") })] }), errors.email && (_jsx("p", { className: "text-sm text-red-600", children: errors.email.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", className: "text-gray-700", children: "Contrase\u00F1a" }), _jsxs("div", { className: "relative", children: [_jsx(LuLock, { className: "absolute left-3 top-3 h-4 w-4 text-gray-400" }), _jsx(Input, { id: "password", type: showPassword ? "text" : "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "pl-10 pr-10", ...register("password") }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-3 text-gray-400 hover:text-yellow-600", children: showPassword ? (_jsx(LuEyeOff, { className: "h-4 w-4" })) : (_jsx(LuEye, { className: "h-4 w-4" })) })] }), errors.password && (_jsx("p", { className: "text-sm text-red-600", children: errors.password.message }))] }), _jsx(Button, { type: "submit", className: "w-full bg-[#D4AF37] hover:bg-yellow-600 text-white font-medium transition disabled:opacity-70", disabled: isPending, children: isPending ? "Iniciando sesión..." : "Iniciar Sesión" })] }) })] }), _jsx("div", { className: "text-center mt-6", children: _jsxs("p", { className: "text-sm text-gray-600", children: ["\u00BFNo tienes cuenta?", " ", _jsx(Link, { to: "/register", className: "text-[#D4AF37] font-medium hover:underline", children: "Reg\u00EDstrate aqu\u00ED" })] }) })] }) }));
}
