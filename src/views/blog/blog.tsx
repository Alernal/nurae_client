import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadPosts } from "@/utils/loadPosts";
import remarkGfm from "remark-gfm";
import ReactMarkdown from 'react-markdown'


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
    <article className="bg-white min-h-screen py-12">
      {/* Imagen destacada (ocupa el ancho del container) */}
      <div className="container px-4 md:px-6 mb-10">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto rounded-xl shadow-md object-cover"
        />
      </div>

      {/* Contenido principal */}
      <div className="px-4 md:px-6 max-w-4xl mx-auto">
        {/* Cabecera */}
        <header className="space-y-6 mb-8 text-center md:text-left">
          {/* Categorías */}
          {post.categories?.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {post.categories.map((cat: string) => (
                <span
                  key={cat}
                  className="bg-black text-white text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-snug">
            {post.title}
          </h1>

          {/* Autor y meta info */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-800">
            {post.authorAvatar && (
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div className="flex flex-col">
              <span className="font-semibold">{post.author}</span>
              <span className="font-light">
                {new Date(post.date).toLocaleDateString("es-ES")} • {post.readTime}
              </span>
            </div>
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 bg-[#d7d3cf] text-[#000000] rounded-full border border-[#b4b4b4]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Contenido markdown */}
        <div className="prose prose-lg max-w-none text-[#353535] whitespace-pre-line">
          <ReactMarkdown children={post.content} remarkPlugins={[remarkGfm]} components={{
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside pl-4" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal list-inside pl-4" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="-mb-5" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-black" {...props} />
              ),
              em: ({ node, ...props }) => (
                <em className="italic text-gray-700" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-[#5E4536] underline hover:text-[#3c2f24]"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
            }}></ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
