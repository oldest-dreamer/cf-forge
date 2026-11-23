import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { S } from '@/i18n/strings';
import { cn } from '@/lib/cn';
import { Logo } from './Logo';
import { LangToggle } from './LangToggle';
import { UserMenu } from './UserMenu';

const LINKS = [
  { to: '/contests', label: S.nav.contests },
  { to: '/tags', label: S.nav.tags },
  { to: '/problems', label: S.nav.problems },
  { to: '/learn', label: S.nav.learn },
];

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-seam/60 bg-steel/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5">
        <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight">
          <Logo className="size-7" />
          {t(S.brand)}
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Main">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  'relative rounded-lg px-3 py-1.5 text-[0.95rem] transition-colors duration-200',
                  isActive ? 'text-ash' : 'text-slate hover:text-ash',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {t(l.label)}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-ember"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <LangToggle />
          <UserMenu />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg text-slate hover:bg-iron hover:text-ash md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={t(open ? S.close : S.menu)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-seam/60 md:hidden"
            aria-label="Main"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      cn('block rounded-lg px-3 py-2.5', isActive ? 'bg-iron text-ash' : 'text-slate')
                    }
                  >
                    {t(l.label)}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
