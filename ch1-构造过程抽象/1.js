// 程序的基本元素

function sqrt(x) {
  // const goodEnough = (guess, x) => Math.abs(guess ** 2 - x) < 0.001;
  const goodEnough = (guess, improvedGuess) => Math.abs(guess - improvedGuess) < 0.001;
  const improve = (guess, x) => (guess + x / guess) / 2;
  // const iter = (guess, x) => goodEnough(guess, x) ? guess : iter(improve(guess, x), x);
  const iter = (guess, x) => goodEnough(guess, improve(guess, x)) ? guess : iter(improve(guess, x), x);
  return iter(1, x);
}

function cube(x) {
  const goodEnough = (guess, improvedGuess) => Math.abs(guess - improvedGuess) < 0.001;
  const improve = (guess, x) => (2 * guess + x / (guess ** 2)) / 3;
  const iter = (guess, x) => goodEnough(guess, improve(guess, x)) ? guess : iter(improve(guess, x), x);
  return iter(1, x);
}

console.log(sqrt(2));
console.log(cube(27));