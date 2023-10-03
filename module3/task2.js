let userName = 'ИВан'
let userSurname = 'иванов'
let firstLetterName = userName.substring(0, 1).toUpperCase()
let otherLetterName = userName.substring(1).toLowerCase()
let firstLetterSurname = userSurname.substring(0, 1).toUpperCase()
let otherLetterSurname = userSurname.substring(1).toLowerCase()
let newUserName = firstLetterName + otherLetterName
let newUserSurname = firstLetterSurname + otherLetterSurname
console.log(`Было: ${userName}, стало: ${newUserName}`)
console.log(userName !== newUserName ? "Имя было преобразовано" : "Имя осталось без изменений")
console.log(`Было: ${userSurname}, стало: ${newUserSurname}`)
console.log(userSurname !== newUserSurname ? "Фамилия была преобразована" : "Фамилия осталось без изменений")
