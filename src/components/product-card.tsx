import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { Button } from "./ui/button";
import { LuHeart, LuShoppingBag, LuStar } from "react-icons/lu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
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

    console.log(`Producto ${product.name} añadido al carrito`);
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

  // 👇 GRID VIEW
  return (
    <div className="group relative flex flex-col w-full h-full">
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.slug}`} className="relative group block bg-white overflow-hidden">
          <div className="relative flex items-center justify-center bg-white aspect-[3/4]">
            {/* Imagen principal */}
            <img
              src={imageUrl}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
            />

            {/* Segunda imagen si existe */}
            {product.images?.[1]?.url && (
              <img
                src={`https://nurae-api.alernal.com.co/${product.images[1].url}`}
                alt={product.name + " segunda imagen"}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-fill transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              />
            )}

            {/* Overlay al hacer hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Descuento */}
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
            <p className="text-sm font-bold leading-none">
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
