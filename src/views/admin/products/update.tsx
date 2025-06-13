import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuArrowLeft, LuUpload, LuX, LuBookImage } from "react-icons/lu";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import {
  updateProductSchema,
  type UpdateProductFormValues,
} from "@/schemas/products/updateProductSchema";
import { useUpdateProduct } from "@/hooks/products/useUpdateProduct";
import { useProduct } from "@/hooks/products/useProduct";
import { useProductImages } from "@/hooks/products/useProductImages";

const availableMaterials = [
  { value: "oro", label: "Oro" },
  { value: "plata", label: "Plata" },
  { value: "platino", label: "Platino" },
  { value: "acero_inoxidable", label: "Acero Inoxidable" },
  { value: "titanio", label: "Titanio" },
  { value: "rodio", label: "Rodio" },
  { value: "paladio", label: "Paladio" },
  { value: "cobre", label: "Cobre" },
  { value: "laton", label: "Latón" },
  { value: "bronce", label: "Bronce" },
  { value: "niquel", label: "Níquel" },
];

const availableCategories = [
  { value: "anillos", label: "Anillos" },
  { value: "collares", label: "Collares" },
  { value: "pulseras", label: "Pulseras" },
  { value: "aretes", label: "Aretes" },
  { value: "dijes", label: "Dijes" },
  { value: "relojes", label: "Relojes" },
  { value: "broches", label: "Broches" },
  { value: "piercings", label: "Piercings" },
  { value: "gemelos", label: "Gemelos" },
  { value: "otros", label: "Otros" },
];

type ProductImage = {
  id: number;
  url: string;
};

export default function UpdateProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = Number(id);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateProductFormValues>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: "",
      slug: "",
      price: "",
      original_price: "",
      size: "2 cm",
      material: "oro",
      description: "",
      in_stock: true,
      stock_count: "0",
      category: "pulseras",
    },
  });

  const { data: product, isLoading: isLoadingProduct } = useProduct(productId);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const { mutate: updateProduct, isLoading } = useUpdateProduct(productId);

  const { uploadImages, deleteImage, isUploading, isDeleting } =
    useProductImages(productId);

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        slug: product.slug,
        price: product.price,
        original_price: product.original_price ?? "",
        size: product.size ?? "",
        material: product.material ?? "",
        description: product.description ?? "",
        in_stock: !!product.in_stock,
        stock_count: product.stock_count.toString(),
        category: product.category ?? "",
      });

      setExistingImages(product.images || []);
    }
  }, [product, reset]);

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .substring(0, 250);

  const onSubmit = (data: UpdateProductFormValues) => {
    updateProduct(data, {
      onSuccess: () => navigate("/admin/products"),
    });
  };

  const handleDeleteImage = (imageId: number) => {
    deleteImage(imageId, {
      onSuccess: () =>
        setExistingImages((prev) => prev.filter((img) => img.id !== imageId)),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    uploadImages(fileArray, {
      onSuccess: (newImages) => {
        setExistingImages((prev) => [...prev, ...newImages]);
      },
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/admin/products")}
        >
          <LuArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Producto</h1>
          <p className="text-muted-foreground">
            Añade un nuevo producto a tu catálogo
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información del producto */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Información del Producto</CardTitle>
              <CardDescription>
                Detalles básicos sobre el producto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Producto *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  onChange={(e) => {
                    setValue("name", e.target.value);
                    setValue("slug", generateSlug(e.target.value));
                  }}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input id="slug" {...register("slug")} />
                {errors.slug && (
                  <p className="text-sm text-red-600">{errors.slug.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  rows={5}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register("price")}
                  />
                  {errors.price && (
                    <p className="text-sm text-red-600">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="original_price">Precio Original</Label>
                  <Input
                    id="original_price"
                    type="number"
                    step="0.01"
                    {...register("original_price")}
                  />
                  {errors.original_price && (
                    <p className="text-sm text-red-600">
                      {errors.original_price.message}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Opcional. Usado para mostrar descuentos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventario y variantes */}
          <Card>
            <CardHeader>
              <CardTitle>Inventario y Variantes</CardTitle>
              <CardDescription>
                Gestiona el stock y las variantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="in_stock">Disponible en Stock</Label>
                <Switch
                  id="in_stock"
                  checked={watch("in_stock")}
                  onCheckedChange={(val) => setValue("in_stock", val)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock_count">Cantidad en Stock *</Label>
                <Input
                  id="stock_count"
                  type="number"
                  {...register("stock_count")}
                />
                {errors.stock_count && (
                  <p className="text-sm text-red-600">
                    {errors.stock_count.message}
                  </p>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="size">Talla</Label>
                <Input
                  id="size"
                  name="size"
                  placeholder="Ej: 52mm o 18cm"
                  value={watch("size")}
                  onChange={(e) => setValue("size", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Material</Label>
                <Select
                  value={watch("material")}
                  onValueChange={(val) => setValue("material", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un material" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMaterials.map((material) => (
                      <SelectItem key={material.value} value={material.value}>
                        {material.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={watch("category")}
                  onValueChange={(val) => setValue("category", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Imágenes */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Imágenes del Producto</CardTitle>
              <CardDescription>
                Sube imágenes para mostrar tu producto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="bg-secondary rounded-full p-3">
                      <LuUpload className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-xl font-medium">
                      Arrastra imágenes aquí o haz clic para seleccionar
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Soporta JPG, PNG o WebP. Máximo 5MB por imagen.
                    </p>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                      disabled={isUploading}
                    >
                      {isUploading ? "Subiendo..." : "Seleccionar Imágenes"}
                    </Button>
                  </div>
                </div>

                {existingImages.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-medium">
                      Imágenes actuales ({existingImages.length})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {existingImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <div className="aspect-square rounded-md overflow-hidden border bg-background">
                            <img
                              src={`http://localhost:8000${image.url}`}
                              alt={`Imagen ${image.id}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDeleteImage(image.id)}
                          >
                            <LuX className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {existingImages.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                    <LuBookImage className="h-10 w-10 mb-2" />
                    <p>No hay imágenes actuales</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/products")}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar Producto"}
          </Button>
        </div>
      </form>
    </div>
  );
}
