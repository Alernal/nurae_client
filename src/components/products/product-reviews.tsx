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
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => r.rating === rating).length;
    return {
      rating,
      count,
      percentage: (count / reviews.length) * 100,
    };
  });

  return (
    <div className="space-y-6 max-w-2xl w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h3 className="text-2xl font-bold text-gray-900">Reseñas de Clientes</h3>
        <ReviewModal productId={productId} productName={productName} />
      </div>

      {/* Rating Summary */}
      <div className="">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <div className="text-center w-full md:w-auto">
            <div className="text-3xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center mb-1">
              {[...Array(5)].map((_, i) => (
                <LuStar
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(averageRating)
                      ? "fill-black text-black"
                      : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              {reviews.length} reseñas
            </div>
          </div>

          <div className="flex-1 w-full space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-2 text-sm">
                <span className="w-3">{rating}</span>
                <LuStar className="w-3 h-3 fill-black text-black" />
                <Progress value={percentage} className="flex-1 h-2 border border-gray-200" />
                <span className="w-8 text-black">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 pb-4 last:border-b-0"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-none flex items-center justify-center overflow-hidden">
                {review.user.profile_image_url ? (
                  <img
                    src={`https://nurae-api.alernal.com.co/${review.user.profile_image_url}`}
                    alt="Foto de perfil"
                    className="w-10 h-10 object-cover"
                  />
                ) : (
                  <LuUser className="w-5 h-5 text-gray-500" />
                )}
              </div>


              <div className="flex-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {review.user.first_name}
                  </span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <LuStar
                        key={i}
                        className={`w-4 h-4 ${i < review.rating
                            ? "fill-black text-black"
                            : "text-gray-200"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString("es-MX")}
                  </span>
                </div>

                {review.comment && review.comment.trim() ? (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                ) : (
                  <p className="text-sm italic text-gray-500">Sin palabras</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle Button */}
      {reviews.length > 3 && (
        <Button
          variant="outline"
          className="w-full rounded-none"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Ver Menos" : "Ver Todas las Reseñas"}
        </Button>
      )}
    </div>
  );
}
