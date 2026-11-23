import type { ReactNode } from 'react';
import { CodeBlock } from './CodeBlock';

/**
 * A small, safe Markdown renderer for tutor answers.
 * Builds React elements only (no HTML injection): fenced code, lists,
 * headings, paragraphs, `inline code`, **bold** and *italic*.
 */
/** Models sometimes write LaTeX math ($w$, $2 \\times 3$); show it as plain text. */
function plainMath(text: string) {
  return text
    .replace(/\$\$([^$]+)\$\$/g, '$1')
    .replace(/\$([^$\n]+)\$/g, '$1')
    .replace(/\\times/g, '×')
    .replace(/\\leq?(?![a-z])/g, '≤')
    .replace(/\\geq?(?![a-z])/g, '≥')
    .replace(/\\neq/g, '≠')
    .replace(/\\cdot/g, '·')
    .replace(/\\(text|mathrm|mathbf)\{([^}]*)\}/g, '$2');
}

function inline(raw: string, keyBase: string): ReactNode[] {
  const text = plainMath(raw);
  const out: ReactNode[] = [];
  const re = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const k = `${keyBase}-${i++}`;
    if (tok.startsWith('`')) out.push(<code key={k} className="inline-code">{tok.slice(1, -1)}</code>);
    else if (tok.startsWith('**')) out.push(<strong key={k} className="font-semibold text-ash">{tok.slice(2, -2)}</strong>);
    else out.push(<em key={k}>{tok.slice(1, -1)}</em>);
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  const lines = text.replace(/\r/g, '').split('\n');
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    const fence = /^```(\w*)\s*$/.exec(line.trim());
    if (fence) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) code.push(lines[i++]);
      i++; // closing fence (may be missing while streaming)
      blocks.push(<CodeBlock key={key++} code={code.join('\n')} language={fence[1] || 'cpp'} showLines={false} className="my-3" />);
      continue;
    }

    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const start = ordered ? Number(/^\s*(\d+)\./.exec(line)![1]) : undefined;
      const items: string[] = [];
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ''));
        i++;
      }
      const k = key++;
      const Tag = ordered ? 'ol' : 'ul';
      blocks.push(
        <Tag key={k} start={start} className={ordered ? 'my-2 list-decimal space-y-1 pl-5' : 'my-2 list-disc space-y-1 pl-5'}>
          {items.map((it, j) => (
            <li key={j}>{inline(it, `${k}-${j}`)}</li>
          ))}
        </Tag>,
      );
      continue;
    }

    const heading = /^#{1,4}\s+(.*)$/.exec(line);
    if (heading) {
      const k = key++;
      blocks.push(
        <p key={k} className="mt-3 font-display font-semibold text-ash">
          {inline(heading[1], String(k))}
        </p>,
      );
      i++;
      continue;
    }

    if (!line.trim()) {
      i++;
      continue;
    }

    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^```/.test(lines[i].trim()) && !/^\s*([-*]|\d+\.)\s+/.test(lines[i]) && !/^#{1,4}\s/.test(lines[i])) {
      para.push(lines[i++]);
    }
    const k = key++;
    blocks.push(
      <p key={k} className="my-2">
        {inline(para.join(' '), String(k))}
      </p>,
    );
  }
  return <>{blocks}</>;
}
