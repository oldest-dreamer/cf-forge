#include <bits/stdc++.h>
int main() { int n; std::cin >> n; long long r = 1; for (int i = 0; i < n; i++) r = r * 5 % 100; printf("%02lld\n", r); }
