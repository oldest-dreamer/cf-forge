#include <bits/stdc++.h>
using namespace std;
// Binary search on r: feasible iff some point within R - r of the centre is at least r from the laptop.
int main() {
    double R, x1, y1, x2, y2;
    cin >> R >> x1 >> y1 >> x2 >> y2;
    double d = hypot(x1 - x2, y1 - y2);
    double lo = 0, hi = R;
    for (int it = 0; it < 200; it++) {
        double r = (lo + hi) / 2;
        if (d + (R - r) >= r || d >= R) lo = r; else hi = r;
    }
    double r = lo, ux = 1, uy = 0;
    if (d > 1e-12) ux = (x1 - x2) / d, uy = (y1 - y2) / d;
    double t = R - r;  // centre = flat centre moved away from the laptop by R - r
    if (d >= R) t = 0;
    printf("%.10f %.10f %.10f\n", x1 + ux * t, y1 + uy * t, r);
}
