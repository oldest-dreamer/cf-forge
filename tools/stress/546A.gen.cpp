#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); printf("%d %d %d\n", int(r() % 1000 + 1), int(r() % 2 ? r() % 1000 : r() % 1000000001), int(r() % 1000 + 1)); }
