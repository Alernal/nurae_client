import { LuStar, LuUser } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ReviewModal } from "./review-modal";
import { useState } from "react";

interface Review {
  id: number;
  user: {
    first_name: string;
  };
  rating: number;
  comment?: string;
  date: string;
}

interface ProductReviewsProps {
  productId: number;
  productName: string;
  reviews: Review[];
}

export function ProductReviews({
  reviews,
  productName,
  productId,
}: ProductReviewsProps) {
  const [allReviews, setAllReviews] = useState(reviews);

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage:
      (reviews.filter((review) => review.rating === rating).length /
        reviews.length) *
      100,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Reseñas de Clientes</h3>
        <ReviewModal productId={productId} productName={productName} />
      </div>

      {/* Rating Summary */}
      <div className="bg-slate-50 p-6 rounded-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center mb-1">
              {[...Array(5)].map((_, i) => (
                <LuStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              {allReviews.length} reseñas
            </div>
          </div>

          <div className="flex-1 space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-2 text-sm">
                <span className="w-3">{rating}</span>
                <LuStar className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <Progress value={percentage} className="flex-1 h-2 bg-gray-400" />
                <span className="w-8 text-muted-foreground">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 pb-4 last:border-b-0"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <LuUser className="w-5 h-5 text-gray-500" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {review.user.first_name}
                  </span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <LuStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString("es-MX")}
                  </span>
                </div>

                {review.comment && (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        Ver Todas las Reseñas
      </Button>
    </div>
  );
}
