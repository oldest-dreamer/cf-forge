#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    mt19937 r(atoi(v[1]));
    int m = r() % 9 + 1, n = m + r() % 14 + 1;
    vector<string> ev = {"1"};
    vector<int> seen(m, 0);
    int unseen = m;
    for (int i = 1; i < n; i++) {
        if (r() % 3 == 0 && (int)ev.size() + unseen < n) ev.push_back("1");
        else {
            int f = r() % m;
            if (!seen[f]) seen[f] = 1, unseen--;
            ev.push_back("2 " + string(1, 'a' + f) + string(1, 'a' + f));
        }
    }
    for (int f = 0; f < m; f++) if (!seen[f]) ev.push_back("2 " + string(2, 'a' + f));
    printf("%d %d\n", (int)ev.size(), m);
    for (auto& e : ev) puts(e.c_str());
}
