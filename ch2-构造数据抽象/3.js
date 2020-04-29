import { list, first, rest, isList, isEmpty, printList, listRef} from '../utils/list.js';

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
const makeSum = (a, b) => {
  if (a === 0) return b;
  if (b === 0) return a;
  if (isNumber(a) && isNumber(b)) return a + b;
  return list('+', a, b)
};
const makeProduct = (a, b) => {
  if (a === 0 || b === 0) return 0;
  if (a === 1) return b;
  if (b === 1) return a;
  if (isNumber(a) && isNumber(b)) return a * b;
  return list('*', a, b)
};

const isSum = x => isList(x) && !isEmpty(x) && eq(listRef(x, 0), '+');
const isProduct = x => isList(x) && !isEmpty(x) && eq(listRef(x, 0), '*');

const addend = s => listRef(s, 1);
const augend = s => listRef(s, 2);
const multiplier = s => listRef(s, 1);
const multiplicand = s => listRef(s, 2);

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
  throw new Error('unknown expression type!');
}

printList(deriv(makeSum('x', 3), 'x'));
printList(deriv(makeProduct('x', 'y'), 'x'));
printList(deriv(makeProduct(makeProduct('x', 'y'), makeSum('x', 3)), 'x'));


