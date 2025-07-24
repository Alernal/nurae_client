interface ProductGalleryProps {
  images: string[];
  selectedImage: number;
  onImageSelect: (index: number) => void;
  productName: string;
}

export function ProductGallery({
  images,
  selectedImage,
  onImageSelect,
  productName,
}: ProductGalleryProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* Imagen principal: cuadrada en móvil, retrato en desktop */}
      <div className="w-full aspect-square sm:aspect-[3/4] overflow-hidden">
        <img
          src={images[selectedImage] || "/placeholder.svg"}
          alt={`${productName} - Vista ${selectedImage + 1}`}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Miniaturas: cuadradas siempre */}
      <div className="grid grid-cols-2 gap-4">
        {images.slice(0, 6).map((image, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`w-full aspect-square overflow-hidden border-2 transition-all duration-200 ${
              selectedImage === index
                ? "border-gray-400"
                : "border-transparent opacity-80 hover:opacity-100"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${productName} - Miniatura ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
