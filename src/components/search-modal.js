import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { LuSearch, LuFilter, LuStar, LuHeart } from "react-icons/lu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";
const searchResults = [
    {
        id: 1,
        name: "Collar Cadena Rosa Dorada",
        price: 1290,
        image: "/placeholder.svg?height=100&width=100",
        category: "Collares",
        rating: 4.8,
        isNew: true,
    },
    {
        id: 2,
        name: "Aretes Cristal Malva",
        price: 890,
        image: "/placeholder.svg?height=100&width=100",
        category: "Aretes",
        rating: 4.9,
        isNew: false,
    },
    {
        id: 3,
        name: "Pulsera Eslabones Dorados",
        price: 990,
        image: "/placeholder.svg?height=100&width=100",
        category: "Pulseras",
        rating: 4.7,
        isNew: true,
    },
];
export function SearchModal({ isOpen, onClose }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 5000]);
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "max-w-4xl h-[80vh] p-0 bg-gradient-to-br from-pink-50 to-purple-50", children: [_jsx(DialogHeader, { className: "p-6 pb-0", children: _jsxs(DialogTitle, { className: "flex items-center gap-2 text-2xl font-serif", children: [_jsx(LuSearch, { className: "h-6 w-6 text-primary" }), "Buscar Productos"] }) }), _jsxs("div", { className: "flex flex-col h-full", children: [_jsx("div", { className: "px-6 pb-4", children: _jsxs("div", { className: "relative", children: [_jsx(LuSearch, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" }), _jsx(Input, { type: "text", placeholder: "\u00BFQu\u00E9 est\u00E1s buscando hoy?", className: "pl-10 pr-12 h-12 text-lg border-2 border-pink-200 focus:border-primary rounded-xl", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), autoFocus: true }), _jsx(Button, { variant: "ghost", size: "icon", className: "absolute right-2 top-1/2 transform -translate-y-1/2", onClick: () => setShowFilters(!showFilters), children: _jsx(LuFilter, { className: "h-5 w-5" }) })] }) }), _jsxs("div", { className: "flex flex-1 overflow-hidden", children: [showFilters && (_jsxs("div", { className: "w-80 border-r border-pink-200 p-6 overflow-y-auto bg-white/50", children: [_jsx("h3", { className: "font-serif font-bold text-lg mb-4", children: "Filtros" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-3", children: "Categor\u00EDas" }), _jsx("div", { className: "space-y-2", children: ["Collares", "Aretes", "Pulseras", "Anillos"].map((category) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: category }), _jsx(Label, { htmlFor: category, className: "text-sm", children: category })] }, category))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-3", children: "Rango de Precio" }), _jsxs("div", { className: "space-y-3", children: [_jsx(Slider, { value: priceRange, onValueChange: setPriceRange, max: 5000, step: 50, className: "w-full" }), _jsxs("div", { className: "flex justify-between text-sm text-gray-600", children: [_jsxs("span", { children: ["MXN $", priceRange[0]] }), _jsxs("span", { children: ["MXN $", priceRange[1]] })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-3", children: "Colores" }), _jsx("div", { className: "grid grid-cols-4 gap-2", children: [
                                                                "bg-pink-400",
                                                                "bg-purple-400",
                                                                "bg-amber-400",
                                                                "bg-emerald-400",
                                                                "bg-blue-400",
                                                                "bg-red-400",
                                                                "bg-gray-400",
                                                                "bg-rose-400",
                                                            ].map((color, index) => (_jsx("button", { className: `w-8 h-8 rounded-full ${color} border-2 border-white shadow-sm hover:scale-110 transition-transform` }, index))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-3", children: "Materiales" }), _jsx("div", { className: "space-y-2", children: ["Oro", "Plata", "Acero Inoxidable", "Cristal"].map((material) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: material }), _jsx(Label, { htmlFor: material, className: "text-sm", children: material })] }, material))) })] })] })] })), _jsx("div", { className: "flex-1 p-6 overflow-y-auto", children: searchQuery ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "font-serif text-lg", children: ["Resultados para \"", searchQuery, "\" (", searchResults.length, ")"] }), _jsx(Button, { variant: "outline", size: "sm", children: "Ordenar por relevancia" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: searchResults.map((product) => (_jsxs(Link, { to: `/products/${product.id}`, onClick: onClose, className: "group bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-100", children: [_jsxs("div", { className: "relative aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100", children: [_jsx("img", { src: product.image || "/placeholder.svg", alt: product.name, className: "object-cover" }), product.isNew && (_jsx("div", { className: "absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full", children: "Nuevo" })), _jsx(Button, { variant: "ghost", size: "icon", className: "absolute top-2 right-2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(LuHeart, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-xs text-primary font-medium uppercase", children: product.category }), _jsx("h4", { className: "font-medium text-gray-800 line-clamp-2 group-hover:text-primary transition-colors", children: product.name }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(LuStar, { className: "h-3 w-3 fill-amber-400 text-amber-400" }), _jsx("span", { className: "text-xs text-gray-600", children: product.rating })] }), _jsxs("p", { className: "font-serif font-bold text-primary", children: ["MXN $", product.price] })] })] }, product.id))) })] })) : (_jsxs("div", { className: "text-center space-y-4 mt-12", children: [_jsx(LuSearch, { className: "h-16 w-16 text-gray-300 mx-auto" }), _jsx("h3", { className: "text-lg font-medium text-gray-500", children: "Busca tu accesorio perfecto" }), _jsx("p", { className: "text-gray-400", children: "Escribe el nombre del producto, categor\u00EDa o material que buscas" }), _jsx("div", { className: "flex flex-wrap justify-center gap-2 mt-6", children: ["Collares", "Aretes", "Pulseras", "Anillos", "Oro", "Plata"].map((suggestion) => (_jsx(Button, { variant: "outline", size: "sm", onClick: () => setSearchQuery(suggestion), className: "rounded-full", children: suggestion }, suggestion))) })] })) })] })] })] }) }));
}
