/**
 * Clang ships libc++, which has no <bits/stdc++.h>. Competitive programmers
 * use it everywhere, so we provide one, plus a few GCC-only helpers.
 */
export const BITS_STDCXX = `#pragma once
#include <algorithm>
#include <array>
#include <bit>
#include <bitset>
#include <cassert>
#include <cctype>
#include <cfloat>
#include <climits>
#include <cmath>
#include <complex>
#include <cstdint>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <ctime>
#include <deque>
#include <functional>
#include <iomanip>
#include <iostream>
#include <istream>
#include <iterator>
#include <limits>
#include <list>
#include <map>
#include <memory>
#include <numeric>
#include <optional>
#include <ostream>
#include <queue>
#include <random>
#include <ranges>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <string_view>
#include <tuple>
#include <type_traits>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>

// GCC-only helpers that libc++ does not have.
namespace std {
template <class T> inline T __gcd(T a, T b) { while (b) { T t = a % b; a = b; b = t; } return a < 0 ? -a : a; }
inline int __lg(unsigned long long x) { return 63 - __builtin_clzll(x); }
}
`;
