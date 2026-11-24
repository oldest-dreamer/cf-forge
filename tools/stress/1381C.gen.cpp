#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int n = r() % 6 + 1, t = 1; printf("%d\n", t); int x = r() % (n + 1), y = x + r() % (n - x + 1); std::vector<int> a(n); for (int& q : a) q = r() % std::min(n + 1, int(r() % 3 + 1)) + 1; std::sort(a.begin(), a.end()); printf("%d %d %d\n", n, x, y); for (int q : a) printf("%d ", q); puts(""); }
