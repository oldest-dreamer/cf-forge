import { useEffect, useRef, useState } from 'react';
import { Highlight } from 'prism-react-renderer';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, Terminal } from 'lucide-react';
import { forgeTheme } from '@/components/CodeBlock';
import { useI18n } from '@/i18n/I18nProvider';
import { FX } from '@/i18n/fxStrings';
import { TAG_BY_SLUG } from '@/data/tags/tags';
import { cn } from '@/lib/cn';

type Snippet = { tag: string; code: string; input: string; output: string; ms: number };

/* Three small, real programs. Each one was compiled and run on its sample before going here. */
const SNIPPETS: Snippet[] = [
  { tag: 'two-pointers', ms: 31, input: '7 10\n2 3 1 4 5 1 2', output: '4', code: String.raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; long long s;
    cin >> n >> s;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    long long sum = 0; int best = 0;
    for (int l = 0, r = 0; r < n; r++) {
        sum += a[r];
        while (sum > s) sum -= a[l++];
        best = max(best, r - l + 1);
    }
    cout << best << "\n";
}
` },
  { tag: 'graphs', ms: 46, input: '5 5\n1 2\n2 3\n3 5\n1 4\n4 5', output: '2', code: String.raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> g(n + 1);
    while (m--) {
        int u, v; cin >> u >> v;
        g[u].push_back(v), g[v].push_back(u);
    }
    vector<int> d(n + 1, -1);
    queue<int> q; q.push(1); d[1] = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : g[u])
            if (d[v] < 0) d[v] = d[u] + 1, q.push(v);
    }
    cout << d[n] << "\n";
}
` },
  { tag: 'dp', ms: 15, input: '3 11\n1 5 7', output: '3', code: String.raw`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, x;
    cin >> n >> x;
    vector<int> c(n);
    for (int &v : c) cin >> v;
    const int INF = 1e9;
    vector<int> dp(x + 1, INF);
    dp[0] = 0;
    for (int s = 1; s <= x; s++)
        for (int v : c)
            if (v <= s) dp[s] = min(dp[s], dp[s - v] + 1);
    cout << (dp[x] == INF ? -1 : dp[x]) << "\n";
}
` },
];

type Phase = 'type' | 'build' | 'run' | 'done';
const LINES = Math.max(...SNIPPETS.map((s) => s.code.split('\n').length));

/**
 * A C++ editor that writes itself: the code types out with highlighting and a caret,
 * then a terminal compiles it, runs the sample and shows the verdict. Then the next one.
 */
export function LiveCode({ className }: { className?: string }) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [len, setLen] = useState(0);
  const [phase, setPhase] = useState<Phase>('type');
  const timer = useRef<number>(0);
  const snip = SNIPPETS[idx];
  const code = snip.code.replace(/\n$/, '');

  useEffect(() => {
    if (reduce) {
      setLen(code.length);
      setPhase('done');
      return;
    }
    const later = (fn: () => void, ms: number) => {
      timer.current = window.setTimeout(fn, ms);
    };
    if (phase === 'type') {
      if (len >= code.length) {
        later(() => setPhase('build'), 450);
        return;
      }
      let next = len + 1;
      // Indentation appears at once, like an editor auto-indenting.
      if (code[len] === '\n') while (code[next] === ' ') next++;
      const ch = code[len];
      const delay = ch === '\n' ? 110 : ch === ' ' ? 18 : 16 + Math.random() * 34;
      later(() => setLen(next), delay);
    } else if (phase === 'build') later(() => setPhase('run'), 900);
    else if (phase === 'run') later(() => setPhase('done'), 700);
    else
      later(() => {
        setIdx((i) => (i + 1) % SNIPPETS.length);
        setLen(0);
        setPhase('type');
      }, 3600);
    return () => window.clearTimeout(timer.current);
  }, [phase, len, code, reduce]);

  const typed = code.slice(0, len);
  const step = ['type', 'build', 'run', 'done'].indexOf(phase);

  return (
    <div aria-hidden="true" className={cn('overflow-hidden rounded-2xl border border-seam bg-[#141c28] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)]', className)}>
      <div className="flex items-center gap-3 border-b border-seam/80 bg-iron/60 px-4 py-2.5 text-xs">
        <span className="rounded-md bg-[#141c28] px-2.5 py-1 font-mono text-ash/90">{t(FX.live.file)}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={snip.tag}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="text-slate"
          >
            {t(TAG_BY_SLUG[snip.tag].name)}
          </motion.span>
        </AnimatePresence>
        <span className="ml-auto inline-flex items-center gap-1.5 text-slate">
          <span className="relative size-2 rounded-full bg-[#ff5f56]">
            {!reduce && <span className="absolute inset-0 animate-ping rounded-full bg-[#ff5f56]/70" />}
          </span>
          LIVE
        </span>
      </div>

      <Highlight code={typed || ' '} language="cpp" theme={forgeTheme}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre
            className="overflow-hidden py-3.5 pr-4 font-mono text-[0.75rem] leading-[1.55]"
            style={{ height: `calc(${LINES} * 1.55 * 0.75rem + 1.75rem)` }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="flex">
                <span className="w-12 shrink-0 select-none pr-4 text-right text-[#4d5b72] tabular-nums">{i + 1}</span>
                <span className="whitespace-pre">
                  {line.map((token, k) => (
                    <span key={k} {...getTokenProps({ token })} />
                  ))}
                  {i === tokens.length - 1 && phase === 'type' && <span className="live-caret" aria-hidden="true" />}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>

      <div className="border-t border-seam/80 bg-[#10161f] px-4 py-3 font-mono text-[0.75rem] leading-[1.7]">
        <div className="mb-1.5 flex items-center gap-1.5 text-slate">
          <Terminal size={13} /> {t(FX.live.terminal)}
        </div>
        <div className="h-[6.4rem]">
          {step >= 1 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-ash/80">
              <span className="text-ember">$</span> g++ -std=c++17 -O2 solution.cpp -o sol
              {phase === 'build' && <span className="live-caret" />}
            </motion.p>
          )}
          {step >= 2 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-ash/80">
              <span className="text-ember">$</span> ./sol &lt; sample.txt
            </motion.p>
          )}
          {step >= 3 && (
            <>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-ash">
                {snip.output}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, scale: 0.85, x: -6 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 460, damping: 20 }}
                className="mt-1.5 inline-flex origin-left items-center gap-2 rounded-lg bg-[#3fb950]/12 px-2.5 py-1 text-[#56d364] ring-1 ring-[#3fb950]/35"
              >
                <CheckCircle2 size={14} />
                <span className="font-semibold">{t(FX.live.accepted)}</span>
                <span className="text-[#56d364]/75">
                  1/1 {t(FX.live.tests)} · {snip.ms} ms
                </span>
              </motion.p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
