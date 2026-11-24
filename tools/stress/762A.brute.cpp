#include <bits/stdc++.h>
int main() { long long n, k; std::cin >> n >> k; std::vector<long long> d; for (long long x = 1; x * x <= n; x++) if (n % x == 0) { d.push_back(x); d.push_back(n / x); } std::sort(d.begin(), d.end()); d.erase(std::unique(d.begin(), d.end()), d.end()); std::cout << (k <= (long long)d.size() ? d[k - 1] : -1) << "\n"; }
