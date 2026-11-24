#include <bits/stdc++.h>
int n, m; long long cnt = 0; std::vector<int> a, b;
void go(int i) { if (i == 2 * m) { for (int j = 0; j < m; j++) if (a[j] > b[j]) return; for (int j = 1; j < m; j++) if (a[j] < a[j - 1] || b[j] > b[j - 1]) return; cnt++; return; } for (int x = 1; x <= n; x++) { if (i < m) a[i] = x; else b[i - m] = x; go(i + 1); } }
int main() { std::cin >> n >> m; a.resize(m); b.resize(m); go(0); std::cout << cnt % 1000000007 << "\n"; }
