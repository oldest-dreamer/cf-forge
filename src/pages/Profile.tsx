import { useEffect, useId, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { authClient } from '@/lib/auth';
import { api, HANDLE_RE, type Profile as ProfileT } from '@/lib/api';
import { useAccount } from '@/lib/account';
import { cf, CfError } from '@/lib/cf';
import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { CFS } from '@/i18n/cfStrings';
import { LANGS, type L, type Lang } from '@/i18n/types';
import { PageHead } from '@/components/PageHead';
import { Avatar } from '@/components/UserMenu';
import { CfDashboard } from '@/components/CfDashboard';
import { cn } from '@/lib/cn';

const inputCls =
  'w-full rounded-xl border border-seam bg-steel/70 px-3.5 py-2.5 text-ash placeholder:text-slate/60 transition-colors focus:border-ember/70 focus:outline-none disabled:opacity-60 aria-[invalid=true]:border-[#ff8a80]/70';

function Settings() {
  const { t, lang, setLang } = useI18n();
  const { profile, profileStatus, setProfile } = useAccount();
  const ids = useId();

  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [prefLang, setPrefLang] = useState<Lang>(lang);
  const [handleErr, setHandleErr] = useState<L | null>(null);
  const [status, setStatus] = useState<'idle' | 'checking' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    if (!profile) return;
    setName(profile.displayName ?? '');
    setHandle(profile.cfHandle ?? '');
    if (profile.lang) setPrefLang(profile.lang);
  }, [profile]);

  async function onSave(e: FormEvent) {
    e.preventDefault();
    let h = handle.trim();
    if (h && !HANDLE_RE.test(h)) return setHandleErr(S.profile.handleInvalid);
    setHandleErr(null);

    // Confirm the handle exists and use Codeforces' own spelling of it.
    if (h && h.toLowerCase() !== (profile?.cfHandle ?? '').toLowerCase()) {
      setStatus('checking');
      try {
        const u = await cf.user(h, true);
        h = u.handle;
        setHandle(h);
      } catch (err) {
        setStatus('idle');
        if (err instanceof CfError && err.kind === 'not_found') return setHandleErr(CFS.dash.handleNotFound);
        return setHandleErr(CFS.dash.error[err instanceof CfError ? err.kind : 'api']);
      }
    }

    setStatus('saving');
    try {
      const { profile: saved } = await api<{ profile: ProfileT }>('/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ displayName: name, cfHandle: h, lang: prefLang }),
      });
      setProfile(saved);
      setLang(prefLang);
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2200);
    } catch {
      setStatus('error');
    }
  }

  const busy = status === 'checking' || status === 'saving';

  return (
    <form onSubmit={onSave} className="space-y-5" noValidate>
      <h2 className="text-lg font-semibold">{t(CFS.dash.settings)}</h2>
      {profileStatus === 'error' && (
        <p className="rounded-xl border border-seam bg-iron px-4 py-3 text-sm text-slate">{t(S.profile.loadError)}</p>
      )}

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
            setHandleErr(null);
          }}
          placeholder={t(S.profile.handlePlaceholder)}
          autoComplete="off"
          spellCheck={false}
          aria-invalid={!!handleErr}
          aria-describedby={`${ids}-handle-msg`}
          className={cn(inputCls, 'font-mono')}
        />
        <p id={`${ids}-handle-msg`} className={cn('mt-1.5 text-sm', handleErr ? 'text-[#ff8a80]' : 'text-slate')}>
          {t(handleErr ?? S.profile.handleHint)}
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
              <input type="radio" name="lang" value={l.id} checked={prefLang === l.id} onChange={() => setPrefLang(l.id)} className="sr-only" />
              {l.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl bg-ember px-5 py-2.5 font-medium text-steel transition-[transform,background-color] hover:bg-[#f5b46a] active:scale-[0.98] disabled:opacity-70"
        >
          {busy && <Loader2 size={17} className="animate-spin" />}
          {t(status === 'checking' ? CFS.dash.checkingHandle : status === 'saving' ? S.profile.saving : S.profile.save)}
        </button>
        <AnimatePresence mode="wait">
          {status === 'saved' && (
            <motion.span key="ok" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-1.5 text-sm text-[#56d364]" role="status">
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
  );
}

export default function Profile() {
  const { t, lang } = useI18n();
  const { data } = authClient.useSession();
  const { profile } = useAccount();
  const user = data?.user;
  if (!user) return null;
  const joined = user.createdAt ? new Date(user.createdAt) : null;

  return (
    <div className="mx-auto max-w-6xl px-5">
      <PageHead title={t(S.profile.title)} lede={t(S.profile.lede)} />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          <CfDashboard />
        </div>

        <aside className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-seam bg-iron/60 p-5">
            <div className="flex items-center gap-3">
              <Avatar name={user.name || user.email} image={user.image} size={48} />
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-semibold">{profile?.displayName || user.name}</p>
                <p className="truncate text-sm text-slate">{user.email}</p>
              </div>
            </div>
            {joined && (
              <p className="mt-3 text-sm text-slate">
                {t(S.profile.joined)}{' '}
                {joined.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            )}
          </motion.div>
          <div className="rounded-2xl border border-seam bg-iron/40 p-5">
            <Settings />
          </div>
        </aside>
      </div>
    </div>
  );
}
