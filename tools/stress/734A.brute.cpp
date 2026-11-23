#include <bits/stdc++.h>
using namespace std;
int main() { int n; string s; cin >> n >> s; int a = 0, d = 0; for (char c : s) { if (c == 'A') a++; if (c == 'D') d++; } cout << (a == d ? "Friendship" : a > d ? "Anton" : "Danik") << "\n"; }
