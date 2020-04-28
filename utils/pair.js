// export const pair = (x, y) => [x, y];
// export const head = pair => pair[0];
// export const tail = pair => pair[1];
// export const isPair = item => typeof item === 'object' && item !== null && item.length === 2;

// export const pair = (x, y) => {
//   const dispatch = m => {
//     if (m === 0) return x;
//     if (m === 1) return y;
//     throw new Error('Argument not 0 or 1 -- pair');
//   };
//   return dispatch;
// };
// export const head = pair => pair(0);
// export const tail = pair => pair(1);

// 练习2.4
export const pair = (x, y) => m => m(x, y);
// eslint-disable-next-line no-unused-vars
export const head = pair => pair((x, y) => x);
export const tail = pair => pair((x, y) => y);
// TODO： 不严谨
export const isPair = item => typeof item === 'function' && item.length === 1;


