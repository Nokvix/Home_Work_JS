function getOlderUser(user1, user2) {
    return user1.age > user2.age ? user1.name : user2.name;
}

let user1={
    name: "Игорь",
    age: 17
};
let user2={
    name: "Оля",
    age: 21
};
let result = getOlderUser(user1, user2);
console.log(`Старший(-ая) - '${result}'`)