import { useEffect, useState } from "react";
import {
  LuHeart,
  LuStar,
  LuTruck,
  LuShield,
  LuRotateCcw,
  LuPlus,
  LuMinus,
} from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import { useProduct } from "@/hooks/products/useProduct";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

export default function ProductView() {
  const { id } = useParams();
  const productId = id ? Number(id) : undefined;
  const { data: product, isLoading } = useProduct(productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { addToCart, getQuantity } = useCart();
  const { add, remove, isInWishlist } = useWishlist();

  const isWishlisted = product ? isInWishlist(product.id) : false;
  const quantityInCart = product ? getQuantity(product.id) : 0;

  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);

  if (isLoading || !product) {
    return (
      <div className="p-8 text-center text-gray-600 text-lg">
        Cargando producto...
      </div>
    );
  }

  const regularPrice = Number(product.price);
  const offerPrice = Number(product.original_price);
  const isOnSale = offerPrice > 0 && offerPrice < regularPrice;
  const discountPercentage = isOnSale
    ? Math.round(((regularPrice - offerPrice) / regularPrice) * 100)
    : 0;

  const toggleWishlist = () => {
    if (isWishlisted) {
      remove(product.id);
    } else {
      add(product.id);
    }
  };

  const handleAddToCart = () => {
    const maxAvailable = product.stock_count;
    const totalAfterAdd = quantityInCart + quantity;

    if (totalAfterAdd <= maxAvailable) {
      addToCart(product.id, quantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-sm relative">
              {isOnSale && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full z-10 shadow font-semibold">
                  -{discountPercentage}% OFF
                </span>
              )}
              <img
                src={
                  selectedImage
                    ? `http://localhost:8000${selectedImage}`
                    : "/placeholder.svg"
                }
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            <div className="grid grid-cols-5 gap-3">
              {(product.images.slice(0, 5) || []).map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(image.url)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer transition-all duration-300 border-2 ${
                    selectedImage === image.url
                      ? "border-rose-500"
                      : "border-transparent hover:border-rose-300"
                  }`}
                >
                  <img
                    src={`http://localhost:8000${image.url}`}
                    alt={`Vista ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <LuStar
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(16 reseñas)</span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  En stock
                </Badge>
              </div>

              <div className="text-4xl font-light text-gray-900">
                {formatPrice(isOnSale ? offerPrice : regularPrice)}
              </div>
              {isOnSale && (
                <div className="text-sm text-gray-400 line-through">
                  {formatPrice(regularPrice)}
                </div>
              )}
            </div>

            <Separator />

            {/* Descripción con Ver más / Ver menos */}
            <div>
              <p
                className={`text-gray-600 leading-relaxed whitespace-pre-line transition-all duration-300 ease-in-out ${
                  showFullDescription ? "" : "line-clamp-3"
                }`}
              >
                {product.description}
              </p>
              {product.description.length > 120 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-2 text-sm text-rose-600 hover:underline font-medium"
                >
                  {showFullDescription ? "Ver menos" : "Ver más"}
                </button>
              )}
            </div>

            {/* Talla y Color */}
            <div className="flex flex-wrap gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  Talla
                </label>
                <div className="inline-block px-4 py-2 rounded-full border text-sm font-medium bg-indigo-100 text-indigo-800 border-indigo-300 shadow-sm">
                  {product.size}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  Color
                </label>
                <div className="inline-block px-4 py-2 rounded-full border text-sm font-medium capitalize bg-pink-100 text-pink-800 border-pink-300 shadow-sm">
                  {product.color}
                </div>
              </div>
            </div>

            {/* Cantidad */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Cantidad
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 shadow-sm"
                  disabled={quantity <= 1}
                >
                  <LuMinus className="w-4 h-4 text-gray-700" />
                </button>
                <span className="px-5 py-2 border border-gray-300 rounded-lg bg-gray-50 min-w-[60px] text-center font-medium text-gray-800 select-none">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock_count, quantity + 1))
                  }
                  className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 shadow-sm"
                  disabled={quantity + quantityInCart >= product.stock_count}
                >
                  <LuPlus className="w-4 h-4 text-gray-700" />
                </button>
                <span className="text-sm text-gray-500 ml-2">
                  {product.stock_count - quantityInCart} disponibles
                </span>
              </div>
            </div>

            {/* Botones */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-rose-600 hover:bg-rose-700"
                onClick={handleAddToCart}
                disabled={quantity + quantityInCart > product.stock_count}
              >
                Agregar al carrito
              </Button>

              <Button
                size="lg"
                variant="outline"
                className={`w-full transition-all ${
                  isWishlisted ? "border-red-400 text-red-500" : ""
                }`}
                onClick={toggleWishlist}
              >
                <LuHeart
                  className={`w-4 h-4 mr-2 transition-all duration-200 ${
                    isWishlisted ? "fill-red-500 text-red-500 scale-110" : ""
                  }`}
                />
                {isWishlisted
                  ? "En lista de deseos"
                  : "Agregar a lista de deseos"}
              </Button>
            </div>

            {/* Info adicional */}
            <div className="bg-white rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <LuTruck className="w-5 h-5 text-rose-600" />
                <div>
                  <p className="font-medium text-gray-900">Envío gratis</p>
                  <p className="text-sm text-gray-600">
                    En compras superiores a $500.000
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LuShield className="w-5 h-5 text-rose-600" />
                <div>
                  <p className="font-medium text-gray-900">
                    Garantía de calidad
                  </p>
                  <p className="text-sm text-gray-600">
                    12 meses de garantía en todos nuestros productos
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LuRotateCcw className="w-5 h-5 text-rose-600" />
                <div>
                  <p className="font-medium text-gray-900">
                    Devoluciones fáciles
                  </p>
                  <p className="text-sm text-gray-600">
                    30 días para cambios y devoluciones
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
