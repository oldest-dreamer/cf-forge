// Random input for 158A: sorted non-increasing scores with many ties and zeros.
#include <bits/stdc++.h>
using namespace std;
int main(int argc, char** argv) {
    mt19937 rng(atoi(argv[1]));
    int n = rng() % 50 + 1, k = rng() % n + 1;
    int top = rng() % 4 == 0 ? 0 : rng() % 101;
    vector<int> a(n);
    for (auto& x : a) x = rng() % (top + 1);
    if (rng() % 3 == 0) for (auto& x : a) x = min(x, (int)(rng() % 3));   // lots of 0/1/2
    sort(a.rbegin(), a.rend());
    printf("%d %d\n", n, k);
    for (int i = 0; i < n; i++) printf("%d%c", a[i], i + 1 == n ? '\n' : ' ');
}
