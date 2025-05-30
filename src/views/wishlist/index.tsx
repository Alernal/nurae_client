import { useEffect, useMemo, useState } from "react";
import { useProducts } from "@/hooks/products/useProducts";
import { useWishlist } from "@/hooks/useWishlist";
import ProductCard from "@/components/product-card";
import { LuHeart } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { data: products = [], isLoading } = useProducts();
  const { items: wishlistIds, fetchWishlist } = useWishlist();

  const [hasLoaded, setHasLoaded] = useState(false);

  // Llamar solo una vez para obtener favoritos
  useEffect(() => {
    fetchWishlist().finally(() => setHasLoaded(true));
  }, []);

  // Filtrar productos favoritos
  const wishlistItems = useMemo(() => {
    return products.filter((product) => wishlistIds.includes(product.id));
  }, [products, wishlistIds]);

  if (isLoading || !hasLoaded) {
    return (
      <div className="container py-20 text-center text-gray-500">
        Cargando tus productos favoritos...
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container px-4 py-16 md:px-6 md:py-24 text-center space-y-8 max-w-2xl mx-auto">
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
          <LuHeart className="h-16 w-16 text-gray-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800">
          Tu lista de deseos está vacía
        </h1>
        <p className="text-xl text-gray-600">
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
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full text-lg font-medium"
            >
              Ver Más Vendidos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
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
