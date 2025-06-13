import { useState } from "react";
import BillingInfoForm from "@/components/checkout/billing-info-form";
import ShippingOptions from "@/components/checkout/shipping-options";
import CartSummary from "@/components/checkout/cart-summary";
import { useCartStore } from "@/stores/useCartStore";
import { useProducts } from "@/hooks/products/useProducts";
import { useGeneratePaymentLink } from "@/hooks/useGeneratePaymentLink";

export default function CheckoutPage() {
  const { data: products = [] } = useProducts();
  const { items: cartItems } = useCartStore();
  const [wompiLink, setWompiLink] = useState<string | null>(null);
  const { mutate: generatePaymentLink, isLoading } = useGeneratePaymentLink();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const detailedCartItems = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      ...item,
      name: product?.name || "Producto desconocido",
      price: product?.price || 0,
      original_price: product?.original_price,
      slug: product?.slug,
      size: product?.size,
      color: product?.color,
      description: product?.description,
      in_stock: product?.in_stock,
      stock_count: product?.stock_count,
      image: product?.images[0]?.url
        ? `http://localhost:8000${product.images[0].url}`
        : "/placeholder.svg",
    };
  });

  const [billingData, setBillingData] = useState({
    fullName: "",
    cedula: "",
    address: "",
    city: "",
    department: "",
    postalCode: "",
    phone: "",
    email: "",
  });

  const [shippingData, setShippingData] = useState({
    isDefault: true,
    shippingType: "standard",
    observations: "",
  });

  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataProcessingAccepted, setDataProcessingAccepted] = useState(false);

  const [showWompiModal, setShowWompiModal] = useState(false); // <== NUEVO

  const subtotal = detailedCartItems.reduce((sum, item) => {
    const unitPrice =
      item.original_price &&
      item.original_price > 0 &&
      item.original_price < item.price
        ? item.original_price
        : item.price;
    const baseUnitPrice = unitPrice / 1.19;
    return sum + baseUnitPrice * item.quantity;
  }, 0);

  const iva = detailedCartItems.reduce((sum, item) => {
    const unitPrice =
      item.original_price &&
      item.original_price > 0 &&
      item.original_price < item.price
        ? item.original_price
        : item.price;
    const baseUnitPrice = unitPrice / 1.19;
    const ivaUnit = unitPrice - baseUnitPrice;
    return sum + ivaUnit * item.quantity;
  }, 0);

  const totalBruto = subtotal + iva;
  const shipping = totalBruto >= 150000 ? 0 : 15000;

  const total = totalBruto + shipping - appliedDiscount;

  const handleFinalizePurchase = () => {
    if (detailedCartItems.length === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de continuar.");
      return;
    }

    if (!selectedAddress) {
      alert("Debes seleccionar una dirección de envío.");
      return;
    }

    if (!shippingData.shippingType) {
      alert("Debes seleccionar un método de envío.");
      return;
    }

    if (!termsAccepted || !dataProcessingAccepted) {
      alert(
        "Debes aceptar los términos y condiciones y el tratamiento de datos personales para continuar."
      );
      return;
    }

    generatePaymentLink(
      {
        subtotal,
        iva,
        shipping,
        total,
      },
      {
        onSuccess: (data) => {
          setWompiLink(data.url);
          setShowWompiModal(true);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <BillingInfoForm
              selectedAddress={selectedAddress}
              onAddressSelect={setSelectedAddress}
            />
            <ShippingOptions
              shippingType={shippingData.shippingType}
              onShippingTypeChange={(type) =>
                setShippingData((prev) => ({ ...prev, shippingType: type }))
              }
              observations={shippingData.observations}
              onObservationsChange={(obs) =>
                setShippingData((prev) => ({ ...prev, observations: obs }))
              }
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
