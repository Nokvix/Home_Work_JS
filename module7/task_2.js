function createStudentCard(student) {
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    let span = document.createElement('span')

    document.body.append(div);
    h2.textContent = student.name;
    div.append(h2);

    span.textContent = `Возраст: ${student.age} лет`;
    div.append(span)
}

let studentObj = {
    name: 'Игорь',
    age: 17
};

createStudentCard(studentObj);