#include <bits/stdc++.h>
using namespace std;

bool seen[101][101][101];
array<double, 3> memo[101][101][101];

// Probabilities that rocks / scissors / papers are the last species alive.
array<double, 3> solve(int r, int s, int p) {
    if (s == 0 && p == 0) return {1, 0, 0};
    if (r == 0 && p == 0) return {0, 1, 0};
    if (r == 0 && s == 0) return {0, 0, 1};
    if (seen[r][s][p]) return memo[r][s][p];
    seen[r][s][p] = true;
    double pairs = r * s + s * p + p * r;
    array<double, 3> res = {0, 0, 0};
    auto add = [&](double w, array<double, 3> sub) {
        for (int i = 0; i < 3; i++) res[i] += w * sub[i];
    };
    if (r && s) add(r * s / pairs, solve(r, s - 1, p));
    if (s && p) add(s * p / pairs, solve(r, s, p - 1));
    if (p && r) add(p * r / pairs, solve(r - 1, s, p));
    return memo[r][s][p] = res;
}

int main() {
    int r, s, p;
    cin >> r >> s >> p;
    auto res = solve(r, s, p);
    printf("%.12f %.12f %.12f\n", res[0], res[1], res[2]);
    return 0;
}
