import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { Logo } from './Logo';
import { Reveal } from './fx/Reveal';

export function Footer() {
  const { t } = useI18n();
  return (
    <Reveal as="footer" y={12} className="mt-24 border-t border-seam/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-slate sm:flex-row sm:items-start">
        <div className="flex items-center gap-2 font-display text-base text-ash">
          <Logo className="size-6" />
          {t(S.brand)}
        </div>
        <p className="max-w-[60ch] sm:ml-auto">{t(S.footer.note)}</p>
      </div>
    </Reveal>
  );
}
