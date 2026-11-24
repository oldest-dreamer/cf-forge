#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); int t = r() % 3 + 1; printf("%d\n", t); while (t--) { int n = r() % 7 + 2, m = r() % 7; printf("%d %d\n", n, m); for (int i = 0; i < m; i++) { int a = r() % n + 1, b = r() % n + 1; while (b == a) b = r() % n + 1; printf("%d %d %s\n", a, b, r() % 2 ? "imposter" : "crewmate"); } } }
