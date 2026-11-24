#include <bits/stdc++.h>
// Compares every token as a real number with 1e-6 absolute or relative tolerance.
int main(int c, char** v) { std::ifstream out(v[2]), ans(v[3]); std::string a, b; while (ans >> a) { if (!(out >> b)) return 1; double x = std::stod(a), y = std::stod(b); if (std::fabs(x - y) > 1e-6 * std::max(1.0, std::fabs(x))) return 1; } if (out >> b) return 1; return 0; }
