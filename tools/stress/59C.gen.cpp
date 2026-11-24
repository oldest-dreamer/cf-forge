#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    mt19937 r(atoi(v[1]));
    int k = r() % 4 + 1, n = r() % 8 + 1;
    string s(n, '?');
    int mode = r() % 3;
    for (int i = 0; i < n; i++) if (r() % 3 == 0) s[i] = 'a' + r() % k;
    if (mode == 0)  // make it palindromic-compatible most of the time
        for (int i = 0; i < n; i++) if (s[i] != '?' && s[n - 1 - i] == '?') s[n - 1 - i] = s[i];
    printf("%d\n%s\n", k, s.c_str());
}
