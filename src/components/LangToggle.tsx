import { useI18n } from '@/i18n/I18nProvider';
import { LANGS, type Lang } from '@/i18n/types';
import { S } from '@/i18n/strings';
import { JellyRadio } from './fx/JellyRadio';

export function LangToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <JellyRadio<Lang>
      label={t(S.langToggle)}
      value={lang}
      onChange={setLang}
      options={LANGS.map((l) => ({ id: l.id, label: l.short, className: l.id === 'bn' ? 'font-sans' : undefined }))}
      className="flex rounded-full border border-seam bg-iron p-0.5 text-sm"
      itemClassName="rounded-full px-3 py-1"
    />
  );
}
