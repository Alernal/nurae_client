import {Link} from "react-router-dom"
import { LuCrown, LuHeart, LuStar, LuGem, LuSparkles } from "react-icons/lu"

export function CategoryShowcase() {
  const categories = [
    {
      name: "Collares",
      description: "Elegancia que abraza tu cuello",
      href: "/collections/necklaces",
      icon: LuCrown,
      gradient: "from-pink-500 to-rose-600",
      bgGradient: "from-pink-100 to-rose-100",
    },
    {
      name: "Aretes",
      description: "Detalles que enmarcan tu belleza",
      href: "/collections/earrings",
      icon: LuStar,
      gradient: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-100 to-indigo-100",
    },
    {
      name: "Pulseras",
      description: "Sofisticación en cada movimiento",
      href: "/collections/bracelets",
      icon: LuHeart,
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-100 to-orange-100",
    },
    {
      name: "Anillos",
      description: "Pequeñas obras de arte",
      href: "/collections/rings",
      icon: LuGem,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-100 to-teal-100",
    },
  ]

  return (
    <section className="w-full py-20 md:py-28 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center mb-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 px-6 py-3 text-sm font-medium text-primary">
              <LuSparkles className="h-5 w-5" />
              <span className="font-display">Nuestras Categorías</span>
              <LuSparkles className="h-5 w-5" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              Encuentra tu estilo
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl font-light leading-relaxed">
              Cada pieza cuenta una historia, cada categoría celebra un aspecto de tu personalidad única
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Link
                key={category.name}
                to={category.href}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`bg-gradient-to-br ${category.bgGradient} p-8`}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                    <img
                      src="/placeholder.svg?height=400&width=320"
                      alt={category.name}
                      width={320}
                      height={400}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-75 transition-opacity duration-300`}
                    />

                    {/* Floating Icon */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="space-y-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl md:text-3xl font-serif font-bold">{category.name}</h3>
                        <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          {category.description}
                        </p>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                          <span className="text-sm font-medium font-display">Explorar colección</span>
                          <svg
                            className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-display font-medium text-gray-700">50+ productos</span>
                    <div className="flex items-center gap-1">
                      <LuStar className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-gray-700">4.8</span>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-luxury-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
