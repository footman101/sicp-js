const sum = (term, a, next, b) => {
  if (a > b) return 0;
  return term(a) + sum(term, next(a), next, b);
}

const inc = n => n + 1;
const cube = n => n ** 3;

const sumCubes = (a, b) => sum(cube, a, inc, b);

const identity = x => x;
const sumIntegers = (a, b) => sum(identity, a, inc, b);

console.log(sumCubes(1, 3));
console.log(sumIntegers(1, 3));

// 1/(1*3) + 1/(5*7) + 1/(9*11) + ...    =>    pi/8
const piSum = (a, b) => sum((x) => 1 / ((x + 2) * x), a, x => x + 4, b);
console.log('pi =', piSum(1, 10000) * 8);

// 积分
const integral = (f, a, b, dx) => dx * sum(f, (a + dx / 2), x => x + dx, b);
const square = x => x ** 2;

console.log(integral(identity, 0, 1, 0.001));
console.log(integral(square, 0, 1, 0.001));
console.log(integral(cube, 0, 1, 0.001));

// 练习1.29
const simpsonIntegral = (f, a, b, n) => {
  const h = (b - a) / n;
  const term = k => {
    if (k % 2 === 0) {
      return 2 * f(a + k * h);
    }
    return 4 * f(a + k * h);
  }
  return h * (f(a) + sum(term, 1, inc, n - 1) + f(a + n * h)) / 3;
}

console.log(simpsonIntegral(identity, 0, 1, 1000));
console.log(simpsonIntegral(square, 0, 1, 1000));
console.log(simpsonIntegral(cube, 0, 1, 1000));


// 练习1.30
const sumIteration = (term, a, next, b) => {
  const iter = (a, result) => {
    if (a > b) {
      return result;
    }

    return iter(next(a), result + term(a))
  }

  return iter(a, 0);
}

console.log(sumIteration(cube, 1, inc, 3));

// 练习1.31
const product = (term, a, next, b) => {
  const iter = (a, result) => {
    if (a > b) {
      return result;
    }

    return iter(next(a), result * term(a))
  }

  return iter(a, 1);
}

console.log(product(identity, 1, inc, 5));
console.log('pi =', 4 * product(n => n * 2 * (n + 1) * 2, 1, inc, 10) / product(n => (n * 2 + 1) ** 2, 1, inc, 10));

// 练习1.32
const accumulate = (combiner, nullValue, term, a, next, b) => {
  const iter = (a, result) => {
    if (a > b) {
      return result;
    }

    return iter(next(a), combiner(result, term(a)));
  }

  return iter(a, nullValue);
}
const multi = (a, b) => a * b;
console.log(accumulate(multi, 1, identity, 1, inc, 5));

// 练习1.33
const filteredAccumulate = (filter, combiner, nullValue, term, a, next, b) => {
  const iter = (a, result) => {
    if (a > b) {
      return result;
    }

    return iter(next(a), filter(term(a)) ? combiner(result, term(a)) : result);
  }

  return iter(a, nullValue);
}

const isEven = n => n % 2 === 0;
console.log(filteredAccumulate(isEven, multi, 1, identity, 1, inc, 5));

// 练习1.34
const f = g => g(2);
try{
  f(f);
} catch(e) {
  console.log(e);
}

const closeEnough = (a, b) => Math.abs(a - b) < 0.000001;
const search = (f, negPoint, posPoint) => {
  const midPoint = (negPoint + posPoint) / 2;
  if (closeEnough(negPoint, posPoint)) {
    return midPoint;
  }

  const testValue = f(midPoint);
  if (testValue > 0) {
    return search(f, negPoint, midPoint);
  } else if (testValue < 0) {
    return search(f, midPoint, posPoint);
  }

  return midPoint;
}
const halfIntervalMethod = (f, a, b) => {
  const aValue = f(a);
  const bValue = f(b);

  if (aValue < 0 && bValue > 0) {
    return search(f, a, b);
  }

  if (aValue > 0 && bValue < 0) {
    return search(f, b, a);
  }

  throw new Error('Values are not of opposite sign');
}

console.log(halfIntervalMethod(Math.sin, 2, 4));
console.log(halfIntervalMethod(x => (x ** 3) - 2 * x - 3, 1, 2));

const fixedPoint = (f, firstGuess) => {
  const tryIt = guess => {
    let next = f(guess);
    return closeEnough(guess, next) ? next : tryIt(next);
  }

  return tryIt(firstGuess);
}

