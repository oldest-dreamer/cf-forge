#include <bits/stdc++.h>
using namespace std;
// accepts any shortest king path from s to t
int main(int argc, char** argv) {
    ifstream in(argv[1]), out(argv[2]);
    string s, t; in >> s >> t;
    int need = max(abs(s[0] - t[0]), abs(s[1] - t[1]));
    int k; if (!(out >> k) || k != need) return 1;
    int x = s[0], y = s[1];
    for (int i = 0; i < k; i++) {
        string m; if (!(out >> m)) return 1;
        for (char c : m) { if (c == 'L') x--; else if (c == 'R') x++; else if (c == 'U') y++; else if (c == 'D') y--; else return 1; }
        if (m.size() > 2 || x < 'a' || x > 'h' || y < '1' || y > '8') return 1;
    }
    return (x == t[0] && y == t[1]) ? 0 : 1;
}
