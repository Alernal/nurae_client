import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuSearch } from "react-icons/lu";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

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
      <div className="mb-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="font-subtitulo italic text-4xl md:text-5xl font-normal text-black">
          Toda la Colección
        </h1>

        <div className="relative w-full sm:w-60">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar..."
            className="pl-10 pr-4 py-2 border rounded-none border-gray-500 focus:outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>


      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 font-paragraph">
          <div className="flex flex-wrap items-center gap-3 ">
            <h1 className="font-semibold">Filtros: </h1>
            <Popover>
              <PopoverTrigger className="rounded-none text-sm">
                Categoría
                <LuChevronDown className="inline h-4 w-4 ml-1" />
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <div key={cat.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cat-${cat.value}`}
                        checked={selectedCategories.includes(cat.value)}
                        onCheckedChange={(checked) =>
                          setSelectedCategories((prev) =>
                            checked
                              ? [...prev, cat.value]
                              : prev.filter((c) => c !== cat.value)
                          )
                        }
                      />
                      <Label htmlFor={`cat-${cat.value}`} className="text-sm">
                        {cat.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Filtro: Material */}
            <Popover>
              <PopoverTrigger className="rounded-none text-sm">
                Material
                <LuChevronDown className="inline h-4 w-4 ml-1" />
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="flex flex-col gap-2">
                  {materials.map((mat) => (
                    <div key={mat.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mat-${mat.value}`}
                        checked={selectedMaterials.includes(mat.value)}
                        onCheckedChange={(checked) =>
                          setSelectedMaterials((prev) =>
                            checked
                              ? [...prev, mat.value]
                              : prev.filter((m) => m !== mat.value)
                          )
                        }
                      />
                      <Label htmlFor={`mat-${mat.value}`} className="text-sm">
                        {mat.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Filtro: Precio */}
            <Popover>
              <PopoverTrigger className="rounded-none text-sm">
                Precio
                <LuChevronDown className="inline h-4 w-4 ml-1" />
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="flex flex-col gap-4 p-2">
                  <Label className="text-sm">Hasta:</Label>
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
                  <span className="text-xs text-center text-muted-foreground">
                    {priceRange[0].toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center">
            <span className="font-semibold text-sm whitespace-nowrap">Ordenar por:</span>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="min-w-[160px] px-3 py-1 text-sm bg-transparent border-none focus:outline-none">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent className="w-[180px]">
                <SelectItem value="featured">Destacados</SelectItem>
                <SelectItem value="newest">Más recientes</SelectItem>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="rating">Mejor calificados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div
          className={cn(
            "grid auto-rows-fr gap-10 place-items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {products.map((product: any) => (
            <div className="h-full"> {/* Contenedor de tarjeta */}
              <ProductCard
                key={product.id}
                product={product}
              />
            </div>
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
  );
}
