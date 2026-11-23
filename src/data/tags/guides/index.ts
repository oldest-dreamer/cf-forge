import type { TagGuide } from '../guideTypes';
import { implementationGuide } from './implementation';
import { mathGuide } from './math';
import { greedyGuide, bruteForceGuide, stringsGuide, sortingsGuide } from './wave1b';
import { constructiveGuide, binarySearchGuide, twoPointersGuide, dpGuide, dataStructuresGuide, bitmasksGuide, numberTheoryGuide } from './core2';
import { combinatoricsGuide, probabilitiesGuide, gamesGuide, geometryGuide, matricesGuide, crtGuide, interactiveGuide } from './math2';
import { graphsGuide, dfsGuide, treesGuide, shortestPathsGuide, dsuGuide, flowsGuide, matchingsGuide, twoSatGuide } from './graphs';
import { hashingGuide, suffixStructuresGuide, parsingGuide, divideAndConquerGuide, meetInTheMiddleGuide, ternarySearchGuide, fftGuide, schedulesGuide } from './advanced';

const ALL: TagGuide[] = [
  implementationGuide, mathGuide, greedyGuide, bruteForceGuide, stringsGuide, sortingsGuide,
  constructiveGuide, binarySearchGuide, twoPointersGuide, dpGuide, dataStructuresGuide, bitmasksGuide, numberTheoryGuide,
  combinatoricsGuide, probabilitiesGuide, gamesGuide, geometryGuide, matricesGuide, crtGuide, interactiveGuide,
  graphsGuide, dfsGuide, treesGuide, shortestPathsGuide, dsuGuide, flowsGuide, matchingsGuide, twoSatGuide,
  hashingGuide, suffixStructuresGuide, parsingGuide, divideAndConquerGuide, meetInTheMiddleGuide, ternarySearchGuide, fftGuide, schedulesGuide,
];

/** A full guide for every tag. */
export const GUIDES: Record<string, TagGuide> = Object.fromEntries(ALL.map((g) => [g.slug, g]));
