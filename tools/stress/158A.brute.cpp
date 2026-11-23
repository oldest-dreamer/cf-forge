// Reference: count people whose score >= k-th score and > 0.
#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k; cin >> n >> k;
    vector<int> a(n); for (auto& x : a) cin >> x;
    int c = 0; for (int i = 0; i < n; i++) if (a[i] >= a[k - 1] && a[i] > 0) c++;
    cout << c << "\n";
}
