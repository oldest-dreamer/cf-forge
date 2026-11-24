#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    int s = atoi(v[1]);
    mt19937 r(s);
    int n = s % 14 == 0 ? 1500 : 2 + r() % 40;
    int shape = s % 5;
    vector<int> id(n);
    iota(id.begin(), id.end(), 1);
    shuffle(id.begin() + 1, id.end(), r);  // vertex 1 stays the root-side label
    printf("%d\n", n);
    for (int i = 1; i < n; i++) {
        int p = shape == 0 ? r() % i : shape == 1 ? i - 1 : shape == 2 ? 0 : shape == 3 ? (i - 1) / 2 : (i % 3 ? i - 1 : r() % i);
        printf("%d %d\n", id[i], id[p]);
    }
    printf("%d\n", 1 + (int)(r() % n));
}
