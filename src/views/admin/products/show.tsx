import { useParams, useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useProduct } from "@/hooks/products/useProduct";

export default function ShowProduct() {
  const { id } = useParams();
  const productId = Number(id);
  const navigate = useNavigate();

  const { data: product, isLoading } = useProduct(productId);

  if (isLoading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Button variant="outline" size="icon" onClick={() => navigate("/admin/products")}>
        <LuArrowLeft className="h-4 w-4" />
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>Slug:</strong> {product.slug}</p>
          <p><strong>Precio:</strong> ${product.price}</p>
          {product.original_price && <p><strong>Precio original:</strong> ${product.original_price}</p>}
          <p><strong>Tamaño:</strong> {product.size}</p>
          <p><strong>Material:</strong> {product.material}</p>
          <p><strong>Stock:</strong> {product.in_stock ? `En stock (${product.stock_count})` : "Agotado"}</p>
          <p><strong>Categoría:</strong> {product.category}</p>
          <p><strong>Descripción:</strong> {product.description}</p>
          <p><strong>Creado:</strong> {new Date(product.created_at).toLocaleString()}</p>
          <p><strong>Actualizado:</strong> {new Date(product.updated_at).toLocaleString()}</p>

          <Separator />

          <h3 className="font-semibold">Imágenes:</h3>
          <div className="flex flex-wrap gap-4">
            {product.images.map((img) => (
              <img
                key={img.id}
                src={`http://localhost:8000${img.url}`}
                alt={product.name}
                className="w-32 h-32 object-cover rounded border"
              />
            ))}
          </div>

          <Separator />

          <h3 className="font-semibold">Reseñas:</h3>
          {product.reviews.length === 0 ? (
            <p>Este producto aún no tiene reseñas.</p>
          ) : (
            product.reviews.map((review) => (
              <Card key={review.id} className="p-4">
                <p><strong>Calificación:</strong> {review.rating} ⭐</p>
                <p><strong>Comentario:</strong> {review.comment}</p>
                <p><strong>Usuario:</strong> {review.user.first_name} {review.user.last_name} ({review.user.email})</p>
                <p><strong>Fecha:</strong> {new Date(review.created_at).toLocaleString()}</p>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
