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
    <div className="min-h-screen bg-[#FDF8F4]">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="container px-4 md:px-6 relative text-center space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#9A6D4E] shadow-sm border border-[#E8D9CF]">
            <LuBookOpen className="h-5 w-5" />
            <span className="font-medium">Blog NURAE</span>
            <LuSparkles className="h-5 w-5" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#5E4536] leading-tight">Inspírate</h1>
          <p className="text-xl md:text-2xl text-[#9A6D4E] max-w-3xl mx-auto font-light leading-relaxed">
            Descubre consejos de estilo, tendencias y historias inspiradoras para brillar con tu propia luz.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input type="email" placeholder="tu-email@ejemplo.com" className="h-12 rounded-xl border-2 border-[#E8D9CF] bg-white focus:border-[#9A6D4E]" />
              <Button className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white h-12 px-6 rounded-xl">Suscribirse</Button>
            </div>
            <p className="text-xs text-[#9A6D4E] mt-2">Recibe nuestros últimos artículos en tu email</p>
          </div>
        </div>
      </section>

      {/* Artículos destacados */}
      {featuredPosts.length > 0 && (
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#5E4536]">Artículos Destacados</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredPosts.map((post, index) => (
                <article key={post.slug} className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden transform hover:-translate-y-1">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={post.image} alt={post.title} className="object-cover transition-transform group-hover:scale-105 duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-[#9A6D4E] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">{post.category}</div>
                    <div className="absolute top-4 right-4 bg-[#E76F51] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">Destacado</div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white font-bold text-xl md:text-2xl leading-tight mb-2">{post.title}</h3>
                      <div className="flex items-center gap-4 text-white/80 text-sm">
                        <div className="flex items-center gap-1"><LuUser className="h-4 w-4" />{post.author}</div>
                        <div className="flex items-center gap-1"><LuCalendar className="h-4 w-4" />{new Date(post.date).toLocaleDateString("es-ES")}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className="text-[#9A6D4E] leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#9A6D4E]">{post.readTime} de lectura</span>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="hover:bg-[#F5EEE8]"><LuHeart className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="hover:bg-[#F5EEE8]"><LuShare2 className="h-4 w-4" /></Button>
                        <Link to={`/blog/${post.slug}`}>
                          <Button className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white rounded-full px-4 py-2 text-sm">
                            Leer más <LuArrowRight className="ml-2 h-4 w-4" />
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
      )}

      {/* Todos los artículos */}
      <section className="py-16 bg-[#F5EEE8]">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#5E4536]">Todos los Artículos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post, index) => (
              <article key={post.slug} className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden transform hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={post.image} alt={post.title} className="object-cover transition-transform group-hover:scale-105 duration-700" />
                  <div className="absolute top-4 left-4 bg-[#9A6D4E] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">{post.category}</div>
                  {post.featured && <div className="absolute top-4 right-4 bg-[#E76F51] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">Destacado</div>}
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

      {/* CTA Newsletter */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="bg-gradient-to-br from-[#9A6D4E]/10 to-[#E8B059]/10 rounded-3xl p-12 text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#5E4536]">No te pierdas nada</h2>
            <p className="text-xl text-[#9A6D4E] max-w-2xl mx-auto">
              Suscríbete a nuestro newsletter y recibe los mejores consejos de estilo, tendencias y ofertas exclusivas directamente en tu email.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input type="email" placeholder="tu-email@ejemplo.com" className="h-12 rounded-xl border-2 border-[#E8D9CF] bg-white focus:border-[#9A6D4E]" />
                <Button className="bg-[#9A6D4E] hover:bg-[#7D5840] text-white h-12 px-6 rounded-xl">Suscribirse</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
