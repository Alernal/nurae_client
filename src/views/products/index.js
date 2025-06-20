import { jsx as _jsx } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { useProducts } from "@/hooks/products/useProducts"; // <-- Corrige el import
import { useProduct } from "@/hooks/products/useProduct";
import { ProductPage } from "@/components/products/product-page";
export default function ProductPageRoute() {
    const { id } = useParams();
    const { data: allProducts = [], isLoading: loadingProducts } = useProducts();
    const matchedProduct = allProducts.find((p) => p.slug === id);
    const { data: product, isLoading: loadingProduct, isError, } = useProduct(matchedProduct?.id, {
        enabled: !!matchedProduct?.id,
    });
    if (loadingProducts || loadingProduct)
        return _jsx("div", { children: "Cargando..." });
    if (!matchedProduct || !product)
        return _jsx("div", { children: "Producto no encontrado." });
    if (isError)
        return _jsx("div", { children: "Error al cargar el producto." });
    return (_jsx(ProductPage, { product: {
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
        }, reviews: product.reviews?.map((r) => ({
            id: r.id,
            user: r.user,
            rating: r.rating,
            comment: r.comment,
            date: new Date(r.created_at).toISOString().split("T")[0],
        })) || [] }));
}
