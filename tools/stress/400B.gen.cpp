#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    mt19937 r(atoi(v[1]));
    int n = r() % 4 + 1, m = r() % 6 + 2;
    printf("%d %d\n", n, m);
    for (int i = 0; i < n; i++) {
        string row(m, '*');
        int g = r() % m, s = r() % m;
        if (r() % 4) { while (s == g) s = r() % m; }
        else s = (g + 1 + r() % (m - 1)) % m;
        if (r() % 3) { if (g > s) swap(g, s); }
        if (g == s) s = (g + 1) % m;
        row[g] = 'G'; row[s] = 'S';
        puts(row.c_str());
    }
}
