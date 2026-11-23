#include <bits/stdc++.h>
using namespace std;
int main() { int n, m; cin >> n >> m; map<int,int> d; deque<int> q{n}; d[n] = 0; while (!q.empty()) { int x = q.front(); q.pop_front(); if (x == m) break; for (int y : {x * 2, x - 1}) if (y > 0 && y <= 100000 && !d.count(y)) { d[y] = d[x] + 1; q.push_back(y); } } cout << d[m] << "\n"; }
