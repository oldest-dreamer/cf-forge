#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    int s = atoi(v[1]);
    mt19937 r(s);
    int n = s % 3 == 0 ? 400 + r() % 101 : 2 + r() % 11;
    int k = 1 + r() % (n - 1);
    if (s % 5 == 0) k = n - 1;
    if (s % 7 == 0) k = 1;
    printf("%d %d\n", n, k);
    for (int i = 0; i < n; i++) printf("%d ", (int)(r() % (1 << 30)));
    puts("");
}
