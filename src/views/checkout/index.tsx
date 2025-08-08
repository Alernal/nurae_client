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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useColombiaData } from "@/lib/useColombiaData";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";

type GuestInfo = {
  name: string;
  email: string;
  department: string;
  city: string;
  address: string;
};

type ApiImage = { url: string };
type ApiProduct = {
  id: number | string;
  name: string;
  price: string | number;          // viene como "8000.00"
  original_price?: string | number | null;
  size?: string | null;
  material?: string | null;
  stock_count?: number | null;
  images?: ApiImage[];
};

type CartItemRaw = {
  productId: number | string;
  quantity: number;
  // opcionales por si el carrito guardó algo
  price?: number;
  size?: string;
  material?: string;
  image?: string;
  stock_count?: number;
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { clearCartCloud } = useCart();
  const { user } = useAuthStore();
  const { items: cartItems } = useCartStore();
  const productIds = cartItems.map((item) => item.productId);
  const { data: products = [] } = useByIds(productIds);
  const { data: addresses = [] } = useAddresses();

  // Invitado
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    name: "",
    email: "",
    department: "",
    city: "",
    address: "",
  });

  // Colombia: departamentos/ciudades
  const { data: colombia, loading: loadingCo, error: errorCo } = useColombiaData();

  const departamentos = useMemo(
    () => colombia.map((d) => d.departamento),
    [colombia]
  );

  const ciudadesDelDepto = useMemo(() => {
    const dpto = colombia.find(
      (d) => d.departamento.toLowerCase() === guestInfo.department.toLowerCase()
    );
    return dpto ? dpto.ciudades : [];
  }, [colombia, guestInfo.department]);

  useEffect(() => {
    // Si el dpto cambia y la ciudad ya no pertenece, resetea
    if (guestInfo.city && !ciudadesDelDepto.includes(guestInfo.city)) {
      setGuestInfo((prev) => ({ ...prev, city: "" }));
    }
  }, [guestInfo.department, ciudadesDelDepto]);

  // Dirección seleccionada / por defecto
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // Checkout state
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataProcessingAccepted, setDataProcessingAccepted] = useState(false);
  const [shippingType, setShippingType] = useState<"standard" | "contraentrega">("standard");

  const { mutate: generatePayment, isPending } = useGeneratePaymentLink();

  useEffect(() => {
    setSelectedAddress(null);
  }, [user?.id]);

  useEffect(() => {
    if (!selectedAddress && addresses.length > 0) {
      const defaultAddress = addresses.find((a) => a.is_default) || addresses[0];
      setSelectedAddress(defaultAddress);
    }
  }, [addresses, selectedAddress]);

  const toNum = (v: string | number | null | undefined) =>
    v == null ? 0 : typeof v === "number" ? v : parseFloat(v);

  // Items detallados
  const detailedCartItems = useMemo(() => {
    return cartItems.map((item: CartItemRaw) => {
      const product = (products as ApiProduct[]).find(
        (p) => String(p.id) === String(item.productId)
      );

      // precios
      const productPrice = product ? toNum(product.price) : item.price ?? 0;
      const productOriginal = product ? toNum(product.original_price) : 0;
      const hasValidOriginal =
        productOriginal > 0 && productOriginal < productPrice;
      const effectivePrice = hasValidOriginal ? productOriginal : productPrice;

      // stock
      const stock =
        (product?.stock_count ?? item.stock_count ?? 0) || 0;

      // imagen
      const productImg = product?.images?.[0]?.url
        ? `https://api.nurae.com.co${product.images[0].url.startsWith("/") ? "" : "/"}${product.images[0].url}`
        : item.image ?? "/placeholder.svg";

      return {
        productId: item.productId,
        name: product?.name ?? "Producto desconocido",
        size: item.size ?? product?.size ?? "-",
        material: item.material ?? product?.material ?? "-",
        quantity: item.quantity,
        // para el render: price = lista; original_price = oferta (si aplica)
        price: productPrice,
        original_price: hasValidOriginal ? effectivePrice : undefined,
        image: productImg,
        stock_count: stock,
      };
    });
  }, [cartItems, products]);

  // Subtotal e IVA
  const subtotal = useMemo(
    () =>
      detailedCartItems.reduce((sum, item) => {
        const unitPrice =
          item.original_price && item.original_price > 0 && item.original_price < item.price
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
          item.original_price && item.original_price > 0 && item.original_price < item.price
            ? item.original_price
            : item.price;
        const baseUnitPrice = unitPrice / 1.19;
        return sum + (unitPrice - baseUnitPrice) * item.quantity;
      }, 0),
    [detailedCartItems]
  );

  const totalBruto = subtotal + iva;

  // Normalizador de strings: sin tildes, lower, trim
  const normalize = (s: string) =>
    s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

  // Dirección a usar para calcular envío (usuario logueado o invitado)
  const shippingAddress = useMemo<Address | null>(() => {
    if (user?.id) return selectedAddress;
    if (guestInfo.department && guestInfo.city) {
      return {
        state: guestInfo.department,
        city: guestInfo.city,
        address: guestInfo.address || "",
      };
    }
    return null;
  }, [user?.id, selectedAddress, guestInfo.department, guestInfo.city, guestInfo.address]);

  // Cálculo de envío con reglas solicitadas
  const calculateShipping = (address: Address | null, totalBruto: number): number => {

    // Si no hay address (invitado incompleto), cobra como resto + 1%
    if (!address) return 15000 + Math.round(totalBruto * 0.01);

    const department = normalize(address.state || "");
    const city = normalize(address.city || "");

    // Sincelejo (Sucre): 5.000 sin 1%
    if (department === "sucre" && city === "sincelejo") return 5000;

    // Caribe: 9.000 + 1%
    const isCaribbean = caribbeanDepartments.map((d) => normalize(d)).includes(department);
    if (isCaribbean) return 9000 + Math.round(totalBruto * 0.01);

    // Resto: 15.000 + 1%
    return 15000 + Math.round(totalBruto * 0.01);
  };

  // Envío en tiempo real (invitado y logueado)
  const shipping = useMemo(
    () => calculateShipping(shippingAddress, totalBruto),
    [shippingAddress, totalBruto]
  );

  // Mostrar envío en el resumen: logueado o invitado con dpto+ciudad seleccionados
  const showShipping = !!user?.id || (!!guestInfo.department && !!guestInfo.city);

  // Total que refleja envío (también para invitados)
  const total = useMemo(
    () => totalBruto + (showShipping ? shipping : 0) - appliedDiscount,
    [totalBruto, shipping, appliedDiscount, showShipping]
  );

  // --- Cacheo de link de pago ---
  const normalizeSnapshot = (obj: any): string => {
    const ordered = (value: any): any => {
      if (Array.isArray(value)) return value.map(ordered);
      if (value && typeof value === "object") {
        return Object.keys(value)
          .sort()
          .reduce((acc, key) => {
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
          toast.info(
            "Se usará el mismo enlace de pago generado hace menos de 5 minutos. Si cambias el carrito o dirección, se generará otro enlace."
          );
          window.location.href = parsed.url;
          return;
        }
      } catch {
        localStorage.removeItem("cached_wompi_link");
      }
    }

    generatePayment(snapshot, {
      onSuccess: (data) => {
        localStorage.setItem(
          "cached_wompi_link",
          JSON.stringify({
            url: data.url,
            snapshot,
            created_at: new Date().toISOString(),
          })
        );
        toast.success("Redirigiendo a la pasarela de pago...");
        window.location.href = data.url;
      },
    });
  };


  // Finalizar compra
  const handleFinalizePurchase = () => {
    if (detailedCartItems.length === 0) return toast.error("Tu carrito está vacío.");
    if (!termsAccepted || !dataProcessingAccepted)
      return toast.error("Debes aceptar los términos y el tratamiento de datos.");

    if (
      !user?.id &&
      (!guestInfo.name || !guestInfo.email || !guestInfo.department || !guestInfo.city || !guestInfo.address)
    ) {
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
    const finalTotal = totalBruto + (shippingCost || 0) - appliedDiscount;

    const snapshot = user?.id
      ? {
        guest: false,
        shipping_type: shippingType,
        items: cartItems.map((i) => ({ id: i.productId, quantity: i.quantity })),
        address_id: selectedAddress?.id,
        subtotal: +subtotal.toFixed(2),
        iva: +iva.toFixed(2),
        shipping: shippingCost,
        total: +finalTotal.toFixed(2),
        discount: appliedDiscount,
      }
      : {
        guest: true,
        shipping_type: shippingType,
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

    if (shippingType === "contraentrega") {
      generatePayment(snapshot, {
        onSuccess: async (data) => {
          if (data?.order_id) {
            toast.success("Orden creada para pago contraentrega");
            await clearCartCloud().catch(() => { });
            navigate(`/confirmacion-pago?order_id=${data.order_id}`, { replace: true });
          } else {
            toast.error("No se recibió el ID de la orden.");
          }
        },
        onError: (e) => toast.error(e?.response?.data?.message ?? "Error al crear la orden"),
      });
      return;
    }

    generateLinkWithCache(snapshot);
  };

  // ---- ICONOS (inline) ----
  const TruckIcon = (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" />
      <circle cx="7.5" cy="19" r="1.5" />
      <circle cx="17.5" cy="19" r="1.5" />
    </svg>
  );

  const CashIcon = (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M7 9h.01M17 15h.01" />
    </svg>
  );

  // ---- INFO por tipo seleccionado ----
  const selectedInfo =
    shippingType === "standard"
      ? {
        title: "Envío estándar",
        info: "Pagas online y recibes en tu dirección. Te notificaremos por correo cuando sea despachado.",
        eta: "Entrega estimada: 2–5 días hábiles",
        icon: TruckIcon,
      }
      : {
        title: "Contraentrega",
        info: "Pagas al mensajero al momento de recibir. Debes estar presente para cancelar.",
        eta: "Cobertura sujeta a zona — confirmaremos disponibilidad",
        note: "Si tu zona no tiene cobertura contraentrega, te avisaremos antes de enviar.",
        icon: CashIcon,
      };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Departamento */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Departamento</label>
                    <Select
                      disabled={loadingCo || !!errorCo}
                      value={guestInfo.department || undefined}
                      onValueChange={(val) => setGuestInfo((prev) => ({ ...prev, department: val }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={loadingCo ? "Cargando..." : "Selecciona un departamento"} />
                      </SelectTrigger>
                      <SelectContent>
                        {departamentos.map((dep) => (
                          <SelectItem key={dep} value={dep}>
                            {dep}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errorCo && (
                      <p className="text-xs text-red-600">No se pudo cargar la lista. Reintenta o escribe manualmente.</p>
                    )}
                  </div>

                  {/* Ciudad */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Ciudad / Municipio</label>
                    <Select
                      disabled={!guestInfo.department || ciudadesDelDepto.length === 0}
                      value={guestInfo.city || undefined}
                      onValueChange={(val) => setGuestInfo((prev) => ({ ...prev, city: val }))}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={!guestInfo.department ? "Selecciona un departamento primero" : "Selecciona la ciudad"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {ciudadesDelDepto.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

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

            {/* ===== Tipo de envío (UI mejorado) ===== */}
            <div className="space-y-3 mt-4">
              <h2 className="text-lg font-semibold">Tipo de envío</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Standard */}
                <label
                  className={[
                    "relative cursor-pointer rounded-lg border p-4 transition",
                    shippingType === "standard" ? "border-black/70 shadow-sm bg-black/[0.02]" : "border-zinc-200 hover:border-zinc-300",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="shippingType"
                    value="standard"
                    className="sr-only"
                    checked={shippingType === "standard"}
                    onChange={() => setShippingType("standard")}
                  />
                  <div className="flex items-start gap-3">
                    <div className={shippingType === "standard" ? "text-black" : "text-zinc-500"}>{TruckIcon}</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Envío estándar</p>
                      </div>
                      <p className="text-sm text-zinc-600">Pagas online y recibes en tu dirección</p>
                      <p className="mt-1 text-xs text-zinc-500">Entrega estimada: 2–5 días hábiles</p>
                    </div>
                    <div
                      className={[
                        "ml-auto h-5 w-5 rounded-full border flex items-center justify-center",
                        shippingType === "standard" ? "border-black bg-black text-white" : "border-zinc-300 text-transparent",
                      ].join(" ")}
                      aria-hidden
                    >
                      ✓
                    </div>
                  </div>
                </label>

                {/* Contraentrega */}
                <label
                  className={[
                    "relative cursor-pointer rounded-lg border p-4 transition",
                    shippingType === "contraentrega" ? "border-black/70 shadow-sm bg-black/[0.02]" : "border-zinc-200 hover:border-zinc-300",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="shippingType"
                    value="contraentrega"
                    className="sr-only"
                    checked={shippingType === "contraentrega"}
                    onChange={() => setShippingType("contraentrega")}
                  />
                  <div className="flex items-start gap-3">
                    <div className={shippingType === "contraentrega" ? "text-black" : "text-zinc-500"}>{CashIcon}</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Contraentrega</p>
                        <span
                          className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide
                          border-amber-300 bg-amber-50 text-amber-700"
                        >
                          Pago al recibir
                        </span>
                      </div>
                      <p className="text-sm text-zinc-600">Pagas al recibir en efectivo</p>
                      <p className="mt-1 text-xs text-zinc-500">Cobertura sujeta a zona</p>
                    </div>
                    <div
                      className={[
                        "ml-auto h-5 w-5 rounded-full border flex items-center justify-center",
                        shippingType === "contraentrega" ? "border-black bg-black text-white" : "border-zinc-300 text-transparent",
                      ].join(" ")}
                      aria-hidden
                    >
                      ✓
                    </div>
                  </div>
                </label>
              </div>

              {/* Cuadro pequeño con info del método seleccionado */}
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md text-sm">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 text-zinc-700">{selectedInfo.icon}</div>
                  <div className="text-sm text-zinc-700">
                    <p className="font-medium">{selectedInfo.title}</p>
                    <p className="mt-0.5">{selectedInfo.info}</p>
                    <p className="mt-1 text-xs text-zinc-500">{selectedInfo.eta}</p>
                    {"note" in selectedInfo && selectedInfo.note && (
                      <p className="mt-1 text-xs text-zinc-500">{selectedInfo.note}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
              showShipping={showShipping}
              isLoading={isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
