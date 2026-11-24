#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    const char* al = "aAb1";
    int k = r() % 4 + 1;
    std::string s;
    if (r() % 2) {  // build nested palindromes
        s = std::string(1, al[r() % k]);
        while (s.size() < 40) { std::string t = s; std::reverse(t.begin(), t.end()); s = s + (r() % 2 ? std::string(1, al[r() % k]) : "") + t; }
        s = s.substr(0, r() % s.size() + 1);
    } else {
        int n = r() % 30 + 1;
        for (int i = 0; i < n; i++) s += al[r() % k];
    }
    puts(s.c_str());
}
