#include <bits/stdc++.h>
using namespace std;
map<vector<int>, bool> memo;
bool ok(vector<int> a) { if (a.size() >= 2 && count(a.begin(), a.end(), a[0]) == (int)a.size()) return true; if (a.size() <= 2) return false; auto it = memo.find(a); if (it != memo.end()) return it->second; bool r = false; for (size_t i = 0; i + 1 < a.size() && !r; i++) { vector<int> b = a; b[i] ^= b[i + 1]; b.erase(b.begin() + i + 1); r = ok(b); } return memo[a] = r; }
int main() { int t; cin >> t; while (t--) { int n; cin >> n; vector<int> a(n); for (auto& x : a) cin >> x; cout << (ok(a) ? "YES" : "NO") << "\n"; } }
