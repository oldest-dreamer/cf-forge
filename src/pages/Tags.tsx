import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Search } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { TAGS, TAG_GROUPS, type TagGroup } from '@/data/tags/tags';
import { problemsForTag } from '@/data/problems';
import { PageHead } from '@/components/PageHead';
import { cn } from '@/lib/cn';

export default function Tags() {
  const { t, num } = useI18n();
  const [group, setGroup] = useState<TagGroup | 'all'>('all');
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return TAGS.filter((tag) => {
      if (group !== 'all' && tag.group !== group) return false;
      if (!needle) return true;
      return [tag.name.en, tag.name.bn, tag.cf].some((s) => s.toLowerCase().includes(needle));
    });
  }, [group, q]);

  const chips: (TagGroup | 'all')[] = ['all', ...TAG_GROUPS];

  return (
    <div className="mx-auto max-w-6xl px-5">
      <PageHead title={t(S.tags.title)} lede={t(S.tags.lede)} />

      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
        <div role="tablist" aria-label={t(S.tags.title)} className="flex flex-wrap gap-1.5">
          {chips.map((g) => {
            const on = g === group;
            const count = g === 'all' ? TAGS.length : TAGS.filter((x) => x.group === g).length;
            return (
              <button
                key={g}
                role="tab"
                aria-selected={on}
                onClick={() => setGroup(g)}
                className={cn(
                  'relative rounded-full px-3.5 py-1.5 text-sm transition-colors',
                  on ? 'text-steel' : 'text-slate ring-1 ring-seam hover:text-ash',
                )}
              >
                {on && (
                  <motion.span
                    layoutId="tag-group"
                    className="absolute inset-0 -z-10 rounded-full bg-ember"
                    transition={{ type: 'spring', stiffness: 460, damping: 36 }}
                  />
                )}
                {g === 'all' ? t(S.tags.all) : t(S.tags.groups[g])}
                <span className={cn('ml-1.5 tabular-nums', on ? 'text-steel/70' : 'text-slate/70')}>{num(count)}</span>
              </button>
            );
          })}
        </div>
        <label className="relative md:ml-auto md:w-64">
          <span className="sr-only">{t(S.tags.search)}</span>
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t(S.tags.search)}
            className="w-full rounded-xl border border-seam bg-iron py-2 pl-9 pr-3 text-[0.95rem] placeholder:text-slate/70 focus:border-ember/60 focus:outline-none"
          />
        </label>
      </div>

      <motion.ul layout className="mt-8 grid gap-x-10 border-t border-seam/70 md:grid-cols-2">
        <AnimatePresence initial={false}>
          {list.map((tag) => {
            const count = problemsForTag(tag.slug).length;
            return (
              <motion.li
                key={tag.slug}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="border-b border-seam/70"
              >
                <Link to={`/tags/${tag.slug}`} className="group flex gap-4 py-4">
                  <span className="mt-1.5 h-4 w-0.5 shrink-0 rounded-full bg-seam transition-[background-color,height] duration-200 group-hover:h-6 group-hover:bg-ember" />
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-2">
                      <span className="font-display text-lg font-semibold group-hover:text-ember">{t(tag.name)}</span>
                      {count > 0 && <span className="text-sm text-slate tabular-nums">{num(count)}</span>}
                    </span>
                    <span className="mt-0.5 block text-[0.95rem] text-ash/70">{t(tag.blurb)}</span>
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
      {list.length === 0 && <p className="mt-8 text-slate">{t(S.tags.noMatch)}</p>}
    </div>
  );
}
