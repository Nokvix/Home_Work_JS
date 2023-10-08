// Не понял формулировку в задании "Нельзя переприсвоить массивы целиком друг в друга", поэтому решил двумя способами
// 1 способ
let arr1 = [2, 2, 17, 21, 45, 12, 54, 31, 53];
let arr2 = [12, 44, 23, 5];
let arr3 = [];
counter = 0;
flag = false;
while (true) {
    if (!flag) {
        arr3.push(arr1[counter]);
        counter++;
        if (counter === arr1.length) {
            counter = 0;
            flag = true;
        }
    }
    else {
        arr3.push(arr2[counter])
        counter++;
        if (counter === arr2.length) {
            break;
        }
    }
}
console.log(arr3);

// 2 способ
if (arr1.length > arr2.length) {
    for (let number of arr2) {
        arr1.push(number);
    }
    console.log(arr1)
}
else {
    for (let number of arr1) {
        arr2.push(number);
    }
    console.log(arr2)
}