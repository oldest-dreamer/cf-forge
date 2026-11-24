#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    mt19937 r(atoi(v[1]));
    int pr[] = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97};
    vector<int> all(pr, pr + 25);
    shuffle(all.begin(), all.end(), r);
    int k = r() % 8 + 1;
    all.resize(k);
    sort(all.begin(), all.end());
    long long n = r() % 3000 + 1;
    // keep n small enough that the answer stays within 10^18
    typedef unsigned long long ull;
    priority_queue<pair<ull, int>, vector<pair<ull, int>>, greater<>> pq;
    pq.push({1, 0});
    long long cnt = 0;
    while (cnt < n && !pq.empty()) {
        auto [x, last] = pq.top(); pq.pop(); cnt++;
        for (int j = last; j < k; j++) if (x <= 1000000000000000000ULL / all[j]) pq.push({x * all[j], j});
    }
    n = cnt;
    printf("%d\n", k);
    for (int x : all) printf("%d ", x);
    printf("\n%lld\n", n);
}
