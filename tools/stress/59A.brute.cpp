#include <bits/stdc++.h>
using namespace std;
int main() { string s; cin >> s; int u = 0, l = 0; for (char c : s) (c >= 'A' && c <= 'Z' ? u : l)++; for (char& c : s) c = u > l ? toupper(c) : tolower(c); cout << s << "\n"; }
