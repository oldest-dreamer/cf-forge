#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    ifstream in(v[1]), out(v[2]), ans(v[3]);
    long long a, b; in >> a >> b;
    string o, w; ans >> w; if (!(out >> o)) return 1;
    for (auto& ch : o) ch = toupper(ch);
    if (o != w) return 1;
    if (o == "NO") return 0;
    long long X[3], Y[3];
    for (int i = 0; i < 3; i++) if (!(out >> X[i] >> Y[i]) || llabs(X[i]) > 1000000000 || llabs(Y[i]) > 1000000000) return 1;
    vector<long long> L;
    for (int i = 0; i < 3; i++) {
        long long dx = X[(i + 1) % 3] - X[i], dy = Y[(i + 1) % 3] - Y[i];
        if (dx == 0 || dy == 0) return 1;
        L.push_back(dx * dx + dy * dy);
    }
    sort(L.begin(), L.end());
    vector<long long> want = {min(a, b) * min(a, b), max(a, b) * max(a, b), a * a + b * b};
    return L == want ? 0 : 1;
}
