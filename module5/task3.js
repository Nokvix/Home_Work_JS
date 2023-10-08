function arrSort(arr) {
    return arr.sort((element1, element2) => element1 - element2);
}

let arr = [12, -33, 3, 44, -100]
console.log(arrSort(arr));