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
        <DialogHeader className="p-6 m-0">
          <DialogTitle className="flex p-0 items-center gap-2 text-2xl font-serif">
            <LuSearch className="text-primary" />
            Buscar Productos
          </DialogTitle>

          <div className="relative">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="¿Qué estás buscando hoy?"
              className="pl-10 pr-12 h-12 text-lg border-2 focus:border-primary rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Resultados de la Búsqueda */}
          <div className="flex-1 px-6 overflow-y-auto max-h-[55vh]">
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
