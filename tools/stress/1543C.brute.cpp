#include <bits/stdc++.h>
using namespace std;

// Walk every sequence of draws explicitly, accumulating P(sequence) * length.
struct State { double c, m, p, prob; int races; };

int main() {
    int t;
    cin >> t;
    while (t--) {
        double c, m, p, v;
        cin >> c >> m >> p >> v;
        vector<State> todo = {{c, m, p, 1, 0}};
        double ans = 0;
        while (!todo.empty()) {
            State s = todo.back();
            todo.pop_back();
            ans += s.prob * s.p * (s.races + 1);  // pink drawn now
            for (int which = 0; which < 2; which++) {
                double x = which == 0 ? s.c : s.m, y = which == 0 ? s.m : s.c;
                if (x <= 1e-9) continue;
                double nx, ny, np;
                if (x <= v + 1e-12) {  // the slip disappears
                    nx = 0;
                    if (y > 1e-9) ny = y + x / 2, np = s.p + x / 2;
                    else ny = y, np = s.p + x;
                } else {
                    nx = x - v;
                    if (y > 1e-9) ny = y + v / 2, np = s.p + v / 2;
                    else ny = y, np = s.p + v;
                }
                State nxt = which == 0 ? State{nx, ny, np, s.prob * x, s.races + 1} : State{ny, nx, np, s.prob * x, s.races + 1};
                todo.push_back(nxt);
            }
        }
        printf("%.12f\n", ans);
    }
    return 0;
}
