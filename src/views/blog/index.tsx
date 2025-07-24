import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadPosts } from "@/utils/loadPosts";
import {
  LuCalendar,
  LuUser,
  LuArrowRight,
  LuHeart,
  LuShare2,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Newsletter } from "@/components/newsletter";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    loadPosts().then(setPosts);
  }, []);

  const otherPosts = posts;

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-20 bg-white">
        <div className="container px-4 md:px-6">

          {/* Título encima de las tarjetas */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Últimos Artículos del Blog
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto">
              Explora contenidos inspiradores, consejos y novedades pensadas para ti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {otherPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white border border-[#E8D9CF] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover transition-transform group-hover:scale-105 duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#9A6D4E] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow">
                    {post.category}
                  </div>
                  {post.featured && (
                    <div className="absolute top-4 right-4 border text-white text-xs px-3 py-1.5 rounded-full font-medium shadow">
                      Destacado
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-4 text-sm">
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

                  <h3 className="font-bold text-lg transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link to={`/blog/${post.slug}`}>
                    <Button className="bg-black hover:bg-black/80 text-white rounded-full px-4 py-2 text-sm">
                      Leer más <LuArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Newsletter />
    </div>
  );
}
