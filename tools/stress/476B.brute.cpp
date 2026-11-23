#include <bits/stdc++.h>
using namespace std;
int main() { string a, b; cin >> a >> b; int t = 0; for (char c : a) t += c == '+' ? 1 : -1; vector<int> q; int base = 0; for (char c : b) { if (c == '?') q.push_back(0); else base += c == '+' ? 1 : -1; } int k = q.size(); long long good = 0, all = 0;
  // independent: recursive enumeration
  function<void(int,int)> go = [&](int i, int p) { if (i == k) { all++; if (p == t) good++; return; } go(i + 1, p + 1); go(i + 1, p - 1); }; go(0, base); printf("%.12f\n", (double)good / all); }
