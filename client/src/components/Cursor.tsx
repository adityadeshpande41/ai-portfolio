import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springX = useSpring(cursorX, { stiffness: 800, damping: 35, mass: 0.1 });
  const springY = useSpring(cursorY, { stiffness: 800, damping: 35, mass: 0.1 });
  const trailX = useSpring(cursorX, { stiffness: 150, damping: 15, mass: 0.8 });
  const trailY = useSpring(cursorY, { stiffness: 150, damping: 15, mass: 0.8 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('a') ||
        !!target.closest('button')
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY, filter: "blur(1px)" }}
        animate={{ scale: isHovering ? 3 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 bg-white/10 rounded-full pointer-events-none z-[9998]"
        style={{ x: trailX, y: trailY, translateX: -16, translateY: -16 }}
        animate={{ scale: isHovering ? 1.8 : 1, opacity: isHovering ? 0.2 : 0.4 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
