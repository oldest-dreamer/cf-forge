#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int n = r() % 12 + 1;
    const char* words[] = {"a", "ab", "b", "abc", "xy"};
    int k = r() % 5 + 1;
    printf("%d\n", n);
    for (int i = 0; i < n; i++) printf("%s%c", words[r() % k], i + 1 < n ? ' ' : '\n');
}
