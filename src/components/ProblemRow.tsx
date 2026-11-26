import { Link } from 'react-router-dom';
import type { ProblemEntry } from '@/data/problems/types';
import { TAG_BY_SLUG } from '@/data/tags/tags';
import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { RatingPill } from './RatingPill';
import { CheckCircle2 } from 'lucide-react';
import { useAccount } from '@/lib/account';
import { problemKey } from '@/lib/cf';
import { CFS } from '@/i18n/cfStrings';

export function ProblemRow({ p, featured }: { p: ProblemEntry; featured?: boolean; index?: number }) {
  const { t, num } = useI18n();
  const { solved } = useAccount();
  const done = solved.has(problemKey(p));
  return (
    <li className="border-b border-seam/70">
      <Link
        to={`/problems/${p.id}`}
        className="group relative grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 py-4 transition-colors hover:bg-iron/40 sm:grid-cols-[5rem_1fr_auto_auto]"
      >
        <span className="pl-2 font-mono text-sm text-slate transition-colors group-hover:text-ember">
          <span className="absolute inset-y-3 left-0 w-0.5 origin-center scale-y-0 rounded-full bg-ember transition-transform duration-300 ease-[var(--ease-forge)] group-hover:scale-y-100" aria-hidden="true" />
          {p.id}
        </span>
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-display text-lg font-semibold group-hover:text-ember">{p.name}</span>
            {done && (
              <span className="inline-flex items-center gap-1 text-sm text-[#56d364]">
                <CheckCircle2 size={15} />
                <span className="sr-only sm:not-sr-only">{t(CFS.track.solved)}</span>
              </span>
            )}
            {featured && (
              <span className="rounded-full bg-ember/15 px-2 py-0.5 text-xs text-ember">{t(S.problems.featured)}</span>
            )}
          </span>
          <span className="mt-0.5 block truncate text-sm text-slate">
            {p.tags.map((s) => t(TAG_BY_SLUG[s].name)).join(', ')}
          </span>
        </span>
        <span className="hidden text-sm text-slate tabular-nums sm:block">
          {num(p.solutions.length)} {t(S.problems.solutions)}
        </span>
        <RatingPill rating={p.rating} className="mr-2" />
      </Link>
    </li>
  );
}
