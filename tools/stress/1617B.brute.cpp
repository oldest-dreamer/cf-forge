#include <bits/stdc++.h>
using namespace std;
int main() { int t; cin >> t; while (t--) { long long n; cin >> n; for (long long a = 2;; a++) { long long b = n - 1 - a; if (b > 1 && b != a && gcd(a, b) == 1) { cout << a << " " << b << " 1\n"; break; } } } }
