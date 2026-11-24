#include <bits/stdc++.h>
using namespace std;

// Natural recursive reading: comment := text , k , comment*k
vector<string> tok;
size_t pos = 0;
vector<vector<string>> level;

void comment(int d) {
    if (level.size() <= (size_t)d) level.resize(d + 1);
    level[d].push_back(tok[pos]);
    int k = stoi(tok[pos + 1]);
    pos += 2;
    while (k--) comment(d + 1);
}

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);
    string t;
    while (getline(ss, t, ',')) tok.push_back(t);
    while (pos < tok.size()) comment(0);
    cout << level.size() << "\n";
    for (auto& v : level)
        for (size_t i = 0; i < v.size(); i++) cout << v[i] << (i + 1 < v.size() ? " " : "\n");
}
