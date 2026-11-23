// Reference using __int128 and an explicit counting loop for the ceiling when small.
#include <bits/stdc++.h>
using namespace std;
long long cnt(long long x, long long a) { if (x / a < 1000000) { long long c = 0; while ((__int128)c * a < x) c++; return c; } return x / a + (x % a > 0); }
int main() { long long n, m, a; cin >> n >> m >> a; cout << (long long)((__int128)cnt(n, a) * cnt(m, a)) << "\n"; }
