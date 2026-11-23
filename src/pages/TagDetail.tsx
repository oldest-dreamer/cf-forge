import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { TAG_BY_SLUG, cfTagUrl } from '@/data/tags/tags';
import { featuredForTag, problemsForTag } from '@/data/problems';
import { PageHead } from '@/components/PageHead';
import { ProblemRow } from '@/components/ProblemRow';
import NotFound from './NotFound';

export default function TagDetail() {
  const { slug = '' } = useParams();
  const { t } = useI18n();
  const tag = TAG_BY_SLUG[slug];
  if (!tag) return <NotFound />;

  const featured = featuredForTag(tag.slug);
  const rest = problemsForTag(tag.slug).filter((p) => !featured.includes(p));

  return (
    <div className="mx-auto max-w-6xl px-5">
      <Link to="/tags" className="mt-8 inline-flex items-center gap-1.5 text-sm text-slate hover:text-ash">
        <ArrowLeft size={15} /> {t(S.tags.back)}
      </Link>
      <PageHead title={t(tag.name)} lede={t(tag.blurb)}>
        <a
          href={cfTagUrl(tag)}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-slate underline decoration-seam underline-offset-4 hover:text-ash"
        >
          {t(S.tags.openOnCf)} <ExternalLink size={13} />
        </a>
      </PageHead>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">{t(S.tags.signals)}</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {tag.signals.map((s, i) => (
            <li key={i} className="rounded-xl border border-seam bg-iron/50 p-5 text-ash/85">
              {t(s)}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold">{t(S.tags.problemsHere)}</h2>
        {featured.length + rest.length === 0 ? (
          <p className="mt-4 text-slate">{t(S.tags.emptyProblems)}</p>
        ) : (
          <ul className="mt-4 border-t border-seam/70">
            {featured.map((p) => (
              <ProblemRow key={p.id} p={p} featured />
            ))}
            {rest.map((p) => (
              <ProblemRow key={p.id} p={p} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
