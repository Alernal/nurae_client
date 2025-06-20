import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { LuInstagram, LuHeart, LuMessageCircle, LuSparkles } from "react-icons/lu";
import { Button } from "@/components/ui/button";
const instagramPosts = [
    {
        id: 1,
        image: "/images/ig-1.jpg",
        likes: 1234,
        comments: 45,
        caption: "Brillando con nuestro nuevo collar ✨",
    },
    {
        id: 2,
        image: "/images/ig-2.jpg",
        likes: 987,
        comments: 32,
        caption: "Elegancia en cada detalle 💎",
    },
    {
        id: 3,
        image: "/images/ig-3.jpg",
        likes: 1567,
        comments: 78,
        caption: "Tu estilo, tu personalidad 🌟",
    },
    {
        id: 4,
        image: "/images/ig-4.jpg",
        likes: 2134,
        comments: 89,
        caption: "Lujo accesible para todas 💖",
    },
    {
        id: 5,
        image: "/images/ig-5.jpg",
        likes: 876,
        comments: 23,
        caption: "Cada pieza cuenta una historia ✨",
    },
    {
        id: 6,
        image: "/images/ig-6.jpg",
        likes: 1432,
        comments: 56,
        caption: "Brilla con luz propia 🌟",
    },
];
export function InstagramFeed() {
    return (_jsx("section", { className: "w-full py-20 md:py-28 bg-[#F5EFE7]", children: _jsxs("div", { className: "container px-4 md:px-6", children: [_jsxs("div", { className: "flex flex-col items-center text-center space-y-6 mb-16", children: [_jsxs("div", { className: "inline-flex items-center gap-3 rounded-full bg-[#D4AF37]/10 px-6 py-2 text-sm font-medium text-[#2C1810]", children: [_jsx(LuInstagram, { className: "h-5 w-5" }), _jsx("span", { className: "font-display", children: "S\u00EDguenos en Instagram" }), _jsx(LuSparkles, { className: "h-5 w-5" })] }), _jsx("h2", { className: "text-4xl md:text-6xl font-serif font-bold text-[#2C1810]", children: "#L\u00FAminaStyle" }), _jsx("p", { className: "text-xl md:text-2xl text-gray-700 max-w-3xl font-light leading-relaxed", children: "\u00DAnete a nuestra comunidad y comparte c\u00F3mo brillar con L\u00DAMINA" })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4", children: instagramPosts.map((post, index) => (_jsxs(Link, { to: "https://instagram.com/lumina", target: "_blank", className: "group relative aspect-square overflow-hidden rounded-2xl shadow-md bg-white", style: { animationDelay: `${index * 0.1}s` }, children: [_jsx("img", { src: post.image, alt: post.caption, className: "object-cover w-full h-full transition-transform group-hover:scale-110 duration-500" }), _jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" }), _jsxs("div", { className: "absolute inset-0 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: [_jsx("div", { className: "flex items-center justify-between text-sm mb-1", children: _jsxs("div", { className: "flex gap-3", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(LuHeart, { className: "h-4 w-4 fill-white" }), _jsx("span", { children: post.likes })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(LuMessageCircle, { className: "h-4 w-4" }), _jsx("span", { children: post.comments })] })] }) }), _jsx("p", { className: "text-xs line-clamp-2", children: post.caption })] }), _jsx("div", { className: "absolute top-3 right-3 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300", children: _jsx(LuInstagram, { className: "h-4 w-4 text-white" }) })] }, post.id))) }), _jsx("div", { className: "flex justify-center mt-12", children: _jsx(Link, { to: "https://instagram.com/lumina", target: "_blank", children: _jsxs(Button, { className: "bg-[#D4AF37] hover:bg-[#c19e32] text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition duration-300 group", children: [_jsx(LuInstagram, { className: "mr-2 h-5 w-5" }), "Seguir @L\u00FAminaStyle", _jsx(LuSparkles, { className: "ml-2 h-5 w-5 group-hover:animate-spin" })] }) }) })] }) }));
}
