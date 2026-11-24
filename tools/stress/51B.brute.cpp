#include <bits/stdc++.h>
using namespace std;

// Recursive descent on  table -> <table> (<tr> (<td> [table] </td>)+ </tr>)+ </table>
vector<string> tok;
size_t pos = 0;
vector<int> sizes;

int parseTable() {
    pos++;  // <table>
    int cells = 0;
    while (tok[pos] == "<tr>") {
        pos++;
        while (tok[pos] == "<td>") {
            pos++;
            cells++;
            if (tok[pos] == "<table>") cells += 0, parseTable();
            pos++;  // </td>
        }
        pos++;  // </tr>
    }
    pos++;  // </table>
    sizes.push_back(cells);
    return cells;
}

int main() {
    string all, part;
    while (cin >> part) all += part;
    for (size_t i = 0; i < all.size();) {
        size_t j = all.find('>', i);
        tok.push_back(all.substr(i, j - i + 1));
        i = j + 1;
    }
    parseTable();
    sort(sizes.begin(), sizes.end());
    for (size_t i = 0; i < sizes.size(); i++) cout << sizes[i] << (i + 1 < sizes.size() ? ' ' : '\n');
}
