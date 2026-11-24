import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

/** A thin ember line under the top edge that fills as the page scrolls. Transform only. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 220, damping: 32, mass: 0.4 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: x }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-ember-deep via-ember to-[#ffd9a3]"
    />
  );
}
