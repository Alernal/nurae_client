import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LuStar, LuPackage, LuCalendar, LuTag, LuRuler, LuPalette, LuCheck, LuCircle, LuMessageSquare } from "react-icons/lu"
import { useProduct } from "@/hooks/products/useProduct";
import { useNavigate, useParams } from "react-router-dom"

type Review = {
  id: number;
  rating: number;
  comment?: string;
  created_at: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    profile_image_url?: string;
    role: string;
    is_verified: boolean;
  };
};

type Product = {
  id: number;
  name: string;
  slug: string;
  price: string;
  original_price?: string;
  in_stock: boolean;
  stock_count: number;
  category: string;
  size: string;
  material: string;
  created_at: string;
  updated_at: string;
  description: string;
  images: { url: string; created_at: string }[];
  reviews: Review[];
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function formatPrice(price: string) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(Number.parseFloat(price))
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <LuStar
          key={star}
          className={`w-4 h-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  )
}

export default function ShowProduct() {
  const { id } = useParams();
  const productId = Number(id);
  const navigate = useNavigate();

  const { data: product, isLoading } = useProduct(productId);

  if (isLoading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <Badge variant={product.in_stock ? "default" : "destructive"} className="flex items-center gap-1">
                  {product.in_stock ? <LuCheck className="w-3 h-3" /> : <LuCircle className="w-3 h-3" />}
                  {product.in_stock ? "En Stock" : "Agotado"}
                </Badge>
              </div>
              <p className="text-gray-600 font-mono text-sm">
                ID: {product.id} | Slug: {product.slug}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-green-600">{formatPrice(product.price)}</span>
                {product.original_price && (
                  <span className="text-xl text-gray-500 line-through">{formatPrice(product.original_price)}</span>
                )}
              </div>
            </div>
            <div className="text-right space-y-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <LuTag className="w-3 h-3" />
                {product.category}
              </Badge>
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <LuPackage className="w-3 h-3" />
                  Stock: {product.stock_count} unidades
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Imagen del producto */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LuPackage className="w-5 h-5" />
                Imagen del Producto
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={
                  product.images[0]?.url
                    ? `https://nurae-api.alernal.com.co${product.images[0].url}`
                    : "/placeholder.svg?height=400&width=400"
                  }
                  alt={product.name}
                  className="object-cover"
                />
                </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Subida:</strong> {product.images[0]?.created_at ? formatDate(product.images[0].created_at) : "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Información técnica */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LuRuler className="w-5 h-5" />
                Especificaciones Técnicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <LuRuler className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Tamaño:</span>
                    <span>{product.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuPalette className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Material:</span>
                    <span className="capitalize">{product.material}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuPackage className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Stock:</span>
                    <span>{product.stock_count} unidades</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <LuCalendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Creado:</span>
                    <span className="text-sm">{formatDate(product.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCalendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Actualizado:</span>
                    <span className="text-sm">{formatDate(product.updated_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuStar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Calificación:</span>
                    <StarRating rating={Math.round(averageRating)} />
                    <span className="text-sm text-gray-600">({product.reviews.length} reseñas)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Descripción del producto */}
        <Card>
          <CardHeader>
            <CardTitle>Descripción del Producto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                {product.description}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Reseñas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LuMessageSquare className="w-5 h-5" />
              Reseñas de Clientes ({product.reviews.length})
            </CardTitle>
            <CardDescription>Calificación promedio: {averageRating.toFixed(1)}/5</CardDescription>
          </CardHeader>
          <CardContent>
            {product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={review.user.profile_image_url || undefined} />
                          <AvatarFallback>
                            {review.user.first_name[0]}
                            {review.user.last_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {review.user.first_name} {review.user.last_name}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {review.user.role}
                            </Badge>
                            {review.user.is_verified && <LuCheck className="w-4 h-4 text-green-500" />}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <StarRating rating={review.rating} />
                            <span className="text-sm text-gray-600">{formatDate(review.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {review.comment && <p className="mt-3 text-gray-700">{review.comment}</p>}
                    <div className="mt-2 text-xs text-gray-500">
                      <span>
                        ID: {review.id} | Usuario: {review.user.email}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <LuMessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No hay reseñas disponibles para este producto</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
