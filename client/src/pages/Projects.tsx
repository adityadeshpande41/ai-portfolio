import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "AI Call Assistant",
    category: "AI",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    description: "An intelligent AI-powered call assistant that handles phone conversations, schedules appointments, and provides automated customer support using natural language processing.",
    stack: ["Python", "OpenAI", "Speech Recognition", "NLP"],
    github: "https://github.com/adityadeshpande41/AI-Call-Assistant",
    demo: null
  },
  {
    id: 2,
    title: "Finance AI Agent",
    category: "AI",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop",
    description: "An AI-powered financial agent that provides intelligent financial analysis, portfolio recommendations, and market insights using advanced machine learning algorithms.",
    stack: ["Python", "AI/ML", "Financial Analysis", "LangChain"],
    github: "https://github.com/adityadeshpande41/Finance-AI-Agent",
    demo: null
  },
  {
    id: 3,
    title: "AI Query Tool",
    category: "AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
    description: "A powerful query tool that leverages AI to process and analyze complex data queries, providing intelligent insights and automated data retrieval.",
    stack: ["Python", "LangChain", "Vector DB", "AI/ML"],
    github: "https://github.com/adityadeshpande41/AI-query-tool",
    demo: null
  },
  {
    id: 4,
    title: "MultiAgent AI Wellness System",
    category: "AI",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
    description: "A comprehensive multi-agent AI system designed for wellness and health monitoring. Uses multiple AI agents working collaboratively to provide personalized health recommendations.",
    stack: ["Python", "Multi-Agent Systems", "LangGraph", "Healthcare AI"],
    github: "https://github.com/adityadeshpande41/MultiAgent-AI-Wellness-System",
    demo: null
  },
  {
    id: 5,
    title: "Market Cap PPT Generator",
    category: "Automation",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    description: "Automated tool that generates professional PowerPoint presentations with market capitalization data and financial metrics for companies.",
    stack: ["Python", "Automation", "Data Visualization", "PPT Generation"],
    github: "https://github.com/adityadeshpande41/market-cap-ppt-generator",
    demo: null
  },
  {
    id: 6,
    title: "A/B Testing Framework",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    description: "Statistical framework for conducting A/B tests with hypothesis testing, confidence intervals, and automated reporting for data-driven decision making.",
    stack: ["Python", "Statistics", "Data Analysis", "Hypothesis Testing"],
    github: "https://github.com/adityadeshpande41/A-B-Testing-",
    demo: null
  },
  {
    id: 7,
    title: "Marketing Strategy Analytics",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop",
    description: "Data-driven marketing strategy analysis tool that provides insights on campaign performance, customer segmentation, and ROI optimization.",
    stack: ["Python", "Data Analytics", "Marketing Analytics", "Visualization"],
    github: "https://github.com/adityadeshpande41/Marketing_Strategy",
    demo: null
  },
  {
    id: 8,
    title: "Uber Eats Data Analysis",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1000&auto=format&fit=crop",
    description: "Comprehensive data analysis of Uber Eats delivery patterns, customer behavior, and restaurant performance metrics with actionable insights.",
    stack: ["Python", "Pandas", "Data Visualization", "EDA"],
    github: "https://github.com/adityadeshpande41/Uber-Eats-Data-Analysis",
    demo: null
  },
  {
    id: 9,
    title: "Olympics Data Analysis",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
    description: "Exploratory data analysis of Olympic Games data, analyzing athlete performance, country medals, and historical trends across multiple Olympics.",
    stack: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    github: "https://github.com/adityadeshpande41/EDA_Olympics",
    demo: null
  },
  {
    id: 10,
    title: "AI Portfolio Website",
    category: "Web",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000&auto=format&fit=crop",
    description: "This portfolio website featuring an AI chatbot with RAG, voice agent, and vector database. Built with modern web technologies and OpenAI integration.",
    stack: ["React", "TypeScript", "OpenAI", "SQLite", "RAG"],
    github: null,
    demo: "/"
  }
];

const filters = ["All", "AI", "Data Science", "Automation", "Web"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <PageTransition>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 text-white">Selected Works</h1>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-16 justify-center">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter 
                  ? "bg-white text-black" 
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
        >
          {filteredProjects.map((project) => (
            <motion.a
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={project.id}
              href={project.github || project.demo || "#"}
              target={project.github || project.demo ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-600 transition-all hover:scale-[1.02] cursor-pointer block"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                     <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                     <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{project.category}</span>
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 text-white transition-colors">
                        <Github className="w-4 h-4" />
                      </div>
                    )}
                    {project.demo && (
                      <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-zinc-400 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <span key={tech} className="px-2 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-xs text-zinc-500">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}
