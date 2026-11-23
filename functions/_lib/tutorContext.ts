/**
 * Builds the tutor's view of the page the user is on, from the site's own data.
 * The browser only sends an id; content comes from here so it cannot be faked.
 */
import { PROBLEM_BY_ID } from '../../src/data/problems/index';
import { LESSON_BY_ID } from '../../src/data/course/index';
import { TAG_BY_SLUG } from '../../src/data/tags/tags';
import { TOOLKIT_BY_ID } from '../../src/data/course/toolkit';

export type TutorContext =
  | { kind: 'problem'; id: string }
  | { kind: 'lesson'; id: string }
  | { kind: 'tag'; id: string }
  | { kind: 'toolkit'; id?: string }
  | { kind: 'contests' }
  | { kind: 'general' };

const MAX = 9000;

export function describeContext(ctx: TutorContext | undefined): string {
  if (!ctx) return 'The student is browsing CF Forge.';
  switch (ctx.kind) {
    case 'problem': {
      const p = PROBLEM_BY_ID[String(ctx.id).toUpperCase()];
      if (!p) return 'The student is on a problem page.';
      const lines = [
        `The student is on the CF Forge page for Codeforces problem ${p.id} "${p.name}" (rating ${p.rating}, tags: ${p.tags.join(', ')}).`,
        `Statement (retold): ${p.statement.en}`,
        `Input: ${p.input.en}`,
        `Output: ${p.output.en}`,
        `Limits: ${p.limits.timeSec}s, ${p.limits.memoryMb}MB. ${p.limits.notes.map((n) => n.en).join('; ')}`,
        ...p.samples.map((s, i) => `Sample ${i + 1} input:\n${s.input}\nSample ${i + 1} output:\n${s.output}\nWhy: ${s.explain.en}`),
        `[SPOILER] Key observation: ${p.observation.en}`,
        `[SPOILER] Approach: ${p.approach.map((a) => a.en).join(' ')}`,
        `[SPOILER] Common mistakes: ${p.pitfalls.map((x) => x.en).join(' | ')}`,
        ...p.solutions.map((s) => `[SPOILER] Solution "${s.title.en}" (${s.kind}, ${s.time}):\n${s.code}`),
      ];
      return lines.join('\n').slice(0, MAX);
    }
    case 'lesson': {
      const l = LESSON_BY_ID[ctx.id];
      if (!l) return 'The student is on a C++ lesson page.';
      const body = l.blocks
        .map((b) => (b.kind === 'code' ? `Example:\n${b.code}` : b.kind === 'list' ? b.items.map((i) => `- ${i.en}`).join('\n') : b.text.en))
        .join('\n');
      return [
        `The student is reading the CF Forge C++ lesson "${l.title.en}": ${l.summary.en}`,
        body,
        `Exercise: ${l.exercise.prompt.en}`,
        `[SPOILER] Exercise reference solution:\n${l.exercise.solution}`,
      ]
        .join('\n')
        .slice(0, MAX);
    }
    case 'tag': {
      const t = TAG_BY_SLUG[ctx.id];
      if (!t) return 'The student is on a tag page.';
      return `The student is on the CF Forge page for the Codeforces tag "${t.cf}": ${t.blurb.en} Signals: ${t.signals.map((s) => s.en).join(' ')}`;
    }
    case 'toolkit': {
      const e = ctx.id ? TOOLKIT_BY_ID[ctx.id] : undefined;
      return e
        ? `The student is reading the C++ toolkit entry "${e.title}": ${e.summary.en}\n${e.code}`
        : 'The student is on the C++/STL toolkit page.';
    }
    case 'contests':
      return 'The student is reading the CF Forge guide to Codeforces contest types (Div. 1–4, Educational, Global) and their scoring.';
    default:
      return 'The student is browsing CF Forge.';
  }
}

export function systemPrompt(lang: 'en' | 'bn', ctx: string, mode: string): string {
  const language =
    lang === 'bn'
      ? 'Answer in clear, simple Bangla (বাংলা). Keep C++ code, keywords, function names and technical terms like "binary search" or "overflow" in English.'
      : 'Answer in clear, simple English.';
  const modeRule =
    mode === 'hint'
      ? 'The student asked for a HINT. Give only the next small step: a question or a nudge. Do not reveal the full idea or any code.'
      : mode === 'debug'
        ? 'The student wants help finding a bug in their code. Point to the exact line or case that fails and explain why. Suggest the fix in words first; show corrected code only if they ask.'
        : mode === 'explain'
          ? 'The student wants the idea explained. Explain the reasoning step by step with a tiny example. Show code only if it helps.'
          : 'Answer the student directly and helpfully.';

  return [
    'You are the CF Forge tutor: a patient competitive-programming coach for a student learning C++ and Codeforces, currently around the Newbie to Specialist level.',
    language,
    'Teaching rules:',
    '- Lead the student to the answer. Prefer hints and questions over full solutions unless they clearly ask for the solution.',
    '- Content marked [SPOILER] below is for you. Use it to guide correctly; reveal it only as far as the student asks.',
    '- Keep answers short: usually under 180 words. Use small examples.',
    '- Code must be C++ (GNU G++20 style, bits/stdc++.h is fine), in ```cpp fenced blocks.',
    '- Never use LaTeX or $ signs for math. Write math as plain text (w = 6, 2 + 4 = 6, n^2, 10^9) or as `inline code`.',
    '- Be honest when unsure. Never invent Codeforces problem ids, ratings or statements.',
    '- Stay on programming, algorithms, C++ and Codeforces. Politely decline anything unrelated.',
    `Mode: ${modeRule}`,
    '',
    'PAGE CONTEXT:',
    ctx,
  ].join('\n');
}
