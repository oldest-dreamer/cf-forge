#include <bits/stdc++.h>
using namespace std;
int main() { int n; cin >> n; while (n--) { string s; cin >> s; if (s.length() <= 10) { cout << s << "\n"; continue; } string mid = to_string(s.length() - 2); cout << s[0] << mid << s[s.length() - 1] << "\n"; } }
