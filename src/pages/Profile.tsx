import { useEffect, useId, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { authClient } from '@/lib/auth';
import { api, HANDLE_RE, type Profile as ProfileT } from '@/lib/api';
import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { LANGS, type Lang } from '@/i18n/types';
import { PageHead } from '@/components/PageHead';
import { Avatar } from '@/components/UserMenu';
import { cn } from '@/lib/cn';

const inputCls =
  'w-full rounded-xl border border-seam bg-steel/70 px-3.5 py-2.5 text-ash placeholder:text-slate/60 transition-colors focus:border-ember/70 focus:outline-none disabled:opacity-60 aria-[invalid=true]:border-[#ff8a80]/70';

export default function Profile() {
  const { t, lang, setLang } = useI18n();
  const { data } = authClient.useSession();
  const user = data?.user;
  const ids = useId();

  const [loaded, setLoaded] = useState(false);
  const [offline, setOffline] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [handle, setHandle] = useState('');
  const [prefLang, setPrefLang] = useState<Lang>(lang);
  const [handleErr, setHandleErr] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    let alive = true;
    api<{ profile: ProfileT }>('/api/profile')
      .then(({ profile }) => {
        if (!alive) return;
        if (profile.displayName) setName(profile.displayName);
        setHandle(profile.cfHandle ?? '');
        if (profile.lang) setPrefLang(profile.lang);
      })
      .catch(() => alive && setOffline(true))
      .finally(() => alive && setLoaded(true));
    return () => {
      alive = false;
    };
  }, []);

  async function onSave(e: FormEvent) {
    e.preventDefault();
    const h = handle.trim();
    if (h && !HANDLE_RE.test(h)) {
      setHandleErr(true);
      return;
    }
    setHandleErr(false);
    setStatus('saving');
    try {
      await api('/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ displayName: name, cfHandle: h, lang: prefLang }),
      });
      setLang(prefLang);
      setOffline(false);
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2200);
    } catch {
      setStatus('error');
    }
  }

  if (!user) return null;
  const joined = user.createdAt ? new Date(user.createdAt) : null;

  return (
    <div className="mx-auto max-w-6xl px-5">
      <PageHead title={t(S.profile.title)} lede={t(S.profile.lede)} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[18rem_1fr]">
        <motion.aside
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-fit rounded-2xl border border-seam bg-iron/60 p-6"
        >
          <Avatar name={user.name || user.email} image={user.image} size={72} />
          <p className="mt-4 font-display text-xl font-semibold">{name || user.name}</p>
          <p className="text-sm text-slate">{user.email}</p>
          {joined && (
            <p className="mt-4 text-sm text-slate">
              {t(S.profile.joined)}{' '}
              {joined.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
        </motion.aside>

        <form onSubmit={onSave} className="max-w-xl space-y-6" noValidate>
          <AnimatePresence>
            {loaded && offline && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl border border-seam bg-iron px-4 py-3 text-sm text-slate"
              >
                {t(S.profile.loadError)}
              </motion.p>
            )}
          </AnimatePresence>

          <div>
            <label htmlFor={`${ids}-name`} className="mb-1.5 block text-sm text-ash/85">
              {t(S.profile.name)}
            </label>
            <input id={`${ids}-name`} value={name} maxLength={60} onChange={(e) => setName(e.target.value)} className={inputCls} />
          </div>

          <div>
            <label htmlFor={`${ids}-handle`} className="mb-1.5 block text-sm text-ash/85">
              {t(S.profile.handle)}
            </label>
            <input
              id={`${ids}-handle`}
              value={handle}
              onChange={(e) => {
                setHandle(e.target.value);
                setHandleErr(false);
              }}
              placeholder={t(S.profile.handlePlaceholder)}
              autoComplete="off"
              spellCheck={false}
              aria-invalid={handleErr}
              aria-describedby={`${ids}-handle-msg`}
              className={cn(inputCls, 'font-mono')}
            />
            <p id={`${ids}-handle-msg`} className={cn('mt-1.5 text-sm', handleErr ? 'text-[#ff8a80]' : 'text-slate')}>
              {t(handleErr ? S.profile.handleInvalid : S.profile.handleHint)}
            </p>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm text-ash/85">{t(S.profile.language)}</legend>
            <div className="flex gap-2">
              {LANGS.map((l) => (
                <label
                  key={l.id}
                  className={cn(
                    'cursor-pointer rounded-xl px-4 py-2 ring-1 transition-colors',
                    prefLang === l.id ? 'bg-ember/15 text-ember ring-ember/50' : 'text-slate ring-seam hover:text-ash',
                  )}
                >
                  <input
                    type="radio"
                    name="lang"
                    value={l.id}
                    checked={prefLang === l.id}
                    onChange={() => setPrefLang(l.id)}
                    className="sr-only"
                  />
                  {l.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === 'saving'}
              className="inline-flex items-center gap-2 rounded-xl bg-ember px-5 py-2.5 font-medium text-steel transition-[transform,background-color] hover:bg-[#f5b46a] active:scale-[0.98] disabled:opacity-70"
            >
              {status === 'saving' && <Loader2 size={17} className="animate-spin" />}
              {t(status === 'saving' ? S.profile.saving : S.profile.save)}
            </button>
            <AnimatePresence mode="wait">
              {status === 'saved' && (
                <motion.span
                  key="ok"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-1.5 text-sm text-r-pupil"
                  role="status"
                >
                  <CheckCircle2 size={16} /> {t(S.profile.saved)}
                </motion.span>
              )}
              {status === 'error' && (
                <motion.span key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-[#ff8a80]" role="alert">
                  {t(S.profile.saveError)}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  );
}
