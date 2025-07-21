import { useRef } from "react";
import { useProducts } from "@/hooks/products/useProducts";
import ProductCard from "./product-card";
import { Button } from "@/components/ui/button";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export function FeaturedProductsSection({
  titleTop,
  titleBottom,
  sort = "newest",
}) {
  const { data: products = [], isLoading, isError } = useProducts({ sort });
  const topRated = products.data;
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = 320;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-15 relative overflow-hidden">
      <div className="container px-0 md:px-6 relative">
        {/* Heading */}
        <div className="mb-5">
          <h2 className="text-4xl flex flex-col font-bold">
            {titleTop}{" "}
            <span className="font-subtitulo font-thin italic">
              {titleBottom}
            </span>
          </h2>
        </div>

        {/* Scroll Buttons */}
        <Button
          onClick={() => scroll("left")}
          variant="ghost"
          size="icon"
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-100"
        >
          <LuChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          onClick={() => scroll("right")}
          variant="ghost"
          size="icon"
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-100"
        >
          <LuChevronRight className="w-6 h-6" />
        </Button>

        {/* Product Slider */}
        {isLoading ? (
          <p className="text-center py-16 text-muted-foreground">
            Cargando productos...
          </p>
        ) : isError ? (
          <p className="text-center py-16 text-red-500">
            Error al cargar productos.
          </p>
        ) : (
          <div
            ref={scrollRef}
            className="overflow-x-auto scroll-smooth no-scrollbar"
          >
            <div className="flex gap-4 w-max">
              {topRated.slice(0, 12).map((product) => (
                <div
                  key={product.id}
                  className="min-w-[250px] sm:min-w-[320px] max-w-[300px]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
