import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
const formatPrice = (price) => new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
}).format(price);
export default function FilterSidebar({ categories, materials, selectedCategories, setSelectedCategories, selectedMaterials, setSelectedMaterials, priceRange, setPriceRange, }) {
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "font-serif font-bold text-xl text-primary", children: "Filtros" }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium text-gray-800", children: "Categor\u00EDas" }), _jsx(Separator, {}), _jsx("div", { className: "space-y-3", children: categories.map((category) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: category, checked: selectedCategories.includes(category), onCheckedChange: (checked) => {
                                        if (checked) {
                                            setSelectedCategories([...selectedCategories, category]);
                                        }
                                        else {
                                            setSelectedCategories(selectedCategories.filter((c) => c !== category));
                                        }
                                    } }), _jsx(Label, { htmlFor: category, className: "text-sm cursor-pointer", children: category })] }, category))) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium text-gray-800", children: "Rango de Precio" }), _jsx(Separator, {}), _jsx(Slider, { value: priceRange, onValueChange: setPriceRange, max: 300000, step: 10000, className: "w-full" }), _jsxs("div", { className: "flex justify-between text-sm text-gray-600", children: [_jsx("span", { children: formatPrice(priceRange[0]) }), _jsx("span", { children: formatPrice(priceRange[1]) })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium text-gray-800", children: "Material" }), _jsx(Separator, {}), _jsx("div", { className: "space-y-3", children: materials.map((material) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: material, checked: selectedMaterials.includes(material), onCheckedChange: (checked) => {
                                        if (checked) {
                                            setSelectedMaterials([...selectedMaterials, material]);
                                        }
                                        else {
                                            setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
                                        }
                                    } }), _jsx(Label, { htmlFor: material, className: "text-sm cursor-pointer", children: material })] }, material))) })] }), _jsx(Button, { variant: "outline", className: "w-full", onClick: () => {
                    setSelectedCategories([]);
                    setSelectedMaterials([]);
                    setPriceRange([0, 300000]);
                }, children: "Limpiar Filtros" })] }));
}
