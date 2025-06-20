import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LuPlus, LuMapPin, LuPencil, LuTrash2 } from "react-icons/lu";
export default function AddressSelector({ addresses = [], selectedAddressId, onSelectAddress, onAddNewClick, onEditAddress, onDeleteAddress, type, }) {
    const [hoveredAddressId, setHoveredAddressId] = useState(null);
    return (_jsx("div", { className: "space-y-4", children: (addresses && addresses.length > 0) ? (_jsx(RadioGroup, { value: selectedAddressId?.toString() || "", onValueChange: (value) => {
                const address = addresses.find((a) => a.id === Number.parseInt(value));
                if (address)
                    onSelectAddress(address);
            }, className: "space-y-3", children: addresses.map((address) => (_jsxs("div", { className: "relative", onMouseEnter: () => setHoveredAddressId(address.id), onMouseLeave: () => setHoveredAddressId(null), children: [_jsx(Card, { className: `border ${selectedAddressId === address.id
                            ? "border-amber-500 bg-amber-50"
                            : "border-gray-200 hover:border-amber-300"} transition-all`, children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(RadioGroupItem, { value: address.id.toString(), id: `address-${address.id}`, className: "mt-1 border-amber-300 text-amber-600" }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs(Label, { htmlFor: `address-${address.id}`, className: "font-medium text-gray-900 cursor-pointer flex items-center gap-2", children: [address.first_name, " ", address.last_name, address.is_default && (_jsx("span", { className: "bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full", children: "Predeterminada" }))] }) }), _jsxs("div", { className: "mt-1 text-sm text-gray-600 space-y-1", children: [_jsxs("p", { children: [address.street_address, address.apartment ? `, ${address.apartment}` : ""] }), _jsxs("p", { children: [address.city, ", ", address.state, ", ", address.postal_code] }), _jsx("p", { children: address.country }), _jsxs("p", { className: "text-gray-500", children: [address.phone, " \u2022 ", address.email] }), type === "billing" && address.document_type && (_jsxs("p", { className: "text-gray-500", children: [address.document_type, ": ", address.document_number] })), address.notes && _jsxs("p", { className: "italic text-gray-500", children: ["\"", address.notes, "\""] })] })] }), _jsx("div", { className: "flex flex-col items-center justify-center", children: _jsx(LuMapPin, { className: "w-5 h-5 text-amber-600" }) })] }) }) }), hoveredAddressId === address.id && (onEditAddress || onDeleteAddress) && (_jsxs("div", { className: "absolute top-2 right-2 flex space-x-1", children: [onEditAddress && (_jsxs(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full bg-white border border-gray-200 hover:bg-amber-50 hover:text-amber-600", onClick: (e) => {
                                    e.stopPropagation();
                                    onEditAddress(address);
                                }, children: [_jsx(LuPencil, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Editar" })] })), onDeleteAddress && (_jsxs(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600", onClick: (e) => {
                                    e.stopPropagation();
                                    onDeleteAddress(address.id);
                                }, children: [_jsx(LuTrash2, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Eliminar" })] }))] }))] }, address.id))) })) : (_jsxs("div", { className: "text-center p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50", children: [_jsx(LuMapPin, { className: "w-10 h-10 text-gray-400 mx-auto mb-2" }), _jsx("h3", { className: "text-gray-600 font-medium", children: "No hay direcciones guardadas" }), _jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Agrega una nueva direcci\u00F3n para continuar" })] })) }));
}
