#include <bits/stdc++.h>
using namespace std;
int n; vector<int> s;
int go(int i) { int best = 1; for (int j = 2 * i; j <= n; j += i) if (s[j] > s[i]) best = max(best, 1 + go(j)); return best; }
int main() { int t; cin >> t; while (t--) { cin >> n; s.assign(n + 1, 0); for (int i = 1; i <= n; i++) cin >> s[i]; int b = 0; for (int i = 1; i <= n; i++) b = max(b, go(i)); cout << b << "\n"; } }
