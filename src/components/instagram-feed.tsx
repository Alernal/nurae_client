import {Link} from "react-router-dom"
import { LuInstagram, LuHeart, LuMessageCircle, LuSparkles } from "react-icons/lu"
import { Button } from "@/components/ui/button"

const instagramPosts = [
  {
    id: 1,
    image: "/placeholder.svg?height=300&width=300",
    likes: 1234,
    comments: 45,
    caption: "Brillando con nuestro nuevo collar ✨",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=300",
    likes: 987,
    comments: 32,
    caption: "Elegancia en cada detalle 💎",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=300",
    likes: 1567,
    comments: 78,
    caption: "Tu estilo, tu personalidad 🌟",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=300",
    likes: 2134,
    comments: 89,
    caption: "Lujo accesible para todas 💖",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=300",
    likes: 876,
    comments: 23,
    caption: "Cada pieza cuenta una historia ✨",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=300&width=300",
    likes: 1432,
    comments: 56,
    caption: "Brilla con luz propia 🌟",
  },
]

export function InstagramFeed() {
  return (
    <section className="w-full py-20 md:py-28 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center mb-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 px-6 py-3 text-sm font-medium text-primary">
              <LuInstagram className="h-5 w-5" />
              <span className="font-display">Síguenos en Instagram</span>
              <LuSparkles className="h-5 w-5" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold bg-luxury-gradient bg-clip-text text-transparent">
              #LúminaStyle
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl font-light leading-relaxed">
              Únete a nuestra comunidad y comparte cómo brillar con LÚMINA
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`https://instagram.com/lumina`}
              target="_blank"
              className="group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.caption}
                className="object-cover transition-transform group-hover:scale-110 duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Instagram Icon */}
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <LuInstagram className="h-4 w-4 text-white" />
              </div>

              {/* Stats */}
              <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <LuHeart className="h-4 w-4 fill-white" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LuMessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs mt-2 line-clamp-2">{post.caption}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link to="https://instagram.com/lumina" target="_blank">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 group">
              <LuInstagram className="mr-2 h-5 w-5" />
              Seguir @LúminaStyle
              <LuSparkles className="ml-2 h-5 w-5 group-hover:animate-spin" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
