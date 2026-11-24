#include <bits/stdc++.h>
int main(int c, char** v) {
    std::mt19937 r(atoi(v[1]));
    int t = 3; printf("%d\n", t);
    while (t--) {
        int n = r() % 8 + 1; printf("%d\n", n);
        std::vector<std::string> names = {"a", "b", "c"}; std::vector<std::string> defined;
        for (int i = 0; i < n; i++) {
            std::string x = names[r() % 3];
            if (defined.empty() || r() % 3 == 0) { int len = r() % 5 + 1; std::string s; for (int j = 0; j < len; j++) s += "ha"[r() % 2]; printf("%s := %s\n", x.c_str(), s.c_str()); }
            else printf("%s = %s + %s\n", x.c_str(), defined[r() % defined.size()].c_str(), defined[r() % defined.size()].c_str());
            if (std::find(defined.begin(), defined.end(), x) == defined.end()) defined.push_back(x);
        }
    }
}
