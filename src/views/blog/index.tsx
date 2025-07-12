import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadPosts } from "@/utils/loadPosts";
import {
  LuCalendar,
  LuUser,
  LuArrowRight,
  LuHeart,
  LuShare2,
  LuBookOpen,
  LuSparkles,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    loadPosts().then(setPosts);
  }, []);

  const featuredPosts = posts.filter((p) => p.featured);
  const otherPosts = posts;

  return (
    <div className="min-h-screen">
      <section className="relative bg-[#5E4536] py-20 md:py-28 overflow-hidden">
        <div className="container px-4 md:px-6 relative text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">Inspírate</h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-light leading-relaxed">
            Descubre consejos de estilo, tendencias y historias inspiradoras para brillar con tu propia luz.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input type="email" placeholder="tu-email@ejemplo.com" className="h-12 rounded-xl border-2 border-[#E8D9CF] bg-white focus:border-[#9A6D4E]" />
              <Button className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white h-12 px-6 rounded-xl">Suscribirse</Button>
            </div>
            <p className="text-xs text-white mt-2">Recibe nuestros últimos artículos en tu email</p>
          </div>
        </div>
      </section>

      {/* Todos los artículos */}
      <section className="py-20 mb-15">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#5E4536]">Todos los Artículos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post, index) => (
              <article key={post.slug} className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden transform hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={post.image} alt={post.title} className="object-cover transition-transform group-hover:scale-105 duration-700" />
                  <div className="absolute top-4 left-4 bg-[#9A6D4E] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">{post.category}</div>
                  {post.featured && <div className="absolute top-4 right-4 bg-[#D5B23D] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">Destacado</div>}
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4 text-sm text-[#9A6D4E] mb-3">
                    <div className="flex items-center gap-1"><LuUser className="h-4 w-4" />{post.author}</div>
                    <div className="flex items-center gap-1"><LuCalendar className="h-4 w-4" />{new Date(post.date).toLocaleDateString("es-ES")}</div>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-lg text-[#5E4536] group-hover:text-[#9A6D4E] transition-colors line-clamp-2 leading-tight">{post.title}</h3>
                  <p className="text-[#9A6D4E] text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="hover:bg-[#F5EEE8] h-8 w-8"><LuHeart className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="hover:bg-[#F5EEE8] h-8 w-8"><LuShare2 className="h-4 w-4" /></Button>
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <Button className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white rounded-full px-4 py-2 text-sm">
                        Leer más <LuArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
