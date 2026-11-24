#include <bits/stdc++.h>
using namespace std;
mt19937 r;
string table(int d) {
    string s = "<table>";
    int rows = r() % 3 + 1;
    while (rows--) {
        s += "<tr>";
        int cells = r() % 3 + 1;
        while (cells--) {
            s += "<td>";
            if (d < 3 && r() % 3 == 0) s += table(d + 1);
            s += "</td>";
        }
        s += "</tr>";
    }
    return s + "</table>";
}
int main(int c, char** v) {
    r.seed(atoi(v[1]));
    string s = table(0);
    for (size_t i = 0; i < s.size();) {
        size_t len = r() % 12 + 1;
        puts(s.substr(i, len).c_str());
        i += len;
    }
}
