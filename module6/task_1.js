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
console.log(`Старший(-ая) - '${result}'`);

function getOlderUserArray(allUsers) {
    let greatestAge = -1;
    let oldestUser = {};
    for (let user of allUsers) {
        if (user.age > greatestAge) {
            greatestAge = user.age;
            oldestUser = user;
        }
    }
    return oldestUser.name;
}

let allUsers = [
    { name: 'Валя', age: 11 },
    { name: 'Таня', age: 24 },
    { name: 'Рома', age: 21 },
    { name: 'Надя', age: 34 },
    { name: 'Антон', age: 7 }
];

result = getOlderUserArray(allUsers);
console.log(`Старший(-ая) - '${result}'`);
