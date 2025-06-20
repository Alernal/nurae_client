import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    return (_jsxs(_Fragment, { children: [_jsx(ScrollToTop, {}), _jsxs("div", { className: "flex min-h-screen flex-col bg-[#F5EFE7]", children: [_jsx(Header, {}), _jsx("main", { children: _jsx(Outlet, {}) }), _jsx(Footer, {})] })] }));
}
