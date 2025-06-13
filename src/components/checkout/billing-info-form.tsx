import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuMapPin, LuPlus } from "react-icons/lu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import AddressSelector from "./address-selector";
import { AddressForm } from "../addresses/address-form";
import { useAddresses } from "@/hooks/addresses/useAddresses";
import { useCreateAddress } from "@/hooks/addresses/useCreateAddress";
import { useUpdateAddress } from "@/hooks/addresses/useUpdateAddress";
import { useDeleteAddress } from "@/hooks/addresses/useDeleteAddress";

import type { Address } from "./address-selector";
import type { AddressFormValues } from "@/schemas/addresses/createAddressSchema";
import { useSetDefaultAddress } from "@/hooks/addresses/useSetDefaultAddress";

interface BillingInfoFormProps {
  selectedAddress: Address | null;
  onAddressSelect: (address: Address) => void;
}

export default function BillingInfoForm({
  selectedAddress,
  onAddressSelect,
}: BillingInfoFormProps) {
  const { data: addresses = [], isLoading, isError } = useAddresses();
  const { mutate: createAddress } = useCreateAddress();
  const { mutate: updateAddress } = useUpdateAddress();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: setDefaultAddress } = useSetDefaultAddress();

  const [openDialog, setOpenDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleCreate = (data: AddressFormValues) => {
    createAddress(data, {
      onSuccess: () => {
        setOpenDialog(false);
        setEditingAddress(null);
      },
    });
  };

  const handleUpdate = (data: AddressFormValues) => {
    if (!editingAddress) return;

    updateAddress(
      { id: editingAddress.id, data },
      {
        onSuccess: () => {
          setOpenDialog(false);
          setEditingAddress(null);
        },
      }
    );
  };

  const handleSubmit = (data: AddressFormValues) => {
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

  const handleAddressSelect = (address: Address) => {
    onAddressSelect(address); // esto actualiza el estado local
    setDefaultAddress(address.id); // esto actualiza en la API
  };

  return (
    <Card className="border-amber-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
        <CardTitle className="flex items-center space-x-2 text-amber-900">
          <LuMapPin className="w-5 h-5" />
          <span>Datos de Facturación y Envío</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {isLoading ? (
          <p className="text-muted-foreground">Cargando direcciones...</p>
        ) : isError ? (
          <p className="text-red-600">Error al cargar direcciones</p>
        ) : (
          <>
            <AddressSelector
              type="billing"
              addresses={addresses}
              selectedAddressId={selectedAddress?.id || null}
              onSelectAddress={handleAddressSelect}
              onEditAddress={(address) => {
                setEditingAddress(address);
                setOpenDialog(true);
              }}
              onDeleteAddress={(id) => {
                setDeletingId(id);
                deleteAddress(id, { onSettled: () => setDeletingId(null) });
              }}
            />

            <Dialog
              open={openDialog}
              onOpenChange={(open) => {
                if (!open) setEditingAddress(null);
                setOpenDialog(open);
              }}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingAddress(null);
                    setOpenDialog(true);
                  }}
                >
                  <LuPlus className="mr-2 h-4 w-4" />
                  Nueva Dirección
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    {editingAddress ? "Editar Dirección" : "Nueva Dirección"}
                  </DialogTitle>
                </DialogHeader>
                <Separator />
                <AddressForm
                  defaultValues={editingAddress ?? undefined}
                  onSubmit={handleSubmit}
                />
              </DialogContent>
            </Dialog>
          </>
        )}
      </CardContent>
    </Card>
  );
}
