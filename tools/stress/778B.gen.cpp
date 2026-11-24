#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    mt19937 r(atoi(v[1]));
    int n = r() % 5 + 1, m = r() % 4 + 1;
    printf("%d %d\n", n, m);
    vector<string> names;
    for (int i = 0; i < n; i++) {
        string nm = "v" ; nm.clear(); nm += char('a' + i);
        printf("%s := ", nm.c_str());
        if (names.empty() || r() % 3 == 0) {
            string s; for (int b = 0; b < m; b++) s += char('0' + r() % 2);
            puts(s.c_str());
        } else {
            auto pick = [&]() { return r() % 3 == 0 ? string("?") : names[r() % names.size()]; };
            const char* ops[] = {"AND", "OR", "XOR"};
            string a = pick(), b = pick();
            if (a != "?" || b != "?") {} 
            printf("%s %s %s\n", a.c_str(), ops[r() % 3], b.c_str());
        }
        names.push_back(nm);
    }
}
