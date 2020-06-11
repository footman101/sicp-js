import { pair, head, tail, isPair } from '../utils/pair.js';
import {
  list, isEmpty, listRef, length, append, printList, lastPair, reverse,
  filter, map, forEach, flatten, mapDeep, reduce, enumerateInterval, enumerateTree,
  reduceLeft, flatMap
} from '../utils/list.js';
import { square, add, isEven, isOdd } from '../utils/index.js';

const squares = list(1, 4, 9, 16, 25);
printList(squares);
console.log(listRef(squares, 3), length(squares), length(list()));

printList(append(squares, list(1, 2, 3)));
printList(lastPair(squares));
printList(reverse(squares));

// 练习2.20
const sameParity = (a, ...args) => filter(num => (num + a) % 2 === 0, list(...args));
printList(sameParity(1, 2, 3, 4, 5, 6, 7, 8, 9));

// 练习2.21
const squareList = items => map(square, items);
const testList = list(1, 2, 3, 4, 5, 6, 7, 8, 9);
printList(squareList(testList));

// 练习2.23
forEach(console.log, testList);

// 2.2.2 层次型结构
console.log('==2.2.2 层次型结构==')
const x = pair(list(1, 2), list(3, 4));
console.log(length(x));

const countLeaves = items => {
  if (isEmpty(items)) return 0;
  if (!isPair(items)) return 1;
  return countLeaves(head(items)) + countLeaves(tail(items));
}
console.log(countLeaves(x));

// 练习2.27
const deepReverse = items => {
  if (isEmpty(items)) return items;
  if (!isPair(items)) return items;
  return reverse(map(deepReverse, items));
}

const testTree = list(list(1, 2), list(3, 4), 5);
printList(testTree);
printList(deepReverse(testTree));

// 练习2.28
printList(flatten(testTree));
printList(flatten(list(list(list(1, 2), list(3, 4)), 2, 3, 4, 5)));
printList(flatten(1));

// 练习2.30
printList(mapDeep(square, testTree));

// 练习2.32
const subsets = s => {
  if (isEmpty(s)) return list(null);
  let rest = subsets(tail(s));
  return append(rest, map(item => pair(head(s), item), rest))
}

printList(subsets(list(1, 2, 3, 4)))

// 2.2.3 序列作为一种约定的界面

printList(enumerateInterval(1, 10));
printList(enumerateTree(testTree));

const sumOddSquares = tree => reduce(add, 0, map(square, filter(isOdd, enumerateTree(tree))));

console.log(sumOddSquares(testTree))

// 练习2.34
const hornerEval = (x, coefficientSequence) => reduce((thisCoeff, higherItems) => higherItems * x + thisCoeff, 0, coefficientSequence);
console.log(hornerEval(2, list(1, 3, 0, 5, 0, 1)));

// 练习2.35
const countLeaves1 = tree => reduce(add, 0, map(item => isPair(item) ? countLeaves(item) : 1, tree));
console.log(countLeaves1(testTree))

// 练习2.39
console.log(reduceLeft(add, 0, list(1, 2, 3, 4, 5)));
const reverse1 = sep => reduceLeft(pair, null, sep);
printList(reverse1(list(1, 2, 3, 4, 5)));

const reverse2 = sep => reduce((x, y) => append(y, list(x)), null, sep);
printList(reverse2(list(1, 2, 3, 4, 5)));

// 练习2.40
const uniquePair = n => flatMap(i => map(j => list(j, i), enumerateInterval(0, i - 1)), enumerateInterval(0, n));
printList(uniquePair(3))

// 练习2.42
const queens = boardSize => {
  const isSafe = (k, positions) => {
    if (isEmpty(positions)) return true;

    const target = head(positions);
    const iter = (index, toCheck) => {
      if (isEmpty(toCheck)) return true;
      const cur = head(toCheck);
      // 不能在同一列
      if (cur === target) {
        return false;
      }
      // 不能在同一对角线
      if (Math.abs(cur - target) === Math.abs(k - index)) {
        return false;
      }
      return iter(index - 1, tail(toCheck));
    }

    return iter(k - 1, tail(positions));
  }

  const adjoinPosition = (newRow, restOfQueens) => pair(newRow, restOfQueens);

  const queenCols = k => {
    if (k === 0) return list(null);
    return filter(
      positions => isSafe(k, positions),
      flatMap(
        restOfQueens => map(newRow => adjoinPosition(newRow, restOfQueens), enumerateInterval(1, boardSize)),
        queenCols(k - 1)
      )
    );
  };

  return queenCols(boardSize);
}

console.log(length(queens(8)));

// 练习2.43
const queens1 = boardSize => {
  const isSafe = (k, positions) => {
    if (isEmpty(positions)) return true;

    const target = head(positions);
    const iter = (index, toCheck) => {
      if (isEmpty(toCheck)) return true;
      const cur = head(toCheck);
      // 不能在同一列
      if (cur === target) {
        return false;
      }
      // 不能在同一对角线
      if (Math.abs(cur - target) === Math.abs(k - index)) {
        return false;
      }
      return iter(index - 1, tail(toCheck));
    }

    return iter(k - 1, tail(positions));
  }

  const adjoinPosition = (newRow, restOfQueens) => pair(newRow, restOfQueens);

  const queenCols = k => {
    if (k === 0) return list(null);
    return filter(
      positions => isSafe(k, positions),
      // 每次枚举都算了一遍queenCols(k - 1)  所以比较耗时
      flatMap(
        newRow => map(restOfQueens => adjoinPosition(newRow, restOfQueens), queenCols(k - 1)),
        enumerateInterval(1, boardSize)
      )
    );
  };

  return queenCols(boardSize);
}

console.time('queens');
console.log(length(queens(7)));
console.timeEnd('queens')

console.time('queens1');
console.log(length(queens1(7)));
console.timeEnd('queens1');

