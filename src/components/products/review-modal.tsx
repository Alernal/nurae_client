import { useState } from "react";
import type React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LuStar } from "react-icons/lu";
import { useAuthStore } from "@/stores/useAuthStore";

import { useCreateReview } from "@/hooks/products/useCreateReview";

interface ReviewModalProps {
  productId: number;
  productName: string;
}

export function ReviewModal({
  productId,
  productName,
}: ReviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const { isAuthenticated } = useAuthStore();

  const { mutate: createReview, isLoading: isSubmitting } = useCreateReview();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    createReview(
      {
        product_id: productId,
        rating,
        comment,
      },
      {
        onSuccess: () => {
          resetForm();
          setIsOpen(false);
        },
      }
    );
  };

  const resetForm = () => {
    setRating(0);
    setHoveredRating(0);
    setComment("");
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={!isAuthenticated}
          className="rounded-none font-parrafo"
        >
          {isAuthenticated ? "Escribir Reseña" : "Inicia sesión para comentar"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Escribir Reseña</DialogTitle>
          <p className="text-sm text-muted-foreground font-parrafo">{productName}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Stars */}
          <div className="space-y-2">
            <Label>Calificación *</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 hover:scale-110 transition-transform"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <LuStar
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-black text-black"
                        : "text-gray-300 hover:text-black"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground">
                {rating === 1 && "Muy malo"}
                {rating === 2 && "Malo"}
                {rating === 3 && "Regular"}
                {rating === 4 && "Bueno"}
                {rating === 5 && "Excelente"}
              </p>
            )}
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Comentario (opcional)</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comparte tu experiencia con este producto..."
              rows={4}
              maxLength={500}
              className="rounded-none"
            />
            <p className="text-xs text-muted-foreground text-right">
              {comment.length}/500 caracteres
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-none font-parrafo"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 border rounded-none bg-black text-white font-parrafo"
              disabled={rating === 0 || isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Reseña"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
