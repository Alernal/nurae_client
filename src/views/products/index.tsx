import { useParams } from "react-router-dom";
import { useProduct } from "@/hooks/products/useProduct";
import { ProductPage } from "@/components/products/product-page";

export default function ProductPageRoute() {
  const { id } = useParams();
  const productId = Number(id);

  const { data: product, isLoading } = useProduct(productId);

  if (!product) return <div>Producto no encontrado.</div>;

  return (
    <ProductPage
      product={{
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        original_price: product.original_price,
        size: product.size,
        material: product.material,
        description: product.description,
        in_stock: product.in_stock,
        stock_count: product.stock_count,
        category: product.category,
        images: product.images?.map((img) => `http://localhost:8000${img.url}`) || [],
      }}
      reviews={
        product.reviews?.map((r) => ({
          id: r.id,
          user: r.user,
          rating: r.rating,
          comment: r.comment,
          date: new Date(r.created_at).toISOString().split("T")[0],
        })) || []
      }
    />
  );
}
