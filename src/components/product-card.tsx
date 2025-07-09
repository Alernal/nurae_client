import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { Button } from "./ui/button";
import { LuHeart, LuShoppingBag, LuStar } from "react-icons/lu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, viewMode = "grid" }) {
  const navigate = useNavigate();
  const { add, remove, isInWishlist } = useWishlist();
  const { addToCart, getQuantity } = useCart();
  const quantityInCart = getQuantity(product.id);

  const reviews = product.reviews || [];
  const avgRating =
    reviews?.length > 0
      ? (
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      ).toFixed(1)
      : "0.0";

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      remove(product.id);
    } else {
      add(product.id);
    }
  };

  const handleAddToCart = () => {
    if (!isMaxReached) {
      addToCart(product.id, 1);
    }
  };

  const handleBuyNow = () => {
    if (!isMaxReached && quantityInCart === 0) {
      addToCart(product.id, 1);
    }

    navigate("/checkout");
  };

  const regularPrice = Number(product.price);
  const offerPrice = Number(product.original_price);
  const isOnSale = offerPrice > 0 && offerPrice < regularPrice;
  const discountPercentage = isOnSale
    ? Math.round(((regularPrice - offerPrice) / regularPrice) * 100)
    : 0;

  const imageUrl = product.images?.[0]?.url
    ? `https://nurae-api.alernal.com.co/${product.images[0].url}`
    : "https://via.placeholder.com/300x400.png?text=Sin+Imagen";

  const maxAvailable = product.stock_count ?? 1;
  const isMaxReached = quantityInCart >= maxAvailable;

  // 👇 LIST VIEW
  if (viewMode === "list") {
    return (
      <div className="flex flex-col sm:flex-row bg-white border border-gray-100 overflow-hidden transition-all">
        <div className="max-w-50 h-full relative flex-shrink-0 bg-gray-100 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="object-contain w-full h-full"
          />
          {isOnSale && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded-full font-semibold shadow">
              -{discountPercentage}% OFF
            </span>
          )}
        </div>

        <div className="flex flex-col justify-between p-4 flex-1 space-y-3">
          <div>
            <div className="flex justify-between items-center text-xs text-muted-foreground font-medium mb-1">
              <Link
                to={`/collections?category=${product.category?.slug ?? "general"
                  }`}
                className="uppercase tracking-wide hover:underline"
              >
                {product.category ?? "General"}
              </Link>
              <div className="flex items-center gap-1">
                <LuStar className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{avgRating}</span>
                <span className="text-gray-400">({reviews?.length})</span>
              </div>
            </div>

            <Link to={`/products/${product.slug}`}>
              <h3 className="text-lg font-medium leading-snug hover:text-[#D4AF37] transition-colors line-clamp-2 mb-1">
                {product.name}
              </h3>
            </Link>

            {product.description && (
              <p className="text-sm text-gray-600 font-light line-clamp-2">
                {product.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 mt-4">
            <div>
              <p className="text-xl font-medium">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                }).format(isOnSale ? offerPrice : regularPrice)}
              </p>
              {isOnSale && (
                <p className="text-sm text-gray-400 line-through">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                  }).format(regularPrice)}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/90 hover:bg-white shadow rounded-full"
                onClick={toggleWishlist}
              >
                <LuHeart
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isInWishlist(product.id)
                      ? "fill-[#d01e23] text-[#d01e23]"
                      : "text-gray-600"
                  )}
                />
              </Button>
              <Button
                size="sm"
                className="bg-[#5E4536] hover:opacity-90 text-white rounded-full text-sm font-medium shadow"
                onClick={handleAddToCart}
                disabled={isMaxReached || quantityInCart > 0}
              >
                <LuShoppingBag className="mr-2 h-4 w-4" />
                {quantityInCart > 0 ? "Agregado" : "Añadir"}
              </Button>
            </div>
          </div>
          {isMaxReached && (
            <p className="text-xs text-red-500 mt-1">
              No hay más unidades disponibles
            </p>
          )}
        </div>
      </div>
    );
  }

  // 👇 GRID VIEW
  return (
    <div className="group relative h-100 bg-white border border-gray-300 shadow-sm transition-all duration-500 hover:-translate-y-2 flex flex-col">
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.slug}`} className="relative group block bg-white overflow-hidden">
          <div className="relative flex items-center justify-center bg-white">
            <img
              src={imageUrl}
              alt={product.name}
              loading="lazy"
              className="max-h-full max-w-full transition-transform group-hover:scale-105 duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute top-4 left-4 space-y-2">
              {isOnSale && (
                <span className="bg-red-600 text-white text-[10px] px-2 py-1 rounded-full font-semibold shadow">
                  -{discountPercentage}% OFF
                </span>
              )}
            </div>
          </div>
        </Link>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300 translate-x-2 group-hover:translate-x-0">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 hover:bg-white shadow-md rounded-full"
            onClick={toggleWishlist}
          >
            <LuHeart
              className={cn(
                "h-5 w-5 transition-colors",
                isInWishlist(product.id)
                  ? "fill-[#5E4536] text-[#5E4536]"
                  : "text-gray-600"
              )}
            />
          </Button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300 translate-y-2 group-hover:translate-y-0">
          <Button
            className="w-full bg-[#5E4536] hover:opacity-90 text-white rounded-full shadow-lg text-sm font-semibold"
            onClick={handleAddToCart}
            disabled={isMaxReached || quantityInCart > 0}
          >
            <LuShoppingBag className="mr-2 h-4 w-4" />
            {quantityInCart > 0 ? "Agregado" : "Añadir al carrito"}
          </Button>
          {isMaxReached && (
            <p className="text-xs text-red-500 mt-2 text-center">
              No hay más unidades disponibles
            </p>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-medium mb-2">
          <Link
            to={`/collections?category=${product.category ?? "general"}`}
            className="uppercase tracking-wide hover:underline"
          >
            {product.category ?? "General"}
          </Link>
          <div className="flex items-center gap-1">
            <LuStar className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{avgRating}</span>
            <span className="text-gray-400">({reviews.length})</span>
          </div>
        </div>

        <Link to={`/products/${product.slug}`}>
          <h3 className="text-[12px] text-[#2C1810] leading-snug group-hover:text-[#5E4536] transition-colors truncate mb-1">
            {product.name}
          </h3>
        </Link>

        {/* {product.description && (
          <p className="text-sm text-gray-600 font-light line-clamp-2 mb-3">
            {product.description}
          </p>
        )} */}

        <div className="flex-grow" />

        <div className="flex items-center justify-between mt-2 border-gray-200">
          <div>
            <p className="text-sm text-[#2C1810] leading-none">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
              }).format(isOnSale ? offerPrice : regularPrice)}
            </p>
            {isOnSale && (
              <p className="text-sm text-gray-400 line-through">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                }).format(regularPrice)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
