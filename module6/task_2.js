function filter(objects, property, value) {
    let array = [];
    // for (let object of objects) {
    //     if (object[property] == value) {
    //         array.push(object);
    //     }
    // }
    return objects.filter(object => object[property] === value);
}

let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Пётр', surname: 'Петров' }
];

let result = filter(objects, 'name', 'Иван');



// console.log(result)

for (let object of result) {
    console.log(object);
}