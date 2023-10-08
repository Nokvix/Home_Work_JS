count = 7;
array = [];
for (let i = 1; i < count + 1; i++) {
    array.push(i);
}

for (let i = 0; i < count; i++) {
    j = Math.round(Math.random() * (count - 1));
    let number = array[i];
    array[i] = array[j];
    array[j] = number;
}
console.log(array);

let n = 1;
let index = -1
for (let i = 0; i < count; i++) {
    if (array[i] === n) {
        index = i;
        break;
    }
}
console.log(index !== -1 ? index : "Элемент не найден")