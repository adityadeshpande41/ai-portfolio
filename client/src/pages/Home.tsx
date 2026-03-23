import { PageTransition } from "@/components/PageTransition";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

function BubblyText({ children }: { children: string }) {
  const words = children.split(" ");
  return (
    <div className="flex flex-wrap gap-x-[0.3em]">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-1">
          {word.split("").map((char, j) => (
            <motion.span
              key={j}
              className="inline-block hover:text-blue-400 transition-colors"
              whileHover={{ 
                y: -15, 
                scale: 1.4,
                rotate: Math.random() * 20 - 10,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col items-start justify-center min-h-[70vh] max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium uppercase tracking-wider">
            Available for new roles
          </span>
        </motion.div>

        <div className="text-5xl md:text-8xl font-display font-bold leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          <BubblyText>I build intelligent systems from idea to production.</BubblyText>
        </div>

        <div className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
          <p>
            I'm Aditya, a builder across <span className="text-white">AI, data, and product</span>, focused on shipping intelligent systems end to end.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-16">
          <Link href="/projects">
            <button className="group px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-zinc-200 transition-all flex items-center gap-2">
              View Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link href="/experience">
            <button className="px-8 py-4 rounded-full border border-zinc-800 text-white font-medium text-lg hover:bg-zinc-900 transition-colors">
              View Experience
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-8 py-4 rounded-full border border-zinc-800 text-white font-medium text-lg hover:bg-zinc-900 transition-colors">
              Contact Me
            </button>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <SocialLink href="https://github.com/adityadeshpande41" icon={Github} label="GitHub" />
          <SocialLink href="https://linkedin.com/in/aditya-m-deshpande/" icon={Linkedin} label="LinkedIn" />
          <SocialLink href="mailto:amdnyu@gmail.com" icon={Mail} label="Email" />
        </div>
      </div>
    </PageTransition>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
      aria-label={label}
    >
      <Icon className="w-6 h-6" />
    </a>
  );
}
