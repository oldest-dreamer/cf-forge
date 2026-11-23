import type { TestOutcome } from '@/compiler/useCompiler';

/** Build a debugging question from a failed run, with the code attached. */
export function runQuestion(
  intro: string,
  code: string,
  fail: { compileError?: string; input?: string; expected?: string; got?: TestOutcome | null },
): string {
  const parts = [intro];
  if (fail.compileError) parts.push('Compiler error:\n```\n' + fail.compileError.slice(0, 2500) + '\n```');
  else if (fail.got) {
    parts.push(`Verdict: ${fail.got.verdict}`);
    if (fail.input !== undefined) parts.push('Input:\n```\n' + fail.input.slice(0, 1500) + '\n```');
    if (fail.expected !== undefined) parts.push('Expected output:\n```\n' + fail.expected.slice(0, 1500) + '\n```');
    if (fail.got.verdict !== 'tle') parts.push('My output:\n```\n' + fail.got.stdout.slice(0, 1500) + '\n```');
    if (fail.got.stderr) parts.push('Error output:\n```\n' + fail.got.stderr.slice(0, 800) + '\n```');
  }
  parts.push('My code:\n```cpp\n' + code.slice(0, 10000) + '\n```');
  return parts.join('\n\n');
}
