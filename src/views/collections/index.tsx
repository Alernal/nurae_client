import { useState } from "react"
import {Link} from "react-router-dom"
import { LuFilter, LuGrid2X2, LuList, LuHeart, LuStar, LuShoppingBag, LuChevronDown } from "react-icons/lu"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useWishlist } from "@/providers/wishlist-provider"
import { cn } from "@/lib/utils"

const products = [
  {
    id: 1,
    name: "Collar Cadena Rosa Dorada",
    price: 195000,
    originalPrice: 240000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Collares",
    isNew: true,
    rating: 4.8,
    reviews: 24,
    colors: ["rose-gold", "gold", "silver"],
    material: "Oro",
    inStock: true,
  },
  {
    id: 2,
    name: "Aretes Cristal Malva",
    price: 135000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Aretes",
    isNew: false,
    rating: 4.9,
    reviews: 18,
    colors: ["purple", "pink", "clear"],
    material: "Cristal",
    inStock: true,
  },
  {
    id: 3,
    name: "Pulsera Eslabones Dorados",
    price: 150000,
    originalPrice: 180000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Pulseras",
    isNew: true,
    rating: 4.7,
    reviews: 32,
    colors: ["gold", "rose-gold"],
    material: "Oro",
    inStock: true,
  },
  {
    id: 4,
    name: "Anillo Ajustable Joya",
    price: 120000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Anillos",
    isNew: false,
    rating: 4.9,
    reviews: 15,
    colors: ["emerald", "sapphire", "ruby"],
    material: "Plata",
    inStock: false,
  },
  {
    id: 5,
    name: "Collar Perlas Modernas",
    price: 220000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Collares",
    isNew: true,
    rating: 4.6,
    reviews: 28,
    colors: ["white", "cream", "pink"],
    material: "Perla",
    inStock: true,
  },
  {
    id: 6,
    name: "Aretes Geométricos",
    price: 98000,
    originalPrice: 128000,
    image: "/placeholder.svg?height=400&width=300",
    category: "Aretes",
    isNew: false,
    rating: 4.8,
    reviews: 22,
    colors: ["gold", "silver"],
    material: "Acero",
    inStock: true,
  },
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function CollectionsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 300000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  const { addItem, removeItem, isInWishlist } = useWishlist()

  const toggleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id)
    } else {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      })
    }
  }

  const categories = ["Collares", "Aretes", "Pulseras", "Anillos"]
  const materials = ["Oro", "Plata", "Cristal", "Perla", "Acero"]

  return (
    <div>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-primary">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-primary">Colecciones</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent mb-4">
            Toda la Colección
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Descubre nuestra colección completa de accesorios únicos diseñados para mujeres que brillan con luz propia.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden mb-4 bg-white/80 backdrop-blur-sm">
                <LuFilter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-sm bg-gradient-to-br from-pink-50 to-purple-50">
              <FilterSidebar
                categories={categories}
                materials={materials}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedMaterials={selectedMaterials}
                setSelectedMaterials={setSelectedMaterials}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </SheetContent>
          </Sheet>

          {/* Desktop Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100 sticky top-24">
              <FilterSidebar
                categories={categories}
                materials={materials}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedMaterials={selectedMaterials}
                setSelectedMaterials={setSelectedMaterials}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-100">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Mostrando {filteredProducts.length} productos</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-primary" : ""}
                  >
                    <LuGrid2X2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-primary" : ""}
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

            {/* Products Grid/List */}
            <div
              className={cn(
                "grid gap-6",
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
              )}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  onToggleWishlist={() => toggleWishlist(product)}
                  isInWishlist={isInWishlist(product.id)}
                  index={index}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled>
                  <LuChevronDown className="h-4 w-4 rotate-90" />
                </Button>
                <Button variant="default" className="bg-primary">
                  1
                </Button>
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
    </div>
  )
}

function FilterSidebar({
  categories,
  materials,
  selectedCategories,
  setSelectedCategories,
  selectedMaterials,
  setSelectedMaterials,
  priceRange,
  setPriceRange,
}: any) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <h3 className="font-serif font-bold text-xl text-primary">Filtros</h3>

      {/* Categories */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Categorías</h4>
        <Separator />
        <div className="space-y-3">
          {categories.map((category: string) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category])
                  } else {
                    setSelectedCategories(selectedCategories.filter((c: string) => c !== category))
                  }
                }}
              />
              <Label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Rango de Precio</h4>
        <Separator />
        <div className="space-y-3">
          <Slider value={priceRange} onValueChange={setPriceRange} max={300000} step={10000} className="w-full" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Materials */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Material</h4>
        <Separator />
        <div className="space-y-3">
          {materials.map((material: string) => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={material}
                checked={selectedMaterials.includes(material)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedMaterials([...selectedMaterials, material])
                  } else {
                    setSelectedMaterials(selectedMaterials.filter((m: string) => m !== material))
                  }
                }}
              />
              <Label htmlFor={material} className="text-sm cursor-pointer">
                {material}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategories([])
          setSelectedMaterials([])
          setPriceRange([0, 300000])
        }}
      >
        Limpiar Filtros
      </Button>
    </div>
  )
}

function ProductCard({ product, viewMode, onToggleWishlist, isInWishlist, index }: any) {
  if (viewMode === "list") {
    return (
      <div
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="flex gap-6">
          <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover" />
            {product.isNew && (
              <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full">Nuevo</div>
            )}
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-primary font-medium uppercase">{product.category}</p>
                <h3 className="font-serif font-bold text-lg text-gray-800">{product.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <LuStar className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reseñas)
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onToggleWishlist} className="hover:bg-pink-50">
                <LuHeart className={cn("h-5 w-5", isInWishlist ? "fill-secondary text-secondary" : "text-gray-400")} />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-serif text-xl font-bold text-gray-800">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              <Button className="bg-luxury-gradient hover:opacity-90 text-white">
                <LuShoppingBag className="mr-2 h-4 w-4" />
                Agregar
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="object-cover transition-transform group-hover:scale-110 duration-500"
        />
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
            Nuevo
          </div>
        )}
        {product.originalPrice && (
          <div className="absolute top-3 right-3 bg-accent text-white text-xs px-2 py-1 rounded-full">Oferta</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
          onClick={onToggleWishlist}
        >
          <LuHeart className={cn("h-5 w-5", isInWishlist ? "fill-secondary text-secondary" : "text-gray-600")} />
        </Button>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs text-primary font-medium uppercase">{product.category}</p>
          <div className="flex items-center gap-1">
            <LuStar className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs text-gray-600">{product.rating}</span>
          </div>
        </div>
        <h3 className="font-serif font-bold text-gray-800 line-clamp-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-serif text-lg font-bold text-gray-800">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <Button size="sm" className="bg-luxury-gradient hover:opacity-90 text-white">
            Agregar
          </Button>
        </div>
      </div>
    </div>
  )
}
