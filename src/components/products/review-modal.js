import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LuStar } from "react-icons/lu";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCreateReview } from "@/hooks/products/useCreateReview";
export function ReviewModal({ productId, productName, }) {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState("");
    const { isAuthenticated } = useAuthStore();
    const { mutate: createReview, isLoading: isSubmitting } = useCreateReview();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0)
            return;
        createReview({
            product_id: productId,
            rating,
            comment,
        }, {
            onSuccess: () => {
                resetForm();
                setIsOpen(false);
            },
        });
    };
    const resetForm = () => {
        setRating(0);
        setHoveredRating(0);
        setComment("");
    };
    return (_jsxs(Dialog, { open: isOpen, onOpenChange: (open) => {
            setIsOpen(open);
            if (!open)
                resetForm();
        }, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "sm", disabled: !isAuthenticated, children: isAuthenticated ? "Escribir Reseña" : "Inicia sesión para comentar" }) }), _jsxs(DialogContent, { className: "sm:max-w-md", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Escribir Rese\u00F1a" }), _jsx("p", { className: "text-sm text-muted-foreground", children: productName })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Calificaci\u00F3n *" }), _jsx("div", { className: "flex items-center gap-1", children: [1, 2, 3, 4, 5].map((star) => (_jsx("button", { type: "button", className: "p-1 hover:scale-110 transition-transform", onMouseEnter: () => setHoveredRating(star), onMouseLeave: () => setHoveredRating(0), onClick: () => setRating(star), children: _jsx(LuStar, { className: `w-8 h-8 transition-colors ${star <= (hoveredRating || rating)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300 hover:text-yellow-300"}` }) }, star))) }), rating > 0 && (_jsxs("p", { className: "text-sm text-muted-foreground", children: [rating === 1 && "Muy malo", rating === 2 && "Malo", rating === 3 && "Regular", rating === 4 && "Bueno", rating === 5 && "Excelente"] }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "comment", children: "Comentario (opcional)" }), _jsx(Textarea, { id: "comment", value: comment, onChange: (e) => setComment(e.target.value), placeholder: "Comparte tu experiencia con este producto...", rows: 4, maxLength: 500 }), _jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [comment.length, "/500 caracteres"] })] }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx(Button, { type: "button", variant: "outline", className: "flex-1", onClick: () => setIsOpen(false), disabled: isSubmitting, children: "Cancelar" }), _jsx(Button, { type: "submit", className: "flex-1", disabled: rating === 0 || isSubmitting, children: isSubmitting ? "Enviando..." : "Enviar Reseña" })] })] })] })] }));
}
