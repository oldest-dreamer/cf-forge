#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int x = (int)(r() % 9) - 4, y = (int)(r() % 9) - 4, s = r() % 5 + 1;
    std::vector<std::pair<int,int>> A = {{x, y}, {x + s, y}, {x + s, y + s}, {x, y + s}};
    int cx = (int)(r() % 13) - 6, cy = (int)(r() % 13) - 6, d = r() % 4 + 1;
    std::vector<std::pair<int,int>> B = {{cx - d, cy}, {cx, cy + d}, {cx + d, cy}, {cx, cy - d}};
    std::shuffle(A.begin(), A.end(), r); std::shuffle(B.begin(), B.end(), r);
    for (auto [p, q] : A) printf("%d %d ", p, q); puts("");
    for (auto [p, q] : B) printf("%d %d ", p, q); puts("");
}
