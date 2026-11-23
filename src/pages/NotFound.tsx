import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { PageHead } from '@/components/PageHead';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-6xl px-5">
      <PageHead title={t(S.notFound.title)} lede={t(S.notFound.body)} />
      <Link to="/" className="mt-8 inline-block rounded-xl bg-ember px-5 py-3 font-medium text-steel hover:bg-[#f5b46a]">
        {t(S.notFound.home)}
      </Link>
    </div>
  );
}
