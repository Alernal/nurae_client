import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/components/admin-sidebar";

export default function ClientLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar responsivo */}
      <aside className="w-full md:w-72 h-16 md:h-screen border-b md:border-b-0 md:border-r border-gray-200 bg-white flex-shrink-0">
        <AdminSidebar />
      </aside>

      {/* Contenido principal con scroll interno */}
      <main className="flex-1 h-[calc(100vh-4rem)] md:h-screen overflow-y-auto p-4 md:p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
}
