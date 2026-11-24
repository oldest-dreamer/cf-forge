#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    int s = atoi(v[1]);
    mt19937 r(s);
    int n = s % 9 == 0 ? 2000 : 2 + r() % 24;
    vector<int> p(n);
    iota(p.begin(), p.end(), 0);
    shuffle(p.begin(), p.end(), r);
    printf("%d\n", n);
    for (int x : p) printf("%d ", x);
    puts("");
}
