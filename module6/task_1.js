function getOlderUser(user1, user2) {
    return user1.age > user2.age ? user1.name : user2.name;
}

let user1 = {
    name: "Игорь",
    age: 17
};
let user2 = {
    name: "Оля",
    age: 21
};

let result = getOlderUser(user1, user2);
console.log(`1 задание: Старший(-ая) - '${result}'`);

function getOlderUserArray(allUsers) {
    return allUsers.sort((user1, user2) => -(user1.age - user2.age));
}

let allUsers = [
    { name: 'Валя', age: 11 },
    { name: 'Таня', age: 24 },
    { name: 'Рома', age: 21 },
    { name: 'Надя', age: 34 },
    { name: 'Антон', age: 7 }
];

result = getOlderUserArray(allUsers);
console.log(`2 задание: Старший(-ая) - '${result[0].name}'`);
