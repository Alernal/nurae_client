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

export default function CheckoutPage() {
  const { user } = useAuthStore();
  const { items: cartItems } = useCartStore();
  const productIds = cartItems.map((item) => item.productId);
  const { data: products = [] } = useByIds(productIds);

  const { data: addresses = [], isLoading: loadingAddresses } = useAddresses();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    setSelectedAddress(null);
  }, [user?.id]);


  useEffect(() => {
    if (!selectedAddress && addresses.length > 0) {
      const defaultAddress = addresses.find((a) => a.is_default) || addresses[0];
      setSelectedAddress(defaultAddress);
    }
  }, [addresses, selectedAddress]);

  const { mutate: generatePaymentLink } = useGeneratePaymentLink();
  const [wompiLink, setWompiLink] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataProcessingAccepted, setDataProcessingAccepted] = useState(false);
  const [showWompiModal, setShowWompiModal] = useState(false);

  // Construye los items del carrito
  const detailedCartItems = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      ...item,
      name: product?.name || "Producto desconocido",
      price: product?.price || 0,
      original_price: product?.original_price,
      slug: product?.slug,
      size: product?.size,
      material: product?.material,
      description: product?.description,
      in_stock: product?.in_stock,
      stock_count: product?.stock_count,
      image: product?.images[0]?.url
        ? `https://nurae-api.alernal.com.co/${product.images[0].url}`
        : "/placeholder.svg",
    };
  });

  // Cálculos del subtotal e IVA
  const subtotal = useMemo(
    () =>
      detailedCartItems.reduce((sum, item) => {
        const unitPrice =
          item.original_price &&
            item.original_price > 0 &&
            item.original_price < item.price
            ? item.original_price
            : item.price;
        return sum + (unitPrice / 1.19) * item.quantity;
      }, 0),
    [detailedCartItems]
  );

  const iva = useMemo(
    () =>
      detailedCartItems.reduce((sum, item) => {
        const unitPrice =
          item.original_price &&
            item.original_price > 0 &&
            item.original_price < item.price
            ? item.original_price
            : item.price;
        const baseUnitPrice = unitPrice / 1.19;
        return sum + (unitPrice - baseUnitPrice) * item.quantity;
      }, 0),
    [detailedCartItems]
  );

  const totalBruto = subtotal + iva;

  // Lógica para calcular el shipping
  function calculateShipping(
    address: Address | null,
    totalBruto: number
  ): number {
    if (totalBruto >= 150000) return 0;
    if (!address) return 15000;

    const addressDepartment = address.state?.toLowerCase() || "";
    const isCaribbeanDepartment = caribbeanDepartments
      .map((d) => d.toLowerCase())
      .some((d) => addressDepartment.includes(d));
    return isCaribbeanDepartment ? 9000 : 15000;
  }

  // Usamos useMemo para que solo recalcule cuando cambie selectedAddress o totalBruto
  const shipping = useMemo(
    () => calculateShipping(selectedAddress, totalBruto),
    [selectedAddress, totalBruto]
  );

  const total = useMemo(
    () => totalBruto + shipping - appliedDiscount,
    [totalBruto, shipping, appliedDiscount]
  );

  // Para depuración opcional:
  useEffect(() => {
    if (selectedAddress) {
      console.log(
        `Shipping recalculado para el estado: ${selectedAddress.state} → ${shipping}`
      );
    }
  }, [selectedAddress, shipping]);

  const handleFinalizePurchase = () => {
    if (detailedCartItems.length === 0) {
      toast.error(
        "Tu carrito está vacío. Agrega productos antes de continuar."
      );
      return;
    }

    if (!selectedAddress) {
      toast.error("Debes seleccionar una dirección de envío.");
      return;
    }

    if (!termsAccepted || !dataProcessingAccepted) {
      toast.error(
        "Debes aceptar los términos y condiciones y el tratamiento de datos personales para continuar."
      );
      return;
    }

    generatePaymentLink(
      { subtotal, iva, shipping, total },
      {
        onSuccess: (data) => {
          setWompiLink(data.url);
          setShowWompiModal(true);
        },
      }
    );
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <BillingInfoForm
              selectedAddress={selectedAddress}
              onAddressSelect={(address) => setSelectedAddress({ ...address })}
              addresses={addresses}
            />
          </div>

          <div className="lg:col-span-1">
            <CartSummary
              items={detailedCartItems}
              subtotal={subtotal}
              shipping={shipping}
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
            />
          </div>
        </div>
      </div>

      {showWompiModal && wompiLink && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 relative w-full max-w-5xl">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => {
                setShowWompiModal(false);
                setWompiLink(null);
              }}
            >
              ✖
            </button>
            <iframe
              src={wompiLink}
              className="w-full h-[600px]"
              frameBorder="0"
              allow="payment"
            />
          </div>
        </div>
      )}
    </div>
  );
}
