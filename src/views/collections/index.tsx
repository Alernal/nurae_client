import { useEffect, useRef, useState } from "react";
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
import { useDebounce } from "@/hooks/useDebounce";

export default function CollectionsPage() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");

  const [priceRange, setPriceRange] = useState([1000000]);
  const [appliedPriceRange, setAppliedPriceRange] = useState<
    number | undefined
  >(undefined);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [sortBy, selectedCategories, selectedMaterials, appliedPriceRange, search]);

  const { data: productsData, isLoading } = useProducts({
    categories: selectedCategories.length ? selectedCategories : undefined,
    materials: selectedMaterials.length ? selectedMaterials : undefined,
    price_min: 0,
    price_max: appliedPriceRange,
    sort: sortBy !== "featured" ? sortBy : undefined,
    page,
    search: debouncedSearch.length > 0 ? debouncedSearch : undefined,
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

  useEffect(() => {
    const urlPage = searchParams.get("page");
    if (urlPage && !isNaN(Number(urlPage))) {
      setPage(Number(urlPage));
    }
  }, [searchParams]);


  const navigate = useNavigate();

  const hasInteractedRef = useRef(false);

  useEffect(() => {
    if (!hasInteractedRef.current) return;

    const timeout = setTimeout(() => {
      setAppliedPriceRange(priceRange[0]);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [priceRange]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (selectedCategories.length === 1) {
      params.set("category", selectedCategories[0]);
    } else {
      params.delete("category");
    }

    if (page > 1) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }

    navigate(`/collections?${params.toString()}`, { replace: true });
  }, [selectedCategories, page]);

  const categories = [
    { label: "Collares", value: "collares" },
    { label: "Aretes", value: "aretes" },
    { label: "Earcuff", value: "earcuff" },
    { label: "Anillos", value: "anillos" },
    { label: "Denarios", value: "denarios" },
    { label: "Cabellos", value: "cabellos" },
  ];

  const materials = [
    { label: "Aleación de rodio", value: "aleación de rodio" },
    { label: "Acrílico", value: "acrílico" },
  ];

  function getPagination(current: number, total: number, delta = 2) {
    const range = [];
    for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
      range.push(i);
    }

    if (range[0] > 1) range.unshift("...");
    if (range[0] !== 1) range.unshift(1);
    if (range[range.length - 1] < total) {
      range.push("...");
      range.push(total);
    }

    return range;
  }


  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Toda la Colección
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Descubre nuestra colección completa de accesorios únicos diseñados
          para mujeres que brillan con luz propia.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 font-paragraph">
        <aside className="w-full lg:w-64 bg-white">
          <h3 className="font-semibold text-lg mb-4">Filtros</h3>

          {/* Campo de búsqueda */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Buscar Productos</h4>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="w-full px-4 py-2 border border-gray-200 rounded-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

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
                <Label htmlFor={cat.value} className="text-sm font-light">
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
                <Label htmlFor={mat.value} className="text-sm font-light">
                  {mat.label}
                </Label>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Precio</h4>
            <Slider
              value={[priceRange[0]]}
              onValueChange={(value) => {
                hasInteractedRef.current = true;
                setPriceRange(value);
              }}
              min={0}
              max={1000000}
              step={2000}
            />

            <div className="flex justify-between text-xs mt-2">
              <div className="text-xs mt-2 text-center">
                Hasta:{" "}
                {priceRange[0].toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                  maximumFractionDigits: 0,
                })}
              </div>

            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setSelectedCategories([]);
              setSelectedMaterials([]);
              setPriceRange([0, 1000000]);
              setAppliedPriceRange(undefined);
              setSearch("");  // Limpiar búsqueda
            }}
          >
            Limpiar filtros
          </Button>
        </aside>

        {/* Productos */}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white/80 backdrop-blur-sm rounded-2xl">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                Mostrando {products.length} productos
                {isLoading && <span className="animate-spin h-4 w-4 border border-gray-400 rounded-full border-t-transparent" />}
              </span>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="bg-gray-200"
                >
                  <LuGrid2X2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="bg-gray-200"
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
                size="icon"
                className="bg-gray-100 hover:bg-gray-300 shadow-none border-none"
                onClick={() => {
                  setPage((prev) => Math.max(prev - 1, 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === 1}
              >
                <LuChevronDown className="h-4 w-4 rotate-90" />
              </Button>

              {getPagination(currentPage, lastPage).map((pageNum, i) =>
                pageNum === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-2">...</span>
                ) : (
                  <Button
                    key={pageNum}
                    className={cn(
                      "shadow-none border-none",
                      currentPage === pageNum
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-300 text-black"
                    )}
                    onClick={() => {
                      setPage(Number(pageNum));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {pageNum}
                  </Button>
                )
              )}

              <Button
                size="icon"
                className="bg-gray-100 hover:bg-gray-300 shadow-none border-none"
                onClick={() => {
                  setPage((prev) => Math.min(prev + 1, lastPage));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
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
