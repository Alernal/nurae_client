import { useState } from "react";
import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";
import { ProductActions } from "./product-actions";
import { ProductDetails } from "./product-details";
import { ProductReviews } from "./product-reviews";
import { ShippingInfo } from "./shipping-info";

interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  original_price?: number;
  size?: string;
  material?: string;
  description?: string;
  in_stock: boolean;
  stock_count: number;
  category?: string;
  images: string[];
}

interface Review {
  id: number;
  user: {
    first_name: string;
  };
  rating: number;
  comment?: string;
  date: string;
}

interface ProductPageProps {
  product: Product;
  reviews: Review[];
}

export function ProductPage({ product, reviews }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Product Section */}
        <div className="flex flex-col gap-12 mb-16">
          {/* Fila de galería de imágenes e información del producto */}
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <ProductGallery
          images={product.images}
          selectedImage={selectedImage}
          onImageSelect={setSelectedImage}
          productName={product.name}
              />
            </div>
            <div className="flex-1 flex flex-col gap-8">
              <ProductInfo product={product} reviews={reviews} />
              <ProductActions
          product={product}
          quantity={quantity}
          onQuantityChange={setQuantity}
              />
              <ShippingInfo />
            </div>
          </div>
          {/* Fila de detalles y reseñas */}
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <ProductDetails product={product} />
            </div>
            <div className="flex-1">
              <ProductReviews
          reviews={reviews}
          productName={product.name}
          productId={product.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
