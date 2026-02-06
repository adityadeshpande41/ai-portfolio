import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "Senior Frontend Engineer",
    company: "TechFlow AI",
    period: "2023 - Present",
    description: "Leading the development of a generative AI dashboard. Implemented RAG pipelines and reduced latency by 40%.",
  },
  {
    role: "Full Stack Developer",
    company: "StartUp Inc",
    period: "2021 - 2023",
    description: "Built the MVP from scratch using Next.js and Supabase. Scaled to 10k monthly active users.",
  },
  {
    role: "Software Engineer Intern",
    company: "Big Corp",
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
              
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-2xl font-bold text-white">{item.role}</h3>
                <span className="text-sm font-mono text-zinc-500 mt-1 sm:mt-0">{item.period}</span>
              </div>
              <p className="text-lg text-blue-400 mb-4 font-medium">{item.company}</p>
              <p className="text-zinc-400 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
