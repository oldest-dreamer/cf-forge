#include <bits/stdc++.h>
using namespace std;
map<string, bool> memo;
bool win(const string& s) { auto it = memo.find(s); if (it != memo.end()) return it->second; bool w = false; for (size_t i = 0; i + 1 < s.size() && !w; i++) if (s[i] != s[i + 1]) { string t = s.substr(0, i) + s.substr(i + 2); if (!win(t)) w = true; } return memo[s] = w; }
int main() { int t; cin >> t; while (t--) { string s; cin >> s; cout << (win(s) ? "DA" : "NET") << "\n"; } }
