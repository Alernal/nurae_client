import { useState } from "react";
import {
  LuTrash2,
  LuPlus,
  LuFlipHorizontal2,
  LuPencilLine,
} from "react-icons/lu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AddressForm } from "@/components/addresses/address-form";
import { useAddresses } from "@/hooks/addresses/useAddresses";
import { useDeleteAddress } from "@/hooks/addresses/useDeleteAddress";
import { useCreateAddress } from "@/hooks/addresses/useCreateAddress";
import { useUpdateAddress } from "@/hooks/addresses/useUpdateAddress";
import type { AddressFormValues } from "@/schemas/addresses/createAddressSchema";

export default function ClientAddresses() {
  const { data: addresses = [], isLoading, isError } = useAddresses();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: createAddress } = useCreateAddress();
  const { mutate: updateAddress } = useUpdateAddress();

  const [openDialog, setOpenDialog] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingAddress, setEditingAddress] = useState<any | null>(null);

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

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis Direcciones</h1>
          <p className="text-muted-foreground">
            Administra tus direcciones de entrega y facturación
          </p>
        </div>
        <Dialog
          open={openDialog}
          onOpenChange={(open) => {
            if (!open) setEditingAddress(null);
            setOpenDialog(open);
          }}
        >
          <DialogTrigger asChild>
            <Button
              className="w-full sm:w-auto"
              onClick={() => {
                setEditingAddress(null);
                setOpenDialog(true);
              }}
            >
              <LuPlus className="mr-2 h-4 w-4" />
              Nueva Dirección
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-center">
                {editingAddress ? "Editar Dirección" : "Nueva Dirección"}
              </DialogTitle>
            </DialogHeader>
            <Separator />
            <AddressForm
              onSubmit={handleSubmit}
              defaultValues={editingAddress ?? undefined}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabla */}
      <Card>
        <CardHeader>
          <CardTitle>Listado</CardTitle>
          <CardDescription>
            {addresses.length} dirección(es) encontrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center py-8 text-muted-foreground">
              Cargando...
            </p>
          ) : isError ? (
            <p className="text-center py-8 text-red-600">
              Error al cargar direcciones
            </p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Receptor</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Ciudad</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Principal</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {addresses.map((address) => (
                    <TableRow key={address.id}>
                      <TableCell>{address.name}</TableCell>
                      <TableCell>
                        {address.first_name} {address.last_name}
                      </TableCell>
                      <TableCell>
                        {address.street_address}
                        {address.apartment ? `, ${address.apartment}` : ""}
                      </TableCell>
                      <TableCell>
                        {address.city}, {address.state}
                      </TableCell>
                      <TableCell>
                        {address.document_type && address.document_number
                          ? `${address.document_type} - ${address.document_number}`
                          : "—"}
                      </TableCell>
                      <TableCell>
                        {address.is_default ? (
                          <span className="text-green-600 font-medium">Sí</span>
                        ) : (
                          <span className="text-muted-foreground">No</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menú</span>
                              <LuFlipHorizontal2 className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingAddress(address);
                                setOpenDialog(true);
                              }}
                            >
                              <LuPencilLine className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <LuTrash2 className="mr-2 h-4 w-4" />
                                  Eliminar
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    ¿Estás seguro?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción eliminará la dirección "
                                    {address.name}" permanentemente.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      setDeletingId(address.id);
                                      deleteAddress(address.id, {
                                        onSettled: () => setDeletingId(null),
                                      });
                                    }}
                                    disabled={deletingId === address.id}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    {deletingId === address.id
                                      ? "Eliminando..."
                                      : "Eliminar"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {addresses.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No se encontraron direcciones
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
