import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadPosts } from "@/utils/loadPosts";
import { Newsletter } from "@/components/newsletter";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    loadPosts().then(setPosts);
  }, []);

  const [firstPost, ...otherPosts] = posts;

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-20 bg-white">
        <div className="container px-4 md:px-6">

          {firstPost && (
            <article
              key={firstPost.slug}
              className="mb-10 group bg-[#f0f1f3] overflow-hidden"
            >
              <div className="relative aspect-[3/1] md:aspect-[16/6] overflow-hidden">
                <img
                  src={firstPost.image}
                  alt={firstPost.title}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="py-10 px-6 text-center">
                <h3 className="font-medium text-2xl leading-snug mb-5">
                  {firstPost.title}
                </h3>

                <p className="text-base leading-relaxed max-w-4xl mx-auto font-light">
                  {firstPost.excerpt}
                </p>

                {/* <div className="flex justify-center">
                  <Link to={`/blog/${firstPost.slug}`}>
                    <Button className="bg-black hover:bg-black/80 text-white rounded-full px-4 py-2 text-sm">
                      Leer más <LuArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div> */}
              </div>
            </article>
          )}

          {/* Resto de los artículos en cuadrícula */}
          <div className="flex items-center gap-10">
            {otherPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-[#f0f1f3]  overflow-hidden"
              >
                <div className="relative  overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover"
                  />
                </div>

                <div className="py-10 px-6 text-center">
                  <h3 className="font-medium text-lg transition-colors line-clamp-2 leading-snug mb-5">
                    {post.title}
                  </h3>

                  <p className="text-sm leading-relaxed line-clamp-3 font-light">
                    {post.excerpt}
                  </p>

                  {/* <Link to={`/blog/${post.slug}`}>
                    <Button className="bg-black hover:bg-black/80 text-white rounded-full px-4 py-2 text-sm">
                      Leer más <LuArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link> */}
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
