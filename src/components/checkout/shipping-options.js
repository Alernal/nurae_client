import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LuTruck, LuClock } from "react-icons/lu";
export default function ShippingOptions({ shippingType, onShippingTypeChange, observations, onObservationsChange, }) {
    const shippingOptions = [
        {
            id: "standard",
            name: "Envío Estándar",
            description: "3-5 días hábiles",
            price: "Gratis en compras > $150.000",
            icon: LuTruck,
        },
    ];
    return (_jsxs(Card, { className: "border-amber-200 shadow-lg", children: [_jsx(CardHeader, { className: "bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200", children: _jsxs(CardTitle, { className: "flex items-center space-x-2 text-amber-900", children: [_jsx(LuTruck, { className: "w-5 h-5" }), _jsx("span", { children: "Metodos de Env\u00EDo" })] }) }), _jsxs(CardContent, { className: "p-6 space-y-6", children: [_jsx("div", { className: "space-y-4", children: _jsx(RadioGroup, { value: shippingType, onValueChange: onShippingTypeChange, className: "space-y-3", children: shippingOptions.map((option) => {
                                const IconComponent = option.icon;
                                return (_jsxs("div", { className: "flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-amber-300 transition-colors", children: [_jsx(RadioGroupItem, { value: option.id, id: option.id, className: "border-amber-300 text-amber-600" }), _jsx(IconComponent, { className: "w-5 h-5 text-amber-600" }), _jsxs("div", { className: "flex-1", children: [_jsx(Label, { htmlFor: option.id, className: "font-medium text-gray-900 cursor-pointer", children: option.name }), _jsx("p", { className: "text-sm text-gray-600", children: option.description }), _jsx("p", { className: "text-sm font-medium text-amber-700", children: option.price })] })] }, option.id));
                            }) }) }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "observations", className: "text-gray-700 font-medium", children: "Observaciones (Opcional)" }), _jsx(Textarea, { id: "observations", value: observations, onChange: (e) => onObservationsChange(e.target.value), placeholder: "Instrucciones especiales para la entrega...", className: "border-gray-300 focus:border-amber-500 focus:ring-amber-500 min-h-[80px]" })] })] })] }));
}
