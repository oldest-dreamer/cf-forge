#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); auto g = [&] { return r() % 3 ? (long long)(r() % 60 + 1) : (long long)(r() % 1000000000 + 1); }; printf("%lld %lld %lld\n", g(), g(), g()); }
