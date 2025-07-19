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
      ? Math.round(
        ((product.price - product.original_price) / product.price) * 100
      )
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
          <Badge className="bg-transparent border border-black text-xs font-normal">
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </Badge>
        )}
        {product.material && (
          <Badge
            variant="default"
            className="bg-transparent border border-black text-xs font-normal"
          >
            {product.material.charAt(0).toUpperCase() +
              product.material.slice(1)}
          </Badge>
        )}
        {product.in_stock ? (
          <Badge
            variant="default"
            className="bg-transparent border border-black text-xs font-normal"
          >
            En Stock ({product.stock_count} disponibles)
          </Badge>
        ) : (
          <Badge variant="destructive">Agotado</Badge>
        )}
      </div>

      {/* Product Name */}
      <h1 className="text-2xl lg:text-3xl m-0 font-semibold text-gray-900 leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center">
        <span className="text-sm text-muted-foreground">
          ({averageRating.toFixed(1)}) • {reviewCount} reseña
          {reviewCount !== 1 && "s"}
        </span>
      </div>

      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-bold text-gray-900">
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(finalPrice)}
          </span>
          {showDiscount && (
            <>
              <span className="text-xl text-muted-foreground line-through">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(product.price)}
              </span>
              <Badge variant="destructive" className="text-xs">
                -{discount}% descuento
              </Badge>
            </>
          )}
        </div>
        <p className="text-[10px] font-parrafo">
          Precio incluye IVA • Envío gratuito en compras mayores a $150.000
        </p>
      </div>
    </div>
  );
}
