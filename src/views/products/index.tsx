import { useEffect, useState } from "react";
import {
  LuHeart,
  LuStar,
  LuTruck,
  LuShield,
  LuRotateCcw,
  LuMessageCircle,
  LuPlus,
  LuMinus,
} from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useParams } from "react-router-dom";
import { useProduct } from "@/hooks/products/useProduct";

const reviews = [
  {
    id: 1,
    user: "María González",
    avatar: "/placeholder.svg?height=40&width=40&text=MG",
    rating: 5,
    date: "15 de Mayo, 2024",
    comment:
      "Hermosas argollas, la calidad es excepcional. El oro se ve muy elegante sobre la plata. Llegaron perfectamente empacadas.",
  },
  {
    id: 2,
    user: "Carlos Rodríguez",
    avatar: "/placeholder.svg?height=40&width=40&text=CR",
    rating: 5,
    date: "8 de Mayo, 2024",
    comment:
      "Excelente trabajo artesanal. Las argollas son exactamente como se ven en las fotos. El servicio al cliente fue muy atento.",
  },
  {
    id: 3,
    user: "Ana Martínez",
    avatar: "/placeholder.svg?height=40&width=40&text=AM",
    rating: 4,
    date: "2 de Mayo, 2024",
    comment:
      "Muy bonitas, aunque tardaron un poco más de lo esperado en llegar. Pero vale la pena la espera por la calidad.",
  },
];

const ratingDistribution = [
  { stars: 5, count: 12, percentage: 75 },
  { stars: 4, count: 3, percentage: 19 },
  { stars: 3, count: 1, percentage: 6 },
  { stars: 2, count: 0, percentage: 0 },
  { stars: 1, count: 0, percentage: 0 },
];

