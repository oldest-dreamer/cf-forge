#include <bits/stdc++.h>
std::mt19937 r;
void build(int leaves, std::vector<std::string>& w) { if (leaves == 1) { w.push_back("int"); return; } w.push_back("pair"); int a = r() % (leaves - 1) + 1; build(a, w); build(leaves - a, w); }
int main(int c, char** v) { r.seed(atoi(v[1])); int n = r() % 6 + 1; std::vector<std::string> w; build(n, w); if (r() % 3 == 0) { int i = r() % w.size(); w[i] = w[i] == "int" ? "pair" : "int"; n = 0; for (auto& x : w) n += x == "int"; } printf("%d\n", n); for (auto& x : w) printf("%s ", x.c_str()); puts(""); }
