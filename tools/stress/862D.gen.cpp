#include <bits/stdc++.h>
int main(int c, char** v) {
    int s = atoi(v[1]);
    std::mt19937 r(s);
    int n = s % 12 == 0 ? 1000 : 2 + r() % 40;
    std::string t(n, '0');
    int mode = s % 4;
    for (int i = 0; i < n; i++) t[i] = mode == 0 ? '0' + r() % 2 : mode == 1 ? (r() % 20 ? '0' : '1') : mode == 2 ? (r() % 20 ? '1' : '0') : '0' + (i * 7 / n) % 2;
    int a = r() % n, b = r() % n;
    if (a == b) b = (b + 1) % n;
    t[a] = '0';
    t[b] = '1';
    puts(t.c_str());
}
