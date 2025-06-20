import { Link } from "react-router-dom";
import { LuTrophy, LuSparkles } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import { useProducts } from "@/hooks/products/useProducts";

export default function BestsellersPage() {
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
    .sort((a, b) => b.avgRating - a.avgRating);

  return (
    <div className="min-h-screen bg-[#FDF8F4]">
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#9A6D4E] shadow-sm border border-[#E8D9CF]">
                <LuTrophy className="h-5 w-5 text-[#E8B059]" />
                <span className="font-medium">Los Más Vendidos</span>
                <LuTrophy className="h-5 w-5 text-[#E8B059]" />
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-[#5E4536] leading-tight">
                Bestsellers
              </h1>

              <p className="text-xl md:text-2xl text-[#9A6D4E] max-w-3xl mx-auto font-light leading-relaxed">
                Descubre las piezas más amadas por nuestra comunidad. Estos son
                los accesorios que han conquistado el corazón de miles de
                mujeres.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-[#9A6D4E]">15K+</div>
                  <div className="text-sm text-[#9A6D4E]">
                    Productos vendidos
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-[#9A6D4E]">4.8★</div>
                  <div className="text-sm text-[#9A6D4E]">
                    Calificación promedio
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-[#9A6D4E]">98%</div>
                  <div className="text-sm text-[#9A6D4E]">
                    Satisfacción del cliente
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Productos Bestsellers */}
        <section className="py-16 md:py-24 bg-[#F5EEE8]">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#5E4536] mb-4">
                Todos los Bestsellers
              </h2>
              <p className="text-lg text-[#9A6D4E]">
                Ranking completo de nuestros productos más vendidos
              </p>
            </div>

            {isLoading ? (
              <p className="text-center py-16 text-muted-foreground">
                Cargando productos...
              </p>
            ) : isError ? (
              <p className="text-center py-16 text-red-500">
                Error al cargar productos.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {topRated.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-8 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-[#5E4536]">
                ¿Por qué son tan populares?
              </h2>
              <p className="text-xl text-[#9A6D4E]">
                Nuestros bestsellers combinan diseño excepcional, calidad
                premium y precios accesibles. Son las piezas que nuestras
                clientas eligen una y otra vez.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
