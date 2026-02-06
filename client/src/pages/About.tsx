import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";

const skills = [
  "TypeScript", "React", "Node.js", "Python", "PostgreSQL", 
  "TailwindCSS", "OpenAI API", "LangChain", "AWS", "Docker"
];

export default function About() {
  return (
    <PageTransition>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 text-white">About Me</h1>
          <div className="prose prose-invert prose-lg text-zinc-400">
            <p className="mb-6">
              I've always been fascinated by the intersection of design and artificial intelligence. My journey began with simple scripts and evolved into complex, full-stack systems that solve real problems.
            </p>
            <p className="mb-6">
              Currently, I'm focused on building <span className="text-white">generative AI agents</span> that can interact naturally with humans. I believe the future of software lies in interfaces that disappear, leaving only the intent and the outcome.
            </p>
            <p>
              When I'm not coding, I'm likely reading about cognitive science, playing chess, or exploring generative art. I'm also an avid hiker and photographer.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium hover:border-zinc-700 transition-colors cursor-default"
                >
                  {skill}
                </span>
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
             {/* Unsplash abstract tech image */}
             {/* abstract digital geometric pattern dark */}
             <img 
               src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
               alt="Abstract Tech" 
               className="object-cover w-full h-full opacity-60 hover:opacity-80 transition-opacity duration-500"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 mt-4">
             <StatCard number="4+" label="Years Experience" />
             <StatCard number="20+" label="Projects Shipped" />
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
            image="/images/hobby1.jpg"
          />
          <HobbyCard 
            title="Photography" 
            description="Capturing the interplay of light and shadow." 
            image="/images/hobby2.jpg"
          />
          <HobbyCard 
            title="Minimalist Travel" 
            description="Discovering new perspectives across the globe." 
            image="/images/hobby3.jpg"
          />
        </div>
      </div>
    </PageTransition>
  );
}

function HobbyCard({ title, description, image }: { title: string, description: string, image: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl overflow-hidden border border-white/5 aspect-[4/5]"
    >
      <img src={image} alt={title} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
      </div>
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
