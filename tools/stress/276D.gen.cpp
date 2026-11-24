#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); long long l = r() % 5000 + 1, len = r() % 300; printf("%lld %lld\n", l, l + len); }
