function filter(whiteList, blackList) {
    return whiteList.filter(element => !blackList.includes(element))
}

let whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru'];
let blackList = ['jsfunc@mail.ru','goodday@day.ru'];
let result = filter(whiteList, blackList);
console.log(result)