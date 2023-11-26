const arr1 = [1, 2, 3, 4, 2, 7];
const arr2 = [{ a: 2 }, { a: 3 }]

const sum1 = arr1.reduce((acc, cur) => acc + cur, 0); // acc - хранит сумму чисел, 0 - начальное значение acc
const sum2 = arr2.reduce((acc, cur) => acc + cur.a, 0);

console.log(sum1);
console.log(sum2);