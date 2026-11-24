#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    mt19937 r(atoi(v[1]));
    vector<string> out;
    int depth = 0, steps = r() % 12 + 1;
    bool thrown = false;
    auto sp = [&]() { return string(r() % 3, ' '); };
    const char* T[] = {"A", "B", "C"};
    auto catchLine = [&]() {
        string ty = T[r() % 3];
        string msg = "m" + to_string(out.size() + 1) + (r() % 2 ? " x" : "");
        out.push_back(sp() + "catch" + sp() + "(" + sp() + ty + sp() + "," + sp() + "\"" + msg + "\"" + sp() + ")" + sp());
    };
    for (int s = 0; s < steps || depth > 0; s++) {
        if (s >= steps) { catchLine(); depth--; continue; }
        int k = r() % 6; if (k == 5) k = (depth > 0 && !thrown) ? 3 : 4;
        if (k <= 1) { out.push_back(sp() + "try" + sp()); depth++; }
        else if (k == 2 && depth > 0) { catchLine(); depth--; }
        else if (k == 3 && !thrown) { out.push_back(sp() + "throw" + sp() + "(" + sp() + T[r() % 3] + sp() + ")" + sp()); thrown = true; }
        else if (k == 4) out.push_back("");
    }
    if (out.empty()) out.push_back("try"), out.push_back("catch(A,\"m2\")");
    printf("%d\n", (int)out.size());
    for (auto& l : out) puts(l.c_str());
}