console.log(fixedPoint(Math.cos, 1));
console.log(fixedPoint(x => Math.cos(x) + Math.sin(x), 1));

const sqrt = x => fixedPoint(y => (y + x / y) / 2, 1);

console.log(sqrt(4), sqrt(2));

console.log(fixedPoint(x => 1 + 1 / x, 1))

// 练习1.37
const contFrac = (n, d, k) => {
  const iter = (result, k) => {
    if (k < 1) {
      return result;
    }

    return iter(n(k) / (d(k) + result), k - 1);
  }

  return iter(0, k);
}

const contFracRecursion = (n, d, k) => {
  const impl = i => {
    if (i === k) {
      return n(k) / d(k);
    }
    return n(i) / (d(i) + impl(i + 1));
  };
  return impl(1);
}

// 黄金分割率
console.log(contFrac(() => 1, () => 1, 100));
console.log(contFracRecursion(() => 1, () => 1, 100));

// 练习1.38
// e
console.log(
  2 + contFrac(() => 1, i => {
    if (i % 3 === 2) {
      return Math.ceil(i / 3) * 2;
    }
    return 1;
  }, 100)
);

// 练习1.39
// 求tan
const tanCf = (x, k) => contFrac(i => i === 1 ? x : -1 * x * x, i => i * 2 - 1, k);
console.log(Math.tan(Math.PI / 4), tanCf(Math.PI / 4, 100));

const averageDamp = f => x => (x + f(x)) / 2;
const sqrt1 = x => fixedPoint(averageDamp(y => x / y), 1);
const cubeRoot = x => fixedPoint(averageDamp(y => x / y / y), 1);

console.log(sqrt1(4), cubeRoot(8));

// 牛顿法
const dx = 0.00001;
const deriv = g => x => (g(x + dx) - g(x)) / dx;
console.log(deriv(cube)(5));

const newtonTransform = g => x => x - g(x) / deriv(g)(x);
const newtonMethod = (g, guess) => fixedPoint(newtonTransform(g), guess);

const sqrt2 = x => newtonMethod(y => y * y - x, 1);
console.log(sqrt2(4));

// 练习1.40
const cubic = (a, b, c) => x => (x ** 3) + a * (x ** 2) + b * x + c;
console.log(newtonMethod(cubic(1, 1, 1), 1));
console.log(newtonMethod(cubic(2, 2, 2), 1));

// 练习1.41
const double = f => x => f(f(x));
// TODO: 解释不了，脑瓜疼
console.log(double(double(double))(inc)(5));

// 练习1.42
const compose = (f, g) => x => f(g(x));
console.log(compose(square, inc)(6));

const repeated = (f, times) => {
  const iterF = (result, count) => {
    if (count === 0) {
      return result;
    }
    return iterF(compose(f, result), count - 1);
  }

  return iterF(identity, times);
}

console.log(repeated(square, 2)(5));

// 练习1.44
const smooth = f => x => (f(x - dx) + f(x) + f(x + dx)) / 3;
// repeated(smooth, times)(f);

console.log(square(2), smooth(square)(2), repeated(smooth, 2)(square)(2));

// 练习1.45
const nthRoot = n => x => fixedPoint(repeated(averageDamp, n - 1)(y => x / (y ** (n - 1))), 1);
// sqrt3
console.log(nthRoot(2)(4), nthRoot(3)(8), nthRoot(4)(16), nthRoot(5)(32));

// 练习1.46
// const fixedPoint = (f, firstGuess) => {
//   const tryIt = guess => {
//     let next = f(guess);
//     return closeEnough(guess, next) ? next : tryIt(next);
//   }

//   return tryIt(firstGuess);
// }

const iterativeImprove = (goodEnough, improve) => firstGuess => {
  const iter = guess => {
    let next = improve(guess);
    return goodEnough(next, guess) ? next : iter(next);
  }

  return iter(firstGuess);
}


const sqrt4 = x => {
  const goodEnough = (next, guess) => Math.abs(guess - next) < 0.001;
  const improve = guess => (guess + x / guess) / 2; 
  return iterativeImprove(goodEnough, improve)(1);
};

console.log(sqrt4(2));

const fixedPoint1 = (f, firstGuess) => {
  const goodEnough = (next, guess) => Math.abs(guess - next) < 0.001;
  return iterativeImprove(goodEnough, f)(firstGuess);
};

const sqrt5 = x => fixedPoint1(averageDamp(y => x / y), 1);
console.log(sqrt5(2));
