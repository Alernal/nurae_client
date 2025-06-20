import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { LuTrash2, LuPlus, LuFlipHorizontal2, LuPencilLine, } from "react-icons/lu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, } from "@/components/ui/alert-dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AddressForm } from "@/components/addresses/address-form";
import { useAddresses } from "@/hooks/addresses/useAddresses";
import { useDeleteAddress } from "@/hooks/addresses/useDeleteAddress";
import { useCreateAddress } from "@/hooks/addresses/useCreateAddress";
import { useUpdateAddress } from "@/hooks/addresses/useUpdateAddress";
export default function ClientAddresses() {
    const { data: addresses = [], isLoading, isError } = useAddresses();
    const { mutate: deleteAddress } = useDeleteAddress();
    const { mutate: createAddress } = useCreateAddress();
    const { mutate: updateAddress } = useUpdateAddress();
    const [openDialog, setOpenDialog] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [editingAddress, setEditingAddress] = useState(null);
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
    return (_jsxs("div", { className: "container mx-auto p-6 space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Mis Direcciones" }), _jsx("p", { className: "text-muted-foreground", children: "Administra tus direcciones de entrega y facturaci\u00F3n" })] }), _jsxs(Dialog, { open: openDialog, onOpenChange: (open) => {
                            if (!open)
                                setEditingAddress(null);
                            setOpenDialog(open);
                        }, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "w-full sm:w-auto", onClick: () => {
                                        setEditingAddress(null);
                                        setOpenDialog(true);
                                    }, children: [_jsx(LuPlus, { className: "mr-2 h-4 w-4" }), "Nueva Direcci\u00F3n"] }) }), _jsxs(DialogContent, { className: "max-w-4xl overflow-y-auto max-h-[90vh]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-center", children: editingAddress ? "Editar Dirección" : "Nueva Dirección" }) }), _jsx(Separator, {}), _jsx(AddressForm, { onSubmit: handleSubmit, defaultValues: editingAddress ?? undefined })] })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Listado" }), _jsxs(CardDescription, { children: [addresses.length, " direcci\u00F3n(es) encontrada(s)"] })] }), _jsx(CardContent, { children: isLoading ? (_jsx("p", { className: "text-center py-8 text-muted-foreground", children: "Cargando..." })) : isError ? (_jsx("p", { className: "text-center py-8 text-red-600", children: "Error al cargar direcciones" })) : (_jsxs("div", { className: "rounded-md border", children: [_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Nombre" }), _jsx(TableHead, { children: "Receptor" }), _jsx(TableHead, { children: "Direcci\u00F3n" }), _jsx(TableHead, { children: "Ciudad" }), _jsx(TableHead, { children: "Documento" }), _jsx(TableHead, { children: "Principal" }), _jsx(TableHead, { className: "text-right", children: "Acciones" })] }) }), _jsx(TableBody, { children: addresses.map((address) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: address.name }), _jsxs(TableCell, { children: [address.first_name, " ", address.last_name] }), _jsxs(TableCell, { children: [address.street_address, address.apartment ? `, ${address.apartment}` : ""] }), _jsxs(TableCell, { children: [address.city, ", ", address.state] }), _jsx(TableCell, { children: address.document_type && address.document_number
                                                            ? `${address.document_type} - ${address.document_number}`
                                                            : "—" }), _jsx(TableCell, { children: address.is_default ? (_jsx("span", { className: "text-green-600 font-medium", children: "S\u00ED" })) : (_jsx("span", { className: "text-muted-foreground", children: "No" })) }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [_jsx("span", { className: "sr-only", children: "Abrir men\u00FA" }), _jsx(LuFlipHorizontal2, { className: "h-4 w-4" })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuLabel, { children: "Acciones" }), _jsxs(DropdownMenuItem, { onClick: () => {
                                                                                setEditingAddress(address);
                                                                                setOpenDialog(true);
                                                                            }, children: [_jsx(LuPencilLine, { className: "mr-2 h-4 w-4" }), "Editar"] }), _jsx(DropdownMenuSeparator, {}), _jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsxs(DropdownMenuItem, { className: "text-red-600", onSelect: (e) => e.preventDefault(), children: [_jsx(LuTrash2, { className: "mr-2 h-4 w-4" }), "Eliminar"] }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "\u00BFEst\u00E1s seguro?" }), _jsxs(AlertDialogDescription, { children: ["Esta acci\u00F3n eliminar\u00E1 la direcci\u00F3n \"", address.name, "\" permanentemente."] })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Cancelar" }), _jsx(AlertDialogAction, { onClick: () => {
                                                                                                        setDeletingId(address.id);
                                                                                                        deleteAddress(address.id, {
                                                                                                            onSettled: () => setDeletingId(null),
                                                                                                        });
                                                                                                    }, disabled: deletingId === address.id, className: "bg-red-600 hover:bg-red-700", children: deletingId === address.id
                                                                                                        ? "Eliminando..."
                                                                                                        : "Eliminar" })] })] })] })] })] }) })] }, address.id))) })] }), addresses.length === 0 && (_jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-muted-foreground", children: "No se encontraron direcciones" }) }))] })) })] })] }));
}
