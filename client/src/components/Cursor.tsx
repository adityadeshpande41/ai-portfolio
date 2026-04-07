import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function Cursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const dotX = useSpring(mouseX, { stiffness: 800, damping: 35, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 35, mass: 0.1 });
  const trailX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.8 });
  const trailY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.8 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 8);
      mouseY.set(e.clientY - 8);
    };

    // Use pointerover only on document, check once per target change
    let lastTarget: EventTarget | null = null;
    const onOver = (e: MouseEvent) => {
      if (e.target === lastTarget) return;
      lastTarget = e.target;
      const t = e.target as HTMLElement;
      setIsHovering(
        t.tagName === "A" || t.tagName === "BUTTON" ||
        !!t.closest("a") || !!t.closest("button")
      );
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY, filter: "blur(1px)" }}
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
