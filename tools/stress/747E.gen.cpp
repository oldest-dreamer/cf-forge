#include <bits/stdc++.h>
using namespace std;
mt19937 r;
string out;
void comment(int d, int& budget) {
    string w; int L = r() % 2 + 1; for (int i = 0; i < L; i++) w += char('a' + r() % 3 + (r() % 2 ? 0 : -32));
    out += w + ",";
    budget--;
    int k = (d < 4 && budget > 0 && r() % 2) ? r() % 3 + 1 : 0;
    out += to_string(k);
    for (int i = 0; i < k; i++) { out += ","; comment(d + 1, budget); }
}
int main(int c, char** v) {
    r.seed(atoi(v[1]));
    int roots = r() % 3 + 1, budget = 12;
    for (int i = 0; i < roots; i++) { if (i) out += ","; comment(0, budget); }
    puts(out.c_str());
}
