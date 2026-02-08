import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/teardowns", label: "Teardowns" },
  { href: "/chat", label: "Chatbot" },
  { href: "/voice", label: "Voice Agent" },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/">
          <span className="text-xl font-display font-bold text-white cursor-pointer tracking-tighter">
            ADITYA<span className="text-zinc-500">.AI</span>
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer",
                location === link.href ? "text-white" : "text-zinc-400 hover:text-white"
              )}>
                {link.label}
                {location === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </span>
            </Link>
          ))}
        </div>
        
        <Link href="/contact">
           <button className="hidden md:block px-5 py-2 rounded-full bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-colors">
             Let's Talk
           </button>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-zinc-300 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-sm border-b border-white/5"
          >
            <div className="px-4 py-4 space-y-2">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                      location === link.href
                        ? "bg-white/10 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full px-4 py-3 rounded-lg bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-colors"
                >
                  Let's Talk
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
