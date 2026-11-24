#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    mt19937 r(atoi(v[1]));
    int k = r() % 5 + 1;
    string s;
    for (int i = 0; i < k; i++) {
        int L = r() % 3 + 1;
        for (int j = 0; j < L; j++) s += char('a' + r() % 26);
        long long d = r() % 3 == 0 ? r() % 10 : r() % 5000000;
        string ds = to_string(d), g;
        for (size_t q = 0; q < ds.size(); q++) {
            if (q && (ds.size() - q) % 3 == 0) g += '.';
            g += ds[q];
        }
        s += g;
        if (r() % 2) { char b[8]; sprintf(b, ".%02d", (int)(r() % 100)); s += b; }
    }
    puts(s.c_str());
}
