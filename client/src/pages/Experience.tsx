import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "Senior Frontend Engineer",
    company: "TechFlow AI",
    logo: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=100&auto=format&fit=crop",
    period: "2023 - Present",
    description: "Leading the development of a generative AI dashboard. Implemented RAG pipelines and reduced latency by 40%.",
  },
  {
    role: "Full Stack Developer",
    company: "StartUp Inc",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=100&auto=format&fit=crop",
    period: "2021 - 2023",
    description: "Built the MVP from scratch using Next.js and Supabase. Scaled to 10k monthly active users.",
  },
  {
    role: "Software Engineer Intern",
    company: "Big Corp",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=100&auto=format&fit=crop",
    period: "2020",
    description: "Developed internal tools for the data science team. Automated reporting workflows saving 20h/week.",
  }
];

export default function Experience() {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-16 text-white text-center">Experience</h1>
        
        <div className="relative border-l border-zinc-800 pl-8 md:pl-16 space-y-16">
          {experiences.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] md:-left-[73px] top-1 w-5 h-5 rounded-full bg-zinc-950 border-4 border-zinc-800" />
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                    <img src={item.logo} alt={item.company} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{item.role}</h3>
                    <p className="text-lg text-blue-400 font-medium">{item.company}</p>
                  </div>
                </div>
                <span className="text-sm font-mono text-zinc-500">{item.period}</span>
              </div>
              <p className="text-zinc-400 leading-relaxed pl-16 sm:pl-16">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
