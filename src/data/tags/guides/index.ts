import type { TagGuide } from '../guideTypes';
import { implementationGuide } from './implementation';
import { mathGuide } from './math';

/** Full tag guides written so far. Tags without one show their short summary and ladder. */
export const GUIDES: Record<string, TagGuide> = {
  implementation: implementationGuide,
  math: mathGuide,
};
