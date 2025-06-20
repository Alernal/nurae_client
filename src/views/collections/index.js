import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { LuGrid2X2, LuList, LuChevronDown } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/product-card";
import { useProducts } from "@/hooks/products/useProducts";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function CollectionsPage() {
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("featured");
    const [priceRange, setPriceRange] = useState([0, 1500000]);
    const [appliedPriceRange, setAppliedPriceRange] = useState(undefined);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    useEffect(() => {
        setPage(1);
    }, [sortBy, selectedCategories, selectedMaterials, appliedPriceRange]);
    const { data: productsData, isLoading } = useProducts({
        categories: selectedCategories.length ? selectedCategories : undefined,
        materials: selectedMaterials.length ? selectedMaterials : undefined,
        price_min: appliedPriceRange?.[0],
        price_max: appliedPriceRange?.[1],
        sort: sortBy !== "featured" ? sortBy : undefined,
        page,
    });
    const products = productsData?.data || [];
    const currentPage = productsData?.current_page || 1;
    const lastPage = productsData?.last_page || 1;
    const [viewMode, setViewMode] = useState("grid");
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const urlCategory = searchParams.get("category");
        if (urlCategory && categories.some((c) => c.value === urlCategory)) {
            setSelectedCategories([urlCategory]);
        }
    }, [searchParams]);
    const navigate = useNavigate();
    const hasInteractedRef = useRef(false);
    useEffect(() => {
        if (!hasInteractedRef.current)
            return;
        const timeout = setTimeout(() => {
            setAppliedPriceRange(priceRange);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [priceRange]);
    useEffect(() => {
        if (selectedCategories.length === 1) {
            navigate(`/collections?category=${selectedCategories[0]}`, {
                replace: true,
            });
        }
        else {
            navigate(`/collections`, { replace: true });
        }
    }, [selectedCategories]);
    const categories = [
        { label: "Collares", value: "collares" },
        { label: "Aretes", value: "aretes" },
        { label: "Pulseras", value: "pulseras" },
        { label: "Anillos", value: "anillos" },
    ];
    const materials = [
        { label: "Oro", value: "oro" },
        { label: "Plata", value: "plata" },
        { label: "Cristal", value: "cristal" },
        { label: "Perla", value: "perla" },
        { label: "Acero", value: "acero" },
    ];
    return (_jsxs("div", { className: "container px-4 py-8 md:px-6 md:py-12", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-4xl md:text-5xl font-serif font-bold text-black mb-4", children: "Toda la Colecci\u00F3n" }), _jsx("p", { className: "text-lg text-gray-600 max-w-2xl", children: "Descubre nuestra colecci\u00F3n completa de accesorios \u00FAnicos dise\u00F1ados para mujeres que brillan con luz propia." })] }), _jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [_jsxs("aside", { className: "w-full lg:w-64 border rounded-xl p-4 bg-white shadow-sm", children: [_jsx("h3", { className: "font-semibold text-lg mb-4", children: "Filtros" }), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "text-sm font-medium mb-2", children: "Categor\u00EDas" }), categories.map((cat) => (_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx(Checkbox, { id: cat.value, checked: selectedCategories.includes(cat.value), onCheckedChange: (checked) => setSelectedCategories((prev) => checked
                                                    ? [...prev, cat.value]
                                                    : prev.filter((c) => c !== cat.value)) }), _jsx(Label, { htmlFor: cat.value, className: "text-sm", children: cat.label })] }, cat.value)))] }), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "text-sm font-medium mb-2", children: "Material" }), materials.map((mat) => (_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx(Checkbox, { id: mat.value, checked: selectedMaterials.includes(mat.value), onCheckedChange: (checked) => setSelectedMaterials((prev) => checked
                                                    ? [...prev, mat.value]
                                                    : prev.filter((m) => m !== mat.value)) }), _jsx(Label, { htmlFor: mat.value, className: "text-sm", children: mat.label })] }, mat.value)))] }), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "text-sm font-medium mb-2", children: "Precio" }), _jsx(Slider, { value: priceRange, onValueChange: (value) => {
                                            hasInteractedRef.current = true;
                                            setPriceRange(value);
                                        }, max: 1500000, step: 10000 }), _jsxs("div", { className: "flex justify-between text-xs mt-2", children: [_jsxs("span", { children: ["$", priceRange[0]] }), _jsxs("span", { children: ["$", priceRange[1]] })] })] }), _jsx(Button, { variant: "outline", className: "w-full", onClick: () => {
                                    setSelectedCategories([]);
                                    setSelectedMaterials([]);
                                    setPriceRange([0, 1500000]);
                                    setAppliedPriceRange(undefined);
                                }, children: "Limpiar filtros" })] }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-100", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { className: "text-sm text-gray-600", children: isLoading
                                                    ? "Cargando productos..."
                                                    : `Mostrando ${products.length} productos` }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: viewMode === "grid" ? "default" : "outline", size: "sm", onClick: () => setViewMode("grid"), children: _jsx(LuGrid2X2, { className: "h-4 w-4" }) }), _jsx(Button, { variant: viewMode === "list" ? "default" : "outline", size: "sm", onClick: () => setViewMode("list"), children: _jsx(LuList, { className: "h-4 w-4" }) })] })] }), _jsxs(Select, { value: sortBy, onValueChange: setSortBy, children: [_jsx(SelectTrigger, { className: "w-48", children: _jsx(SelectValue, { placeholder: "Ordenar por" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "featured", children: "Destacados" }), _jsx(SelectItem, { value: "newest", children: "M\u00E1s recientes" }), _jsx(SelectItem, { value: "price-low", children: "Precio: Menor a Mayor" }), _jsx(SelectItem, { value: "price-high", children: "Precio: Mayor a Menor" }), _jsx(SelectItem, { value: "rating", children: "Mejor calificados" })] })] })] }), _jsx("div", { className: cn("grid gap-6", viewMode === "grid"
                                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                    : "grid-cols-1"), children: products.map((product) => (_jsx(ProductCard, { product: product, viewMode: viewMode }, product.id))) }), _jsx("div", { className: "mt-12 flex justify-center", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", size: "icon", onClick: () => setPage((prev) => Math.max(prev - 1, 1)), disabled: currentPage === 1, children: _jsx(LuChevronDown, { className: "h-4 w-4 rotate-90" }) }), [...Array(lastPage)].map((_, i) => (_jsx(Button, { variant: currentPage === i + 1 ? "default" : "outline", onClick: () => setPage(i + 1), children: i + 1 }, i))), _jsx(Button, { variant: "outline", size: "icon", onClick: () => setPage((prev) => Math.min(prev + 1, lastPage)), disabled: currentPage === lastPage, children: _jsx(LuChevronDown, { className: "h-4 w-4 -rotate-90" }) })] }) })] })] })] }));
}
