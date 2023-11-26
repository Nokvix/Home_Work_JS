const game = document.querySelector(".game"); // игровое поле
const res = document.querySelector(".res"); // результат
const btnGame = document.querySelector(".new-game"); // кнопка новая игра
const fields = document.querySelectorAll(".field"); // ячейка поля (куда ставятся крестики и нолики)
let stepCross = true; // чей ход: true - крестики, false - нолики
let count = 0; // количество сделанных ходов

const circle = `<svg class="circle"> 
<circle r="45" cx="58" cy="58" stroke="blue" stroke-width="10" fill="none"/>
</svg>`; // svg нолика
const cross = `<svg class="cross">
<line class="first" x1="15" y1="15" x2="105" y2="105" stroke="red" stroke-width="10" stroke-linecap="round"/>

<line class="second" x1="105" y1="15" x2="15" y2="105" stroke="red" stroke-width="10" stroke-linecap="round"/>
</svg>`; // svg крестика

game.addEventListener('click', init);
btnGame.addEventListener('click', newGame);

function doStep(target) {
    target.innerHTML = stepCross ? cross : circle;
    target.classList.add(stepCross ? 'x' : 'o'); // помечаем ячейку, чем она занята (крестик или нолик)
}

function init(e) {
    const curField = e.target.closest('.field'); // получаем именно ячейку, чтобы не было ошибки, когда попадаем по svg
    if (!curField.classList.contains('x', 'o')) { // проверка: занята ли ячейка
        doStep(e.target);
        stepCross = !stepCross;
        count++;
        win();
    }
}

function newGame() {
    res.innerHTML = '';
    stepCross = true;
    count = 0;
    Array.from(fields).forEach(el => {
        el.innerHTML = '';
        el.classList.remove('x', 'o', 'active');
    })
    game.addEventListener('click', init);
}

function win() {
    const comb = [ // Все выигрышные комбинации
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < comb.length; i++) {
        const cur = comb[i];
        const curFields = [fields[cur[0]], fields[cur[1]], fields[cur[2]]];

        if (curFields.every((el) => el.classList.contains("x"))) {
            res.innerHTML = 'Выиграли X';
            curFields.forEach((field) => field.classList.add("active")); // класс для подсветки выигрышной комбинации
            game.removeEventListener('click', init);
            break;
        }
        if (curFields.every((el) => el.classList.contains("o"))) {
            res.innerHTML = 'Выиграли O';
            curFields.forEach((field) => field.classList.add("active"));
            game.removeEventListener('click', init);
            break;
        }
        if (count === 9) {
            res.innerHTML = 'Ничья';
            game.removeEventListener('click', init);
            // break; здесь break ошибочный, на мой взгляд, тк если крестики побеждают на последнем ходу, то условия проходятся один
            // раз и на count === 9 выходят из цикла, то есть выводится надпись "Ничья"
        }
    }
}
