#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int bl = r() % 3 + 1;
    std::string base;
    for (int i = 0; i < bl; i++) base += 'a' + r() % 2;
    auto make = [&]() {
        std::string s;
        int k = r() % 6 + 1;
        for (int i = 0; i < k; i++) s += base;
        if (r() % 4 == 0) s[r() % s.size()] ^= 1;  // sometimes break it
        return s;
    };
    puts(make().c_str());
    puts(make().c_str());
}
