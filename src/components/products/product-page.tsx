import { useState } from "react";
import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";
import { ProductActions } from "./product-actions";
import { ProductDetails } from "./product-details";
import { ProductReviews } from "./product-reviews";
import { FeaturedProducts } from "../featured-products";

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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Sección principal del producto */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* Galería de imágenes */}
          <div className="lg:w-1/2 w-full">
            <ProductGallery
              images={product.images}
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
              productName={product.name}
            />
          </div>

          {/* Información del producto */}
          <div className="lg:w-1/2 w-full flex flex-col gap-8">
            <ProductInfo product={product} reviews={reviews} />
            <ProductActions
              product={product}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
            <ProductDetails product={product} />
            {/* Sección de reseñas (full width) */}
            <ProductReviews
              reviews={reviews}
              productName={product.name}
              productId={product.id}
            />
          </div>
        </div>
        {/* Productos relacionados */}
        <div className="container mx-auto px-4 pb-20">
          <h3 className="text-3xl font-bold mb-6">También podría gustarte</h3>

          <FeaturedProducts />
        </div>

      </div>
    </div>
  );
}
