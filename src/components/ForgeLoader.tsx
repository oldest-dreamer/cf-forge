import { motion, useReducedMotion } from 'motion/react';
import { Logo } from './Logo';

/** Full-screen wait state: the ingot glows while the session loads. */
export function ForgeLoader() {
  const reduce = useReducedMotion();
  return (
    <div className="grain grid min-h-dvh place-items-center" role="status" aria-label="Loading">
      <motion.div
        animate={reduce ? undefined : { opacity: [0.55, 1, 0.55], scale: [0.97, 1, 0.97] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        className="drop-shadow-[0_0_24px_rgba(240,160,75,0.35)]"
      >
        <Logo className="size-14" />
      </motion.div>
    </div>
  );
}
