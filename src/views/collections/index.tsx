import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuGrid2X2,
  LuList,
  LuChevronDown,
} from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/product-card";
import { useProducts } from "@/hooks/products/useProducts";

export default function CollectionsPage() {
  const { data: products = [], isLoading } = useProducts();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <span>/</span>
          <span className="text-primary">Colecciones</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold bg-clip-text text-black mb-4">
          Toda la Colección
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Descubre nuestra colección completa de accesorios únicos diseñados para mujeres que brillan con luz propia.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Productos */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-100">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {isLoading ? "Cargando productos..." : `Mostrando ${products.length} productos`}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <LuGrid2X2 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <LuList className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Destacados</SelectItem>
                <SelectItem value="newest">Más recientes</SelectItem>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="rating">Mejor calificados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Render productos */}
          <div
            className={cn(
              "grid gap-6",
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}
          >
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>

          {/* Paginación */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                <LuChevronDown className="h-4 w-4 rotate-90" />
              </Button>
              <Button variant="default" className="bg-primary">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline" size="icon">
                <LuChevronDown className="h-4 w-4 -rotate-90" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
