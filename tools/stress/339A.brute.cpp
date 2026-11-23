#include <bits/stdc++.h>
using namespace std;
int main() { string s; cin >> s; vector<int> v; stringstream ss(s); string tok; while (getline(ss, tok, '+')) v.push_back(stoi(tok)); sort(v.begin(), v.end()); for (size_t i = 0; i < v.size(); i++) cout << (i ? "+" : "") << v[i]; cout << "\n"; }
