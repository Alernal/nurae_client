import { useEffect, useState } from "react";
import { useWishlist } from "@/hooks/useWishlist";
import ProductCard from "@/components/product-card";
import { LuHeart } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useByIds } from "@/hooks/products/useByIds";

export default function WishlistPage() {
  const { items: wishlistIds, fetchWishlist } = useWishlist();


  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    fetchWishlist().finally(() => setHasLoaded(true));
  }, []);

  const { data: wishlistItems = [], isLoading, isError } = useByIds(wishlistIds);


  if (isLoading || !hasLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-gray-600">
          <div className="w-12 h-12 border-4 border-rose-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium">Cargando tus productos favoritos...</p>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen px-4 py-16 md:px-6 md:py-24 text-center space-y-8 max-w-2xl mx-auto flex flex-col items-center justify-center">
        <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-md">
          <LuHeart className="h-16 w-16 text-gray-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800">
          Tu lista de deseos está vacía
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Guarda tus productos favoritos aquí para encontrarlos fácilmente más tarde.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/collections">
            <Button className="bg-luxury-gradient hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              Explorar Colecciones
            </Button>
          </Link>
          <Link to="/bestsellers">
            <Button
              variant="outline"
              className="border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
            >
              Ver Más Vendidos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-6 md:py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-marron)]">
          Mi Lista de Deseos
        </h1>
        <p className="text-xl text-gray-600">{wishlistItems.length} producto(s) favorito(s)</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
