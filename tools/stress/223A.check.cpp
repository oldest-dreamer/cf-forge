#include <bits/stdc++.h>
using namespace std;
// check input output answer: the count must equal the jury's, and the printed text must be a
// substring of the input that is a regular bracket sequence with exactly that many '['.
int main(int, char** v) {
    ifstream in(v[1]), out(v[2]), ans(v[3]);
    string s, t;
    int c1, c2;
    in >> s;
    if (!(ans >> c1)) return 1;
    if (!(out >> c2) || c1 != c2) return 1;
    out >> t;
    if (!t.empty() && s.find(t) == string::npos) return 1;
    vector<char> st;
    int cnt = 0;
    for (char c : t) {
        if (c == '(' || c == '[') { st.push_back(c); cnt += c == '['; }
        else if (!st.empty() && ((c == ')' && st.back() == '(') || (c == ']' && st.back() == '['))) st.pop_back();
        else return 1;
    }
    return (st.empty() && cnt == c1) ? 0 : 1;
}
