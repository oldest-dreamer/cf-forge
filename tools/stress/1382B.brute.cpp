#include <bits/stdc++.h>
using namespace std;
map<vector<int>, bool> memo;
bool win(vector<int> a) { size_t i = 0; while (i < a.size() && a[i] == 0) i++; if (i == a.size()) return false; auto it = memo.find(a); if (it != memo.end()) return it->second; bool w = false; int orig = a[i]; for (int take = 1; take <= orig && !w; take++) { a[i] = orig - take; if (!win(a)) w = true; } a[i] = orig; return memo[a] = w; }
int main() { int t; cin >> t; while (t--) { int n; cin >> n; vector<int> a(n); for (auto& x : a) cin >> x; cout << (win(a) ? "First" : "Second") << "\n"; } }
