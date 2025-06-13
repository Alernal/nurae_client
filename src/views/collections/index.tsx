import { useEffect, useMemo, useRef, useState } from "react";
import { LuGrid2X2, LuList, LuChevronDown } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/product-card";
import { useProducts } from "@/hooks/products/useProducts";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CollectionsPage() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");

  const [priceRange, setPriceRange] = useState([0, 1500000]);
  const [appliedPriceRange, setAppliedPriceRange] = useState<
    number[] | undefined
  >(undefined);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  useEffect(() => {
    setPage(1);
  }, [sortBy, selectedCategories, selectedMaterials, appliedPriceRange]);

  const { data: productsData, isLoading } = useProducts({
    categories: selectedCategories.length ? selectedCategories : undefined,
    materials: selectedMaterials.length ? selectedMaterials : undefined,
    price_min: appliedPriceRange?.[0],
    price_max: appliedPriceRange?.[1],
    sort: sortBy !== "featured" ? sortBy : undefined,
    page,
  });

  const products = productsData?.data || [];
  const currentPage = productsData?.current_page || 1;
  const lastPage = productsData?.last_page || 1;

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory && categories.some((c) => c.value === urlCategory)) {
      setSelectedCategories([urlCategory]);
    }
  }, [searchParams]);

  const navigate = useNavigate();

  const hasInteractedRef = useRef(false);

  useEffect(() => {
    if (!hasInteractedRef.current) return;

    const timeout = setTimeout(() => {
      setAppliedPriceRange(priceRange);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [priceRange]);

  useEffect(() => {
    if (selectedCategories.length === 1) {
      navigate(`/collections?category=${selectedCategories[0]}`, {
        replace: true,
      });
    } else {
      navigate(`/collections`, { replace: true });
    }
  }, [selectedCategories]);

  const categories = [
    { label: "Collares", value: "collares" },
    { label: "Aretes", value: "aretes" },
    { label: "Pulseras", value: "pulseras" },
    { label: "Anillos", value: "anillos" },
  ];

  const materials = [
    { label: "Oro", value: "oro" },
    { label: "Plata", value: "plata" },
    { label: "Cristal", value: "cristal" },
    { label: "Perla", value: "perla" },
    { label: "Acero", value: "acero" },
  ];

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">
          Toda la Colección
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Descubre nuestra colección completa de accesorios únicos diseñados
          para mujeres que brillan con luz propia.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 border rounded-xl p-4 bg-white shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Filtros</h3>

          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Categorías</h4>
            {categories.map((cat) => (
              <div key={cat.value} className="flex items-center space-x-2 mb-1">
                <Checkbox
                  id={cat.value}
                  checked={selectedCategories.includes(cat.value)}
                  onCheckedChange={(checked) =>
                    setSelectedCategories((prev) =>
                      checked
                        ? [...prev, cat.value]
                        : prev.filter((c) => c !== cat.value)
                    )
                  }
                />
                <Label htmlFor={cat.value} className="text-sm">
                  {cat.label}
                </Label>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Material</h4>
            {materials.map((mat) => (
              <div key={mat.value} className="flex items-center space-x-2 mb-1">
                <Checkbox
                  id={mat.value}
                  checked={selectedMaterials.includes(mat.value)}
                  onCheckedChange={(checked) =>
                    setSelectedMaterials((prev) =>
                      checked
                        ? [...prev, mat.value]
                        : prev.filter((m) => m !== mat.value)
                    )
                  }
                />
                <Label htmlFor={mat.value} className="text-sm">
                  {mat.label}
                </Label>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Precio</h4>
            <Slider
              value={priceRange}
              onValueChange={(value) => {
                hasInteractedRef.current = true;
                setPriceRange(value);
              }}
              max={1500000}
              step={10000}
            />

            <div className="flex justify-between text-xs mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setSelectedCategories([]);
              setSelectedMaterials([]);
              setPriceRange([0, 1500000]);
              setAppliedPriceRange(undefined);
            }}
          >
            Limpiar filtros
          </Button>
        </aside>

        {/* Productos */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-100">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {isLoading
                  ? "Cargando productos..."
                  : `Mostrando ${products.length} productos`}
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
                <SelectItem value="price-high">
                  Precio: Mayor a Menor
                </SelectItem>
                <SelectItem value="rating">Mejor calificados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div
            className={cn(
              "grid gap-6",
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            )}
          >
            {products.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <LuChevronDown className="h-4 w-4 rotate-90" />
              </Button>

              {[...Array(lastPage)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
                disabled={currentPage === lastPage}
              >
                <LuChevronDown className="h-4 w-4 -rotate-90" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
