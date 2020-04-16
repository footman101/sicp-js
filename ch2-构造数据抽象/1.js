import { pair, head, tail } from '../utils/pair.js';
import { gcd } from '../utils/index.js';

// const makeRat = pair;
// const numer = head;
// const denom = tail;
const makeRat = (x, y) => {
  // 练习2.1
  const numerSign = Math.sign(x) === Math.sign(y) ? 1 : -1;
  x = numerSign * Math.abs(x);
  y = Math.abs(y);
  const g = gcd(x, y);
  return pair(x / g, y / g)
};
const numer = x => head(x);
const denom = x => tail(x);

const addRat = (x, y) => makeRat(numer(x) * denom(y) + numer(y) * denom(x), denom(x) * denom(y));
const subRat = (x, y) => makeRat(numer(x) * denom(y) - numer(y) * denom(x), denom(x) * denom(y));
const mulRat = (x, y) => makeRat(numer(x) * numer(y), denom(x) * denom(y));
const divRat = (x, y) => makeRat(numer(x) * denom(y), numer(y) * denom(x));
const equalRat = (x, y) => numer(x) * denom(y) === numer(y) * denom(x);

const printRat = x => console.log(numer(x), '/', denom(x));

const oneHalf = makeRat(1, 2);
printRat(oneHalf);

const oneThird = makeRat(1, 3);
printRat(oneThird);

printRat(addRat(oneHalf, oneThird));
printRat(addRat(oneThird, oneThird));
printRat(subRat(oneHalf, oneThird));
printRat(mulRat(oneHalf, oneThird));
printRat(divRat(oneHalf, oneThird));
console.log(equalRat(oneHalf, oneThird));

// 练习2.2
const makePoint = pair;
const xPoint = head;
const yPoint = tail;
const printPoint = point => console.log(`(${xPoint(point)}, ${yPoint(point)})`);
printPoint(makePoint(1, 2));

const makeSegment = pair;
const startSegment = head;
const endSegment = tail;
const average = (x, y) => (x + y) / 2;
const midSegment = segment => makePoint(
  average(xPoint(startSegment(segment)), xPoint(endSegment(segment))),
  average(yPoint(startSegment(segment)), yPoint(endSegment(segment)))
);

printPoint(midSegment(makeSegment(makePoint(1, 1), makePoint(2, 2))));

// 练习2.3
const makeSize = pair;
const width = head;
const height = tail;

const makeRect = (x, y, width, height) => pair('pointSize', pair(makePoint(x, y), makeSize(width, height)));
const makeRect1 = (x, y, width, height) => pair('pointPoint', pair(makePoint(x, y), makePoint(x + width, y + height)));

const perimeterRect = rect => {
  const type = head(rect);
  const info = tail(rect);
  if (type === 'pointPoint') {
    const minPoint = head(info);
    const maxPoint = tail(info);
    const width = xPoint(maxPoint) - xPoint(minPoint);
    const height = yPoint(maxPoint) - yPoint(minPoint);
    return (width + height) * 2;
  }
  if (type === 'pointSize') {
    const size = tail(info);
    return (width(size) + height(size)) * 2;
  }

  throw new Error('wrong rect type.');
}
const areaRect = rect => {
  const type = head(rect);
  const info = tail(rect);
  if (type === 'pointPoint') {
    const minPoint = head(info);
    const maxPoint = tail(info);
    const width = xPoint(maxPoint) - xPoint(minPoint);
    const height = yPoint(maxPoint) - yPoint(minPoint);
    return width * height;
  }
  if (type === 'pointSize') {
    const size = tail(info);
    return width(size) * height(size);
  }

  throw new Error('wrong rect type.');
}

const printRect = rect => console.log('perimeter:', perimeterRect(rect), 'area:', areaRect(rect));

const rect = makeRect(0, 0, 5, 5);
printRect(rect);
const rect1 = makeRect1(0, 0, 5, 5);
printRect(rect1);

// 练习2.6
// eslint-disable-next-line no-unused-vars
const zero = f => x => x;
const add1 = n => f => x => f(n(f)(x));

const one = f => x => f(x);
const two = f => x => f(f(x));

const add = (a, b) => f => x => a(f)(b(f)(x));

const f = x => x * 10;
console.log(add(zero, two)(f)(1));
console.log(add(one, two)(f)(1));
console.log(add1(add(one, two))(f)(1));

const makeInterval = pair;
const upperBound = head;
const lowerBound = tail;

const addInterval = (x, y) => makeInterval(lowerBound(x) + lowerBound(y), upperBound(x) + upperBound(y));
const subInterval = (x, y) => addInterval(x, makeInterval(-upperBound(y), - lowerBound(y)));
const mulInterval = (x, y) => {
  const p1 = lowerBound(x) * lowerBound(y);
  const p2 = lowerBound(x) * upperBound(y);
  const p3 = upperBound(x) * lowerBound(y);
  const p4 = upperBound(x) * upperBound(y);
  return makeInterval(Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4));
};
const divInterval = (x, y) => {
  if (lowerBound(y) * upperBound(y) < 0) {
    throw new Error('interval spans 0');
  }
  return mulInterval(x, makeInterval(1 / upperBound(y), 1 / lowerBound(y)))
};

const makeCenterWidth = (c, w) => makeInterval(c - w, c + w);
const makeCenterPercent = (c, p) => makeCenterWidth(c, c * p);

const printInterval = i => console.log(`[${lowerBound(i)}, ${upperBound(i)}]`);

// 练习2.13
const par1 = (r1, r2) => divInterval(mulInterval(r1, r2), addInterval(r1, r2));
const oneInterval = makeInterval(1, 1);
const par2 = (r1, r2) => divInterval(oneInterval, addInterval(divInterval(oneInterval, r1), divInterval(oneInterval, r2)));

const a = makeCenterPercent(10, 0.02);
const b = makeCenterPercent(20, 0.02);

printInterval(par1(a, b));
printInterval(par2(a, b));

printInterval(divInterval(a, a))