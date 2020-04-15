// 线性的递归和迭代 - 计算过程的递归与迭代，而不是语法形式上
const factorialRecursion = n => {
  if (n == 1) {
    return 1;
  }

  return n * factorialRecursion(n - 1);
}

const factorialIteration = n => {
  const iter = (product, counter, maxCount) => {
    if (counter > maxCount) {
      return product;
    }
    return iter(product * counter, counter + 1, maxCount);
  }

  return iter(1, 1, n);
}

console.log(factorialRecursion(10));
console.log(factorialIteration(10));

// 练习1.10 Ackermann函数
const A = (x, y) => {
  // console.log(x, y);                                                                                                                                      
  if (y === 0) {
    return 0;
  }

  if (x === 0) {
    return 2 * y;
  }

  if (y === 1) {
    return 2;
  }

  return A(x - 1, A(x, y - 1));
}

console.log(A(1, 10)); // A(1, n) => 2 ** n
console.log(A(2, 4)); // A(2, n) => A(1, A(2, 3)) => A(1, A(1, A(2, 2))) => A(1, A(1, A(1, A(2, 1)))) => A(1, A(1, A(1, 2))) => A(1, A(1, 4))) => A(1, 16) => 2 ** 16
console.log(A(3, 3));

// const f = n => A(0, n); // 2 * n
// const g = n => A(1, n); // 2 ** n
// const h = n => A(2, n); // 2 ** (2 ** n)

// 树形递归
const fibRecursion = n => {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibRecursion(n - 1) + fibRecursion(n - 2);
}

const fibIteration = n => {
  const iter = (a, b, count) => {
    if (count === 0) {
      return b;
    }
    return iter(a + b, a, count - 1);
  };

  return iter(1, 0, n);
}

console.log(fibRecursion(10));
console.log(fibIteration(10));

// 换零钱
const countChange = amount => {
  const firstDenomination = kindsOfCoins => [0, 1, 5, 10, 25, 50][kindsOfCoins];
  const cc = (amount, kindsOfCoins) => {
    if (amount === 0) return 1;
    if (amount < 0 || kindsOfCoins === 0) return 0;

    return cc(amount, kindsOfCoins - 1) + cc(amount - firstDenomination(kindsOfCoins), kindsOfCoins);
  }

  return cc(amount, 5);
};

console.log(countChange(100));

// 练习1.11
const fRecursion = n => {
  if (n < 3) return n;
  return fRecursion(n - 1) + 2 * fRecursion(n - 2) + 3 * fRecursion(n - 3);
}

const fIteration = n => {
  const iter = (a, b, c, count) => {
    if (count === 0) {
      return c;
    }

    return iter(a + 2 * b + 3 * c, a, b, count - 1);
  };

  return iter(2, 1, 0, n);
}

console.log(fRecursion(10));
console.log(fIteration(10));

// 求幂
const exptRecursion = (b, n) => {
  if (n === 0) return 1;
  return b * exptRecursion(b, n - 1);
}

const exptIteration = (b, n) => {
  const iter = (b, n, product) => {
    if (n === 0) {
      return product;
    }

    return iter(b, n - 1, product * b);
  }

  return iter(b, n, 1);
}

const fastExpt = (b, n) => {
  if (n === 0) return 1;
  if (n % 2 === 0) {
    return fastExpt(b, n / 2) ** 2;
  }

  return b * fastExpt(b, n - 1);
}

// 练习1.16
const fastExptIteration = (b, n) => {
  const iter = (b, n, a) => {
    if (n === 0) return a;
    if (n % 2 === 0) {
      return iter(b * b, n / 2, a);
    }

    return iter(b, n - 1, a * b);
  }

  return iter(b, n, 1);
}

console.log(exptRecursion(2, 11));
console.log(exptIteration(2, 11));
console.log(fastExpt(2, 11));
console.log(fastExptIteration(2, 11));

// 练习1.17
const multi = (a, b) => {
  if (b === 0) return 0;
  return a + multi(a, b - 1);
}

const double = x => x * 2;
const halve = x => x / 2;

const mutiFast = (a, b) => {
  if (b == 0) return 0;
  if (b % 2 === 0) {
    return double(mutiFast(a, halve(b)));
  }
  return a + mutiFast(a, b - 1);
}

console.log(multi(3, 5));
console.log(mutiFast(3, 5));

// 练习1.18
const fastBuilder = (f, g, initValue) => (a, b) => {
  const iter = (b, n, a) => {
    if (n === 0) return a;
    if (n % 2 === 0) {
      return iter(f(b), halve(n), a);
    }

    return iter(b, n - 1, g(a, b));
  }

  return iter(a, b, initValue);
}

const originMulti = (a, b) => a * b;
const square = a => a ** 2;

// fastExptIteration
console.log(fastBuilder(square, originMulti, 1)(2, 11));

const add = (a, b) => a + b;
// fastMulti
console.log('fastMulti', fastBuilder(double, add, 0)(2, 11));

// 练习1.19
const fastFib = n => {
  const iter = (a, b, p, q, count) => {
    if (count === 0) return b;
    if (count % 2 === 0) {
      return iter(a, b, p * p + q * q, 2 * p * q + q * q, count / 2);
    }

    return iter(b * q + a * q + a * p, b * p + a * q, p, q, count - 1);
  };

  return iter(1, 0, 0, 1, n)
}

console.log(fibRecursion(10), fibIteration(10), 'fastFib', fastFib(10));

const gcd = (a, b) => {
  if (b === 0) return a;
  return gcd(b, a % b);
}

console.log(gcd(206, 40))

// 练习1.20
// todo: 学完lazy compute再来~

const smallestDivider = n => {
  const iter = (n, testDivider) => {
    if (testDivider ** 2 > n) return n;
    if (n % testDivider === 0) {
      return testDivider;
    }
    return iter(n, testDivider + 1);
  }

  return iter(n, 2);
}

const isPrime = n => n === smallestDivider(n);

console.log(isPrime(103));

// (a * b) % m === (a % m) * (b % m) % m
const expmod = (base, exp, m) => {
  if (exp === 0) return 1;
  if (exp % 2 === 0) return (expmod(base, exp / 2, m) ** 2) % m;
  return (base * expmod(base, exp - 1, m)) % m;
}

const random = n => Math.ceil(Math.random() * (n - 1));

const fermatTest = n => {
  const tryIt = a => expmod(a, n, n) === a;
  return tryIt(random(n) + 1);
}

const fastIsPrime = (n, times) => {
  if (times === 0) return true;
  if (fermatTest(n)) {
    return fastIsPrime(n, times - 1);
  }

  return false;
}

console.log(fastIsPrime(103, 10));

// 练习1.21
console.log(smallestDivider(199), smallestDivider(1999), smallestDivider(19999))