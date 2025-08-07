import { useState, useMemo, useEffect } from "react";
import BillingInfoForm from "@/components/checkout/billing-info-form";
import CartSummary from "@/components/checkout/cart-summary";
import { useCartStore } from "@/stores/useCartStore";
import { useGeneratePaymentLink } from "@/hooks/useGeneratePaymentLink";
import { toast } from "sonner";
import { caribbeanDepartments } from "@/lib/caribbeanRegions";
import type { Address } from "@/components/checkout/address-selector";
import { useByIds } from "@/hooks/products/useByIds";
import { useAddresses } from "@/hooks/addresses/useAddresses";
import { useAuthStore } from "@/stores/useAuthStore";
import { Input } from "@/components/ui/input";

type GuestInfo = {
  name: string;
  email: string;
  department: string;
  city: string;
  address: string;
};

export default function CheckoutPage() {
  const { user } = useAuthStore();
  const { items: cartItems } = useCartStore();
  const productIds = cartItems.map((item) => item.productId);
  const { data: products = [] } = useByIds(productIds);
  const { data: addresses = [] } = useAddresses();

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataProcessingAccepted, setDataProcessingAccepted] = useState(false);
  const [shippingType, setShippingType] = useState<"standard" | "contraentrega">("standard");

  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    name: "",
    email: "",
    department: "",
    city: "",
    address: "",
  });

  const { mutate: generatePaymentLink } = useGeneratePaymentLink();

  useEffect(() => {
    setSelectedAddress(null);
  }, [user?.id]);

  useEffect(() => {
    if (!selectedAddress && addresses.length > 0) {
      const defaultAddress = addresses.find((a) => a.is_default) || addresses[0];
      setSelectedAddress(defaultAddress);
    }
  }, [addresses, selectedAddress]);

  const detailedCartItems = useMemo(() =>
    cartItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        ...item,
        name: product?.name || "Producto desconocido",
        price: product?.price || 0,
        original_price: product?.original_price,
        image: product?.images?.[0]?.url
          ? `https://api.nurae.com.co/${product.images[0].url}`
          : "/placeholder.svg",
      };
    }), [cartItems, products]);

  const subtotal = useMemo(() =>
    detailedCartItems.reduce((sum, item) => {
      const unitPrice = item.original_price && item.original_price > 0 && item.original_price < item.price
        ? item.original_price : item.price;
      return sum + (unitPrice / 1.19) * item.quantity;
    }, 0), [detailedCartItems]);

  const iva = useMemo(() =>
    detailedCartItems.reduce((sum, item) => {
      const unitPrice = item.original_price && item.original_price > 0 && item.original_price < item.price
        ? item.original_price : item.price;
      const baseUnitPrice = unitPrice / 1.19;
      return sum + (unitPrice - baseUnitPrice) * item.quantity;
    }, 0), [detailedCartItems]);

  const totalBruto = subtotal + iva;

  const calculateShipping = (address: Address | null, totalBruto: number): number => {
    if (totalBruto >= 150000) return 0;
    if (!address) return 15000;
    const department = address.state?.toLowerCase().trim() || "";
    const city = address.city?.toLowerCase().trim() || "";
    if (department === "sucre" && city === "sincelejo") return 5000;
    return caribbeanDepartments.map(d => d.toLowerCase()).includes(department) ? 9000 : 15000;
  };

  const shipping = useMemo(() => calculateShipping(selectedAddress, totalBruto), [selectedAddress, totalBruto]);
  const total = useMemo(() => totalBruto + (user?.id ? shipping : 0) - appliedDiscount, [totalBruto, shipping, appliedDiscount, user?.id]);

  const normalizeSnapshot = (obj: any): string => {
    const ordered = (value: any): any => {
      if (Array.isArray(value)) return value.map(ordered);
      if (value && typeof value === 'object') {
        return Object.keys(value).sort().reduce((acc, key) => {
          acc[key] = ordered(value[key]);
          return acc;
        }, {} as any);
      }
      return value;
    };
    return JSON.stringify(ordered(obj));
  };

  const generateLinkWithCache = (snapshot: any) => {
    const normalized = normalizeSnapshot(snapshot);
    const cached = localStorage.getItem("cached_wompi_link");

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const sameSnapshot = normalizeSnapshot(parsed.snapshot) === normalized;
        const diffMinutes = (Date.now() - new Date(parsed.created_at).getTime()) / 60000;

        if (sameSnapshot && diffMinutes <= 5) {
          toast.info("Se usará el mismo enlace de pago generado hace menos de 5 minutos. Si cambias el carrito o dirección, se generará otro enlace.");
          window.location.href = data.url;
          return;
        }
      } catch {
        localStorage.removeItem("cached_wompi_link");
      }
    }

    generatePaymentLink(snapshot, {
      onSuccess: (data) => {
        localStorage.setItem("cached_wompi_link", JSON.stringify({
          url: data.url,
          snapshot,
          created_at: new Date().toISOString(),
        }));
        toast.success("Redirigiendo a la pasarela de pago...");
        window.location.href = data.url;
      },
    });
  };

  const handleFinalizePurchase = () => {
    if (detailedCartItems.length === 0) return toast.error("Tu carrito está vacío.");
    if (!termsAccepted || !dataProcessingAccepted) return toast.error("Debes aceptar los términos y el tratamiento de datos.");

    if (!user?.id && (!guestInfo.name || !guestInfo.email || !guestInfo.department || !guestInfo.city || !guestInfo.address)) {
      return toast.error("Por favor completa todos los campos requeridos para continuar como invitado.");
    }

    const address: Address = user?.id
      ? selectedAddress!
      : {
        state: guestInfo.department.trim(),
        city: guestInfo.city.trim(),
        address: guestInfo.address.trim(),
      };

    const shippingCost = calculateShipping(address, totalBruto);
    const finalTotal = totalBruto + shippingCost - appliedDiscount;

    const snapshot = user?.id
      ? {
        guest: false,
        items: cartItems.map(i => ({ id: i.productId, quantity: i.quantity })),
        address_id: selectedAddress?.id,
        subtotal: +subtotal.toFixed(2),
        iva: +iva.toFixed(2),
        shipping: shippingCost,
        total: +finalTotal.toFixed(2),
        discount: appliedDiscount,
      }
      : {
        guest: true,
        guest_info: {
          name: guestInfo.name.trim(),
          email: guestInfo.email.trim().toLowerCase(),
        },
        address: {
          state: address.state.toLowerCase(),
          city: address.city.toLowerCase(),
          address: address.address,
        },
        items: cartItems.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
        })),
        subtotal: +subtotal.toFixed(2),
        iva: +iva.toFixed(2),
        shipping: shippingCost,
        total: +finalTotal.toFixed(2),
        discount: appliedDiscount,
      };

    generateLinkWithCache(snapshot);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="mt-4 space-y-2">
              <h2 className="text-lg font-semibold">Tipo de envío</h2>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shippingType"
                    value="standard"
                    checked={shippingType === "standard"}
                    onChange={() => setShippingType("standard")}
                  />
                  <span>Standard</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shippingType"
                    value="contraentrega"
                    checked={shippingType === "contraentrega"}
                    onChange={() => setShippingType("contraentrega")}
                  />
                  <span>Contraentrega</span>
                </label>
              </div>
            </div>

            {user?.id ? (
              <BillingInfoForm
                selectedAddress={selectedAddress}
                onAddressSelect={(address) => setSelectedAddress({ ...address })}
                addresses={addresses}
              />
            ) : (
              <div className="space-y-4">
                <h2 className="text-lg font-bold mb-2">Información para el envío</h2>
                <Input
                  required
                  placeholder="Nombre completo"
                  value={guestInfo.name}
                  onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                />
                <Input
                  required
                  type="email"
                  placeholder="Correo electrónico"
                  value={guestInfo.email}
                  onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                />
                <Input
                  required
                  placeholder="Departamento"
                  value={guestInfo.department}
                  onChange={(e) => setGuestInfo({ ...guestInfo, department: e.target.value })}
                />
                <Input
                  required
                  placeholder="Ciudad"
                  value={guestInfo.city}
                  onChange={(e) => setGuestInfo({ ...guestInfo, city: e.target.value })}
                />
                <Input
                  required
                  placeholder="Dirección"
                  value={guestInfo.address}
                  onChange={(e) => setGuestInfo({ ...guestInfo, address: e.target.value })}
                />

                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md text-sm">
                  <p className="font-semibold mb-1">Importante</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Al generar el enlace de pago, se creará automáticamente una cuenta con los datos ingresados.</li>
                    <li>Recibirás tus credenciales de acceso al correo electrónico proporcionado.</li>
                    <li>Esto nos permite mantener la trazabilidad de la compra y ofrecerte un mejor soporte.</li>
                    <li>Si ya tienes cuenta, tu compra se asociará a ella.</li>
                    <li className="font-semibold">¡Lo ideal es que inicies sesión para tener acceso completo!</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <CartSummary
              items={detailedCartItems}
              subtotal={subtotal}
              shipping={user?.id ? shipping : 0}
              iva={iva}
              total={total}
              discountCode={discountCode}
              onDiscountCodeChange={setDiscountCode}
              appliedDiscount={appliedDiscount}
              onApplyDiscount={setAppliedDiscount}
              onFinalizePurchase={handleFinalizePurchase}
              termsAccepted={termsAccepted}
              onTermsAcceptedChange={setTermsAccepted}
              dataProcessingAccepted={dataProcessingAccepted}
              onDataProcessingAcceptedChange={setDataProcessingAccepted}
              showShipping={!!user?.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
