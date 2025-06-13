import { Link } from "react-router-dom";
import {
  LuSparkles,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/products/useProducts";
import ProductCard from "./product-card";

export function FeaturedProducts() {
  const { data: products = [], isLoading, isError } = useProducts();

  const topRated = products
    .map((product: any) => {
      const reviews = product.reviews || [];
      const avgRating =
        reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;
      return { ...product, avgRating };
    })
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 4);

  return (
    <section className="w-full py-20 md:py-28 bg-[#F5EFE7] relative overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        {/* Heading */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full bg-[#D4AF37]/10 px-6 py-2 text-sm font-medium text-[#2C1810]">
            <LuSparkles className="h-5 w-5" />
            <span className="tracking-wide">Productos Destacados</span>
            <LuSparkles className="h-5 w-5" />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#2C1810]">
            Nuestros Favoritos
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed">
            Descubre las piezas más amadas por nuestra comunidad de mujeres
            empoderadas
          </p>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <p className="text-center py-16 text-muted-foreground">
            Cargando productos...
          </p>
        ) : isError ? (
          <p className="text-center py-16 text-red-500">
            Error al cargar productos.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {topRated.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <Link to="/collections">
            <Button className="bg-[#D4AF37] hover:opacity-90 text-white px-12 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 group">
              Ver Toda la Colección
              <LuSparkles className="ml-3 h-6 w-6 group-hover:animate-spin" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
