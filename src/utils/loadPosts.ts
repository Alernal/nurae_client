import matter from "gray-matter";

export async function loadPosts() {
  const modules = import.meta.glob("../assets/posts/*.md", {
    query: "?raw",
    import: "default",
  });

  const posts: any[] = [];

  for (const path in modules) {
    const content = await modules[path]();
    const { data, content: markdownContent } = matter(content);

    posts.push({
      ...data,
      content: markdownContent,
      slug: path.split("/").pop()?.replace(".md", ""),
    });
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}
