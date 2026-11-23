import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { L, Lang } from './types';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Pick the current-language text from a bilingual value. */
  t: (v: L) => string;
  /** Format a number in the current language's digits. */
  num: (n: number) => string;
};

const I18nContext = createContext<Ctx | null>(null);
const KEY = 'cf-forge:lang';

function readStored(): Lang {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'en' || v === 'bn') return v;
  } catch {
    /* storage unavailable */
  }
  return navigator.language?.toLowerCase().startsWith('bn') ? 'bn' : 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStored);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(() => setLangState((l) => (l === 'en' ? 'bn' : 'en')), []);

  const value = useMemo<Ctx>(() => {
    const fmt = new Intl.NumberFormat(lang === 'bn' ? 'bn-BD' : 'en-US');
    return {
      lang,
      setLang,
      toggle,
      t: (v) => v[lang] || v.en,
      num: (n) => fmt.format(n),
    };
  }, [lang, setLang, toggle]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
