#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1]));
  for (;;) { long long n = r() % 3 ? r() % 100000 + 2 : (long long)(r() % 9 + 1) * 100000000LL; int k = r() % 50 + 1;
    long long m = n; bool ok = true; for (int i = 0; i < k; i++) { if (m % 10) m--; else m /= 10; if (m <= 0) { ok = false; break; } }
    if (ok && n <= 1000000000) { printf("%lld %d\n", n, k); return 0; } } }
