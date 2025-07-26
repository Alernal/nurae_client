import { useParams } from "react-router-dom";
import { ProductPage } from "@/components/products/product-page";
import { useProductSlug } from "@/hooks/products/useProductSlug";

export default function ProductPageRoute() {
  const { id: slug } = useParams();
  const { data: product, isLoading, isError } = useProductSlug(slug);

  if (isLoading) return <div>Cargando...</div>;
  if (!product) return <div>Producto no encontrado.</div>;
  if (isError) return <div>Error al cargar el producto.</div>;

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
        images:
          product.images?.map((img) => `https://api.nurae.com.co/${img.url}`) || [],
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
