import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuMapPin, LuPlus } from "react-icons/lu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AddressSelector from "./address-selector";
import { AddressForm } from "../addresses/address-form";
import { useAddresses } from "@/hooks/addresses/useAddresses";
import { useCreateAddress } from "@/hooks/addresses/useCreateAddress";
import { useUpdateAddress } from "@/hooks/addresses/useUpdateAddress";
import { useDeleteAddress } from "@/hooks/addresses/useDeleteAddress";
import { useSetDefaultAddress } from "@/hooks/addresses/useSetDefaultAddress";
export default function BillingInfoForm({ selectedAddress, onAddressSelect, }) {
    const { data: addresses = [], isLoading, isError } = useAddresses();
    const { mutate: createAddress } = useCreateAddress();
    const { mutate: updateAddress } = useUpdateAddress();
    const { mutate: deleteAddress } = useDeleteAddress();
    const { mutate: setDefaultAddress } = useSetDefaultAddress();
    const [openDialog, setOpenDialog] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const handleCreate = (data) => {
        createAddress(data, {
            onSuccess: () => {
                setOpenDialog(false);
                setEditingAddress(null);
            },
        });
    };
    const handleUpdate = (data) => {
        if (!editingAddress)
            return;
        updateAddress({ id: editingAddress.id, data }, {
            onSuccess: () => {
                setOpenDialog(false);
                setEditingAddress(null);
            },
        });
    };
    const handleSubmit = (data) => {
        editingAddress ? handleUpdate(data) : handleCreate(data);
    };
    useEffect(() => {
        if (!selectedAddress && addresses.length > 0) {
            const defaultAddress = addresses.find((a) => a.is_default);
            if (defaultAddress) {
                onAddressSelect(defaultAddress);
            }
        }
    }, [addresses, selectedAddress, onAddressSelect]);
    const handleAddressSelect = (address) => {
        onAddressSelect(address); // esto actualiza el estado local
        setDefaultAddress(address.id); // esto actualiza en la API
    };
    return (_jsxs(Card, { className: "border-amber-200 shadow-lg", children: [_jsx(CardHeader, { className: "bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200", children: _jsxs(CardTitle, { className: "flex items-center space-x-2 text-amber-900", children: [_jsx(LuMapPin, { className: "w-5 h-5" }), _jsx("span", { children: "Datos de Facturaci\u00F3n y Env\u00EDo" })] }) }), _jsx(CardContent, { className: "p-6 space-y-4", children: isLoading ? (_jsx("p", { className: "text-muted-foreground", children: "Cargando direcciones..." })) : isError ? (_jsx("p", { className: "text-red-600", children: "Error al cargar direcciones" })) : (_jsxs(_Fragment, { children: [_jsx(AddressSelector, { type: "billing", addresses: addresses, selectedAddressId: selectedAddress?.id || null, onSelectAddress: handleAddressSelect, onEditAddress: (address) => {
                                setEditingAddress(address);
                                setOpenDialog(true);
                            }, onDeleteAddress: (id) => {
                                setDeletingId(id);
                                deleteAddress(id, { onSettled: () => setDeletingId(null) });
                            } }), _jsxs(Dialog, { open: openDialog, onOpenChange: (open) => {
                                if (!open)
                                    setEditingAddress(null);
                                setOpenDialog(open);
                            }, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", onClick: () => {
                                            setEditingAddress(null);
                                            setOpenDialog(true);
                                        }, children: [_jsx(LuPlus, { className: "mr-2 h-4 w-4" }), "Nueva Direcci\u00F3n"] }) }), _jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-center", children: editingAddress ? "Editar Dirección" : "Nueva Dirección" }) }), _jsx(Separator, {}), _jsx(AddressForm, { defaultValues: editingAddress ?? undefined, onSubmit: handleSubmit })] })] })] })) })] }));
}
