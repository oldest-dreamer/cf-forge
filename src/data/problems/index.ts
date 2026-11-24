import type { ProblemEntry } from './types.ts';
import { p1A } from './p1A.ts';
import { p4A } from './p4A.ts';
import { p71A } from './p71A.ts';
import { p231A } from './p231A.ts';
import { p158A } from './p158A.ts';
import { p266A } from './p266A.ts';
import { p617A } from './p617A.ts';
import { p1475A } from './p1475A.ts';
import { p282A, p263A, p977A, p791A, p1328A, p486A, p50A } from './wave1a.ts';
import { p160A, p158B, p271A, p236A, p118A, p1360B } from './wave1b_featured.ts';
import { p706B, p279B, p1201C, p371C, p455A } from './wave2a.ts';
import { p189A, p1195C, p230B, p26A, p1350A } from './wave2b.ts';
import { p1520D, p4C, p1343B, p1373B, p1421A } from './wave2c.ts';
import { p1097B, p520B, p1020B, p115A, p1538C } from './wave2d.ts';
import { p996A, p1472B, p580A, p1475B, p1182A, p363B, p489B, p433B } from './wave3a.ts';
import { p476B, p489C, p698A, p550A, p1398C, p431C, p466C, p5C } from './wave3b.ts';
import { p405A, p58A, p230A, p456A, p492B, p451B, p459B, p276C, p514A, p478B } from './wave4a.ts';
import { p723A, p1849B, p1294C, p467B, p327A, p479A, p25A, p208A, p266B, p443A } from './wave4b.ts';
import { p750A, p1996A, p1138A, p1476A, p1873E, p1352C, p600B, p580B, p702C, p448D } from './wave5a.ts';
import { p381A, p1791C, p1690D, p1669F, p1343C, p1324D, p630A, p742A } from './wave5b.ts';
import { p1742D, p1541B, p1526B, p1350B, p1458A, p1349A } from './wave5c.ts';
import { p939A, p500A, p1829E, p217A, p893C, p862B, p1167C, p277A, p1249B1 } from './wave6a.ts';
import { p580C, p977E, p3A, p1360E, p20C, p1057A, p1843C, p913B, p1843D } from './wave6b.ts';
import { p1703A, p1619A, p1660C, p1676C, p1324B, p1551B1 } from './wave7a.ts';
import { p1370A, p1325A, p1360D, p1617B, p1514A, p762A, p1521A, p1352A, p1352B, p1352G } from './wave7b.ts';
import { p1492C, p1873D, p6C, p1676F, p1336A, p161D, p1143C, p1905B, p1830A, p1702E } from './wave8a.ts';
import { p1899A, p1472D, p1382B, p1527B1, p1370C, p276B, p1858A } from './wave8b.ts';
import { p550B, p579A, p1420B, p1615B, p131C, p1475E, p9A, p601A, p1063B, p1490D } from './wave9a.ts';
import { p1335B, p1463B, p1220C, p1104B, p1396B, p1365A } from './wave9b.ts';
import { p1092F, p1187E, p1324F, p1528A, p1676G, p1153D, p1406C, p1176E } from './wave10a.ts';
import { p1354B, p1680C, p1203D2, p1632B, p1474A, p1515A, p1263D } from './wave10b.ts';
import { p380C, p339D, p1234D, p1690G, p1294D, p1703F } from './wave10c.ts';
import { p1537D, p1451D, p1194D, p1695B, p1404B, p451A, p1972B, p1990A, p493D } from './wave11a.ts';
import { p197A, p1527A, p1559A, p1395C, p1516B, p1554B, p1847B, p1979B, p276D, p1325D } from './wave11b.ts';
import { p1609D, p1213G, p1559D1, p25D, p1253D, p1131F } from './wave12a.ts';
import { p1594D, p1534C, p1209D, p1278D, p2020D } from './wave12b.ts';
import { p449B, p545E, p1076D, p1307D, p1320B, p1611E1, p1365D } from './wave13a.ts';
import { p1433G, p1473E, p1486E, p1915G, p1196F, p295B } from './wave13b.ts';
import { p1475F, p776D, p228E, p27D, p888E, p1006F, p525E, p552E, p190C } from './wave14a.ts';
import { p578C, p1355E, p939E, p993E, p528D, p1082G, p546E, p1139E, p1525D } from './wave14b.ts';
import { p1265E, p518D, p148D, p839C, p1C, p659D, p1047B, p1117D, p621E, p222E, p687B } from './wave14c.ts';
import { p126B, p432D, p1200E, p113B, p1326D2, p1312D, p1288C, p1462E1, p300C, p1182E } from './wave14d.ts';
import { p1236B, p1391C, p1462E2, p1420D, p1207D, p869C, p559C } from './wave15a.ts';
import { p312B, p453A, p280C, p235B, p540D, p16E, p696B } from './wave15b.ts';
import { p621C, p1543C, p1461C, p107B, p768D, p30C, p935D } from './wave15c.ts';
import { p1800D, p1899D, p1536C, p1133D, p182D, p2A, p1527C } from './wave15d.ts';
import { p1137B, p1225D, p835D, p514C, p7D, p25E, p1003F } from './wave15e.ts';
import { p1354C1, p514B, p908C, p935C, p559A, p618C, p407A, p994C } from './wave16a.ts';
import { p166E, p691E, p514E, p821E, p551D, p954F, p1980E, p718C } from './wave16b.ts';
import { p717D, p1151F, p147B, p107D, p696D, p1538E, p576D, p1106F } from './wave16c.ts';
import { p1468F, p1163C2, p600D, p1354C2, p340B, p166B, p598C, p136D } from './wave16d.ts';
import { p919E, p1500B, p1748D, p338D } from './wave16e.ts';
import { p1288A, p1301B, p1574C, p439D } from './wave17a.ts';
import { p1730B, p1156C, p1244E, p1538G } from './wave17b.ts';
import { p1978B, p2009E, p289B, p1312C } from './wave17c.ts';
import { p1413E, p808E, p1059D, p1119E } from './wave17d.ts';
import { p201B, p613A, p626E, p660F } from './wave17e.ts';
import { p455C, p2020C, p98C, p1316C } from './wave17f.ts';
import { p321C, p342E, p914E } from './wave17g.ts';
import { p321E, p868F, p833B, p1527E } from './wave17h.ts';
import { p715C, p1100F, p848C } from './wave17i.ts';
import { p150E, p438E } from './wave17j.ts';
import { p679A, p727C, p1167B, p1486C1, p1486C2 } from './wave21a.ts';
import { p1407C, p1797C, p1698D, p1697D, p1556D } from './wave21b.ts';
import { p1534D, p862D, p1088D, p1103B, p843B } from './wave21c.ts';
import { p1155E, p1153E, p1363D } from './wave21d.ts';
import { p112A, p281A, p59A, p520A, p41A, p734A, p131A, p96A, p339A, p469A, p546A, p122A, p69A } from './wave1b.ts';

