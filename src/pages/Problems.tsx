import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { PROBLEMS } from '@/data/problems';
import { PageHead } from '@/components/PageHead';
import { ProblemRow } from '@/components/ProblemRow';

export default function Problems() {
  const { t } = useI18n();
  const list = [...PROBLEMS].sort((a, b) => a.rating - b.rating || a.contestId - b.contestId);
  return (
    <div className="mx-auto max-w-6xl px-5">
      <PageHead title={t(S.problems.title)} lede={t(S.problems.lede)} />
      <p className="mt-10 text-sm text-slate">{t(S.problems.sortRating)}</p>
      <ul className="mt-3 border-t border-seam/70">
        {list.map((p) => (
          <ProblemRow key={p.id} p={p} featured={!!p.featuredFor?.length} />
        ))}
      </ul>
    </div>
  );
}
