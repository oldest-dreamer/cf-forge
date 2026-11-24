#include <bits/stdc++.h>
using namespace std;
string dOf(const string& a, const string& b) { string d; for (size_t i = 0; i < a.size(); i++) { char c = char('0' + (a[i] - '0') + (b[i] - '0')); if (d.empty() || d.back() != c) d += c; } while (d.size() > 1 && d[0] == '0') d.erase(d.begin()); return d; }
bool less_(const string& x, const string& y) { return x.size() != y.size() ? x.size() < y.size() : x < y; }
int main(int c, char** v) { ifstream in(v[1]), out(v[2]), ans(v[3]); int t; in >> t; while (t--) { int n; string b, a, best; in >> n >> b; ans >> best; if (!(out >> a) || (int)a.size() != n) return 1; for (char ch : a) if (ch != '0' && ch != '1') return 1; if (less_(dOf(a, b), dOf(best, b))) return 1; } return 0; }
