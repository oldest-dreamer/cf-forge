#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); printf("%d %d %d\n", int(r() % 100 + 1), int(r() % 100 + 1), int(r() % 60 + 1)); }
