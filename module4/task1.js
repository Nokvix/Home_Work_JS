n = -3;
m = -10;
count = 42;
array = [];
for (let i = 0; i < count; i++) {
    let number = Math.round(Math.random() * Math.abs(m - n) + Math.min(n, m));
    array.push(number);
}
console.log(array)