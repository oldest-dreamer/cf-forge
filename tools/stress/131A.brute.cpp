#include <bits/stdc++.h>
using namespace std;
int main() { string s; cin >> s; bool allUp = true, restUp = true; for (size_t i = 0; i < s.size(); i++) { if (!isupper(s[i])) { allUp = false; if (i) restUp = false; } }
  if (allUp || (restUp && islower(s[0]))) for (char& c : s) c = isupper(c) ? tolower(c) : toupper(c); cout << s << "\n"; }
