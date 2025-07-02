import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-[#fff]">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
