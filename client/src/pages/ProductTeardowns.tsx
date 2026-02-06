import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpRight } from "lucide-react";

const teardowns = [
  {
    id: 1,
    title: "Linear: The Gold Standard of Productivity UI",
    date: "Feb 5, 2026",
    description: "A deep dive into Linear's keyboard-first design philosophy and performance-centric architecture.",
    category: "Product Design",
    product: "Linear",
  },
  {
    id: 2,
    title: "Arc Browser: Reimagining the Internet Gateway",
    date: "Jan 28, 2026",
    description: "How Arc uses personalization and space-based organization to change browsing habits.",
    category: "User Experience",
    product: "Arc",
  },
  {
    id: 3,
    title: "Notion: From Docs to Everything App",
    date: "Jan 21, 2026",
    description: "Analyzing the block-based architecture that allowed Notion to eat the productivity stack.",
    category: "Product Strategy",
    product: "Notion",
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
                <Card className="glass bubbly group hover:border-white/20 transition-all cursor-pointer">
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
