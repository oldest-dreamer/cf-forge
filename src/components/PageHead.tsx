import type { ReactNode } from 'react';
import { useEffect } from 'react';

export function PageHead({ title, lede, children }: { title: string; lede?: string; children?: ReactNode }) {
  useEffect(() => {
    document.title = `${title} · CF Forge`;
  }, [title]);
  return (
    <header className="pt-12 sm:pt-16">
      <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
      {lede && <p className="mt-4 max-w-[62ch] text-lg text-ash/80">{lede}</p>}
      {children}
    </header>
  );
}
