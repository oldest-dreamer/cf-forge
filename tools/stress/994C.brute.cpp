#include <bits/stdc++.h>
using namespace std;
// Quarter-unit grid: every point (x/4, y/4) tested against both squares.
int main() {
    int ax[4], ay[4], bx[4], by[4];
    for (int i = 0; i < 4; i++) cin >> ax[i] >> ay[i];
    for (int i = 0; i < 4; i++) cin >> bx[i] >> by[i];
    int x1 = 4 * *min_element(ax, ax + 4), x2 = 4 * *max_element(ax, ax + 4);
    int y1 = 4 * *min_element(ay, ay + 4), y2 = 4 * *max_element(ay, ay + 4);
    int cx = 2 * (*min_element(bx, bx + 4) + *max_element(bx, bx + 4));
    int cy = 2 * (*min_element(by, by + 4) + *max_element(by, by + 4));
    int d = 4 * *max_element(bx, bx + 4) - cx;
    for (int x = x1; x <= x2; x++)
        for (int y = y1; y <= y2; y++)
            if (abs(x - cx) + abs(y - cy) <= d) { puts("YES"); return 0; }
    puts("NO");
}
