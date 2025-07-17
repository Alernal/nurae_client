import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/products/useProducts";
import ProductCard from "./product-card";

export function FeaturedProducts() {
  const { data: products = [], isLoading, isError } = useProducts({
    sort: "rating",
  });
  const topRated = products.data;

  return (
    <section className="w-full py-15 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        {/* Heading */}
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl font-normal text-[#5E4536]">
            Nuestros <span className="text-[var(--color-amarillo)] font-handwritten font-thin">Favoritos</span>
          </h2>
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
            {topRated.slice(0,8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <Link to="/collections">
            <Button className="cursor-pointer border border-gray-300 hover:opacity-90 text-[#5E4536] px-12 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 group">
              Ver Toda la Colección
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
