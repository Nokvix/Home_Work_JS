let a = 13.123456789
let b = 2.123
let n = 5
let fractional_part_a = Math.floor((a % 1) * Math.pow(10, n))
let fractional_part_b = Math.floor((b % 1) * Math.pow(10, n))
console.log(`Дробные части: ${fractional_part_a}, ${fractional_part_b}`)
console.log(`Число ${fractional_part_a} больше ${fractional_part_b}?\nОтвет: ${fractional_part_a > fractional_part_b}`)