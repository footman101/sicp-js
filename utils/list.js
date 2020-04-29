import { pair, head, tail, isPair } from "./pair.js";

export function isEmpty(items) {
  return items === null;
}

export const first = head;
export const rest = tail;
export const isList = (l) => isEmpty(l) || isPair(l);

export function list(...args) {
  return args.reduceRight((ret, item) => pair(item, ret), null);
}

export function listRef(items, n) {
  if (n === 0) {
    return head(items);
  }

  return listRef(tail(items), n - 1);
}

export function length(items) {
  if (items === null) {
    return 0;
  }

  return 1 + length(tail(items));
}

export function append(list1, list2) {
  if (isEmpty(list1)) {
    return list2;
  }

  return pair(head(list1), append(tail(list1), list2));
}

export function printList(items) {
  console.log(isList(items) ? toString(items) : items);
}

export function toString(items) {
  const result = ["("];
  while (!isEmpty(items)) {
    if (isPair(head(items))) {
      result.push(toString(head(items)));
    } else {
      result.push(String(head(items)));
    }
    items = tail(items);
  }
  result.push(")");
  return result.join(" ");
}

// 练习2.17
export function lastPair(items) {
  if (isEmpty(items)) {
    return null;
  }

  const iter = (items) => {
    if (isEmpty(tail(items))) {
      return items;
    }

    return iter(tail(items));
  };

  return iter(items);
}

// 练习2.18
export function reverse(items) {
  // if (isEmpty(items)) {
  //   return items;
  // }

  // return append(reverse(tail(items)), pair(head(items), null));
  const iter = (items, result) => {
    if (isEmpty(items)) return result;
    return iter(tail(items), pair(head(items), result));
  };

  return iter(items, null);
}

export function filter(f, items) {
  // if (isEmpty(items)) return items;
  // return f(head(items)) ? pair(head(items), filter(f, tail(items))) : filter(f, tail(items));
  const iter = (result, items) => {
    if (isEmpty(items)) return result;
    return iter(
      f(head(items)) ? append(result, list(head(items))) : result,
      tail(items)
    );
  };
  return iter(null, items);
}

export function map(f, items) {
  if (isEmpty(items)) return items;
  return pair(f(head(items)), map(f, tail(items)));
}

export function mapDeep(f, items) {
  if (isEmpty(items)) return items;
  return pair(
    isPair(head(items)) ? mapDeep(f, head(items)) : f(head(items)),
    mapDeep(f, tail(items))
  );
}

export function forEach(f, items) {
  if (isEmpty(items)) return;
  f(head(items));
  return forEach(f, tail(items));
}

export function flatten(items) {
  if (isEmpty(items)) return items;
  if (!isPair(items)) return pair(items, null);
  return append(flatten(head(items)), flatten(tail(items)));
}

export function reduce(f, initial, items) {
  if (isEmpty(items)) return initial;
  return f(head(items), reduce(f, initial, tail(items)));
}

export function reduceLeft(f, initial, items) {
  const iter = (result, items) => {
    if (isEmpty(items)) {
      return result;
    }

    return iter(f(head(items), result), tail(items));
  };

  return iter(initial, items);
}

export function enumerateInterval(low, high) {
  if (low > high) {
    return null;
  }

  return pair(low, enumerateInterval(low + 1, high));
}

export function enumerateTree(tree) {
  if (isEmpty(tree)) return tree;
  if (!isPair(tree)) return list(tree);
  return append(enumerateTree(head(tree)), enumerateTree(tail(tree)));
}

export function flatMap(f, items) {
  return reduceLeft(append, null, map(f, items));
}
