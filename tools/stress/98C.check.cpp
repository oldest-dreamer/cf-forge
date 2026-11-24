#include <bits/stdc++.h>
using namespace std;
// "My poor head =(" must match exactly; otherwise compare as reals (1e-6)
int main(int c, char** v) {
    ifstream out(v[2]), ans(v[3]);
    string a, b; getline(ans, a); getline(out, b);
    while (!a.empty() && isspace(a.back())) a.pop_back();
    while (!b.empty() && isspace(b.back())) b.pop_back();
    if (!a.empty() && a[0] == 'M') return a == b ? 0 : 1;
    if (b.empty() || b[0] == 'M') return 1;
    double x = stod(a), y = stod(b);
    return fabs(x - y) <= 1e-6 * max(1.0, fabs(x)) ? 0 : 1;
}
