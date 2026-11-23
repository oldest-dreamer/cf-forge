#include <bits/stdc++.h>
using namespace std;
int main() { string s; getline(cin, s); int c = 0; for (char x = 'a'; x <= 'z'; x++) if (s.find(x) != string::npos) c++; cout << c << "\n"; }
