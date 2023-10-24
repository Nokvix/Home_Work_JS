function createStudentCard(name, age) {
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    let span = document.createElement('span')

    document.body.append(div);
    h2.textContent = name;
    div.append(h2);

    span.textContent = `Возраст: ${age} лет`;
    div.append(span)
}

createStudentCard('Игорь', 17);