import type React from "react"
import { useState } from "react"
import { LuPlus, LuX, LuUpload } from "react-icons/lu"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductImage {
  id: string
  file: File
  preview: string
}

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    price: "",
    original_price: "",
    size: "",
    color: "",
    description: "",
    in_stock: true,
    stock_count: 0,
  })

  const [images, setImages] = useState<ProductImage[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleNameChange = (value: string) => {
    handleInputChange("name", value)
    if (!formData.slug || formData.slug === generateSlug(formData.name)) {
      handleInputChange("slug", generateSlug(value))
    }
  }

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const id = Math.random().toString(36).substr(2, 9)
        const preview = URL.createObjectURL(file)

        setImages((prev) => [...prev, { id, file, preview }])
      }
    })
  }

  const removeImage = (id: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id)
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview)
      }
      return prev.filter((img) => img.id !== id)
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Aquí iría la lógica para enviar los datos al servidor
    console.log("Form Data:", formData)
    console.log("Images:", images)

    // Ejemplo de FormData para enviar al servidor
    const submitData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value.toString())
    })

    images.forEach((image, index) => {
      submitData.append(`images[${index}]`, image.file)
    })
  }

  const commonSizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const commonColors = ["Negro", "Blanco", "Azul", "Rojo", "Verde", "Amarillo", "Rosa", "Gris"]

  return (
    <div className="container mx-auto py-6 px-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Crear Nuevo Producto</h1>
        <p className="text-muted-foreground">Completa la información del producto para agregarlo al catálogo</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription>Datos principales del producto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Producto *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ej: Camiseta Premium"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  placeholder="camiseta-premium"
                  required
                  maxLength={250}
                />
                <p className="text-xs text-muted-foreground">
                  URL amigable para el producto (se genera automáticamente)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe las características del producto..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Precios y Variantes */}
          <Card>
            <CardHeader>
              <CardTitle>Precios y Variantes</CardTitle>
              <CardDescription>Configuración de precios y opciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="original_price">Precio Original</Label>
                  <Input
                    id="original_price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.original_price}
                    onChange={(e) => handleInputChange("original_price", e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Talla</Label>
                  <Select onValueChange={(value) => handleInputChange("size", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar talla" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Select onValueChange={(value) => handleInputChange("color", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar color" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonColors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventario */}
          <Card>
            <CardHeader>
              <CardTitle>Inventario</CardTitle>
              <CardDescription>Control de stock y disponibilidad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="in_stock"
                  checked={formData.in_stock}
                  onCheckedChange={(checked) => handleInputChange("in_stock", checked)}
                />
                <Label htmlFor="in_stock">Producto en stock</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock_count">Cantidad en Stock</Label>
                <Input
                  id="stock_count"
                  type="number"
                  min="0"
                  value={formData.stock_count}
                  onChange={(e) => handleInputChange("stock_count", Number.parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Imágenes */}
          <Card>
            <CardHeader>
              <CardTitle>Imágenes del Producto</CardTitle>
              <CardDescription>Sube las imágenes del producto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Zona de Drop */}
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <LuUpload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-sm font-medium">Arrastra imágenes aquí o haz clic para seleccionar</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG, JPEG hasta 10MB</p>
                </label>
              </div>

              {/* Lista de Imágenes */}
              {images.length > 0 && (
                <div className="space-y-2">
                  <Label>Imágenes Subidas ({images.length})</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {images.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border bg-muted">
                          <img
                            src={image.preview || "/placeholder.svg"}
                            alt="Preview"
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(image.id)}
                        >
                          <LuX className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit">
            <LuPlus className="w-4 h-4 mr-2" />
            Crear Producto
          </Button>
        </div>
      </form>
    </div>
  )
}
