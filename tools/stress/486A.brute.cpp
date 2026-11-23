#include <bits/stdc++.h>
int main() { long long n, s = 0; std::cin >> n; for (long long i = 1; i <= n; i++) s += (i % 2 ? -i : i); std::cout << s << "\n"; }
