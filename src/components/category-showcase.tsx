import { Link } from "react-router-dom"
import { LuCrown, LuHeart, LuStar, LuGem, LuSparkles } from "react-icons/lu"

export function CategoryShowcase() {
  const categories = [
    {
      name: "Collares",
      description: "Elegancia que abraza tu cuello",
      href: "/collections/necklaces",
      icon: LuCrown,
      overlay: "bg-pink-600/60",
      statsColor: "text-pink-700",
      image: "https://entrelazos.co/cdn/shop/files/Set-de-3-Collares-Amour-Amour-Entrelazos-Accesorios-KFE241-0021-3.jpg?v=1713306080",
    },
    {
      name: "Aretes",
      description: "Detalles que enmarcan tu belleza",
      href: "/collections/earrings",
      icon: LuStar,
      overlay: "bg-purple-600/60",
      statsColor: "text-purple-700",
      image: "https://calzadocosmos.com/cdn/shop/files/Set-Aretes-AVM-Classic-Para-Mujer-AVEMARIA-71163_46e409e3-b968-419e-9730-90d97434f536.jpg?v=1747233678",
    },
    {
      name: "Pulseras",
      description: "Sofisticación en cada movimiento",
      href: "/collections/bracelets",
      icon: LuHeart,
      overlay: "bg-amber-600/60",
      statsColor: "text-amber-700",
      image: "https://dulceencanto.com/cdn/shop/files/P1317-dulce-encanto-accesorios-para-mujer-3.jpg?v=1724638724",
    },
    {
      name: "Anillos",
      description: "Pequeñas obras de arte",
      href: "/collections/rings",
      icon: LuGem,
      overlay: "bg-teal-600/60",
      statsColor: "text-teal-700",
      image: "https://acdn-us.mitiendanube.com/stores/002/395/644/products/diseno-sin-titulo-297-24ded1d17d99a7843f17204724802503-640-0.png",
    },
  ]

  return (
    <section className="w-full py-20 md:py-28 bg-[#F5EFE7]">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full bg-yellow-100 px-6 py-2 text-sm font-medium text-yellow-800">
            <LuSparkles className="h-5 w-5" />
            <span className="tracking-wide">Nuestras Categorías</span>
            <LuSparkles className="h-5 w-5" />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#2C1810]">Encuentra tu estilo</h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed">
            Cada pieza cuenta una historia. Cada categoría resalta un aspecto único de tu estilo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Link
                key={category.name}
                to={category.href}
                className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2"
              >
                <div className="p-6">
                  {/* Imagen con overlay */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 ${category.overlay} transition-opacity`} />

                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-full">
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <div className="space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-serif font-bold">{category.name}</h3>
                        <p className="text-sm opacity-90">{category.description}</p>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <span>Explorar colección</span>
                          <svg
                            className="h-4 w-4 group-hover:translate-x-1 transition-transform"
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

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <span className={`font-medium ${category.statsColor}`}>50+ productos</span>
                    <div className="flex items-center gap-1">
                      <LuStar className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-gray-700">4.8</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
