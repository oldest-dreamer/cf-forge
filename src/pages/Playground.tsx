import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertTriangle, Clock3, Loader2, Play, XCircle } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { RUN } from '@/i18n/runStrings';
import { PageHead } from '@/components/PageHead';
import { CodeEditor } from '@/components/CodeEditor';
import { PhaseBar } from '@/components/RunPanel';
import { useCompiler } from '@/compiler/useCompiler';

const STARTER = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;

    sort(a.begin(), a.end());
    cout << "sum = " << accumulate(a.begin(), a.end(), 0LL) << "\\n";
    cout << "max = " << a.back() << "\\n";
    return 0;
}
`;

const KEY = 'cf-forge:playground';

function load(): { code: string; input: string } {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (v && typeof v.code === 'string') return v;
  } catch {
    /* ignore */
  }
  return { code: STARTER, input: '5\n3 9 1 7 4\n' };
}

export default function Playground() {
  const { t, num } = useI18n();
  const [{ code, input }, setState] = useState(load);
  const r = useCompiler();
  const busy = r.phase === 'downloading' || r.phase === 'compiling' || r.phase === 'running';
  const out = r.results[0];

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem(KEY, JSON.stringify({ code, input }));
      } catch {
        /* ignore */
      }
    }, 400);
    return () => clearTimeout(id);
  }, [code, input]);

  const go = () => r.runAll(code, [{ input: input.endsWith('\n') ? input : input + '\n' }], 5000);

  return (
    <div className="mx-auto max-w-6xl px-5">
      <PageHead title={t(RUN.playground.title)} lede={t(RUN.playground.lede)} />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="min-w-0">
          <CodeEditor value={code} onChange={(v) => setState((s) => ({ ...s, code: v }))} onRun={go} minRows={22} label="C++" />
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={go}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-xl bg-ember px-5 py-2.5 font-medium text-steel transition-[transform,background-color] hover:bg-[#f5b46a] active:scale-[0.98] disabled:opacity-70"
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
              {t(RUN.playground.run)}
            </button>
            <span className="text-sm text-slate">{t(RUN.playground.shortcut)}</span>
          </div>
          <AnimatePresence>
            <PhaseBar phase={r.phase} progress={r.progress} />
          </AnimatePresence>
        </div>

        <div className="min-w-0 space-y-5">
          <label className="block text-sm text-ash/85">
            {t(RUN.customInput)}
            <textarea
              value={input}
              onChange={(e) => setState((s) => ({ ...s, input: e.target.value }))}
              rows={7}
              spellCheck={false}
              className="mt-1.5 w-full resize-y rounded-xl border border-seam bg-[#141c28] px-3.5 py-2.5 font-mono text-[0.86rem] text-ash outline-none focus:border-ember/60"
            />
          </label>

          <div>
            <div className="mb-1.5 flex items-center gap-2 text-sm text-ash/85">
              {t(RUN.output)}
              {out && (
                <span className="ml-auto text-slate tabular-nums">
                  {num(out.ms)} {t(RUN.ms)}
                </span>
              )}
            </div>
            <motion.pre
              key={out ? out.ms + out.stdout.length : 'empty'}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              className="min-h-40 max-h-96 overflow-auto rounded-xl border border-seam bg-[#141c28] px-3.5 py-3 font-mono text-[0.86rem] leading-relaxed text-ash"
            >
              {r.compileError ? (
                <span className="text-[#ffb4ab]">
                  <span className="mb-2 flex items-center gap-1.5 font-sans text-[#ff7b72]">
                    <XCircle size={15} /> {r.compileError.kind === 'load' ? t(RUN.loadError) : t(RUN.compileError)}
                  </span>
                  {r.compileError.kind === 'compile' ? r.compileError.message : ''}
                </span>
              ) : out ? (
                <>
                  {out.verdict === 'tle' && (
                    <span className="mb-2 flex items-center gap-1.5 font-sans text-[#f0b54b]">
                      <Clock3 size={15} /> {t(RUN.tle)}
                    </span>
                  )}
                  {(out.verdict === 'rte' || out.verdict === 'ole') && (
                    <span className="mb-2 flex items-center gap-1.5 font-sans text-[#ff7b72]">
                      <AlertTriangle size={15} /> {t(out.verdict === 'rte' ? RUN.rte : RUN.ole)}
                      {out.exitCode > 0 && ` (${t(RUN.exitCode)} ${out.exitCode})`}
                    </span>
                  )}
                  {out.stdout}
                  {out.stderr && <span className="text-[#ffb4ab]">{'\n' + out.stderr}</span>}
                </>
              ) : (
                <span className="font-sans text-slate">{t(RUN.playground.empty)}</span>
              )}
            </motion.pre>
          </div>
          <p className="text-xs text-slate">{t(RUN.timingNote)}</p>
        </div>
      </div>
    </div>
  );
}
