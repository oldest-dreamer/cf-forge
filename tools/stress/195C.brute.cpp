#include <bits/stdc++.h>
using namespace std;

static string trim(const string& s) {
    size_t a = s.find_first_not_of(" \t\r"), b = s.find_last_not_of(" \t\r");
    return a == string::npos ? "" : s.substr(a, b - a + 1);
}

// Pass 1 pairs every catch with its try. Pass 2 looks for the first catch after the throw
// whose try started before the throw and whose type fits.
int main() {
    string line;
    getline(cin, line);
    int n = stoi(line);
    vector<string> L(n);
    for (auto& s : L) {
        getline(cin, s);
        s = trim(s);
    }
    vector<int> tryOf(n, -1), st;
    int th = -1;
    string type;
    for (int i = 0; i < n; i++) {
        if (L[i].compare(0, 3, "try") == 0) st.push_back(i);
        else if (L[i].compare(0, 5, "catch") == 0) { tryOf[i] = st.back(); st.pop_back(); }
        else if (L[i].compare(0, 5, "throw") == 0) {
            th = i;
            size_t l = L[i].find('('), r = L[i].find(')');
            type = trim(L[i].substr(l + 1, r - l - 1));
        }
    }
    for (int i = th + 1; th >= 0 && i < n; i++) {
        if (tryOf[i] < 0 || tryOf[i] > th) continue;
        size_t l = L[i].find('('), c = L[i].find(',');
        if (trim(L[i].substr(l + 1, c - l - 1)) != type) continue;
        size_t q1 = L[i].find('"'), q2 = L[i].find('"', q1 + 1);
        cout << L[i].substr(q1 + 1, q2 - q1 - 1) << "\n";
        return 0;
    }
    cout << "Unhandled Exception\n";
}
