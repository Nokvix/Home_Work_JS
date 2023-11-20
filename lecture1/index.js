// const c = document.querySelector('.first'); // querySelector - может искать по тегам, классам и id

// console.log(c.getTotalLength()); // поиск значения для stroke-dasharray

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [1, 2, 3];

// const res = arr1.find(el => el == 3); // поиск 1-го элемента
// const res = arr1.findIndex(el => el == 3); // поиск индекса 1-го элемента
// const res = arr1.filter(el => el == 3); // фильтрация массива (остаются только те, которые подходят по услови.)
// const res = arr1.map(el => el+1); // проходит по массиву и выполняет какое-либо действие с каждым элементов, либо применяет функцию

// function updateThree(el) {
//     if (el == 3) return el + 1;
//     return el;
// }

// const res = arr1.map(updateThree);

// const res = arr1.slice(); // копирует массив. можно arr1.slice(0, 2), тогда скопируется с индекса 0 по индекс 2 не включительно (1, 2)

let arr3 = [1, 2, 3, 4, 5];
const res = arr3.splice(0, 1) // удаляет элементы из массива и возвращает удалённые, в нашем случае, начиная с 0 удаляет 1 элемент
console.log(res); // [1]
console.log(arr3); // [2, 3, 4, 5]