// Задача 3
let n = -3
let m = -10
let first_number = Math.round(Math.random() * Math.abs(n - m) + Math.min(n, m))
let second_number = Math.round(Math.random() * Math.abs(n - m) + Math.min(n, m))
console.log(`Первое число: ${first_number}, второе число: ${second_number}`)
console.log(`${first_number} > ${second_number}?\nОтвет: ${first_number > second_number}`)