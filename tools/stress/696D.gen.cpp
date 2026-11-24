#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 3 + 1, l = r() % 7 + 1;
    printf("%d %d\n", n, l);
    for (int i = 0; i < n; i++) printf("%d ", (int)(r() % 10 + 1)); puts("");
    for (int i = 0; i < n; i++) { int len = r() % 3 + 1; std::string s; for (int j = 0; j < len; j++) s += 'a' + r() % 2; puts(s.c_str()); }
}
