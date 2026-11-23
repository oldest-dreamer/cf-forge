import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { PageHead } from '@/components/PageHead';
import type { L } from '@/i18n/types';

const OUTLINE: L[] = [
  { en: 'Your first program: cin, cout and compiling', bn: 'প্রথম প্রোগ্রাম: cin, cout আর কম্পাইল করা' },
  { en: 'Variables, int vs long long, and overflow', bn: 'ভেরিয়েবল, int বনাম long long, আর ওভারফ্লো' },
  { en: 'if, loops and reading many test cases', bn: 'if, লুপ আর অনেক টেস্ট কেস পড়া' },
  { en: 'Arrays, vectors and strings', bn: 'অ্যারে, ভেক্টর আর স্ট্রিং' },
  { en: 'Functions and recursion', bn: 'ফাংশন আর রিকার্শন' },
  { en: 'sort, pair, and custom comparators', bn: 'sort, pair আর কাস্টম কম্পেয়ারেটর' },
  { en: 'set, map, priority_queue', bn: 'set, map, priority_queue' },
  { en: 'Complexity: will it run in time?', bn: 'কমপ্লেক্সিটি: সময়ের মধ্যে চলবে তো?' },
];

export default function Learn() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-6xl px-5">
      <PageHead title={t(S.learn.title)} lede={t(S.learn.lede)} />
      <ol className="mt-10 max-w-2xl divide-y divide-seam/70 border-y border-seam/70">
        {OUTLINE.map((o, i) => (
          <li key={i} className="flex gap-4 py-4 text-ash/85">
            <span className="w-6 text-slate tabular-nums">{i + 1}</span>
            {t(o)}
          </li>
        ))}
      </ol>
    </div>
  );
}
