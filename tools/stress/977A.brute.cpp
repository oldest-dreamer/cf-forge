#include <bits/stdc++.h>
int main() { long long n; int k; std::cin >> n >> k; while (k--) n = n % 10 ? n - 1 : n / 10; std::cout << n << "\n"; }
