count = 7;
array = [];
for (let i = 1; i < count + 1; i++) {
    array.push(i);
}
console.log(array);

for (let i = 0; i < count; i++) {
    j = Math.round(Math.random() * (count - 1));
    let number = array[i];
    array[i] = array[j];
    array[j] = number;
}
console.log(array)