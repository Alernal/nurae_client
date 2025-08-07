import { useState } from "react";
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

import {
  createProductSchema,
  type CreateProductFormValues,
} from "@/schemas/products/createProductSchema";
import { useCreateProduct } from "@/hooks/products/useCreateProduct";

const availableMaterials = [
  { value: "aleación de rodio", label: "Aleación de rodio" },
  { value: "acrílico", label: "Acrílico" },
];

const availableCategories = [
  { value: "anillos", label: "Anillos" },
  { value: "collares", label: "Collares" },
  { value: "earcuff", label: "Earcuff" },
  { value: "aretes", label: "Aretes" },
  { value: "denarios", label: "Denarios" },
  { value: "cabellos", label: "Cabellos" },
];

export default function CreateProduct() {
  const navigate = useNavigate();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const { mutate: createProduct, isLoading } = useCreateProduct();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      slug: "",
      price: "",
      original_price: "",
      size: "2 cm",
      material: "acrílico",
      description: "",
      in_stock: true,
      stock_count: "0",
      category: "anillos",
      images: [],
    },
  });

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .substring(0, 250);

  const onSubmit = (data: CreateProductFormValues) => {
    createProduct(
      { data, images: imageFiles },
      {
        onSuccess: () => navigate("/admin/products"),
      }
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);
    setImageFiles(selectedFiles);
    setValue("images", selectedFiles, { shouldValidate: true });

    const previews: string[] = [];

    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          previews.push(reader.result.toString());
          if (previews.length === selectedFiles.length) {
            setImagePreviews(previews);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const updatedPreviews = [...imagePreviews];
    const updatedFiles = [...imageFiles];
    updatedPreviews.splice(index, 1);
    updatedFiles.splice(index, 1);
    setImagePreviews(updatedPreviews);
    setImageFiles(updatedFiles);
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
          <h1 className="text-3xl font-bold tracking-tight">
            Crear Nuevo Producto
          </h1>
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
                {/* <div className="space-y-2">
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
                </div> */}
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
                {errors.size && (
                  <p className="text-sm text-red-600">{errors.size.message}</p>
                )}
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
                    >
                      Seleccionar Imágenes
                    </Button>
                  </div>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-medium">
                      Imágenes seleccionadas ({imagePreviews.length})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {imagePreviews.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-md overflow-hidden border bg-background">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Imagen ${index + 1}`}
                              width={200}
                              height={200}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <LuX className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {errors.images && (
                  <p className="text-sm text-red-600 mt-2">
                    {errors.images.message as string}
                  </p>
                )}
                {imageFiles.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                    <LuBookImage className="h-10 w-10 mb-2" />
                    <p>No hay imágenes seleccionadas</p>
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
          <Button variant="outline" type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar Producto"}
          </Button>
        </div>
      </form>
    </div>
  );
}
