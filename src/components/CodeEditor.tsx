import { useRef, type KeyboardEvent } from 'react';
import { cn } from '@/lib/cn';

/**
 * A light C++ editor: monospace textarea with line numbers,
 * Tab to indent, Enter keeps indentation, Ctrl/Cmd+Enter triggers onRun.
 */
export function CodeEditor({
  value,
  onChange,
  onRun,
  minRows = 14,
  className,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  onRun?: () => void;
  minRows?: number;
  className?: string;
  label: string;
}) {
  const ta = useRef<HTMLTextAreaElement>(null);
  const gutter = useRef<HTMLDivElement>(null);
  const lines = Math.max(minRows, value.split('\n').length);

  function edit(next: string, cursor: number) {
    onChange(next);
    requestAnimationFrame(() => {
      if (ta.current) ta.current.selectionStart = ta.current.selectionEnd = cursor;
    });
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget;
    const { selectionStart: s, selectionEnd: end } = el;
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun?.();
      return;
    }
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      edit(value.slice(0, s) + '    ' + value.slice(end), s + 4);
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      const lineStart = value.lastIndexOf('\n', s - 1) + 1;
      const indent = /^[ \t]*/.exec(value.slice(lineStart, s))?.[0] ?? '';
      const extra = value[s - 1] === '{' ? '    ' : '';
      const ins = '\n' + indent + extra;
      edit(value.slice(0, s) + ins + value.slice(end), s + ins.length);
    }
  }

  return (
    <div className={cn('relative flex overflow-hidden rounded-xl border border-seam bg-[#141c28] focus-within:border-ember/60', className)}>
      <div
        ref={gutter}
        aria-hidden="true"
        className="select-none overflow-hidden py-3.5 pl-4 pr-3 text-right font-mono text-[0.86rem] leading-[1.7] text-[#4d5b72] tabular-nums"
      >
        {Array.from({ length: lines }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <textarea
        ref={ta}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onScroll={(e) => {
          if (gutter.current) gutter.current.scrollTop = e.currentTarget.scrollTop;
        }}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        aria-label={label}
        rows={lines}
        className="min-w-0 flex-1 resize-none bg-transparent py-3.5 pr-4 font-mono text-[0.86rem] leading-[1.7] text-ash outline-none [tab-size:4] whitespace-pre"
        wrap="off"
      />
    </div>
  );
}
