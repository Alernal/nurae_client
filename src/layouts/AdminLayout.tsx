import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminLayout() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-nurae-cream">
            {/* Sidebar responsivo */}
            <div className="w-full md:w-72 h-16 md:h-screen border-b md:border-b-0 md:border-r border-nurae-sand bg-white flex-shrink-0">
                <AdminSidebar />
            </div>

            {/* Contenido con scroll interno */}
            <main className="flex-1 h-[calc(100vh-4rem)] md:h-screen overflow-y-auto p-4 md:p-6">
                <Outlet />
            </main> 
        </div>
    );
}
