#include <bits/stdc++.h>
using namespace std;
int occ(const string& s, const string& t) { int c = 0; for (size_t i = 0; i + t.size() <= s.size(); i++) c += s.compare(i, t.size(), t) == 0; return c; }
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]), ans(v[3]);
    string s, t, o, a;
    in >> s >> t; ans >> a;
    if (!(out >> o) || o.size() != s.size()) return 1;
    if (count(o.begin(), o.end(), '0') != count(s.begin(), s.end(), '0')) return 1;
    for (char ch : o) if (ch != '0' && ch != '1') return 1;
    return occ(o, t) == occ(a, t) ? 0 : 1;
}
