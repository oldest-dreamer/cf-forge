#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    while (true) {
        int n = r() % 8 + 1;
        std::vector<std::pair<std::string, int>> rs;
        std::map<std::string, int> fin;
        for (int i = 0; i < n; i++) {
            std::string name(1, 'a' + r() % 3);
            int s = (int)(r() % 9) - 3;
            rs.push_back({name, s});
            fin[name] += s;
        }
        bool pos = false;
        for (auto& kv : fin) pos |= kv.second > 0;
        if (!pos) continue;
        printf("%d\n", n);
        for (auto& [a, b] : rs) printf("%s %d\n", a.c_str(), b);
        return 0;
    }
}
