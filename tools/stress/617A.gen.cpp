#include <bits/stdc++.h>
using namespace std;
int main(int argc, char** argv) { mt19937 rng(atoi(argv[1])); int x = rng() % 3 ? rng() % 100 + 1 : rng() % 1000000 + 1; printf("%d\n", x); }
