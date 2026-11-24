#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 14 + 1, k = r() % 3 + 1;
    std::string s;
    for (int i = 0; i < n; i++) s += 'a' + r() % k;
    if (r() % 3 == 0) { std::string t = s; std::reverse(t.begin(), t.end()); s = s + t; if (r() % 2) s = s + s; }
    puts(s.c_str());
}
