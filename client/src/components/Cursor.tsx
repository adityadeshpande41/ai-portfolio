import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/use-mouse";
import { useEffect, useState } from "react";

export function Cursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Check if hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <>
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ filter: "blur(1px)" }}
        animate={{
          x: x - 8,
          y: y - 8,
          scale: isHovering ? 3 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.1
        }}
      />
      
      {/* Trailing Bubble */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 bg-white/10 rounded-full pointer-events-none z-[9998] backdrop-blur-sm"
        animate={{
          x: x - 24,
          y: y - 24,
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.2 : 0.4
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.8
        }}
      />

      {/* Gooey SVG Filter */}
      <svg className="hidden">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
