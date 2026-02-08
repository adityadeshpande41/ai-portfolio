import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpRight } from "lucide-react";

const teardowns = [
  {
    id: 1,
    title: "Product Teardown: Duolingo",
    date: "Published on Substack",
    description: "A comprehensive analysis of Duolingo's gamification strategy, user engagement mechanics, and how they built one of the most addictive learning apps.",
    category: "Product Strategy",
    product: "Duolingo",
    url: "https://prodlab.substack.com/p/product-teardown-duolingo",
  },
  {
    id: 2,
    title: "Notion Onboarding Teardown",
    date: "Published on Substack",
    description: "Deep dive into Notion's onboarding flow, analyzing how they reduce friction and guide users through their complex product.",
    category: "User Experience",
    product: "Notion",
    url: "https://tearthemdown.substack.com/p/notion-onboarding",
  },
  {
    id: 3,
    title: "Growth Teardown: Spotify",
    date: "Published on drewteller.com",
    description: "Analyzing Spotify's growth strategies, viral loops, and how they became the dominant music streaming platform through product-led growth.",
    category: "Growth Strategy",
    product: "Spotify",
    url: "https://www.drewteller.com/growth-teardown-spotify",
  },
];

export default function ProductTeardowns() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
              Product Teardowns
            </h1>
            <p className="text-xl text-zinc-400">
              Weekly deep dives into the products and design systems I love.
            </p>
          </header>

          <div className="grid gap-8">
            {teardowns.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="glass bubbly group hover:border-white/20 transition-all cursor-pointer hover:scale-[1.02]">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className="bg-white/5 border-white/10 text-zinc-300">
                          {item.category}
                        </Badge>
                        <div className="flex items-center text-zinc-500 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {item.date}
                        </div>
                      </div>
                      <CardTitle className="text-2xl group-hover:text-blue-400 transition-colors flex items-center justify-between">
                        {item.title}
                        <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </CardTitle>
                      <CardDescription className="text-lg text-zinc-400 mt-2">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Featured Product:</span>
                        <span className="text-xs font-bold text-white px-2 py-0.5 bg-white/10 rounded">{item.product}</span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
