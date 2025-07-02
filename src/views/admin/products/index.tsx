import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuEye,
  LuPencilLine,
  LuTrash2,
  LuPlus,
  LuSearch,
  LuFilter,
  LuFlipHorizontal2,
} from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useProducts } from "@/hooks/products/useProducts"; // Hook para productos
import { useDeleteProduct } from "@/hooks/products/useDeleteProduct";

export default function AdminProducts() {
  const navigate = useNavigate();

  // Estado para el término de búsqueda y el filtro de stock
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");

  // Usamos el hook useProducts para obtener los productos filtrados por búsqueda
  const {
    data: productsResponse = {},
    isLoading,
    isError,
  } = useProducts({
    search: searchTerm, // Filtro de búsqueda
  });

  // Aseguramos que products siempre sea un array
  const products = Array.isArray(productsResponse?.data)
    ? productsResponse.data
    : [];

  const { mutate: deleteProduct, isLoading: isDeleting } = useDeleteProduct();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Filtrar productos localmente según el filtro de stock
  const filteredProducts = products.filter((product) => {
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "in_stock" && product.in_stock) ||
      (stockFilter === "out_of_stock" && !product.in_stock) ||
      (stockFilter === "low_stock" &&
        product.in_stock &&
        product.stock_count <= 10);

    return matchesStock;
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(price);

  const getStockBadge = (product) => {
    if (!product.in_stock || product.stock_count === 0)
      return <Badge className="bg-red-100 text-red-700">Sin Stock</Badge>;
    if (product.stock_count <= 5)
      return (
        <Badge className="bg-yellow-100 text-yellow-700">Stock Bajo</Badge>
      );
    return <Badge className="bg-green-100 text-green-700">En Stock</Badge>;
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de Productos
          </h1>
          <p className="text-gray-500 text-sm">
            Administra tu catálogo y controla tu inventario.
          </p>
        </div>
        <Button
          onClick={() => navigate("/admin/products/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <LuPlus className="mr-2 h-4 w-4" />
          Agregar Producto
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-800">Filtros</CardTitle>
          <CardDescription className="text-gray-500 text-sm">
            Filtra y encuentra productos fácilmente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Buscador */}
            <div className="relative w-full md:flex-1">
              <LuSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtro de Stock */}
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="md:w-[200px]">
                <LuFilter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="in_stock">En stock</SelectItem>
                <SelectItem value="out_of_stock">Sin stock</SelectItem>
                <SelectItem value="low_stock">Stock bajo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de productos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-800">Lista de Productos</CardTitle>
          <CardDescription className="text-gray-500 text-sm">
            {filteredProducts.length} producto(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center text-gray-500 py-8">
              Cargando productos...
            </p>
          ) : isError ? (
            <p className="text-center text-red-600 py-8">
              Error al cargar productos
            </p>
          ) : (
            <div className="rounded-md border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imagen</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Talla / Color</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={
                            product.images?.[0]?.url
                              ? `http://localhost:8000${product.images[0].url}`
                              : "/placeholder.svg"
                          }
                          alt={product.name}
                          className="w-14 h-14 rounded object-cover"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-800">
                          {product.name}
                        </div>
                        {product.description && (
                          <div className="text-sm text-gray-500 max-w-[200px] truncate">
                            {product.description}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-800 font-medium">
                          {formatPrice(product.price)}
                        </div>
                        {product.original_price && (
                          <div className="text-sm text-gray-400 line-through">
                            {formatPrice(product.original_price)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-gray-700">
                        {product.size && <div>Talla: {product.size}</div>}
                        {product.color && <div>Color: {product.color}</div>}
                      </TableCell>
                      <TableCell className="font-medium text-gray-800">
                        {product.stock_count} unidades
                      </TableCell>
                      <TableCell>{getStockBadge(product)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <LuFlipHorizontal2 className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/admin/products/${product.id}`)
                              }
                            >
                              <LuEye className="mr-2 h-4 w-4" />
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/admin/products/${product.id}/edit`)
                              }
                            >
                              <LuPencilLine className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <LuTrash2 className="mr-2 h-4 w-4" />
                                  Eliminar
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    ¿Estás seguro?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción eliminará permanentemente "
                                    {product.name}" del inventario.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      setDeletingId(product.id);
                                      deleteProduct(product.id, {
                                        onSettled: () => setDeletingId(null),
                                      });
                                    }}
                                    disabled={deletingId === product.id}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                  >
                                    {deletingId === product.id
                                      ? "Eliminando..."
                                      : "Eliminar"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredProducts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No se encontraron productos.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
