export const gcd = (a, b) => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

export const inc = x => x + 1;
export const square = x => x ** 2;

export const add = (x, y) => x + y;
export const mul = (x, y) => x * y;

export const isEven = n => n % 2 === 0;
export const isOdd = n => n % 2 !== 0;
