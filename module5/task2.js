function filter(whiteList, blackList) {
    let result = [];
    for (let email of whiteList) {
        if (!blackList.includes(email)) {
            result.push(email);
        }
    }
    return result;
}

let whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru'];
let blackList = ['my-email@gmail.ru', 'jsfunc@mail.ru','goodday@day.ru'];
let result = filter(whiteList, blackList);
console.log(result)