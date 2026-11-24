#include <bits/stdc++.h>
int main(int c, char** v) {
    int a[6] = {4, 8, 15, 16, 23, 42};
    int k = (atoi(v[1]) - 1) % 720;
    for (int i = 0; i < k; i++) std::next_permutation(a, a + 6);
    for (int x : a) printf("%d ", x);
    puts("");
}
