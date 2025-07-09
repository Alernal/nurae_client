import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LuHeart, LuShoppingCart, LuMinus, LuPlus } from "react-icons/lu";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  in_stock: boolean;
  stock_count: number;
}

interface ProductActionsProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function ProductActions({
  product,
  quantity,
  onQuantityChange,
}: ProductActionsProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const navigate = useNavigate();

  const { items, addToCart, updateQuantity } = useCart();
  const { add, remove, isInWishlist } = useWishlist();

  const cartItem = items.find((item) => item.productId === product.id);
  const quantityInCart = cartItem?.quantity || 0;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock_count) {
      onQuantityChange(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    const totalAfterAdd = quantityInCart + quantity;

    if (totalAfterAdd > product.stock_count) {
      toast.error(`Solo hay ${product.stock_count} unidades disponibles`);
      return;
    }

    setIsAddingToCart(true);
    try {
      if (cartItem) {
        updateQuantity(product.id, totalAfterAdd);
      } else {
        addToCart(product.id, quantity);
      }
    } finally {
      setIsAddingToCart(false);
    }
  };

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      remove(product.id);
    } else {
      add(product.id);
    }
  };

  const handleBuyNow = async () => {
    if (isAddingToCart) return; // Previene múltiples clics

    const totalAfterAdd = quantityInCart + quantity;
    const maxAvailable = product.stock_count ?? 1;

    if (totalAfterAdd > maxAvailable) {
      toast.error(`Solo hay ${maxAvailable} unidades disponibles`);
      return;
    }

    setIsAddingToCart(true);

    try {
      if (!cartItem) {
        await addToCart(product.id, 1);
      }
      navigate("/checkout");
    } catch (error) {
      console.error("Error al comprar:", error);
      toast.error("Ocurrió un error al intentar comprar.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="space-y-6 bg-white">
      {/* Quantity Selector */}
      <div className="space-x-3 flex flex-col sm:flex-row justify-center items-start gap-4 sm:gap-0 sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Cantidad</label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-r-none"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <LuMinus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) =>
                handleQuantityChange(Number.parseInt(e.target.value) || 1)
              }
              className="w-16 text-center border-0 border-l border-r border-gray-300 rounded-none focus-visible:ring-0"
              min="1"
              max={product.stock_count}
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-l-none"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= product.stock_count}
            >
              <LuPlus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-x-3 flex items-center">
          <Button
            className="border h-12 w-20 font-semibold text-green-500"
            onClick={handleBuyNow}
            title={
              isAddingToCart
                ? "Agregando..."
                : cartItem
                ? "Ya está en el carrito"
                : "Agregar al Carrito"
            }
          >
            Comprar
          </Button>
          {/* Add to Cart Button */}
          <Button
            size="icon"
            className="h-12 w-12 border font-semibold"
            onClick={handleAddToCart}
            disabled={!product.in_stock || isAddingToCart || !!cartItem}
            title={
              isAddingToCart
                ? "Agregando..."
                : cartItem
                ? "Ya está en el carrito"
                : "Agregar al Carrito"
            }
          >
            <LuShoppingCart className="w-6 h-6" />
          </Button>

          {/* Wishlist Icon */}
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 font-semibold"
            onClick={toggleWishlist}
            title={
              isInWishlist(product.id) ? "En Favoritos" : "Agregar a Favoritos"
            }
          >
            <LuHeart
              className={`w-6 h-6 ${
                isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Stock Warning */}
      {product.stock_count <= 3 && product.in_stock && (
        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800 font-medium">
            ¡Últimas {product.stock_count} piezas disponibles!
          </p>
        </div>
      )}

      {/* No Stock Message */}
      {!product.in_stock && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800 font-medium">
            No hay stock disponible
          </p>
        </div>
      )}
    </div>
  );
}
