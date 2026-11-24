#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    for (char& ch : s)
        if (isalpha((unsigned char)ch)) ch = ' ';  // letters become separators
    istringstream in(s);
    long long cents = 0;
    string p;
    while (in >> p) {
        // a dot followed by exactly two digits at the very end is the cents separator
        string dollars = p, cc = "00";
        if (p.size() >= 3 && p[p.size() - 3] == '.') {
            cc = p.substr(p.size() - 2);
            dollars = p.substr(0, p.size() - 3);
        }
        dollars.erase(remove(dollars.begin(), dollars.end(), '.'), dollars.end());
        cents += stoll(dollars) * 100 + stoll(cc);
    }
    // print dollars with a dot before every group of three digits, counted from the right
    function<string(long long)> group = [&](long long d) -> string {
        if (d < 1000) return to_string(d);
        char buf[8];
        snprintf(buf, sizeof buf, "%03lld", d % 1000);
        return group(d / 1000) + "." + buf;
    };
    string out = group(cents / 100);
    if (cents % 100) {
        char buf[8];
        snprintf(buf, sizeof buf, ".%02lld", cents % 100);
        out += buf;
    }
    cout << out << "\n";
}
