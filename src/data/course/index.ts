import type { Lesson } from './types';
import { L1, L2, L3, L4 } from './lessons1';
import { L5, L6, L7, L8 } from './lessons2';
import { L9, L10, L11, L12 } from './lessons3';

export const LESSONS: Lesson[] = [L1, L2, L3, L4, L5, L6, L7, L8, L9, L10, L11, L12];

export const LESSON_BY_ID: Record<string, Lesson> = Object.fromEntries(LESSONS.map((l) => [l.id, l]));

export function lessonIndex(id: string) {
  return LESSONS.findIndex((l) => l.id === id);
}
