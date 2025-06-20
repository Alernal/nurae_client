import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/stores/useAuthStore";
import ProfileSidebar from "@/components/profile/profile-sidebar";
import ProfilePersonalInfo from "@/components/profile/profile-person-info";
import ProfileSecurity from "@/components/profile/profile-security";
export default function Profile() {
    const authUser = useAuthStore((state) => state.user);
    const [user, setUser] = useState(authUser);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    return (_jsx("div", { className: "container mx-auto py-8 px-4 max-w-5xl", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-8", children: [_jsx(ProfileSidebar, { user: user, setUser: setUser, isUploading: isUploading, setIsUploading: setIsUploading }), _jsx("div", { className: "w-full md:w-2/3", children: _jsxs(Tabs, { defaultValue: "details", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2 mb-6", children: [_jsx(TabsTrigger, { value: "details", children: "Datos Personales" }), _jsx(TabsTrigger, { value: "security", children: "Seguridad" })] }), _jsx(TabsContent, { value: "details", children: _jsx(ProfilePersonalInfo, { user: user, setUser: setUser, isEditing: isEditing, setIsEditing: setIsEditing }) }), _jsx(TabsContent, { value: "security", children: _jsx(ProfileSecurity, { user: user }) })] }) })] }) }));
}
