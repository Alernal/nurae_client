import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/products/useProducts";
import ProductCard from "./product-card";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda

  const {
    data: products = [],
    isLoading,
    isError,
  } = useProducts({
    search: searchQuery,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 bg-white">
        <DialogHeader className="px-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Título */}
            <DialogTitle className="flex items-center gap-2 text-2xl p-0 m-0">
              <LuSearch className="text-primary" />
              Buscar Productos
            </DialogTitle>

            {/* Buscador */}
            <div className="relative w-full sm:w-auto sm:min-w-[300px]">
              <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              <Input
                type="text"
                placeholder="¿Qué estás buscando hoy?"
                className="pl-8 h-8 text-lg border rounded-xl w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Resultados de la Búsqueda */}
          <div className="flex-1 px-6 overflow-y-auto max-h-[70vh] -mt-3">
            {isLoading ? (
              <p className="text-center py-16 text-muted-foreground">
                Cargando productos...
              </p>
            ) : isError ? (
              <p className="text-center py-16 text-red-500">
                Error al cargar productos.
              </p>
            ) : products?.data?.length > 0 ? (
              <div className="">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.data.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 mt-12">
                <LuSearch className="h-16 w-16 text-gray-300 mx-auto" />
                <h3 className="text-lg font-medium text-gray-500">
                  Busca tu accesorio perfecto
                </h3>
                <p className="text-gray-400">
                  Escribe el nombre del producto, categoría o material que
                  buscas
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
