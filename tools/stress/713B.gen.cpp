#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    int s = atoi(v[1]);
    mt19937 r(s);
    int n = s % 10 == 0 ? 65536 : 2 + r() % 30;
    auto rnd = [&]() {
        int x1 = 1 + r() % n, x2 = 1 + r() % n, y1 = 1 + r() % n, y2 = 1 + r() % n;
        if (s % 3 == 0) { x2 = min(n, x1 + (int)(r() % 3)); y2 = min(n, y1 + (int)(r() % 3)); }
        if (x1 > x2) swap(x1, x2);
        if (y1 > y2) swap(y1, y2);
        return array<int, 4>{x1, y1, x2, y2};
    };
    array<int, 4> A, B;
    bool ok = false;
    for (int t = 0; t < 5000 && !ok; t++) {
        A = rnd();
        B = rnd();
        ok = A[2] < B[0] || B[2] < A[0] || A[3] < B[1] || B[3] < A[1];
    }
    if (!ok) { A = {1, 1, 1, 1}; B = {n, n, n, n}; }
    printf("%d\n", n);
    printf("%d %d %d %d\n%d %d %d %d\n", A[0], A[1], A[2], A[3], B[0], B[1], B[2], B[3]);
}
