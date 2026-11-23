import { motion } from 'motion/react';
import { CheckCircle2, CircleAlert, Clock3, Loader2, XCircle, Ban } from 'lucide-react';
import type { CfSubmission, Verdict } from '@/lib/cf';
import { CFS } from '@/i18n/cfStrings';
import { useI18n } from '@/i18n/I18nProvider';
import { cn } from '@/lib/cn';

type Tone = 'good' | 'bad' | 'warn' | 'neutral' | 'pending';

function toneOf(v?: Verdict): Tone {
  if (!v || v === 'TESTING') return 'pending';
  if (v === 'OK') return 'good';
  if (v === 'TIME_LIMIT_EXCEEDED' || v === 'MEMORY_LIMIT_EXCEEDED' || v === 'IDLENESS_LIMIT_EXCEEDED') return 'warn';
  if (v === 'COMPILATION_ERROR' || v === 'SKIPPED' || v === 'REJECTED' || v === 'FAILED') return 'neutral';
  return 'bad';
}

const TONE_CLS: Record<Tone, string> = {
  good: 'text-[#56d364] bg-[#56d364]/12 ring-[#56d364]/35',
  bad: 'text-[#ff7b72] bg-[#ff7b72]/12 ring-[#ff7b72]/35',
  warn: 'text-[#f0b54b] bg-[#f0b54b]/12 ring-[#f0b54b]/35',
  neutral: 'text-slate bg-iron-2 ring-seam',
  pending: 'text-ember bg-ember/12 ring-ember/35',
};

const ICON: Record<Tone, typeof CheckCircle2> = {
  good: CheckCircle2,
  bad: XCircle,
  warn: Clock3,
  neutral: Ban,
  pending: Loader2,
};

/** Verdict with icon + words: never colour alone. */
export function VerdictChip({ s, size = 'sm' }: { s: Pick<CfSubmission, 'verdict' | 'passedTestCount'>; size?: 'sm' | 'lg' }) {
  const { t, num } = useI18n();
  const tone = toneOf(s.verdict);
  const Icon = ICON[tone] ?? CircleAlert;
  const label = t(CFS.verdicts[s.verdict ?? 'TESTING'] ?? { en: String(s.verdict), bn: String(s.verdict) });
  const showTest = tone === 'bad' || tone === 'warn';
  return (
    <motion.span
      key={`${s.verdict}-${s.passedTestCount}`}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full ring-1',
        size === 'lg' ? 'px-3.5 py-1.5 text-base font-medium' : 'px-2.5 py-0.5 text-sm',
        TONE_CLS[tone],
      )}
    >
      <Icon size={size === 'lg' ? 18 : 14} className={tone === 'pending' ? 'animate-spin' : undefined} />
      {label}
      {showTest && (
        <span className="opacity-80">
          {t(CFS.onTest)} {num(s.passedTestCount + 1)}
        </span>
      )}
    </motion.span>
  );
}

export function timeAgo(sec: number, t: (l: { en: string; bn: string }) => string, num: (n: number) => string) {
  const d = Math.max(0, Date.now() / 1000 - sec);
  if (d < 60) return t(CFS.dash.ago.now);
  if (d < 3600) return `${num(Math.floor(d / 60))} ${t(CFS.dash.ago.m)}`;
  if (d < 86400) return `${num(Math.floor(d / 3600))} ${t(CFS.dash.ago.h)}`;
  return `${num(Math.floor(d / 86400))} ${t(CFS.dash.ago.d)}`;
}
