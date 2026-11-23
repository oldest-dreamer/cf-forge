#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; long long a = (n % 2) ? 0 : 1; if (!(n % 2)) for (int i = 0; i < n / 2; i++) a *= 2; cout << a << "\n"; }
