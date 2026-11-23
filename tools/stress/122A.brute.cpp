#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; int L[] = {4, 7, 44, 47, 74, 77, 444, 447, 474, 477, 744, 747, 774, 777}; bool ok = false; for (int d : L) if (n % d == 0) ok = true; cout << (ok ? "YES" : "NO") << "\n"; }
