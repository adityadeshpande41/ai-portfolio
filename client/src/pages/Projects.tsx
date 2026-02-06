import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "AI Voice Assistant",
    category: "AI",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop", // abstract ai wave
    description: "A real-time voice conversational agent with <200ms latency.",
    stack: ["React", "OpenAI", "WebSockets"]
  },
  {
    id: 2,
    title: "SaaS Dashboard",
    category: "Web",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", // data dashboard
    description: "Analytics platform for e-commerce businesses.",
    stack: ["Next.js", "Tremor", "Postgres"]
  },
  {
    id: 3,
    title: "Crypto Portfolio",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1000&auto=format&fit=crop", // crypto mobile
    description: "Mobile-first portfolio tracker with real-time price alerts.",
    stack: ["React Native", "Firebase"]
  },
  {
    id: 4,
    title: "Generative Art Engine",
    category: "Creative",
    image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=1000&auto=format&fit=crop", // generative art
    description: "Browser-based tool to create unique artworks using algorithms.",
    stack: ["Canvas API", "WebGL"]
  }
];

const filters = ["All", "AI", "Web", "Mobile", "Creative"];

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
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={project.id}
              className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-600 transition-colors"
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
                     <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                     <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{project.category}</span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
                      <Github className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white">
                      <ExternalLink className="w-4 h-4" />
                    </button>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}
