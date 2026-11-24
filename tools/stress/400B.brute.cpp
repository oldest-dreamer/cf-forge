#include <bits/stdc++.h>
using namespace std;

// Play the game literally. In a move every dwarf that is not on a candy walks right, all together,
// until one of them lands on a candy or reaches the right wall.
int main() {
    int n, m;
    cin >> n >> m;
    vector<int> g(n), s(n);
    for (int i = 0; i < n; i++) {
        string row;
        cin >> row;
        g[i] = row.find('G');
        s[i] = row.find('S');
    }
    int moves = 0;
    while (true) {
        int k = INT_MAX;
        for (int i = 0; i < n; i++)
            if (g[i] != s[i]) k = min(k, g[i] < s[i] ? s[i] - g[i] : m - 1 - g[i]);
        if (k == INT_MAX) break;  // everyone is on a candy
        for (int i = 0; i < n; i++)
            if (g[i] != s[i]) {
                if (g[i] > s[i] && g[i] + k == m - 1) { cout << -1 << "\n"; return 0; }
                g[i] += k;
            }
        // a dwarf stuck at the wall right of its candy cannot ever finish
        for (int i = 0; i < n; i++)
            if (g[i] > s[i] && g[i] == m - 1) { cout << -1 << "\n"; return 0; }
        moves++;
    }
    cout << moves << "\n";
}
