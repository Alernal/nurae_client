import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadPosts } from "@/utils/loadPosts";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    loadPosts().then((posts) => {
      const found = posts.find((p) => p.slug === slug);
      setPost(found || null);
    });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#9A6D4E]">
        <p>Artículo no encontrado.</p>
      </div>
    );
  }

  return (
    <article className="bg-[#FDF8F4] min-h-screen py-12">
      <div className="px-4 md:px-6 max-w-3xl mx-auto">
        {/* Imagen destacada */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto rounded-xl shadow-lg mb-6"
        />

        {/* Cabecera */}
        <header className="space-y-4 mb-6">
          {/* Categorías */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((cat: string) => (
                <span
                  key={cat}
                  className="bg-[#9A6D4E] text-white text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Título */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#5E4536] leading-snug">
            {post.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#9A6D4E]">
            {post.authorAvatar && (
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div className="flex flex-col">
              <span className="font-medium">{post.author}</span>
              <span>
                {new Date(post.date).toLocaleDateString("es-ES")} •{" "}
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 bg-[#F5EEE8] text-[#9A6D4E] rounded-full border border-[#E8D9CF]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Contenido del post */}
        <div className="prose prose-lg max-w-none text-[#4A3A2F]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
