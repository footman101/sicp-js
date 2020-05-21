import { list, first, rest, isList, isEmpty, printList, listRef, length, reduce} from '../utils/list.js';

const eq = (a, b) => a === b;

// 练习2.54
const equal = (a, b) => {
  if (isEmpty(a) && isEmpty(b)) return true;
  if (!isEmpty(a) && isEmpty(b)) return false;
  if (isEmpty(a) && !isEmpty(b)) return false;

  if ((!isList(first(a)) && isList(first(b))) || (isList(first(a)) && !isList(first(b)))) return false;
  if (!isList(first(a)) && !isList(first(b)) && eq(first(a), first(b))) return equal(rest(a), rest(b));
  if (isList(first(a)) && isList(first(b)) && equal(first(a), first(b))) return equal(rest(a), rest(b));

  return false;
}

console.log(equal(list('a', 'b', list('a', 'b')), list('a', 'b', list('a', 'b'))));
console.log(equal(list('a', 'b', list('a', 'b')), list('a', 'b', list('V', 'b'))));

// 2.3.2 符号求导
const isVariable = e => typeof e === 'string' && e.length === 1;
const sameVariable = (a, b) => isVariable(a) && isVariable(b) && eq(a, b);
const isNumber = c => typeof c === 'number';

const makeSum = (...args) => {
  const argsList = list(...args);
  const makeTowSum = (a, b) => {
    if (a === 0) return b;
    if (b === 0) return a;
    if (isNumber(a) && isNumber(b)) return a + b;
    return list('+', a, b)
  };
  return reduce(makeTowSum, 0, argsList);
};
const makeProduct = (...args) => {
  const argsList = list(...args);
  const makeTwoProduct = (a, b) => {
    if (a === 0 || b === 0) return 0;
    if (a === 1) return b;
    if (b === 1) return a;
    if (isNumber(a) && isNumber(b)) return a * b;
    return list('*', a, b)
  };
  return reduce(makeTwoProduct, 1, argsList);
};
const makeExponentiation = (base, exponent) => {
  if (exponent === 0) return 1;
  if (exponent === 1) return base;

  return list('**', base, exponent);
}

const buildIs = symbol => x => isList(x) && !isEmpty(x) && eq(listRef(x, 0), symbol);
const isSum = buildIs('+');
const isProduct = buildIs('*');
const isExponentiation = buildIs('**');

const addend = s => listRef(s, 1);
const augend = s => listRef(s, 2);
const multiplier = s => listRef(s, 1);
const multiplicand = s => listRef(s, 2);
const base = s => listRef(s, 1);
const exponent = s => listRef(s, 2);

const deriv = (exp, variable) => {
  if (isNumber(exp)) return 0;
  if (isVariable(exp)) return (sameVariable(exp, variable) ? 1 : 0);
  if (isSum(exp)) {
    return makeSum(deriv(addend(exp), variable), deriv(augend(exp), variable));
  }
  if (isProduct(exp)) {
    return makeSum(
      makeProduct(multiplier(exp), deriv(multiplicand(exp), variable)),
      makeProduct(deriv(multiplier(exp), variable), multiplicand(exp))
    );
  }
  if (isExponentiation(exp)) {
    return makeProduct(
      makeProduct(exponent(exp), makeExponentiation(base(exp), exponent(exp) - 1)),
      deriv(base(exp), variable)
    );
  }
  throw new Error('unknown expression type!');
}

printList(deriv(makeSum('x', 3), 'x'));
printList(deriv(makeProduct('x', 'y'), 'x'));
printList(deriv(makeProduct(makeProduct('x', 'y'), makeSum('x', 3)), 'x'));
// 练习2.56
printList(deriv(makeExponentiation('x', 10), 'x'));
// 练习2.57
printList(deriv(makeSum(makeExponentiation('x', 2), 'x', 10), 'x'));
printList(deriv(makeProduct(10, makeExponentiation('x', 2), 'y'), 'x'));
