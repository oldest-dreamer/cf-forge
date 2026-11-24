#include <bits/stdc++.h>
int main() {
    int t; std::cin >> t;
    while (t--) {
        long long a, b, d; std::cin >> a >> b >> d;
        long long found = -1;
        for (long long x = 0; x < (1LL << 17) && found < 0; x += d)
            if ((a | x) % d == 0 && (b | x) % d == 0) found = x;
        std::cout << found << "\n";
    }
}
