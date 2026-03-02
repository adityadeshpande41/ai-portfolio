import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "Senior AI Engineer / AI Product Engineer",
    company: "Sepal AI",
    location: "New York, NY",
    logo: "/images/logos/Sepal.png",
    period: "Nov 2025 – Present",
    highlights: [
      "Building and deploying LLM evaluation pipelines measuring latency, robustness, and safety to support production model selection.",
      "Designing and shipping agentic systems (LangGraph + RAG) that improve reliability and consistency of enterprise AI workflows.",
      "Owning and scaling fine-tuning and retraining workflows (SFT, LoRA) on AWS and Docker, reducing iteration cycles by ~35%.",
      "Creating and maintaining synthetic and augmented data pipelines to expand edge-case coverage and increase deployment confidence."
    ]
  },
  {
    role: "AI Engineer / AI Product Manager",
    company: "Sqor AI",
    location: "New York, NY",
    logo: "/images/logos/sqor.jpeg",
    period: "Jul 2025 – Oct 2025",
    highlights: [
      "Built multi-agent decision-intelligence workflows that reduced manual analysis effort by ~40%.",
      "Designed and deployed RAG pipelines with embeddings and vector search, improving retrieval precision by ~25%.",
      "Owned the data integration and AI capability roadmap across 500+ SaaS sources and customer use cases.",
      "Translated ambiguous business problems into production AI features, balancing model quality, latency, and cost."
    ]
  },
  {
    role: "AI Engineer Intern (Information Security & Risk Analytics)",
    company: "Cantor Fitzgerald",
    location: "New York, NY",
    logo: "/images/logos/cantor.png",
    period: "Jun 2024 – Aug 2024",
    highlights: [
      "Developed ML-based risk and anomaly detection models, improving precision of high-risk trading alerts by ~15%.",
      "Engineered Python and SQL pipelines processing 10M+ security events per day for real-time risk triage.",
      "Built AI-driven risk scoring logic, reducing false negatives and accelerating incident response by ~20%.",
      "Delivered risk intelligence dashboards surfacing vulnerabilities, alert quality, and anomalous trading behavior."
    ]
  },
  {
    role: "AI / Data Engineer Intern (Applied ML & NLP)",
    company: "Covenant House",
    location: "New York, NY",
    logo: "/images/logos/covenant.png",
    period: "Feb 2025 – Jun 2025",
    highlights: [
      "Built NLP pipelines to analyze 3K+ survey responses, increasing usable insight coverage by ~12%.",
      "Developed LLM-based summarization workflows with RAG, reducing manual text review time by ~45%.",
      "Automated recurring analytics and reporting pipelines for leadership decision-making.",
      "Partnered with program teams to translate unstructured data into actionable operational insights."
    ]
  },
  {
    role: "Machine Learning Research Intern",
    company: "Bhabha Atomic Research Centre (BARC)",
    location: "Mumbai, India",
    logo: "/images/logos/bhabha.jpeg",
    period: "Feb 2023 – Jun 2023",
    highlights: [
      "Researched ML-based rotor unbalance detection using time-series sensor data.",
      "Trained classifiers on 500K+ vibration signals, improving fault detection accuracy by ~30%.",
      "Engineered temporal features using NumPy and Pandas to improve interpretability and diagnostics.",
      "Produced research outputs that reduced balancing time and operational costs by ~2%."
    ]
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
              
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-white/5 flex items-center justify-center">
                    <img src={item.logo} alt={item.company} className="w-full h-full object-contain p-1" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{item.role}</h3>
                    <p className="text-lg text-blue-400 font-medium">{item.company}</p>
                    <p className="text-sm text-zinc-500">{item.location}</p>
                  </div>
                </div>
                <span className="text-sm font-mono text-zinc-500 whitespace-nowrap">{item.period}</span>
              </div>
              <ul className="space-y-2 pl-16 sm:pl-16">
                {item.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="text-zinc-400 leading-relaxed flex gap-2">
                    <span className="text-blue-400 mt-1.5">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
