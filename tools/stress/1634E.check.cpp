#include <bits/stdc++.h>
using namespace std;
// check input output answer: every array gets as many L as R and every value as many L as R.
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]);
    int m;
    in >> m;
    map<int, int> bal;
    for (int i = 0; i < m; i++) {
        int k;
        in >> k;
        string s;
        if (!(out >> s) || (int)s.size() != k) return 1;
        int l = 0;
        for (int j = 0; j < k; j++) {
            int x;
            in >> x;
            if (s[j] == 'L') { l++; bal[x]++; }
            else if (s[j] == 'R') bal[x]--;
            else return 1;
        }
        if (2 * l != k) return 1;
    }
    for (auto& [x, b] : bal) if (b != 0) return 1;
    string extra;
    if (out >> extra) return 1;
    return 0;
}
