import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Quote, Linkedin } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Robi Lin",
    title: "Co-Founder & CEO of Sepal AI",
    company: "Sepal AI",
    date: "February 10, 2026",
    relationship: "Robi managed Aditya directly",
    image: "https://ui-avatars.com/api/?name=Robi+Lin&size=200&background=0ea5e9&color=fff",
    linkedin: "https://www.linkedin.com/in/robilin/",
    text: "I worked closely with Aditya Deshpande during his time as a Lead AI Engineer at Sepal AI, and he was one of our strongest contributors across engineering and client-facing work.\n\nAditya led a team of data scientists while building and scaling production-grade AI evaluation systems. He worked closely on our LLM evaluation product and brought expertise in agentic workflows. He consistently demonstrated strong technical judgment and the ability to translate complex research ideas into stable, usable systems that performed reliably in real-world environments.\n\nWhat set Aditya apart was his ownership mindset and communication skills. He worked directly with clients to understand requirements, explain technical tradeoffs, and deliver meaningful outcomes. He thrived in fast-moving, ambiguous environments and collaborated seamlessly across product, engineering, and client stakeholders.\n\nI strongly recommend Aditya for AI engineering or applied AI roles that require deep technical expertise, leadership, and strong ownership. He would be a valuable asset to any team building production AI systems."
  },
  {
    id: 2,
    name: "Aleksandar Nikolov",
    title: "CTO | Founder | Technical Leader",
    company: "Sqor AI",
    date: "November 12, 2025",
    relationship: "Aleksandar managed Aditya directly",
    image: "https://ui-avatars.com/api/?name=Aleksandar+Nikolov&size=200&background=0ea5e9&color=fff",
    linkedin: "https://www.linkedin.com/in/aleksandar-nikolov/",
    text: "I've had the pleasure of working with Aditya here at Sqor AI, where he's been an integral part of our team since joining right after completing his master's. From the very beginning, Aditya has shown exceptional curiosity and dedication to learning, especially in the areas of AI, ML, and data systems.\n\nHis ability to pick up complex concepts quickly and apply them to real-world challenges has been remarkable. Aditya has contributed to several of our key AI and data initiatives, and his technical depth combined with a strong sense of ownership has made a real impact on the team.\n\nHe's proactive, driven, and always eager to explore new ideas, qualities that make him a valuable asset to any organization. I'm confident that wherever his career takes him next, Aditya will continue to excel and create meaningful impact."
  },
  {
    id: 3,
    name: "Cyndia Green",
    title: "Data & Learning Specialist | Addressing Social Injustices",
    company: "Covenant House New Jersey",
    date: "September 25, 2025",
    relationship: "Cyndia managed Aditya directly",
    image: "https://ui-avatars.com/api/?name=Cyndia+Green&size=200&background=0ea5e9&color=fff",
    linkedin: "https://www.linkedin.com/in/cyndiagreen/",
    text: "I had the great pleasure of supervising Aditya as the Data Science and ML Lead at Covenant House New Jersey. Aditya brought a powerful blend of ML expertise as we worked on implementing AI into the social justice sector here at CHNJ. He not only improved my own understanding of how to ML can be used in homelessness research, he consistently went above and beyond to optimize the systems we have at Covenant House.\n\nAdditionally, I had to chance to see how Aditya approaches ML in research and data analysis; his writing and strong team player skills made him an invaluable asset to our team. I am very excited to see how his career progresses with these skills and wholeheartedly recommend Aditya!"
  },
  {
    id: 4,
    name: "Wei Ke",
    title: "Pricing geek | Growth strategy consultant | Author",
    company: "NYU Stern",
    date: "June 21, 2025",
    relationship: "Wei managed Aditya directly",
    image: "https://ui-avatars.com/api/?name=Wei+Ke&size=200&background=0ea5e9&color=fff",
    linkedin: "https://www.linkedin.com/in/wei-ke/",
    text: "I had the pleasure of working with Aditya as a TA for my pricing course at Stern, and I was consistently impressed by his growth, responsiveness, and professionalism. Pricing as a topic was relatively new to Aditya, but he picked up the core concepts quickly and was able to help the students with their questions along the way.\n\nAditya was always quick to respond to requests, proactive in offering support, and consistently kept things moving smoothly behind the scenes. His ability to learn fast and contribute meaningfully made him a valuable part of the course team. I'm confident he'll bring the same level of curiosity, diligence, and responsiveness to any future role."
  },
  {
    id: 5,
    name: "Chris Volinsky",
    title: "Clinical Professor @ NYU Stern School of Business",
    company: "NYU Stern",
    date: "July 4, 2024",
    relationship: "Chris managed Aditya directly",
    image: "https://ui-avatars.com/api/?name=Chris+Volinsky&size=200&background=0ea5e9&color=fff",
    linkedin: "https://www.linkedin.com/in/chrisvolinsky/",
    text: "Aditya has been a Teaching Assistant for me for the last year at NYU Stern. I have found Aditya to be a hard-working student, happy to jump in and help with anything, and often offering to do whatever is needed to help make our classes better. I have found him to be a strong data scientist and good coder.\n\nHe is friendly and helpful, and gets high marks from the students he works with."
  }
];

export default function Testimonials() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
            Testimonials
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            What colleagues and mentors say about working with me
          </p>
        </div>

        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10 hover:border-zinc-700 transition-all"
            >
              {/* Header */}
              <div className="flex items-start gap-6 mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-zinc-700"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm md:text-base text-zinc-400 mb-1">
                        {testimonial.title}
                      </p>
                      <p className="text-sm text-blue-400 font-medium mb-2">
                        {testimonial.company}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {testimonial.date} • {testimonial.relationship}
                      </p>
                    </div>
                    <a
                      href={testimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      aria-label={`${testimonial.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-500/20" />
                <div className="pl-6">
                  {testimonial.text.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-zinc-300 leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
