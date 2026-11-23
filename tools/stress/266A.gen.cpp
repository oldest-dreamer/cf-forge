#include <bits/stdc++.h>
using namespace std;
int main(int argc, char** argv) {
    mt19937 rng(atoi(argv[1]));
    int n = rng() % 50 + 1, colors = rng() % 3 + 1;
    string s;
    for (int i = 0; i < n; i++) s += "RGB"[rng() % colors];
    printf("%d\n%s\n", n, s.c_str());
}
