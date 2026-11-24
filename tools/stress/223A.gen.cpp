#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    mt19937 r(atoi(v[1]));
    int n = r() % 14 + 1;
    string s;
    for (int i = 0; i < n; i++) s += "()[]"[r() % 4];
    puts(s.c_str());
}
