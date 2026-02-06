import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/">
          <span className="text-xl font-display font-bold text-white cursor-pointer tracking-tighter">
            ADITYA<span className="text-zinc-500">.DEV</span>
          </span>
        </Link>
        
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
      </div>
    </nav>
  );
}
