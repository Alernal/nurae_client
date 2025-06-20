import { Link } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import { useProducts } from "@/hooks/products/useProducts";

export default function NewPage() {
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
    <div className="min-h-screen bg-[#FDF8F4]">
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#9A6D4E] shadow-sm border border-[#E8D9CF]">
                <LuSparkles className="h-5 w-5" />
                <span className="font-medium">Recién Llegadas</span>
                <LuSparkles className="h-5 w-5" />
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-[#5E4536] leading-tight">
                Novedades
              </h1>

              <p className="text-xl md:text-2xl text-[#9A6D4E] max-w-3xl mx-auto font-light leading-relaxed">
                Descubre las últimas creaciones de NURAE. Piezas únicas que
                acaban de llegar para hacer brillar tu estilo.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white px-8 py-3 rounded-full text-lg font-medium shadow-sm hover:shadow-md transition-all duration-300">
                  Ver Toda la Colección
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-[#9A6D4E] text-[#9A6D4E] hover:bg-[#9A6D4E] hover:text-white px-8 py-3 rounded-full text-lg font-medium"
                >
                  Suscríbete para Novedades
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
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

            {/* Load More */}
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
      </main>
    </div>
  );
}
