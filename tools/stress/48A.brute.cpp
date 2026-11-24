#include <bits/stdc++.h>
using namespace std;

// A winner exists only when exactly two different gestures appear, and the winner is the
// only player showing the winning one (the other two show the loser).
int main() {
    string a[3];
    cin >> a[0] >> a[1] >> a[2];
    set<string> kinds(a, a + 3);
    if (kinds.size() != 2) { cout << "?\n"; return 0; }
    auto beats = [](const string& x, const string& y) {
        return (x == "rock" && y == "scissors") || (x == "scissors" && y == "paper") || (x == "paper" && y == "rock");
    };
    string name = "FMS";
    for (int i = 0; i < 3; i++) {
        int same = 0;
        for (int j = 0; j < 3; j++) same += a[j] == a[i];
        if (same == 1 && beats(a[i], a[(i + 1) % 3] == a[i] ? a[(i + 2) % 3] : a[(i + 1) % 3])) {
            cout << name[i] << "\n";
            return 0;
        }
    }
    cout << "?\n";
}
