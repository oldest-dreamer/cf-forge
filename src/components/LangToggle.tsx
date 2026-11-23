import { motion } from 'motion/react';
import { useI18n } from '@/i18n/I18nProvider';
import { LANGS } from '@/i18n/types';
import { S } from '@/i18n/strings';
import { cn } from '@/lib/cn';

export function LangToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <div
      role="radiogroup"
      aria-label={t(S.langToggle)}
      className="relative flex rounded-full border border-seam bg-iron p-0.5 text-sm"
    >
      {LANGS.map((l) => {
        const active = l.id === lang;
        return (
          <button
            key={l.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setLang(l.id)}
            className={cn(
              'relative z-10 rounded-full px-3 py-1 transition-colors duration-200',
              active ? 'text-steel' : 'text-slate hover:text-ash',
              l.id === 'bn' && 'font-sans',
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-ember"
                transition={{ type: 'spring', stiffness: 500, damping: 36 }}
              />
            )}
            {l.short}
          </button>
        );
      })}
    </div>
  );
}
