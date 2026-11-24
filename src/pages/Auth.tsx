import { useEffect, useId, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { authClient, safeNext } from '@/lib/auth';
import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import type { L } from '@/i18n/types';
import { Logo } from '@/components/Logo';
import { LangToggle } from '@/components/LangToggle';
import { JellyRadio } from '@/components/fx/JellyRadio';
import { LiveCode } from '@/components/fx/LiveCode';
import { ShinyText } from '@/components/fx/ShinyText';
import { FX } from '@/i18n/fxStrings';
import { cn } from '@/lib/cn';

type Mode = 'signin' | 'signup';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Turn any auth failure into one of our own, translatable messages. */
function toMessage(err: unknown): L {
  const e = (err ?? {}) as { code?: string; message?: string; status?: number; error?: { code?: string } };
  const code = `${e.code ?? e.error?.code ?? ''} ${e.message ?? ''}`.toUpperCase();
  if (code.includes('INVALID_EMAIL_OR_PASSWORD') || code.includes('INVALID EMAIL OR PASSWORD') || e.status === 401)
    return S.auth.errors.wrongCredentials;
  if (code.includes('ALREADY_EXISTS') || code.includes('ALREADY EXISTS') || e.status === 422) return S.auth.errors.emailTaken;
  if (code.includes('PASSWORD_TOO_SHORT')) return S.auth.errors.passwordShort;
  if (code.includes('INVALID_EMAIL')) return S.auth.errors.emailInvalid;
  if (err instanceof TypeError || code.includes('FAILED TO FETCH') || code.includes('NETWORK')) return S.auth.errors.network;
  return S.auth.errors.generic;
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function Field({
  label,
  error,
  hint,
  children,
  id,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  id: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-ash/85">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false} mode="wait">
        {error ? (
          <motion.p
            key="err"
            id={`${id}-msg`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-sm text-[#ff8a80]"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <motion.p key="hint" id={`${id}-msg`} className="mt-1.5 text-sm text-slate" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {hint}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const inputCls =
  'w-full rounded-xl border border-seam bg-steel/70 px-3.5 py-2.5 text-ash placeholder:text-slate/60 transition-colors focus:border-ember/70 focus:outline-none aria-[invalid=true]:border-[#ff8a80]/70';

export default function Auth({ mode }: { mode: Mode }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const next = safeNext(params.get('next'));
  const ids = useId();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState<'email' | 'google' | null>(null);
  const [fieldErr, setFieldErr] = useState<{ name?: L; email?: L; password?: L }>({});
  const [formErr, setFormErr] = useState<L | null>(params.get('error') ? S.auth.errors.google : null);

  const isUp = mode === 'signup';

  useEffect(() => {
    document.title = `${t(isUp ? S.auth.signUpTab : S.auth.signInTab)} · CF Forge`;
  }, [isUp, t]);

  useEffect(() => {
    setFieldErr({});
    setFormErr(null);
  }, [mode]);

  function validate() {
    const e: typeof fieldErr = {};
    if (isUp && !name.trim()) e.name = S.auth.errors.nameRequired;
    if (!EMAIL_RE.test(email.trim())) e.email = S.auth.errors.emailInvalid;
    if (password.length < 8) e.password = S.auth.errors.passwordShort;
    setFieldErr(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    setFormErr(null);
    if (!validate()) return;
    setBusy('email');
    try {
      const res = isUp
        ? await authClient.signUp.email({ name: name.trim(), email: email.trim(), password })
        : await authClient.signIn.email({ email: email.trim(), password });
      if (res.error) {
        setFormErr(toMessage(res.error));
        return;
      }
      navigate(next, { replace: true });
    } catch (err) {
      setFormErr(toMessage(err));
    } finally {
      setBusy(null);
    }
  }

  async function onGoogle() {
    setFormErr(null);
    setBusy('google');
    try {
      const origin = window.location.origin;
      const res = await authClient.signIn.social({
        provider: 'google',
        callbackURL: `${origin}${next}`,
        errorCallbackURL: `${origin}/login?error=google&next=${encodeURIComponent(next)}`,
      });
      if (res?.error) {
        setFormErr(toMessage(res.error));
        setBusy(null);
      }
      // On success the browser leaves for Google.
    } catch (err) {
      setFormErr(toMessage(err));
      setBusy(null);
    }
  }

  const switchTo = isUp ? '/login' : '/signup';

  return (
    <div className="grain flex min-h-dvh">
      {/* Form column */}
      <div className="flex w-full flex-col px-5 py-6 lg:w-[30rem] lg:shrink-0 lg:border-r lg:border-seam/60 lg:px-12">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2.5 font-display text-lg font-semibold">
            <Logo className="size-7" />
            CF Forge
          </span>
          <LangToggle />
        </div>

        <div className="my-auto py-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.h1
              key={mode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="text-3xl font-bold sm:text-[2.1rem]"
            >
              {t(isUp ? S.auth.signUpTitle : S.auth.signInTitle)}
            </motion.h1>
          </AnimatePresence>

          <JellyRadio<Mode>
            role="tablist"
            label={t(isUp ? S.auth.signUpTitle : S.auth.signInTitle)}
            value={mode}
            onChange={(m) => navigate(`${m === 'signin' ? '/login' : '/signup'}${location.search}`, { replace: true })}
            options={[
              { id: 'signin', label: t(S.auth.signInTab) },
              { id: 'signup', label: t(S.auth.signUpTab) },
            ]}
            className="mt-7 grid grid-cols-2 rounded-xl bg-iron p-1 text-sm"
            itemClassName="rounded-lg py-2 text-center"
            pillClassName="rounded-lg bg-iron-2 ring-1 ring-seam"
            activeText="text-ash"
          />

          <button
            type="button"
            onClick={onGoogle}
            disabled={busy !== null}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-ash px-4 py-3 font-medium text-steel transition-[transform,background-color] duration-200 hover:bg-white active:scale-[0.99] disabled:opacity-70"
          >
            {busy === 'google' ? <Loader2 size={18} className="animate-spin" /> : <GoogleMark />}
            {t(busy === 'google' ? S.auth.redirecting : S.auth.google)}
          </button>

          <div className="my-6 flex items-center gap-3 text-sm text-slate">
            <span className="h-px flex-1 bg-seam" />
            {t(S.auth.or)}
            <span className="h-px flex-1 bg-seam" />
          </div>

          <form onSubmit={onSubmit} noValidate className="space-y-4">
            <AnimatePresence initial={false}>
              {isUp && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <Field id={`${ids}-name`} label={t(S.auth.name)} error={fieldErr.name && t(fieldErr.name)}>
                    <input
                      id={`${ids}-name`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      aria-invalid={!!fieldErr.name}
                      aria-describedby={`${ids}-name-msg`}
                      className={inputCls}
                    />
                  </Field>
                </motion.div>
              )}
            </AnimatePresence>

            <Field id={`${ids}-email`} label={t(S.auth.email)} error={fieldErr.email && t(fieldErr.email)}>
              <input
                id={`${ids}-email`}
                type="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                aria-invalid={!!fieldErr.email}
                aria-describedby={`${ids}-email-msg`}
                className={inputCls}
              />
            </Field>

            <Field
              id={`${ids}-pw`}
              label={t(S.auth.password)}
              error={fieldErr.password && t(fieldErr.password)}
              hint={isUp ? t(S.auth.passwordHint) : undefined}
            >
              <div className="relative">
                <input
                  id={`${ids}-pw`}
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={isUp ? 'new-password' : 'current-password'}
                  aria-invalid={!!fieldErr.password}
                  aria-describedby={`${ids}-pw-msg`}
                  className={cn(inputCls, 'pr-11')}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-slate hover:text-ash"
                  aria-label={t(showPw ? S.auth.hide : S.auth.show)}
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </Field>

            <AnimatePresence>
              {formErr && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0, x: [0, -5, 5, -3, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-xl border border-[#ff8a80]/40 bg-[#ff8a80]/10 px-3.5 py-2.5 text-sm text-[#ffb4ab]"
                >
                  {t(formErr)}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={busy !== null}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-ember px-4 py-3 font-medium text-steel transition-[transform,background-color] duration-200 hover:bg-[#f5b46a] active:scale-[0.99] disabled:opacity-70"
            >
              {busy === 'email' && <Loader2 size={18} className="animate-spin" />}
              {t(busy === 'email' ? S.auth.working : isUp ? S.auth.signUpCta : S.auth.signInCta)}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate">
            {t(isUp ? S.auth.haveAccount : S.auth.noAccount)}{' '}
            <Link to={`${switchTo}${location.search}`} replace className="font-medium text-ember hover:underline">
              {t(isUp ? S.auth.signInTab : S.auth.signUpTab)}
            </Link>
          </p>
        </div>
      </div>

      {/* Brand column: a C++ editor that writes, compiles and passes on its own */}
      <div className="relative hidden flex-1 items-center overflow-hidden px-10 xl:px-16 lg:flex">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-1/2 size-[42rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(240,160,75,0.14),transparent)]"
        />
        <div className="relative mx-auto w-full max-w-2xl">
          <h2 className="text-[2.1rem] font-bold leading-[1.1] xl:text-[2.6rem]">
            <ShinyText variant="chrome" speed={6}>
              {t(FX.live.headline)}
            </ShinyText>
          </h2>
          <p className="mt-3 max-w-[52ch] text-ash/80">{t(S.auth.pitch)}</p>
          <motion.div
            initial={{ opacity: 0, y: 24, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 1200 }}
            className="mt-6"
          >
            <LiveCode />
          </motion.div>
          <p className="mt-3 text-sm text-slate">{t(FX.live.caption)}</p>
        </div>
      </div>
    </div>
  );
}
