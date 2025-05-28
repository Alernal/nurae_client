import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    LuPlus,
    LuEye,
    LuPencilLine,
    LuTrash2,
    LuSearch,
    LuUpload,
    LuBookImage,
} from "react-icons/lu";
import { Link } from "react-router-dom";

export default function AdminProducts() {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Collar Luna Dorada",
            sku: "CLN-001",
            price: 299.0,
            stock: 15,
            category: "Collares",
            status: "Activo",
            description: "Elegante collar con diseño lunar en oro de 18k",
            images: ["/placeholder.svg?height=200&width=200"],
        },
        {
            id: 2,
            name: "Anillo Estrella Plata",
            sku: "ANE-002",
            price: 199.0,
            stock: 8,
            category: "Anillos",
            status: "Activo",
            description: "Anillo con diseño de estrella en plata 925",
            images: ["/placeholder.svg?height=200&width=200"],
        },
        {
            id: 3,
            name: "Pulsera Sol Rosé",
            sku: "PLS-003",
            price: 149.0,
            stock: 0,
            category: "Pulseras",
            status: "Agotado",
            description: "Pulsera delicada con motivo solar en oro rosé",
            images: ["/placeholder.svg?height=200&width=200"],
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");

    const categories = ["Collares", "Anillos", "Pulseras", "Aretes"];

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            filterCategory === "all" || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-nurae-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-nurae-brown">
                        Gestión de Productos
                    </h1>
                    <p className="text-secondary mt-2">
                        Administra tu catálogo de productos
                    </p>
                </div>

                {/* Filters and Actions */}
                <Card className="border-warm-sand mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="flex flex-col md:flex-row gap-4 flex-1">
                                <div className="relative flex-1 max-w-md">
                                    <LuSearch className="absolute left-3 top-3 h-4 w-4 text-secondary" />
                                    <Input
                                        placeholder="Buscar productos..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 border-warm-sand"
                                    />
                                </div>
                                <Select
                                    value={filterCategory}
                                    onValueChange={setFilterCategory}
                                >
                                    <SelectTrigger className="w-full md:w-48 border-warm-sand">
                                        <SelectValue placeholder="Filtrar por categoría" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todas las categorías</SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="border-warm-sand text-nurae-brown"
                                >
                                    <LuUpload className="w-4 h-4 mr-2" />
                                    Importar
                                </Button>
                                <Link to="/admin/products/create"
                                    className="bg-nurae-gradient text-white"
                                >
                                    <LuPlus className="w-4 h-4 mr-2" />
                                    Nuevo Producto
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <Card key={product.id} className="border-warm-sand">
                            <CardContent className="p-6">
                                <div className="aspect-square bg-warm-sand rounded-lg mb-4 flex items-center justify-center">
                                    <LuBookImage className="w-12 h-12 text-secondary" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-nurae-brown">
                                            {product.name}
                                        </h3>
                                        <Badge
                                            variant={
                                                product.status === "Activo" ? "default" : "secondary"
                                            }
                                            className={
                                                product.status === "Activo"
                                                    ? "bg-green-100 text-green-800"
                                                    : product.status === "Agotado"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-warm-sand text-secondary"
                                            }
                                        >
                                            {product.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-secondary">SKU: {product.sku}</p>
                                    <p className="text-sm text-secondary">{product.category}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-nurae-brown">
                                            ${product.price}
                                        </span>
                                        <span className="text-sm text-secondary">
                                            Stock: {product.stock}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 border-warm-sand text-nurae-brown"
                                        >
                                            <LuEye className="w-4 h-4 mr-1" />
                                            Ver
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 border-warm-sand text-nurae-brown"
                                        >
                                            <LuPencilLine className="w-4 h-4 mr-1" />
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-red-300 text-red-600 hover:bg-red-50"
                                        >
                                            <LuTrash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
