import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Button } from "@/components/ui/button";
export function ProductGallery({ images, selectedImage, onImageSelect, productName }) {
    const nextImage = () => {
        onImageSelect((selectedImage + 1) % images.length);
    };
    const prevImage = () => {
        onImageSelect(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden group", children: [_jsx("img", { src: images[selectedImage] || "/placeholder.svg", alt: `${productName} - Vista ${selectedImage + 1}`, className: "object-cover transition-transform duration-500 group-hover:scale-105" }), _jsx(Button, { variant: "ghost", size: "icon", className: "absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity", onClick: prevImage, children: _jsx(LuChevronLeft, { className: "h-5 w-5" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity", onClick: nextImage, children: _jsx(LuChevronRight, { className: "h-5 w-5" }) }), _jsxs("div", { className: "absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm", children: [selectedImage + 1, " / ", images.length] })] }), _jsx("div", { className: "grid grid-cols-5 gap-3", children: images.map((image, index) => (_jsx("button", { onClick: () => onImageSelect(index), className: `relative aspect-square rounded-lg overflow-hidden transition-all duration-200 ${selectedImage === index
                        ? "ring-2 ring-primary ring-offset-2 scale-105"
                        : "hover:scale-105 opacity-70 hover:opacity-100"}`, children: _jsx("img", { src: image || "/placeholder.svg", alt: `${productName} - Miniatura ${index + 1}`, className: "object-cover" }) }, index))) })] }));
}