/** The CF Forge problem pool. New waves are appended here. */
export const PROBLEMS: ProblemEntry[] = [
  p4A, p1A, p71A, p231A,
  // wave 1a
  p158A, p266A, p282A, p263A, p977A, p791A, p617A, p1475A, p1328A, p486A, p50A,
  // wave 1b
  p160A, p158B, p271A, p236A, p118A, p1360B,
  p112A, p281A, p59A, p520A, p41A, p734A, p131A, p96A, p339A, p469A, p546A, p122A, p69A,
  // wave 2
  p706B, p279B, p1201C, p371C, p455A, p189A, p1195C, p230B, p26A, p1350A,
  p1520D, p4C, p1343B, p1373B, p1421A, p1097B, p520B, p1020B, p115A, p1538C,
  // wave 3 (dp ladder)
  p996A, p1472B, p580A, p1475B, p1182A, p363B, p489B, p433B,
  p476B, p489C, p698A, p550A, p1398C, p431C, p466C, p5C,
  // wave 4 (greedy, sortings, brute force, strings, constructive)
  p405A, p58A, p230A, p456A, p492B, p451B, p459B, p276C, p514A, p478B,
  p723A, p1849B, p1294C, p467B, p327A, p479A, p25A, p208A, p266B, p443A,
  // wave 5 (binary search, two pointers, number theory)
  p750A, p1996A, p1138A, p1476A, p1873E, p1352C, p600B, p580B, p702C, p448D,
  p381A, p1791C, p1690D, p1669F, p1343C, p1324D, p630A, p742A,
  p1742D, p1541B, p1526B, p1350B, p1458A, p1349A,
  // wave 6 (graphs, dfs, trees, dsu, shortest paths)
  p939A, p500A, p1829E, p217A, p893C, p862B, p1167C, p277A, p1249B1,
  p580C, p977E, p3A, p1360E, p20C, p1057A, p1843C, p913B, p1843D,
  // wave 7 (strings, number theory, constructive)
  p1703A, p1619A, p1660C, p1676C, p1324B, p1551B1,
  p1370A, p1325A, p1360D, p1617B, p1514A, p762A, p1521A, p1352A, p1352B, p1352G,
  // wave 8 (two pointers, trees, DSU)
  p1492C, p1873D, p6C, p1676F, p1336A, p161D, p1143C, p1905B, p1830A, p1702E,
  p1899A, p1472D, p1382B, p1527B1, p1370C, p276B, p1858A,
  // wave 9 (bitmasks, combinatorics, shortest paths, constructive, games)
  p550B, p579A, p1420B, p1615B, p131C, p1475E, p9A, p601A, p1063B, p1490D,
  p1335B, p1463B, p1220C, p1104B, p1396B, p1365A,
  // wave 10 (trees, graphs, two pointers, constructive, data structures, DSU)
  p1092F, p1187E, p1324F, p1528A, p1676G, p1153D, p1406C, p1176E,
  p1354B, p1680C, p1203D2, p1632B, p1474A, p1515A, p1263D,
  p380C, p339D, p1234D, p1690G, p1294D, p1703F,
  // wave 11 (games, bitmasks)
  p1537D, p1451D, p1194D, p1695B, p1404B, p451A, p1972B, p1990A, p493D,
  p197A, p1527A, p1559A, p1395C, p1516B, p1554B, p1847B, p1979B, p276D, p1325D,
  // wave 12 (DSU)
  p1609D, p1213G, p1559D1, p25D, p1253D, p1131F,
  p1594D, p1534C, p1209D, p1278D, p2020D,
  // wave 13 (shortest paths)
  p449B, p545E, p1076D, p1307D, p1320B, p1611E1, p1365D,
  p1433G, p1473E, p1486E, p1915G, p1196F, p295B,
  // wave 14 (2-SAT, meet in the middle, parsing)
  p1475F, p776D, p228E, p27D, p888E, p1006F, p525E, p552E, p190C,
  p578C, p1355E, p939E, p993E, p528D, p1082G, p546E, p1139E, p1525D,
  p1265E, p518D, p148D, p839C, p1C, p659D, p1047B, p1117D, p621E, p222E, p687B,
  p126B, p432D, p1200E, p113B, p1326D2, p1312D, p1288C, p1462E1, p300C, p1182E,
  // wave 15 (combinatorics, probabilities, hashing)
  p1236B, p1391C, p1462E2, p1420D, p1207D, p869C, p559C,
  p312B, p453A, p280C, p235B, p540D, p16E, p696B,
  p621C, p1543C, p1461C, p107B, p768D, p30C, p935D,
  p1800D, p1899D, p1536C, p1133D, p182D, p2A, p1527C,
  p1137B, p1225D, p835D, p514C, p7D, p25E, p1003F,
  // wave 16 (geometry, matrices, CRT)
  p1354C1, p514B, p908C, p935C, p559A, p618C, p407A, p994C,
  p166E, p691E, p514E, p821E, p551D, p954F, p1980E, p718C,
  p717D, p1151F, p147B, p107D, p696D, p1538E, p576D, p1106F,
  p1468F, p1163C2, p600D, p1354C2, p340B, p166B, p598C, p136D,
  p919E, p1500B, p1748D, p338D,
  // wave 17 (ternary search, divide and conquer, meet in the middle)
  p1288A, p1301B, p1574C, p439D, p1730B, p1156C, p1244E, p1538G,
  p1978B, p2009E, p289B, p1312C, p1413E, p808E, p1059D, p1119E,
  p201B, p613A, p626E, p660F,
  p455C, p2020C, p98C, p1316C,
  p321C, p342E, p914E,
  p321E, p868F, p833B, p1527E,
  p715C, p1100F, p848C,
  p150E, p438E,
  // wave 21 (interactive)
  p679A, p727C, p1167B, p1486C1, p1486C2,
  p1407C, p1797C, p1698D, p1697D, p1556D,
  p1534D, p862D, p1088D, p1103B, p843B,
  p1155E, p1153E, p1363D,
];

export const PROBLEM_BY_ID: Record<string, ProblemEntry> = Object.fromEntries(
  PROBLEMS.map((p) => [p.id.toUpperCase(), p]),
);

export function problemsForTag(slug: string) {
  return PROBLEMS.filter((p) => (p.tags as string[]).includes(slug)).sort((a, b) => a.rating - b.rating);
}

export function featuredForTag(slug: string) {
  return PROBLEMS.filter((p) => (p.featuredFor as string[] | undefined)?.includes(slug));
}
