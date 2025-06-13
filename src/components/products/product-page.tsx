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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <ProductGallery
              images={product.images}
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
              productName={product.name}
            />
            <ProductDetails product={product} />
          </div>

          <div className="space-y-8">
            <ProductInfo product={product} reviews={reviews} />
            <ProductActions
              product={product}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
            <ShippingInfo />
          </div>
        </div>

        {/* Reviews Section - Full Width */}
        <div className="mb-16">
          <ProductReviews reviews={reviews} productName={product.name} productId={product.id} />
        </div>
      </div>
    </div>
  );
}
