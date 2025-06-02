import { useEffect, useState } from "react";
import {
  LuCheck,
  LuCreditCard,
  LuMapPin,
  LuPackage,
  LuTruck,
  LuPlus,
} from "react-icons/lu";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { AddressForm } from "@/components/addresses/address-form";
import { useAddresses } from "@/hooks/addresses/useAddresses";
import { useCreateAddress } from "@/hooks/addresses/useCreateAddress";
import type { AddressFormValues } from "@/schemas/addresses/createAddressSchema";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/products/useProducts";
import { useCartStore } from "@/stores/useCartStore";

export default function CheckoutPage() {
  const { data: addresses = [], isLoading } = useAddresses();
  const { mutate: createAddress } = useCreateAddress();
  const { items: cartItems } = useCartStore();
  const { data: products = [] } = useProducts();

  const getProductById = (id: number) => products.find((p) => p.id === id);

  const subtotal = cartItems.reduce((acc, item) => {
    const product = getProductById(item.productId);
    if (!product) return acc;

    const isOnSale = product.original_price && product.original_price > 0;
    const realPrice = isOnSale ? product.original_price : product.price;

    return acc + realPrice * item.quantity;
  }, 0);

  const shipping = 50;
  const taxes = subtotal * 0.16;
  const total = subtotal + shipping + taxes;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
    }).format(value);

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("paypal");

  useEffect(() => {
    if (!selectedAddressId && addresses.length > 0) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses]);

  const handleCreateAddress = (data: AddressFormValues) => {
    createAddress(data, {
      onSuccess: () => {
        setOpenAddressDialog(false);
      },
    });
  };

  const [currentTab, setCurrentTab] = useState("address");

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs
            value={currentTab}
            onValueChange={setCurrentTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="address" className="flex items-center gap-2">
                <LuMapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Dirección</span>
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex items-center gap-2">
                <LuTruck className="h-4 w-4" />
                <span className="hidden sm:inline">Envío</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2">
                <LuCreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Pago</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="address" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dirección de Envío</CardTitle>
                  <CardDescription>
                    Selecciona una dirección o agrega una nueva
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <p>Cargando direcciones...</p>
                  ) : addresses.length === 0 ? (
                    <div className="text-sm text-muted-foreground">
                      No tienes direcciones guardadas.
                      <Dialog
                        open={openAddressDialog}
                        onOpenChange={setOpenAddressDialog}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" className="mt-4">
                            <LuPlus className="mr-2 h-4 w-4" />
                            Agregar dirección
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl overflow-y-auto max-h-80">
                          <DialogHeader>
                            <DialogTitle>Nueva dirección</DialogTitle>
                          </DialogHeader>
                          <AddressForm onSubmit={handleCreateAddress} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    <RadioGroup
                      value={selectedAddressId?.toString()}
                      onValueChange={(val) => setSelectedAddressId(Number(val))}
                      className="grid gap-4"
                    >
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className={`flex items-start space-x-4 rounded-md border p-4 ${
                            selectedAddressId === address.id
                              ? "border-primary"
                              : ""
                          }`}
                        >
                          <RadioGroupItem
                            value={address.id.toString()}
                            id={`address-${address.id}`}
                            className="mt-1"
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <Label
                                htmlFor={`address-${address.id}`}
                                className="text-base font-medium"
                              >
                                {address.name ?? "Dirección"}
                              </Label>
                              {address.is_default && (
                                <span className="text-xs text-primary font-semibold border border-primary px-2 py-0.5 rounded">
                                  Predeterminada
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                              <span className="font-medium">
                                {address.first_name} {address.last_name}
                              </span>
                              <span>
                                {address.document_type}
                                {": "}
                                {address.document_number}
                              </span>
                            </div>

                            <p className="text-sm text-muted-foreground">
                              {address.street_address}
                              {address.apartment
                                ? `, Apt. ${address.apartment}`
                                : ""}
                            </p>

                            <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                              <span>
                                {address.city}, {address.state}
                              </span>
                              <span>C.P. {address.postal_code}</span>
                              <span>{address.country}</span>
                            </div>

                            <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                              <span>Tel: {address.phone}</span>
                              <span>Email: {address.email}</span>
                            </div>
                          </div>
                          {selectedAddressId === address.id && (
                            <LuCheck className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      ))}

                      <Dialog
                        open={openAddressDialog}
                        onOpenChange={setOpenAddressDialog}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            <LuPlus className="mr-2 h-4 w-4" />
                            Agregar nueva dirección
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl overflow-y-auto max-h-150">
                          <DialogHeader>
                            <DialogTitle>Agregar Dirección</DialogTitle>
                          </DialogHeader>
                          <AddressForm onSubmit={handleCreateAddress} />
                        </DialogContent>
                      </Dialog>
                    </RadioGroup>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="outline">
                    <Link to="/">Volver a la tienda</Link>
                  </Button>
                  <Button
                    onClick={() => setCurrentTab("shipping")}
                    disabled={!selectedAddressId}
                  >
                    Continuar
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Otros tabs como shipping y payment pueden mantenerse igual */}
            <TabsContent value="shipping" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Método de Envío</CardTitle>
                  <CardDescription>
                    Selecciona cómo quieres recibir tu pedido
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="standard" className="grid gap-4">
                    <div className="flex items-start space-x-4 rounded-md border p-4">
                      <RadioGroupItem
                        value="standard"
                        id="standard"
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor="standard"
                          className="text-base font-medium"
                        >
                          Estándar (3-5 días)
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Entrega a domicilio
                        </p>
                        <p className="text-sm font-medium">$50.00 MXN</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 rounded-md border p-4">
                      <RadioGroupItem
                        value="express"
                        id="express"
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor="express"
                          className="text-base font-medium"
                        >
                          Express (1-2 días)
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Entrega a domicilio
                        </p>
                        <p className="text-sm font-medium">$120.00 MXN</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 rounded-md border p-4">
                      <RadioGroupItem
                        value="pickup"
                        id="pickup"
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor="pickup"
                          className="text-base font-medium"
                        >
                          Recoger en tienda
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Disponible en 24 horas
                        </p>
                        <p className="text-sm font-medium">Gratis</p>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentTab("address")}
                  >
                    Volver
                  </Button>
                  <Button onClick={() => setCurrentTab("payment")}>
                    Continuar
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Método de Pago</CardTitle>
                  <CardDescription>
                    Selecciona cómo quieres pagar tu pedido
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={selectedPayment}
                    onValueChange={setSelectedPayment}
                    className="grid gap-4"
                  >
                    <div
                      className={`flex items-start space-x-4 rounded-md border p-4 ${
                        selectedPayment === "paypal" ? "border-primary" : ""
                      }`}
                    >
                      <RadioGroupItem
                        value="paypal"
                        id="paypal"
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor="paypal"
                          className="text-base font-medium"
                        >
                          PayPal
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Paga de forma segura con tu cuenta de PayPal
                        </p>
                      </div>
                      {selectedPayment === "paypal" && (
                        <LuCheck className="h-5 w-5 text-primary" />
                      )}
                    </div>

                    <div
                      className={`flex items-start space-x-4 rounded-md border p-4 ${
                        selectedPayment === "cash" ? "border-primary" : ""
                      }`}
                    >
                      <RadioGroupItem value="cash" id="cash" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="cash" className="text-base font-medium">
                          Pago contra entrega
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Paga en efectivo cuando recibas tu pedido
                        </p>
                      </div>
                      {selectedPayment === "cash" && (
                        <LuCheck className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentTab("shipping")}
                  >
                    Volver
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">
                    Tu carrito está vacío.
                  </p>
                  <Button asChild>
                    <Link to="/collections">Explorar productos</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cartItems.map((item) => {
                      const product = getProductById(item.productId);
                      if (!product) return null;

                      const hasOffer =
                        product.original_price && product.original_price > 0;
                      const realUnitPrice = hasOffer
                        ? product.original_price
                        : product.price;

                      return (
                        <div
                          key={item.productId}
                          className="flex items-start space-x-4"
                        >
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={`http://localhost:8000${product.images[0].url}`}
                              alt={product.name}
                              className="h-16 w-16 rounded-md object-cover bg-muted"
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                              <LuPackage className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Talla: {product.size ?? "N/A"}, Color:{" "}
                              {product.color ?? "N/A"}
                            </p>
                            <p className="text-sm">Cantidad: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            {hasOffer ? (
                              <>
                                <p className="text-sm line-through text-muted-foreground">
                                  {formatPrice(product.price)}
                                </p>
                                <p className="font-medium">
                                  {formatPrice(realUnitPrice * item.quantity)}
                                </p>
                              </>
                            ) : (
                              <p className="font-medium">
                                {formatPrice(realUnitPrice * item.quantity)}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Separator />

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Envío</span>
                      <span>{formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Impuestos</span>
                      <span>{formatPrice(taxes)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full">Finalizar compra</Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
