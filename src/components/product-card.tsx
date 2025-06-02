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
    ? `http://localhost:8000${product.images[0].url}`
    : "https://via.placeholder.com/300x400.png?text=Sin+Imagen";

  const maxAvailable = product.stock_count ?? 1;
  const isMaxReached = quantityInCart >= maxAvailable;

  // 👇 LIST VIEW
  if (viewMode === "list") {
    return (
      <div className="flex flex-col sm:flex-row bg-white rounded-3xl shadow-md border border-pink-100 overflow-hidden transition-all">
        <div className="w-full sm:w-48 h-64 sm:h-auto relative flex-shrink-0 bg-gray-100 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="object-cover w-full h-full"
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
                to={`/collections/${product.category?.slug ?? "general"}`}
                className="uppercase tracking-wide hover:underline"
              >
                {product.category?.name ?? "General"}
              </Link>
              <div className="flex items-center gap-1">
                <LuStar className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.8</span>
                <span className="text-gray-400">(10)</span>
              </div>
            </div>

            <Link to={`/products/${product.id}`}>
              <h3 className="text-lg font-serif font-bold text-[#2C1810] leading-snug hover:text-[#D4AF37] transition-colors line-clamp-2 mb-1">
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
              <p className="text-xl font-serif font-bold text-[#2C1810]">
                $
                {isOnSale
                  ? offerPrice.toLocaleString("es-CO")
                  : regularPrice.toLocaleString("es-CO")}{" "}
                COP
              </p>
              {isOnSale && (
                <p className="text-sm text-gray-400 line-through">
                  ${regularPrice.toLocaleString("es-CO")} COP
                </p>
              )}
            </div>

            <div className="flex gap-2">
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
                      ? "fill-[#D4AF37] text-[#D4AF37]"
                      : "text-gray-600"
                  )}
                />
              </Button>
              <Button
                size="sm"
                className="bg-[#D4AF37] hover:opacity-90 text-white rounded-full text-sm font-medium shadow"
                onClick={handleAddToCart}
                disabled={isMaxReached}
              >
                <LuShoppingBag className="mr-2 h-4 w-4" />
                {quantityInCart > 0 ? "Agregar otro" : "Añadir"}
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
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="object-cover w-full h-full transition-transform group-hover:scale-110 duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-4 left-4 space-y-2">
          {isOnSale && (
            <span className="bg-red-600 text-white text-[10px] px-2 py-1 rounded-full font-semibold shadow">
              -{discountPercentage}% OFF
            </span>
          )}
        </div>

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
                  ? "fill-[#D4AF37] text-[#D4AF37]"
                  : "text-gray-600"
              )}
            />
          </Button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300 translate-y-2 group-hover:translate-y-0">
          <Button
            className="w-full bg-[#D4AF37] hover:opacity-90 text-white rounded-full shadow-lg text-sm font-semibold"
            onClick={handleAddToCart}
            disabled={isMaxReached}
          >
            <LuShoppingBag className="mr-2 h-4 w-4" />
            {quantityInCart > 0 ? "Agregar otro" : "Añadir al carrito"}
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
            to={`/collections/${product.category?.slug ?? "general"}`}
            className="uppercase tracking-wide hover:underline"
          >
            {product.category?.name ?? "General"}
          </Link>
          <div className="flex items-center gap-1">
            <LuStar className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>4.8</span>
            <span className="text-gray-400">(10)</span>
          </div>
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg md:text-xl font-serif font-bold text-[#2C1810] leading-snug group-hover:text-[#D4AF37] transition-colors line-clamp-2 mb-1">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="text-sm text-gray-600 font-light line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        <div className="flex-grow" />

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200">
          <div>
            <p className="text-xl font-serif font-bold text-[#2C1810] leading-none">
              $
              {isOnSale
                ? offerPrice.toLocaleString("es-CO")
                : regularPrice.toLocaleString("es-CO")}{" "}
              COP
            </p>
            {isOnSale && (
              <p className="text-sm text-gray-400 line-through">
                ${regularPrice.toLocaleString("es-CO")} COP
              </p>
            )}
          </div>
          <Button
            size="sm"
            className="bg-[#D4AF37] hover:opacity-90 text-white rounded-full text-sm font-medium shadow"
            onClick={handleBuyNow}
          >
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
}
