import { Badge } from "@/components/ui/badge";
import { LuStar } from "react-icons/lu";

interface Product {
  name: string;
  price: number;
  original_price?: number;
  size?: string;
  material?: string;
  description?: string;
  in_stock: boolean;
  stock_count: number;
  category?: string;
}

interface Review {
  rating: number;
}

interface ProductInfoProps {
  product: Product;
  reviews?: Review[];
}

export function ProductInfo({ product, reviews = [] }: ProductInfoProps) {
  const discount =
    product.original_price &&
    product.original_price > 0 &&
    product.original_price < product.price
      ? Math.round(((product.price - product.original_price) / product.price) * 100)
      : 0;

  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : 0;

  const filledStars = Math.round(averageRating);

  const showDiscount = discount > 0;

  const finalPrice = showDiscount ? product.original_price! : product.price;

  return (
    <div className="space-y-3">
      {/* Category & Stock Status */}
      <div className="flex items-center gap-3">
        {product.category && (
          <Badge variant="secondary" className="text-xs font-medium">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Badge>
        )}
        {product.material && (
          <Badge variant="default" className="bg-yellow-100 text-yellow-800 text-xs font-medium">
            {product.material.charAt(0).toUpperCase() + product.material.slice(1)}
          </Badge>
        )}
        {product.in_stock ? (
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
            En Stock ({product.stock_count} disponibles)
          </Badge>
        ) : (
          <Badge variant="destructive">Agotado</Badge>
        )}
      </div>

      {/* Product Name */}
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <LuStar
              key={i}
              className={`w-5 h-5 ${
                i < filledStars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          ({averageRating.toFixed(1)}) • {reviewCount} reseña{reviewCount !== 1 && "s"}
        </span>
      </div>

      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-gray-900">
            ${finalPrice.toLocaleString("es-CO")}
          </span>
          {showDiscount && (
            <>
              <span className="text-xl text-muted-foreground line-through">
                ${product.price.toLocaleString("es-CO")}
              </span>
              <Badge variant="destructive" className="text-xs">
                -{discount}% descuento
              </Badge>
            </>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Precio incluye IVA • Envío gratuito en compras mayores a $150.000
        </p>
      </div>

      {/* Description */}
      {product.description && (
        <div className="prose prose-sm max-w-none">
          <p
            className="text-gray-700 leading-relaxed line-clamp-4"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.description}
          </p>
        </div>
      )}
    </div>
  );
}
