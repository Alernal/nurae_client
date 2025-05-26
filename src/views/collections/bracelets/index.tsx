import {Link} from "react-router-dom"
import { LuHeart, LuStar, LuShoppingBag, LuSparkles } from "react-icons/lu"
import { Button } from "@/components/ui/button"

const bracelets = [
  {
    id: 3,
    name: "Pulsera Eslabones Dorados",
    price: 150000,
    originalPrice: 180000,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
    reviews: 32,
    isNew: true,
    description: "Pulsera elegante con eslabones dorados",
  },
  {
    id: 11,
    name: "Pulsera Cadena Delicada",
    price: 125000,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
    reviews: 19,
    isNew: true,
    description: "Cadena delicada perfecta para uso diario",
  },
  {
    id: 12,
    name: "Pulsera Cristales Rosa",
    price: 135000,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.9,
    reviews: 24,
    isNew: false,
    description: "Pulsera con cristales en tonos rosa",
  },
  {
    id: 13,
    name: "Pulsera Charm Personalizable",
    price: 165000,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.6,
    reviews: 31,
    isNew: true,
    description: "Pulsera con charms intercambiables",
  },
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function BraceletsPage() {
  return (
    <div>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary">
            Inicio
          </Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-primary">
            Colecciones
          </Link>
          <span>/</span>
          <span className="text-primary">Pulseras</span>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-20 mb-16 overflow-hidden">
          <div className="absolute inset-0 bg-luxury-gradient opacity-10 rounded-3xl"></div>
          <div className="relative text-center space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-primary shadow-lg border border-pink-200">
              <LuSparkles className="h-5 w-5" />
              <span className="font-display">Colección Pulseras</span>
              <LuSparkles className="h-5 w-5 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent leading-tight">
              Pulseras
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Sofisticación en cada movimiento. Descubre pulseras que complementan tu estilo con elegancia y distinción.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bracelets.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover transition-transform group-hover:scale-110 duration-700"
                />
                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1.5 rounded-full font-medium">
                    Nuevo
                  </div>
                )}
                {product.originalPrice && (
                  <div className="absolute top-4 right-4 bg-accent text-white text-xs px-2 py-1 rounded-full">
                    Oferta
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-4 right-4 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <LuHeart className="h-5 w-5 text-gray-600" />
                </Button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary font-medium uppercase">Pulseras</span>
                  <div className="flex items-center gap-1">
                    <LuStar className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                  </div>
                </div>

                <Link to={`/products/${product.id}`} className="block">
                  <h3 className="font-serif font-bold text-lg text-gray-800 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-xl font-bold text-gray-800">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                    {product.originalPrice && (
                      <div className="text-xs text-accent font-medium">
                        Ahorra {formatPrice(product.originalPrice - product.price)}
                      </div>
                    )}
                  </div>

                  <Button
                    size="sm"
                    className="bg-luxury-gradient hover:opacity-90 text-white rounded-full px-6 py-2 text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <LuShoppingBag className="mr-2 h-4 w-4" />
                    Comprar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="mt-16 text-center space-y-8 bg-white/50 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
            Crea tu stack perfecto
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Combina diferentes pulseras para crear un look único que refleje tu personalidad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/collections">
              <Button className="bg-luxury-gradient hover:opacity-90 text-white px-8 py-3 rounded-full text-lg font-medium">
                Ver Más Estilos
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full text-lg font-medium"
              >
                Asesoría de Styling
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
