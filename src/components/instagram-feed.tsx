import { Link } from "react-router-dom"
import { LuInstagram, LuHeart, LuMessageCircle, LuSparkles } from "react-icons/lu"
import { Button } from "@/components/ui/button"

const instagramPosts = [
  {
    id: 1,
    image: "/images/ig-1.jpg",
    likes: 1234,
    comments: 45,
    caption: "Brillando con nuestro nuevo collar ✨",
  },
  {
    id: 2,
    image: "/images/ig-2.jpg",
    likes: 987,
    comments: 32,
    caption: "Elegancia en cada detalle 💎",
  },
  {
    id: 3,
    image: "/images/ig-3.jpg",
    likes: 1567,
    comments: 78,
    caption: "Tu estilo, tu personalidad 🌟",
  },
  {
    id: 4,
    image: "/images/ig-4.jpg",
    likes: 2134,
    comments: 89,
    caption: "Lujo accesible para todas 💖",
  },
  {
    id: 5,
    image: "/images/ig-5.jpg",
    likes: 876,
    comments: 23,
    caption: "Cada pieza cuenta una historia ✨",
  },
  {
    id: 6,
    image: "/images/ig-6.jpg",
    likes: 1432,
    comments: 56,
    caption: "Brilla con luz propia 🌟",
  },
]

export function InstagramFeed() {
  return (
    <section className="w-full py-20 md:py-28 bg-[#F5EFE7]">
      <div className="container px-4 md:px-6">
        {/* Heading */}
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-3 rounded-full bg-[#D4AF37]/10 px-6 py-2 text-sm font-medium text-[#2C1810]">
            <LuInstagram className="h-5 w-5" />
            <span className="font-display">Síguenos en Instagram</span>
            <LuSparkles className="h-5 w-5" />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#2C1810]">#LúminaStyle</h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl font-light leading-relaxed">
            Únete a nuestra comunidad y comparte cómo brillar con LÚMINA
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <Link
              key={post.id}
              to="https://instagram.com/lumina"
              target="_blank"
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-md bg-white"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={post.image}
                alt={post.caption}
                className="object-cover w-full h-full transition-transform group-hover:scale-110 duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Stats & Caption */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex gap-3">
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
                <p className="text-xs line-clamp-2">{post.caption}</p>
              </div>

              {/* Icon Top Right */}
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300">
                <LuInstagram className="h-4 w-4 text-white" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link to="https://instagram.com/lumina" target="_blank">
            <Button className="bg-[#D4AF37] hover:bg-[#c19e32] text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition duration-300 group">
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
