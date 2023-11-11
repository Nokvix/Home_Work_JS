let flag = true;

function arrayGeneration() {
    const array = [];
    for (let i = 1; i < 9; i++) {
        array.push(i);
        array.push(i);
    }
    return array;
}

function arrayShuffle() {
    const array = arrayGeneration();
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(number) {
    const elem = document.createElement('div');
    elem.classList.add("card");
    elem.setAttribute("data-num", number);
    elem.setAttribute("data-open", "false");
    return elem;
}

function createButton() {
    const button = document.createElement("button");
    const containerButton = document.querySelector(".button");
    button.innerHTML = "Играть снова";
    containerButton.append(button)

    button.addEventListener("click", () => {
        location.reload();
    });
}

function updateTimer(display) {
    if (--timer < 0) {
        clearInterval(intervalId);
        display.textContent = "Время вышло!\nВы проиграли :(";
        flag = false;
        waitForEndTurn = true;
        createButton();
    } else {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
    }
}

function startTimer(duration, display) {
    timer = duration;
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    const intervalId = setInterval(function () {
        updateTimer(display);
    }, 1000);

    return intervalId;
}

const timerDisplay = document.querySelector(".timer");
const initialTime = 60;

const intervalId = startTimer(initialTime, timerDisplay);

const shuffledArray = arrayShuffle();
const container = document.querySelector(".cards");
const cardsCount = shuffledArray.length;

let waitForEndTurn = false;
let activeCard = null;
let openCardsCount = 0;

for (const num of shuffledArray) {
    const cardElem = createCard(num);
    cardElem.addEventListener("click", () => {
        const open = cardElem.getAttribute("data-open");
        if (waitForEndTurn || open === "true" || cardElem === activeCard) {
            return;
        }

        cardElem.textContent = num;

        if (!activeCard) {
            activeCard = cardElem;
            return;
        }

        const numberToMatch = activeCard.getAttribute("data-num");

        if (numberToMatch == num) {
            cardElem.setAttribute("data-open", "true");
            activeCard.setAttribute("data-open", "true");

            activeCard = null;
            waitForEndTurn = false;
            openCardsCount += 2;

            if (openCardsCount === cardsCount) {
                timerDisplay.textContent = "Ура!\nВы победили :)"
                waitForEndTurn = true;
                clearInterval(intervalId);
                createButton();
            }
            return;
        }

        waitForEndTurn = true;
        setTimeout(() => {
            activeCard.innerHTML = null;
            cardElem.innerHTML = null;

            waitForEndTurn = false;
            activeCard = null;
        }, 300);
    });
    container.appendChild(cardElem);
}