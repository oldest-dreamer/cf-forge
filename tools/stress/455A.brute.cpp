#include <bits/stdc++.h>
using namespace std;
long long go(vector<int> a) { long long best = 0; for (size_t i = 0; i < a.size(); i++) { int v = a[i]; vector<int> b; bool skipped = false; for (size_t j = 0; j < a.size(); j++) { if (j == i) continue; if (a[j] == v - 1 || a[j] == v + 1) continue; b.push_back(a[j]); } (void)skipped; best = max(best, v + go(b)); } return best; }
int main() { int n; cin >> n; vector<int> a(n); for (auto& x : a) cin >> x; cout << go(a) << "\n"; }
