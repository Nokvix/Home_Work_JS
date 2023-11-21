class User { // class - это обёртка (синтаксический сахар) над функцией constructor
    // name = ''; // не обязательно
    // static name = '';
    #name = 'name'; // приватное поле, писать решётку везде используется поле - обязательно

    constructor(name) { // задаётся значение name
        this.#name = name;
    }

    get name() { // выводит имя
        return this.#name;
    }

    set name(name) { // изменяет имя
        this.#name = name;
    }

    // static bye() { // статический метод. Вызывается у класса, то есть User.bye(); динамический вызывается у объекта: user1.hello();
    //     console.log(`Bye, ${this.name}`);
    // }

    hello() { // метод
        console.log(`Hello, ${this.#name}`);
    }   
}

const user1 = new User('user1');
console.log(user1.name);
user1.name = 'user2';
console.log(user1.name);