export default function ProductView() {
  const { id } = useParams();
  const productId = id ? Number(id) : undefined;
  const { data: product, isLoading } = useProduct(productId);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);

  // Si aún está cargando o no hay producto, mostramos loader
  if (isLoading || !product) {
    return (
      <div className="p-8 text-center text-gray-600 text-lg">
        Cargando producto...
      </div>
    );
  }

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(Number.parseFloat(price));
  };

  const averageRating = 4.7;
  const totalReviews = 16;

  const StarRating = ({
    rating,
    size = "w-4 h-4",
    interactive = false,
    onRate,
  }: {
    rating: number;
    size?: string;
    interactive?: boolean;
    onRate?: (rating: number) => void;
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <LuStar
            key={star}
            className={`${size} ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            } ${interactive ? "cursor-pointer hover:fill-yellow-300" : ""}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            {/* Imagen principal */}
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-sm">
              <img
                src={
                  selectedImage
                    ? `http://localhost:8000${selectedImage}`
                    : "/placeholder.svg"
                }
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {/* Miniaturas */}
            <div className="grid grid-cols-5 gap-3">
              {(product.images.slice(0, 5) || []).map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(image.url)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer transition-colors border-2 ${
                    selectedImage === image.url
                      ? "border-rose-400"
                      : "border-transparent hover:border-rose-200"
                  }`}
                >
                  <img
                    src={`http://localhost:8000${image.url}`}
                    alt={`Vista ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={averageRating} />
                <span className="text-sm text-gray-600">
                  ({totalReviews} reseñas)
                </span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  En stock
                </Badge>
              </div>
              <p className="text-4xl font-light text-gray-900">
                {formatPrice(product.price)}
              </p>
            </div>

            <Separator />

            {/* Descripción truncada con toggle */}
            <div>
              <p
                className={`text-gray-600 leading-relaxed transition-all duration-300 ${
                  showFullDescription ? "" : "line-clamp-3"
                }`}
              >
                {product.description}
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 text-sm text-rose-600 hover:underline"
              >
                {showFullDescription ? "Ver menos" : "Ver más"}
              </button>
            </div>

            {/* Opciones de producto mejoradas */}
            <div className="space-y-8">
              {/* Talla y Color en fila */}
              <div className="flex flex-wrap gap-6">
                {/* Talla */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Talla
                  </label>
                  <div className="inline-block px-4 py-2 rounded-full border text-sm font-medium bg-indigo-100 text-indigo-800 border-indigo-300 shadow-sm">
                    {product.size}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Color
                  </label>
                  <div className="inline-block px-4 py-2 rounded-full border text-sm font-medium capitalize bg-pink-100 text-pink-800 border-pink-300 shadow-sm">
                    {product.color}
                  </div>
                </div>
              </div>

              {/* Cantidad */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Cantidad
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 shadow-sm"
                  >
                    <LuMinus className="w-4 h-4 text-gray-700" />
                  </button>
                  <span className="px-5 py-2 border border-gray-300 rounded-lg bg-gray-50 min-w-[60px] text-center font-medium text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock_count, quantity + 1))
                    }
                    className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 shadow-sm"
                  >
                    <LuPlus className="w-4 h-4 text-gray-700" />
                  </button>
                  <span className="text-sm text-gray-500 ml-2">
                    {product.stock_count} disponibles
                  </span>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-rose-600 hover:bg-rose-700"
              >
                Agregar al carrito
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <LuHeart
                  className={`w-4 h-4 mr-2 ${
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                {isWishlisted
                  ? "En lista de deseos"
                  : "Agregar a lista de deseos"}
              </Button>
            </div>

            {/* Información de envío */}
            <div className="bg-white rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <LuTruck className="w-5 h-5 text-rose-600" />
                <div>
                  <p className="font-medium text-gray-900">Envío gratis</p>
                  <p className="text-sm text-gray-600">
                    En compras superiores a $500.000
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LuShield className="w-5 h-5 text-rose-600" />
                <div>
                  <p className="font-medium text-gray-900">
                    Garantía de calidad
                  </p>
                  <p className="text-sm text-gray-600">
                    12 meses de garantía en todos nuestros productos
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LuRotateCcw className="w-5 h-5 text-rose-600" />
                <div>
                  <p className="font-medium text-gray-900">
                    Devoluciones fáciles
                  </p>
                  <p className="text-sm text-gray-600">
                    30 días para cambios y devoluciones
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de reseñas y detalles */}
        <div className="mt-16">
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="shipping">Envío</TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="mt-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Resumen de calificaciones */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Calificaciones</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-light text-gray-900">
                          {averageRating}
                        </div>
                        <StarRating rating={averageRating} size="w-5 h-5" />
                        <p className="text-sm text-gray-600 mt-1">
                          Basado en {totalReviews} reseñas
                        </p>
                      </div>

                      <div className="space-y-2">
                        {ratingDistribution.map((item) => (
                          <div
                            key={item.stars}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span className="w-3">{item.stars}</span>
                            <LuStar className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <Progress
                              value={item.percentage}
                              className="flex-1 h-2"
                            />
                            <span className="w-8 text-gray-600">
                              {item.count}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      <div>
                        <p className="font-medium mb-3">
                          Califica este producto
                        </p>
                        <StarRating
                          rating={userRating}
                          size="w-6 h-6"
                          interactive={true}
                          onRate={setUserRating}
                        />
                        {userRating > 0 && (
                          <Button size="sm" className="mt-3 w-full">
                            <LuMessageCircle className="w-4 h-4 mr-2" />
                            Escribir reseña
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Lista de reseñas */}
                <div className="lg:col-span-2 space-y-6">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage
                              src={review.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {review.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">
                                {review.user}
                              </h4>
                              <span className="text-sm text-gray-500">
                                {review.date}
                              </span>
                            </div>
                            <StarRating rating={review.rating} size="w-4 h-4" />
                            <p className="text-gray-600 mt-3 leading-relaxed">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Detalles del producto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Especificaciones
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>
                          <span className="font-medium">Material:</span> Plata
                          ley 925
                        </li>
                        <li>
                          <span className="font-medium">Acabado:</span> Lámina
                          de oro
                        </li>
                        <li>
                          <span className="font-medium">Peso aproximado:</span>{" "}
                          8-12 gramos
                        </li>
                        <li>
                          <span className="font-medium">Ancho:</span> 4mm
                        </li>
                        <li>
                          <span className="font-medium">Grosor:</span> 1.5mm
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Cuidados
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Evitar contacto con perfumes y químicos</li>
                        <li>• Limpiar con paño suave y seco</li>
                        <li>• Guardar en lugar seco</li>
                        <li>• Evitar golpes y rayones</li>
                        <li>• Mantenimiento profesional recomendado</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Información de envío</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Tiempos de entrega
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>
                          <span className="font-medium">Bogotá:</span> 1-2 días
                          hábiles
                        </li>
                        <li>
                          <span className="font-medium">
                            Principales ciudades:
                          </span>{" "}
                          2-3 días hábiles
                        </li>
                        <li>
                          <span className="font-medium">Resto del país:</span>{" "}
                          3-5 días hábiles
                        </li>
                        <li>
                          <span className="font-medium">Zonas especiales:</span>{" "}
                          5-8 días hábiles
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Costos de envío
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>
                          <span className="font-medium">Envío estándar:</span>{" "}
                          $15.000
                        </li>
                        <li>
                          <span className="font-medium">Envío express:</span>{" "}
                          $25.000
                        </li>
                        <li>
                          <span className="font-medium">Envío gratis:</span>{" "}
                          Compras &gt; $500.000
                        </li>
                        <li>
                          <span className="font-medium">
                            Recogida en tienda:
                          </span>{" "}
                          Gratis
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Política de devoluciones
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Tienes 30 días calendario para realizar cambios o
                      devoluciones. El producto debe estar en perfecto estado,
                      sin uso y con su empaque original. Los gastos de envío
                      para devoluciones corren por cuenta del cliente, excepto
                      en casos de productos defectuosos o errores en el envío.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
