import { useState } from "react"
import { LuSearch, LuFilter, LuStar, LuHeart } from "react-icons/lu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {Link} from "react-router-dom"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const searchResults = [
  {
    id: 1,
    name: "Collar Cadena Rosa Dorada",
    price: 1290,
    image: "/placeholder.svg?height=100&width=100",
    category: "Collares",
    rating: 4.8,
    isNew: true,
  },
  {
    id: 2,
    name: "Aretes Cristal Malva",
    price: 890,
    image: "/placeholder.svg?height=100&width=100",
    category: "Aretes",
    rating: 4.9,
    isNew: false,
  },
  {
    id: 3,
    name: "Pulsera Eslabones Dorados",
    price: 990,
    image: "/placeholder.svg?height=100&width=100",
    category: "Pulseras",
    rating: 4.7,
    isNew: true,
  },
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 5000])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 bg-gradient-to-br from-pink-50 to-purple-50">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-2xl font-serif">
            <LuSearch className="h-6 w-6 text-primary" />
            Buscar Productos
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Search Bar */}
          <div className="px-6 pb-4">
            <div className="relative">
              <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="¿Qué estás buscando hoy?"
                className="pl-10 pr-12 h-12 text-lg border-2 border-pink-200 focus:border-primary rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <LuFilter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="w-80 border-r border-pink-200 p-6 overflow-y-auto bg-white/50">
                <h3 className="font-serif font-bold text-lg mb-4">Filtros</h3>

                <div className="space-y-6">
                  {/* Categories */}
                  <div>
                    <h4 className="font-medium mb-3">Categorías</h4>
                    <div className="space-y-2">
                      {["Collares", "Aretes", "Pulseras", "Anillos"].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox id={category} />
                          <Label htmlFor={category} className="text-sm">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium mb-3">Rango de Precio</h4>
                    <div className="space-y-3">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={5000}
                        step={50}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>MXN ${priceRange[0]}</span>
                        <span>MXN ${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <h4 className="font-medium mb-3">Colores</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        "bg-pink-400",
                        "bg-purple-400",
                        "bg-amber-400",
                        "bg-emerald-400",
                        "bg-blue-400",
                        "bg-red-400",
                        "bg-gray-400",
                        "bg-rose-400",
                      ].map((color, index) => (
                        <button
                          key={index}
                          className={`w-8 h-8 rounded-full ${color} border-2 border-white shadow-sm hover:scale-110 transition-transform`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Materials */}
                  <div>
                    <h4 className="font-medium mb-3">Materiales</h4>
                    <div className="space-y-2">
                      {["Oro", "Plata", "Acero Inoxidable", "Cristal"].map((material) => (
                        <div key={material} className="flex items-center space-x-2">
                          <Checkbox id={material} />
                          <Label htmlFor={material} className="text-sm">
                            {material}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search Results */}
            <div className="flex-1 p-6 overflow-y-auto">
              {searchQuery ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg">
                      Resultados para "{searchQuery}" ({searchResults.length})
                    </h3>
                    <Button variant="outline" size="sm">
                      Ordenar por relevancia
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        onClick={onClose}
                        className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-100"
                      >
                        <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="object-cover"
                          />
                          {product.isNew && (
                            <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                              Nuevo
                            </div>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <LuHeart className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs text-primary font-medium uppercase">{product.category}</p>
                          <h4 className="font-medium text-gray-800 line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h4>
                          <div className="flex items-center gap-1">
                            <LuStar className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs text-gray-600">{product.rating}</span>
                          </div>
                          <p className="font-serif font-bold text-primary">MXN ${product.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 mt-12">
                  <LuSearch className="h-16 w-16 text-gray-300 mx-auto" />
                  <h3 className="text-lg font-medium text-gray-500">Busca tu accesorio perfecto</h3>
                  <p className="text-gray-400">Escribe el nombre del producto, categoría o material que buscas</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-6">
                    {["Collares", "Aretes", "Pulseras", "Anillos", "Oro", "Plata"].map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchQuery(suggestion)}
                        className="rounded-full"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
