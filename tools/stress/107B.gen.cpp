#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int m = r() % 4 + 1, h = r() % m + 1;
    std::vector<int> s(m + 1);
    int tot = 0;
    for (int i = 1; i <= m; i++) s[i] = r() % 4 + 1, tot += s[i];
    int n = r() % (tot + 2) + 1;
    printf("%d %d %d\n", n, m, h);
    for (int i = 1; i <= m; i++) printf("%d ", s[i]);
    printf("\n");
}
