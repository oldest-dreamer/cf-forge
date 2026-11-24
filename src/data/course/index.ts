import type { Lesson } from './types';
import { L1, L2, L3, L4 } from './lessons1';
import { L5, L6, L7, L8 } from './lessons2';
import { L9, L10, L11, L12 } from './lessons3';
import { L13, L14, L15, L16, L17 } from './lessons4';
import { L18, L19, L20, L21 } from './lessons5';

export const LESSONS: Lesson[] = [L1, L2, L3, L4, L5, L13, L14, L6, L15, L7, L8, L16, L17, L18, L9, L19, L10, L20, L11, L12, L21];

export const LESSON_BY_ID: Record<string, Lesson> = Object.fromEntries(LESSONS.map((l) => [l.id, l]));

export function lessonIndex(id: string) {
  return LESSONS.findIndex((l) => l.id === id);
}
