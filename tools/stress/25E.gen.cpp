#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int k = r() % 2 + 1;
    std::string base;
    int bl = r() % 12 + 1;
    for (int i = 0; i < bl; i++) base += 'a' + r() % k;
    for (int t = 0; t < 3; t++) {
        std::string s;
        if (r() % 2) { int l = r() % bl, len = r() % (bl - l) + 1; s = base.substr(l, len); }
        else { int len = r() % 6 + 1; for (int i = 0; i < len; i++) s += 'a' + r() % (k + 1); }
        puts(s.c_str());
    }
}
