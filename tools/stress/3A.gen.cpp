#include <bits/stdc++.h>
int main(int c, char** v) { std::mt19937 r(atoi(v[1])); printf("%c%c\n%c%c\n", char('a' + r() % 8), char('1' + r() % 8), char('a' + r() % 8), char('1' + r() % 8)); }
