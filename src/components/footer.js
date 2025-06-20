import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { LuCrown, LuSparkles, LuPhone, LuMail, LuMapPin, LuInstagram, LuFacebook, LuTwitter, LuYoutube, } from "react-icons/lu";
import { Button } from "@/components/ui/button";
export function Footer() {
    return (_jsx("footer", { className: "w-full bg-white py-16 md:py-20", children: _jsxs("div", { className: "container px-4 md:px-6 flex flex-col gap-16", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-12", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative", children: [_jsx(LuCrown, { className: "h-10 w-10 text-[#D4AF37]" }), _jsx(LuSparkles, { className: "h-5 w-5 text-[#2C1810] absolute -top-1 -right-1 animate-pulse" })] }), _jsxs("div", { children: [_jsx("span", { className: "font-serif text-3xl font-bold text-[#2C1810] tracking-wider block", children: "NURAE" }), _jsx("span", { className: "text-xs text-[#5C4A42] font-display tracking-widest", children: "ACCESORIOS" })] })] }), _jsx("p", { className: "text-[#5C4A42] leading-relaxed", children: "Joyas que celebran tu esencia. Dise\u00F1adas para inspirarte a brillar con elegancia todos los d\u00EDas." }), _jsx("div", { className: "flex gap-4", children: [LuInstagram, LuFacebook, LuTwitter, LuYoutube].map((Icon, i) => (_jsx(Button, { variant: "ghost", size: "icon", className: "hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] text-[#2C1810] transition-all duration-300 rounded-full", children: _jsx(Icon, { className: "h-5 w-5" }) }, i))) })] }), _jsx("div", { className: "lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8", children: [
                                {
                                    title: "Comprar",
                                    links: [
                                        ["Todas las Colecciones", "/collections"],
                                        ["Collares", "/collections/necklaces"],
                                        ["Aretes", "/collections/earrings"],
                                        ["Pulseras", "/collections/bracelets"],
                                        ["Anillos", "/collections/rings"],
                                        ["Novedades", "/new"],
                                        ["Más Vendidos", "/bestsellers"],
                                        ["Ofertas", "/sale"],
                                    ],
                                },
                                {
                                    title: "Empresa",
                                    links: [
                                        ["Sobre Nosotros", "/about"],
                                        ["Blog", "/blog"],
                                        ["Carreras", "/careers"],
                                        ["Prensa", "/press"],
                                        ["Sostenibilidad", "/sustainability"],
                                        ["Contacto", "/contact"],
                                    ],
                                },
                                {
                                    title: "Ayuda",
                                    links: [
                                        ["Preguntas Frecuentes", "/faq"],
                                        ["Envíos y Entregas", "/shipping"],
                                        ["Devoluciones", "/returns"],
                                        ["Guía de Tallas", "/size-guide"],
                                        ["Cuidado de Joyas", "/care"],
                                        ["Garantía", "/warranty"],
                                        ["Soporte", "/support"],
                                    ],
                                },
                                {
                                    title: "Contacto",
                                    custom: true,
                                },
                            ].map((section, i) => (_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-serif font-bold text-lg text-[#2C1810]", children: section.title }), section.custom ? (_jsxs(_Fragment, { children: [_jsxs("ul", { className: "space-y-3 text-[#5C4A42]", children: [_jsxs("li", { className: "flex items-center gap-2", children: [_jsx(LuPhone, { className: "h-4 w-4 text-[#D4AF37]" }), "+57 1 234 5678"] }), _jsxs("li", { className: "flex items-center gap-2", children: [_jsx(LuMail, { className: "h-4 w-4 text-[#D4AF37]" }), "contacto@nurae.co"] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx(LuMapPin, { className: "h-4 w-4 text-[#D4AF37] mt-1" }), _jsxs("span", { children: ["Carrera 16 #15a-144", _jsx("br", {}), "Sincelejo, Colombia 700001"] })] })] }), _jsxs("div", { className: "mt-4 space-y-1 text-sm text-[#5C4A42]", children: [_jsx("strong", { className: "font-medium", children: "Horarios:" }), _jsx("p", { children: "Lun-Vie: 9:00 - 19:00" }), _jsx("p", { children: "S\u00E1b: 10:00 - 18:00" }), _jsx("p", { children: "Dom: 11:00 - 17:00" })] })] })) : (_jsx("ul", { className: "space-y-3", children: section.links?.map(([label, href], idx) => (_jsx("li", { children: _jsx(Link, { to: href, className: "text-[#5C4A42] hover:text-[#2C1810] transition-colors font-display", children: label }) }, idx))) }))] }, i))) })] }), _jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-6 border-t border-[#E7D8CE] pt-8", children: [_jsx("p", { className: "text-sm text-[#5C4A42] font-display text-center md:text-left", children: "\u00A9 2025 NURAE. Hecho con \uD83D\uDC96 para mujeres extraordinarias." }), _jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2 text-[#5C4A42] font-display", children: [_jsx("span", { children: "Aceptamos:" }), ["VISA", "MC", "AMEX", "PP"].map((label, idx) => (_jsx("div", { className: "h-8 w-12 rounded bg-white text-[#2C1810] border border-[#D4AF37]/30 shadow-sm flex items-center justify-center font-bold text-xs", children: label }, idx)))] }), _jsx("div", { className: "flex items-center gap-4", children: ["/privacy", "/terms", "/cookies"].map((path, idx) => (_jsx(Link, { to: path, className: "text-[#5C4A42] hover:text-[#2C1810] transition-colors font-display", children: path.includes("privacy") ? "Privacidad" : path.includes("terms") ? "Términos" : "Cookies" }, idx))) })] })] })] }) }));
}
