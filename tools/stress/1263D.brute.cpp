#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; vector<string> s(n); for (auto& x : s) cin >> x; vector<int> comp(n, -1); int c = 0; for (int i = 0; i < n; i++) { if (comp[i] != -1) continue; vector<int> st = {i}; comp[i] = c; while (!st.empty()) { int a = st.back(); st.pop_back(); for (int b = 0; b < n; b++) if (comp[b] == -1) { bool share = false; for (char ch : s[a]) if (s[b].find(ch) != string::npos) share = true; if (share) { comp[b] = c; st.push_back(b); } } } c++; } cout << c << "\n"; }
