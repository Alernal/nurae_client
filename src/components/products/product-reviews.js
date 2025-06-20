import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LuStar, LuUser } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ReviewModal } from "./review-modal";
import { useState } from "react";
export function ProductReviews({ reviews, productName, productId, }) {
    const [allReviews, setAllReviews] = useState(reviews);
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
        rating,
        count: reviews.filter((review) => review.rating === rating).length,
        percentage: (reviews.filter((review) => review.rating === rating).length /
            reviews.length) *
            100,
    }));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900", children: "Rese\u00F1as de Clientes" }), _jsx(ReviewModal, { productId: productId, productName: productName })] }), _jsx("div", { className: "bg-slate-50 p-6 rounded-lg", children: _jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-gray-900", children: averageRating.toFixed(1) }), _jsx("div", { className: "flex items-center justify-center mb-1", children: [...Array(5)].map((_, i) => (_jsx(LuStar, { className: `w-4 h-4 ${i < Math.floor(averageRating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"}` }, i))) }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [allReviews.length, " rese\u00F1as"] })] }), _jsx("div", { className: "flex-1 space-y-2", children: ratingDistribution.map(({ rating, count, percentage }) => (_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx("span", { className: "w-3", children: rating }), _jsx(LuStar, { className: "w-3 h-3 fill-yellow-400 text-yellow-400" }), _jsx(Progress, { value: percentage, className: "flex-1 h-2 bg-gray-400" }), _jsx("span", { className: "w-8 text-muted-foreground", children: count })] }, rating))) })] }) }), _jsx("div", { className: "space-y-4", children: reviews.map((review) => (_jsx("div", { className: "border-b border-gray-200 pb-4 last:border-b-0", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center", children: _jsx(LuUser, { className: "w-5 h-5 text-gray-500" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "font-medium text-gray-900", children: review.user.first_name }), _jsx("div", { className: "flex items-center", children: [...Array(5)].map((_, i) => (_jsx(LuStar, { className: `w-4 h-4 ${i < review.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"}` }, i))) }), _jsx("span", { className: "text-sm text-muted-foreground", children: new Date(review.date).toLocaleDateString("es-MX") })] }), review.comment && (_jsx("p", { className: "text-sm text-gray-700 leading-relaxed", children: review.comment }))] })] }) }, review.id))) }), _jsx(Button, { variant: "outline", className: "w-full", children: "Ver Todas las Rese\u00F1as" })] }));
}
