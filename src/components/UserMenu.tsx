import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { LogOut, UserRound } from 'lucide-react';
import { authClient } from '@/lib/auth';
import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { useAccount } from '@/lib/account';
import { rankFor } from '@/lib/ranks';

export function Avatar({ name, image, size = 34 }: { name?: string | null; image?: string | null; size?: number }) {
  const [broken, setBroken] = useState(false);
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  if (image && !broken) {
    return (
      <img
        src={image}
        alt=""
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
        className="rounded-full object-cover ring-1 ring-seam"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="grid place-items-center rounded-full bg-ember/20 font-display font-semibold text-ember ring-1 ring-ember/40"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}

export function UserMenu() {
  const { t } = useI18n();
  const { data } = authClient.useSession();
  const navigate = useNavigate();
  const { cfUser } = useAccount();
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const user = data?.user;
  if (!user) return null;

  async function signOut() {
    setLeaving(true);
    try {
      await authClient.signOut();
    } finally {
      navigate('/login', { replace: true });
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={user.name || user.email}
        className="grid place-items-center rounded-full transition-transform hover:scale-105"
      >
        <Avatar name={user.name || user.email} image={user.image} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-12 z-50 w-64 origin-top-right overflow-hidden rounded-2xl border border-seam bg-iron shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-3 border-b border-seam/70 p-4">
              <Avatar name={user.name || user.email} image={user.image} size={40} />
              <div className="min-w-0">
                <p className="truncate font-medium">{user.name}</p>
                <p className="truncate text-sm text-slate">{user.email}</p>
                {cfUser && (
                  <p
                    className="truncate font-display text-sm font-semibold"
                    style={{ color: typeof cfUser.rating === 'number' ? rankFor(cfUser.rating).color : undefined }}
                  >
                    {cfUser.handle}
                  </p>
                )}
              </div>
            </div>
            <div className="p-1.5">
              <Link
                role="menuitem"
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-ash/90 hover:bg-iron-2"
              >
                <UserRound size={16} className="text-slate" /> {t(S.user.profile)}
              </Link>
              <button
                role="menuitem"
                type="button"
                onClick={signOut}
                disabled={leaving}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-ash/90 hover:bg-iron-2 disabled:opacity-60"
              >
                <LogOut size={16} className="text-slate" /> {t(leaving ? S.user.signingOut : S.user.signOut)}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
