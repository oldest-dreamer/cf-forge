// Exhaustive search: place or skip a domino at the first free cell (boards up to 5x5).
#include <bits/stdc++.h>
using namespace std;
int R, C; bool used[6][6]; int best = 0;
void go(int cell, int placed) {
    if (cell == R * C) { best = max(best, placed); return; }
    int r = cell / C, c = cell % C;
    if (used[r][c]) { go(cell + 1, placed); return; }
    go(cell + 1, placed);                                   // leave this cell empty
    if (c + 1 < C && !used[r][c + 1]) { used[r][c] = used[r][c + 1] = true; go(cell + 1, placed + 1); used[r][c] = used[r][c + 1] = false; }
    if (r + 1 < R) { used[r][c] = used[r + 1][c] = true; go(cell + 1, placed + 1); used[r][c] = used[r + 1][c] = false; }
}
int main() { cin >> R >> C; go(0, 0); cout << best << "\n"; }
