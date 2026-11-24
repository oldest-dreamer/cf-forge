#include <bits/stdc++.h>
using namespace std;
int main(int c, char** v) {
    mt19937 r(atoi(v[1]));
    const char* g[] = {"rock", "paper", "scissors"};
    for (int i = 0; i < 3; i++) puts(g[r() % 3]);
}
