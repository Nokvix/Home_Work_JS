function arrSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let number = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = number;
            }
        }
    }
    return arr;
}
let arr = [0, 1]
console.log(arrSort(arr));