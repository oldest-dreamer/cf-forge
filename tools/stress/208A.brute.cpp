#include <bits/stdc++.h>
using namespace std;
int main() { string s; cin >> s; regex re("(WUB)+"); string t = regex_replace(s, re, " "); stringstream ss(t); string w; while (ss >> w) cout << w << ' '; cout << "\n"; }
