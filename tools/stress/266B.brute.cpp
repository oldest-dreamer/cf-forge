#include <bits/stdc++.h>
using namespace std;
int main() { int n, t; string s; cin >> n >> t >> s; while (t--) { vector<int> sw; for (int i = 0; i + 1 < n; i++) if (s[i] == 'B' && s[i + 1] == 'G') sw.push_back(i); for (int i : sw) swap(s[i], s[i + 1]); } cout << s << "\n"; }
