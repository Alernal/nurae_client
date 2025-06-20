import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";
import { ProductActions } from "./product-actions";
import { ProductDetails } from "./product-details";
import { ProductReviews } from "./product-reviews";
import { ShippingInfo } from "./shipping-info";
export function ProductPage({ product, reviews }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-b from-slate-50 to-white", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", children: [_jsxs("div", { className: "grid lg:grid-cols-2 gap-12 mb-16", children: [_jsxs("div", { className: "space-y-8", children: [_jsx(ProductGallery, { images: product.images, selectedImage: selectedImage, onImageSelect: setSelectedImage, productName: product.name }), _jsx(ProductDetails, { product: product })] }), _jsxs("div", { className: "space-y-8", children: [_jsx(ProductInfo, { product: product, reviews: reviews }), _jsx(ProductActions, { product: product, quantity: quantity, onQuantityChange: setQuantity }), _jsx(ShippingInfo, {})] })] }), _jsx("div", { className: "mb-16", children: _jsx(ProductReviews, { reviews: reviews, productName: product.name, productId: product.id }) })] }) }));
}
