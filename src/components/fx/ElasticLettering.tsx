import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform, type PanInfo } from 'motion/react';
import { cn } from '@/lib/cn';

function graphemes(word: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    return Array.from(seg.segment(word), (s) => s.segment);
  }
  return Array.from(word);
}

function usePointerFine() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setFine(mq.matches);
    const on = () => setFine(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return fine;
}

function Piece({ ch, index, drag }: { ch: string; index: number; drag: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // The further you pull, the more the glyph stretches along that axis and leans.
  const scaleX = useTransform(x, (v) => 1 + Math.min(Math.abs(v) / 160, 0.55));
  const scaleY = useTransform(y, (v) => 1 + Math.min(Math.abs(v) / 160, 0.55));
  const rotate = useTransform(x, [-240, 240], [-14, 14]);

  function release(_: unknown, info: PanInfo) {
    // Spring back like an elastic band, carrying the fling velocity.
    const spring = { type: 'spring' as const, stiffness: 520, damping: 9, mass: 0.6 };
    animate(x, 0, { ...spring, velocity: info.velocity.x });
    animate(y, 0, { ...spring, velocity: info.velocity.y });
  }

  return (
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22, delay: 0.1 + index * 0.022 }}
      drag={drag}
      dragMomentum={false}
      dragElastic={0.5}
      onDragEnd={release}
      whileDrag={{ color: 'var(--color-ember)', zIndex: 10 }}
      style={{ x, y, scaleX, scaleY, rotate, transformOrigin: '50% 80%' }}
      className={cn(
        'relative inline-block will-change-transform',
        drag && 'cursor-grab touch-none select-none hover:text-ember active:cursor-grabbing',
      )}
    >
      {ch}
    </motion.span>
  );
}

/**
 * A headline you can grab, stretch and fling. Each glyph (or each word, for scripts
 * whose letters join, like Bangla) springs back to its place when released.
 */
export function ElasticLettering({
  text,
  byWord = false,
  className,
}: {
  text: string;
  byWord?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const fine = usePointerFine();
  if (reduce) return <h1 className={className}>{text}</h1>;

  const words = text.split(' ');
  let n = 0;
  return (
    <h1 className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={`${w}-${wi}`} className="inline-block whitespace-nowrap">
          {(byWord ? [w] : graphemes(w)).map((ch, ci) => (
            <Piece key={ci} ch={ch} index={n++} drag={fine} />
          ))}
          {wi < words.length - 1 && <span aria-hidden="true">&nbsp;</span>}
        </span>
      ))}
    </h1>
  );
}
