#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    int s = atoi(v[1]);
    mt19937 r(s);
    int n = s % 11 == 0 ? 1000 : 2 + r() % 25;
    int k = s % 4 == 0 ? 2 : 2 + r() % (n - 1);
    vector<int> id(n);
    iota(id.begin(), id.end(), 1);
    shuffle(id.begin(), id.end(), r);
    vector<vector<int>> S(k);
    for (int i = 0; i < n; i++) S[i < k ? i : r() % k].push_back(id[i]);
    printf("%d %d\n", n, k);
    for (auto& g : S) {
        printf("%d", (int)g.size());
        for (int x : g) printf(" %d", x);
        puts("");
    }
    int lim = s % 3 == 0 ? 5 : 1000000000;
    for (int i = 0; i < n; i++) printf("%d ", 1 + (int)(r() % lim));
    puts("");
}
