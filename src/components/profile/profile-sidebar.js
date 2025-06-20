import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef } from "react";
import { LuBadgeCheck, LuUpload } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUploadProfileImage } from "@/hooks/user/useUploadProfileImage";
export default function ProfileSidebar({ user, setUser, isUploading, setIsUploading, }) {
    const fileInputRef = useRef(null);
    const { mutate: uploadProfileImage } = useUploadProfileImage();
    const baseUrl = "http://localhost:8000";
    const imageUrl = user.profile_image_url
        ? `${baseUrl}${user.profile_image_url}`
        : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png";
    const handleProfileImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        setIsUploading(true);
        uploadProfileImage(file, {
            onSuccess: (data) => {
                setUser((prev) => ({
                    ...prev,
                    profile_image_url: data?.data?.profile_image_url ?? data?.profile_image_url,
                }));
            },
            onSettled: () => {
                setIsUploading(false);
            },
        });
    };
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };
    return (_jsx("div", { className: "w-full md:w-1/3", children: _jsxs(Card, { className: "border-none shadow-lg", children: [_jsx(CardHeader, { className: "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-t-lg", children: _jsx(CardTitle, { className: "text-center", children: "Mi Perfil" }) }), _jsxs(CardContent, { className: "flex flex-col items-center pt-6 pb-8", children: [_jsxs("div", { className: "relative mb-4 group", children: [_jsxs("div", { className: `relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 ${isUploading ? "opacity-50" : ""}`, style: {
                                        boxShadow: "0 4px 16px rgba(80, 0, 120, 0.15)",
                                        transition: "box-shadow 0.2s",
                                    }, children: [_jsx("img", { src: imageUrl, alt: "Profile", className: "object-cover w-full h-full rounded-full select-none", draggable: false }), isUploading && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/30 rounded-full", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-white" }) }))] }), _jsx("button", { onClick: triggerFileInput, className: "absolute bottom-0 right-0 bg-violet-600 hover:bg-violet-700 text-white p-2 rounded-full shadow-lg transition-all duration-200", disabled: isUploading, children: _jsx(LuUpload, { size: 16 }) }), _jsx("input", { type: "file", ref: fileInputRef, onChange: handleProfileImageUpload, accept: "image/*", className: "hidden" })] }), _jsxs("h2", { className: "text-xl font-bold mt-2", children: [user.first_name, " ", user.last_name] }), _jsx("p", { className: "text-muted-foreground", children: user.email }), _jsxs("div", { className: "flex items-center mt-2 gap-2", children: [_jsx(Badge, { variant: user.role === "admin" ? "destructive" : "secondary", className: "capitalize", children: user.role }), user.is_verified ? (_jsxs(Badge, { variant: "outline", className: "flex items-center gap-1 border-green-500 text-green-600", children: [_jsx(LuBadgeCheck, { size: 14 }), "Verificado"] })) : (_jsx(Badge, { variant: "outline", className: "flex items-center gap-1 border-yellow-500 text-yellow-600", children: "No verificado" }))] })] })] }) }));
}
