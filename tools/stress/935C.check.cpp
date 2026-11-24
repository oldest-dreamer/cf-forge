#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]), ans(v[3]);
    double R, x1, y1, x2, y2, x, y, r, ax, ay, ar;
    in >> R >> x1 >> y1 >> x2 >> y2; ans >> ax >> ay >> ar;
    if (!(out >> x >> y >> r)) return 1;
    double eps = 1e-6 * max(1.0, R);
    if (fabs(r - ar) > eps) return 1;
    if (hypot(x - x1, y - y1) + r > R + eps) return 1;
    if (hypot(x - x2, y - y2) < r - eps) return 1;
    return 0;
}
