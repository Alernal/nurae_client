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
        ? `https://api.nurae.com.co/${product.images[0].url}`
        : "/placeholder.svg",
    };
  });

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

  function calculateShipping(address: Address | null, totalBruto: number): number {
    if (totalBruto >= 150000) return 0;
    if (!address) return 15000;

    const department = (address.state || "").toLowerCase();
    const city = (address.city || "").toLowerCase();

    // 🎯 Excepción: Sincelejo - Sucre
    if (department === "sucre" && city === "sincelejo") {
      return 5000;
    }

    const isCaribbeanDepartment = caribbeanDepartments
      .map((d) => d.toLowerCase())
      .some((d) => department.includes(d));

    return isCaribbeanDepartment ? 9000 : 15000;
  }

  const shipping = useMemo(
    () => calculateShipping(selectedAddress, totalBruto),
    [selectedAddress, totalBruto]
  );

  const total = useMemo(
    () => totalBruto + shipping - appliedDiscount,
    [totalBruto, shipping, appliedDiscount]
  );

  const handleFinalizePurchase = () => {
    if (detailedCartItems.length === 0) {
      toast.error("Tu carrito está vacío. Agrega productos antes de continuar.");
      return;
    }

    if (!selectedAddress) {
      toast.error("Debes seleccionar una dirección de envío.");
      return;
    }

    if (!termsAccepted || !dataProcessingAccepted) {
      toast.error("Debes aceptar los términos y condiciones y el tratamiento de datos personales.");
      return;
    }

    const carritoSnapshot = {
      items: cartItems.map((item) => ({
        id: item.productId,
        quantity: item.quantity,
      })),
      address_id: selectedAddress?.id,
      subtotal,
      iva,
      shipping,
      total,
      discount: appliedDiscount,
    };

    const cached = localStorage.getItem("cached_wompi_link");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const sameSnapshot = JSON.stringify(parsed.snapshot) === JSON.stringify(carritoSnapshot);
        const createdAt = new Date(parsed.created_at);
        const now = new Date();
        const diffInMs = now.getTime() - createdAt.getTime();
        const diffInMinutes = diffInMs / 1000 / 60;

        if (sameSnapshot && diffInMinutes <= 120) {
          setWompiLink(parsed.url);
          setShowWompiModal(true);
          return;
        } else {
          localStorage.removeItem("cached_wompi_link");
        }
      } catch {
        localStorage.removeItem("cached_wompi_link");
      }
    }

    const confirmed = window.confirm(
      "Se va a generar una orden y un nuevo enlace de pago con una validez de 2 horas. ¿Deseas continuar?"
    );

    if (!confirmed) return;

    generatePaymentLink(
      { subtotal, iva, shipping, total },
      {
        onSuccess: (data) => {
          const cachedLink = {
            url: data.url,
            payment_link_id: data.payment_link_id,
            order_id: data.order_id,
            snapshot: carritoSnapshot,
            created_at: new Date().toISOString(),
          };

          localStorage.setItem("cached_wompi_link", JSON.stringify(cachedLink));
          setWompiLink(data.url);
          setShowWompiModal(true);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-white">
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
