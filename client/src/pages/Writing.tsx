import { PageTransition } from "@/components/PageTransition";

const posts = [
  {
    title: "The Death of the Interface",
    date: "Oct 12, 2024",
    readTime: "5 min read",
    excerpt: "Why chat-based interfaces are taking over and what it means for traditional UI design patterns."
  },
  {
    title: "Optimizing RAG Pipelines",
    date: "Sep 28, 2024",
    readTime: "8 min read",
    excerpt: "A technical deep dive into vector databases, chunking strategies, and re-ranking for better context retrieval."
  },
  {
    title: "My Stack for 2025",
    date: "Aug 15, 2024",
    readTime: "4 min read",
    excerpt: "Why I'm betting on React Server Components, Drizzle ORM, and edge runtime."
  }
];

export default function Writing() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-16 text-white">Writing</h1>
        
        <div className="space-y-12">
          {posts.map((post, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-zinc-500 mt-1 md:mt-0 font-mono">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              <p className="text-zinc-400 leading-relaxed max-w-2xl">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
