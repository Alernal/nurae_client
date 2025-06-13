import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import { Button } from "@/components/ui/button"

interface ProductGalleryProps {
  images: string[]
  selectedImage: number
  onImageSelect: (index: number) => void
  productName: string
}

export function ProductGallery({ images, selectedImage, onImageSelect, productName }: ProductGalleryProps) {
  const nextImage = () => {
    onImageSelect((selectedImage + 1) % images.length)
  }

  const prevImage = () => {
    onImageSelect(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden group">
        <img
          src={images[selectedImage] || "/placeholder.svg"}
          alt={`${productName} - Vista ${selectedImage + 1}`}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={prevImage}
        >
          <LuChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={nextImage}
        >
          <LuChevronRight className="h-5 w-5" />
        </Button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-5 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
              selectedImage === index
                ? "ring-2 ring-primary ring-offset-2 scale-105"
                : "hover:scale-105 opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${productName} - Miniatura ${index + 1}`}
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
