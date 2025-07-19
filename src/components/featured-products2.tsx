import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/products/useProducts";
import ProductCard from "./product-card";

export function FeaturedProducts2() {
  const { data: products = [], isLoading, isError } = useProducts({
    sort: "newest",
  });
  const topRated = products.data;

  return (
    <section className="w-full py-15 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        {/* Heading */}
        <div className="mb-5">
          <h2 className="text-4xl flex flex-col font-bold">
            Te puede <span className="font-subtitulo font-thin italic">Gustar</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topRated.slice(0,4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
