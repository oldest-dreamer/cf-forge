import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

/** A soft ember light that trails the pointer. Only on devices with a real hover pointer. */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 24, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 24, mass: 0.6 });
  useEffect(() => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 260);
      y.set(e.clientY - 260);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reduce, x, y]);
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(240,160,75,0.10),transparent)] [@media(hover:hover)]:block"
    />
  );
}
