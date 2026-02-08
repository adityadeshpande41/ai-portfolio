import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Link } from "wouter";

const techStack = {
  "AI & Machine Learning": [
    "LLMs (GPT, Claude)", "RAG", "LangChain", "LangGraph", "Multi-Agent Systems", 
    "Fine-tuning (SFT, LoRA)", "Embeddings", "Vector Search", "Prompt Engineering",
    "Model Evaluation", "NLP", "Time Series ML"
  ],
  "Data & Analytics": [
    "SQL", "Python (Pandas, NumPy)", "Data Modeling", "ETL/ELT", "KPIs & Metrics",
    "A/B Testing", "Statistical Analysis", "Data Visualization", "Power BI", "Tableau"
  ],
  "Backend & APIs": [
    "Python", "FastAPI", "REST APIs", "Node.js", "Express", "TypeScript",
    "Data Pipelines", "Microservices"
  ],
  "Infrastructure & MLOps": [
    "AWS (EC2, S3)", "Docker", "CI/CD", "Model Deployment", "Monitoring",
    "Git", "Linux"
  ],
  "Databases": [
    "PostgreSQL", "SQLite", "Vector DBs (Pinecone, Weaviate)", "Redis"
  ],
  "Product & Execution": [
    "Product Discovery", "PRDs", "Roadmaps", "Stakeholder Management",
    "Agile/Scrum", "User Stories"
  ]
};

export default function About() {
  return (
    <PageTransition>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 text-white">About Me</h1>
          <div className="prose prose-invert prose-lg text-zinc-400">
            <p className="mb-6">
              I'm a builder across <span className="text-white">AI, data, and product</span>, focused on turning complex problems into systems that ship.
            </p>
            <p className="mb-6">
              My work spans LLM-powered applications, data platforms, analytics, and product execution, from defining the problem and success metrics to building, deploying, and iterating in production. I care about <span className="text-white">clarity, reliability, and real-world impact</span>, and I use data and feedback loops to guide decisions.
            </p>
            <p>
              I enjoy working at the intersection of <span className="text-white">engineering depth and product thinking</span>, especially in ambiguous, fast-moving environments.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-8">Tech Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(techStack).map(([category, skills]) => (
                <div key={category} className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-5 hover:border-zinc-700/50 transition-colors">
                  <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 text-xs font-medium hover:bg-zinc-800 hover:border-zinc-600 hover:text-white transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Abstract Pattern / Image Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-800 to-black border border-white/10 relative"
          >
             <img 
               src="/images/profile-pic (2) (1).jpg" 
               alt="Aditya Deshpande" 
               className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 mt-4">
             <StatCard number="5+" label="Companies" />
             <StatCard number="10+" label="Projects" />
          </div>
        </div>
      </div>

      {/* Hobbies Section */}
      <div className="mt-32">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-12 text-white">Life Beyond Code</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <HobbyCard 
            title="Hiking & Exploration" 
            description="Finding clarity in the mountains and fresh air." 
            image="/images/E1.jpg"
            link="/hiking"
          />
          <HobbyCard 
            title="Photography" 
            description="Capturing the interplay of light and shadow." 
            image="/images/P2.jpg"
            link="/photography"
          />
          <HobbyCard 
            title="Minimalist Travel" 
            description="Discovering new perspectives across the globe." 
            image="/images/hobby3.jpg"
            link="/travel"
          />
        </div>
      </div>
    </PageTransition>
  );
}

function HobbyCard({ title, description, image, link }: { title: string, description: string, image: string, link: string | null }) {
  const content = (
    <>
      <img src={image} alt={title} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
        {link && (
          <p className="text-xs text-blue-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click to view gallery →
          </p>
        )}
      </div>
    </>
  );

  if (link) {
    return (
      <Link href={link}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative rounded-2xl overflow-hidden border border-white/5 aspect-[4/5] cursor-pointer hover:border-blue-500/30 transition-all"
        >
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl overflow-hidden border border-white/5 aspect-[4/5]"
    >
      {content}
    </motion.div>
  );
}

function StatCard({ number, label }: { number: string, label: string }) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
      <h4 className="text-3xl font-display font-bold text-white mb-1">{number}</h4>
      <p className="text-sm text-zinc-500 uppercase tracking-wider font-medium">{label}</p>
    </div>
  );
}
