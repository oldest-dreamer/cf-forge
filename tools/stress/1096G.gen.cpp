#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    mt19937 r(atoi(v[1]));
    int n = (r() % 8 + 1) * 2, k = r() % 10 + 1;
    vector<int> d = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    shuffle(d.begin(), d.end(), r);
    d.resize(k);
    printf("%d %d\n", n, k);
    for (int x : d) printf("%d ", x);
    puts("");
}
