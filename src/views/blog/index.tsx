import {Link} from "react-router-dom"
import { LuCalendar, LuUser, LuArrowRight, LuHeart, LuShare2, LuBookOpen, LuSparkles } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const blogPosts = [
  {
    id: 1,
    title: "Cómo combinar accesorios dorados con tu outfit diario",
    excerpt: "Descubre los secretos para lucir elegante y sofisticada con nuestros consejos de styling profesional.",
    image: "/placeholder.svg?height=300&width=400",
    author: "María González",
    date: "2025-01-20",
    category: "Styling Tips",
    readTime: "5 min",
    featured: true,
  },
  {
    id: 2,
    title: "Tendencias en joyería para la primavera 2025",
    excerpt: "Las últimas tendencias que marcarán la temporada y cómo incorporarlas a tu estilo personal.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Ana Martínez",
    date: "2025-01-18",
    category: "Tendencias",
    readTime: "7 min",
    featured: false,
  },
  {
    id: 3,
    title: "El poder de los accesorios en tu autoestima",
    excerpt: "Cómo los accesorios correctos pueden transformar no solo tu look, sino también tu confianza.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Sofía Ruiz",
    date: "2025-01-15",
    category: "Lifestyle",
    readTime: "6 min",
    featured: true,
  },
  {
    id: 4,
    title: "Cuidados esenciales para tus joyas favoritas",
    excerpt: "Guía completa para mantener tus accesorios como nuevos y prolongar su vida útil.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Carmen López",
    date: "2025-01-12",
    category: "Cuidados",
    readTime: "4 min",
    featured: false,
  },
  {
    id: 5,
    title: "Historia de LÚMINA: Nuestra misión de democratizar el lujo",
    excerpt: "Conoce la historia detrás de nuestra marca y cómo estamos cambiando la industria de la joyería.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Equipo LÚMINA",
    date: "2025-01-10",
    category: "Empresa",
    readTime: "8 min",
    featured: false,
  },
  {
    id: 6,
    title: "Accesorios para cada ocasión: De la oficina a la cena",
    excerpt: "Cómo adaptar tu look con los accesorios correctos para cualquier momento del día.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Isabella Torres",
    date: "2025-01-08",
    category: "Styling Tips",
    readTime: "6 min",
    featured: false,
  },
]

const categories = ["Todos", "Styling Tips", "Tendencias", "Lifestyle", "Cuidados", "Empresa"]

export default function BlogPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-luxury-gradient opacity-10"></div>
        <div className="absolute top-10 left-10 text-pink-300 animate-float">
          <LuBookOpen className="h-12 w-12" />
        </div>
        <div className="absolute bottom-20 right-20 text-purple-300 animate-float" style={{ animationDelay: "1s" }}>
          <LuSparkles className="h-16 w-16" />
        </div>

        <div className="container px-4 md:px-6 relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-primary shadow-lg border border-pink-200">
              <LuBookOpen className="h-5 w-5" />
              <span className="font-display">Blog LÚMINA</span>
              <LuSparkles className="h-5 w-5 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent leading-tight">
              Inspírate
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Descubre consejos de estilo, tendencias y historias inspiradoras para brillar con tu propia luz.
            </p>

            {/* Newsletter Signup */}
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="tu-email@ejemplo.com"
                  className="h-12 rounded-xl border-2 border-pink-200 bg-white/80 backdrop-blur-sm"
                />
                <Button className="bg-luxury-gradient hover:opacity-90 text-white h-12 px-6 rounded-xl">
                  Suscribirse
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Recibe nuestros últimos artículos en tu email</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "Todos" ? "default" : "outline"}
                className={`rounded-full px-6 py-2 ${
                  category === "Todos"
                    ? "bg-primary text-white"
                    : "bg-white/80 backdrop-blur-sm hover:bg-primary hover:text-white"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 bg-luxury-gradient bg-clip-text text-transparent">
            Artículos Destacados
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {blogPosts
              .filter((post) => post.featured)
              .map((post, index) => (
                <article
                  key={post.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="object-cover transition-transform group-hover:scale-110 duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                      {post.category}
                    </div>

                    {/* Featured Badge */}
                    <div className="absolute top-4 right-4 bg-accent text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                      Destacado
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white font-serif font-bold text-xl md:text-2xl leading-tight mb-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-4 text-white/80 text-sm">
                        <div className="flex items-center gap-1">
                          <LuUser className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <LuCalendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString("es-ES")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.readTime} de lectura</span>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="hover:bg-pink-50">
                          <LuHeart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-pink-50">
                          <LuShare2 className="h-4 w-4" />
                        </Button>
                        <Link to={`/blog/${post.id}`}>
                          <Button className="bg-luxury-gradient hover:opacity-90 text-white rounded-full px-4 py-2 text-sm">
                            Leer más
                            <LuArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 bg-white/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 bg-luxury-gradient bg-clip-text text-transparent">
            Todos los Artículos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={post.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="object-cover transition-transform group-hover:scale-110 duration-700"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                    {post.category}
                  </div>

                  {post.featured && (
                    <div className="absolute top-4 right-4 bg-accent text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                      Destacado
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <LuUser className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <LuCalendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString("es-ES")}
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-gray-800 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="hover:bg-pink-50 h-8 w-8">
                        <LuHeart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-pink-50 h-8 w-8">
                        <LuShare2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <Button className="bg-luxury-gradient hover:opacity-90 text-white rounded-full px-4 py-2 text-sm">
                        Leer más
                        <LuArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center mt-16">
            <Button className="bg-luxury-gradient hover:opacity-90 text-white px-12 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300">
              Cargar Más Artículos
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              No te pierdas nada
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Suscríbete a nuestro newsletter y recibe los mejores consejos de estilo, tendencias y ofertas exclusivas
              directamente en tu email.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="tu-email@ejemplo.com"
                  className="h-12 rounded-xl border-2 border-pink-200 bg-white/80 backdrop-blur-sm"
                />
                <Button className="bg-luxury-gradient hover:opacity-90 text-white h-12 px-6 rounded-xl">
                  Suscribirse
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
