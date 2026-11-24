#include <bits/stdc++.h>
using namespace std;

// Pop numbers from a min-heap in increasing order; only practical when n is small.
int main() {
    int k;
    cin >> k;
    vector<int> p(k);
    for (auto& x : p) cin >> x;
    long long n;
    cin >> n;
    typedef unsigned long long ull;
    priority_queue<pair<ull, int>, vector<pair<ull, int>>, greater<>> pq;  // (value, index of last prime used)
    pq.push({1, 0});
    ull ans = 0;
    while (n--) {
        auto [x, last] = pq.top();
        pq.pop();
        ans = x;
        for (int j = last; j < k; j++)
            if (x <= 1000000000000000000ULL / p[j]) pq.push({x * p[j], j});  // stay within 10^18
    }
    cout << ans << "\n";
}
