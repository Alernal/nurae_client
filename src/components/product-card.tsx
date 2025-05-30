import { useWishlist } from "@/hooks/useWishlist"; // <-- nuevo hook
import { Button } from "./ui/button";
import { LuHeart, LuShoppingBag, LuStar } from "react-icons/lu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function ProductCard({ product }) {
  const { add, remove, isInWishlist } = useWishlist(); // <-- nuevo hook

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      remove(product.id); // solo se necesita el ID, petición incluida
    } else {
      add(product.id); // solo se necesita el ID, petición incluida
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col">
      {/* Imagen */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={
            product.images?.[0]?.url
              ? `http://localhost:8000${product.images[0].url}`
              : "https://via.placeholder.com/300x400.png?text=Sin+Imagen"
          }
          alt={product.name}
          className="object-cover w-full h-full transition-transform group-hover:scale-110 duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-4 left-4 space-y-2">
          {product.original_price && (
            <span className="bg-[#D4AF37] text-white text-[10px] px-2 py-1 rounded-full font-semibold shadow">
              OFERTA
            </span>
          )}
        </div>

        {/* Botón wishlist */}
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

        {/* Botón Agregar al carrito */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition duration-300 translate-y-2 group-hover:translate-y-0">
          <Button className="w-full bg-[#D4AF37] hover:opacity-90 text-white rounded-full shadow-lg text-sm font-semibold">
            <LuShoppingBag className="mr-2 h-4 w-4" />
            Añadir al carrito
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Categoría y rating */}
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

        {/* Nombre */}
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg md:text-xl font-serif font-bold text-[#2C1810] leading-snug group-hover:text-[#D4AF37] transition-colors line-clamp-2 mb-1">
            {product.name}
          </h3>
        </Link>

        {/* Descripción */}
        {product.description && (
          <p className="text-sm text-gray-600 font-light line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        {/* Espaciador */}
        <div className="flex-grow" />

        {/* Precios y botón Comprar */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200">
          <div>
            <p className="text-xl font-serif font-bold text-[#2C1810] leading-none">
              ${Number(product.price).toLocaleString("es-CO")} COP
            </p>
            {product.original_price && (
              <p className="text-sm text-gray-400 line-through">
                ${Number(product.original_price).toLocaleString("es-CO")} COP
              </p>
            )}
          </div>
          <Button
            size="sm"
            className="bg-[#D4AF37] hover:opacity-90 text-white rounded-full text-sm font-medium shadow"
          >
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
}
