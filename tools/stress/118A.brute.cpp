#include <bits/stdc++.h>
using namespace std;
int main() { string s, o; cin >> s; for (char c : s) { char l = c >= 'A' && c <= 'Z' ? c + 32 : c; if (l=='a'||l=='o'||l=='y'||l=='e'||l=='u'||l=='i') continue; o += '.'; o += l; } cout << o << "\n"; }
