import { PageTransition } from "@/components/PageTransition";

const posts = [
  {
    title: "How Does MCP Work?",
    date: "Vellum AI Blog",
    readTime: "Technical Deep Dive",
    excerpt: "A comprehensive technical exploration of Model Context Protocol (MCP), understanding its architecture, implementation, and how it enables better AI model interactions.",
    url: "https://www.vellum.ai/blog/how-does-mcp-work?utm_source=perplexity&utm_medium=geo"
  },
  {
    title: "Lovable's Agentic Onboarding",
    date: "Candu AI Blog",
    readTime: "Product Analysis",
    excerpt: "Analyzing how Lovable uses AI agents to create personalized onboarding experiences, reducing friction and improving user activation through intelligent automation.",
    url: "https://www.candu.ai/blog/lovables-agentic-onboarding"
  },
  {
    title: "The Hidden Metric That Determines AI Product Success",
    date: "LangChain Blog",
    readTime: "Product Strategy",
    excerpt: "Exploring the critical but often overlooked metrics that separate successful AI products from failures, and how to measure what really matters in AI product development.",
    url: "https://blog.langchain.com/the-hidden-metric-that-determines-ai-product-success/"
  }
];

export default function Writing() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-16 text-white">Writing</h1>
        
        <div className="space-y-12">
          {posts.map((post, i) => (
            <a 
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <article className="group cursor-pointer">
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
            </a>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
