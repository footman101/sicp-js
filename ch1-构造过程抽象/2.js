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
  };

  if (y === 1) {
    return 2;
  }

  return A(x - 1, A(x, y - 1));
}

console.log(A(1, 10)); // A(1, n) => 2 ** n
console.log(A(2, 4)); // A(2, n) => A(1, A(2, 3)) => A(1, A(1, A(2, 2))) => A(1, A(1, A(1, A(2, 1)))) => A(1, A(1, A(1, 2))) => A(1, A(1, 4))) => A(1, 16) => 2 ** 16
console.log(A(3, 3));

const f = n => A(0, n); // 2 * n
const g = n => A(1, n); // 2 ** n
const h = n => A(2, n); // 2 ** (2 ** n)

// 树形递归
const fibRecursion = n => {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibRecursion(n - 1) + fibRecursion(n - 2);
}

const fibIteration = n => {
  const iter = (a, b, count) => {
    if (count === 1) {
      return a;
    }
    return iter(a + b, a, count - 1);
  };

  return iter(1, 0, n);
}

console.log(fibRecursion(10));
console.log(fibIteration(10));