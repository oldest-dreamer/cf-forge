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
import { SpotlightCard } from '@/components/fx/SpotlightCard';
import { UI } from '@/i18n/uiStrings';
import { ArrowRight } from 'lucide-react';
import { JellyRadio } from '@/components/fx/JellyRadio';

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
        <JellyRadio<TagGroup | 'all'>
          role="tablist"
          label={t(S.tags.title)}
          value={group}
          onChange={setGroup}
          className="flex flex-wrap gap-1.5"
          itemClassName="rounded-full px-3.5 py-1.5 text-sm"
          idleText="text-slate ring-1 ring-seam hover:text-ash"
          options={chips.map((g) => {
            const on = g === group;
            const count = g === 'all' ? TAGS.length : TAGS.filter((x) => x.group === g).length;
            return {
              id: g,
              label: (
                <>
                  {g === 'all' ? t(S.tags.all) : t(S.tags.groups[g])}
                  <span className={cn('ml-1.5 tabular-nums', on ? 'text-steel/70' : 'text-slate/70')}>{num(count)}</span>
                </>
              ),
            };
          })}
        />
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

      <motion.ul layout className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {list.map((tag, i) => {
            const count = problemsForTag(tag.slug).length;
            return (
              <motion.li
                key={tag.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: Math.min(i, 10) * 0.04 }}
              >
                <SpotlightCard as={Link} to={`/tags/${tag.slug}`} className="group flex h-full flex-col rounded-2xl p-5">
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-display text-lg font-semibold transition-colors group-hover:text-ember">{t(tag.name)}</span>
                    {count > 0 && (
                      <span className="shrink-0 rounded-full bg-ember/12 px-2.5 py-0.5 text-xs tabular-nums text-ember">
                        {num(count)} {t(UI.tags.problems)}
                      </span>
                    )}
                  </span>
                  <span className="mt-1.5 block text-[0.95rem] text-ash/70">{t(tag.blurb)}</span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm text-slate transition-colors group-hover:text-ember">
                    {t(UI.tags.open)}
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </SpotlightCard>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
      {list.length === 0 && <p className="mt-8 text-slate">{t(S.tags.noMatch)}</p>}
    </div>
  );
}
