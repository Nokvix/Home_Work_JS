let studentsArray = [];
const date = new Date();
const maxDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

function defineTemporalData(date, placeholderText, minDate, maxDate) {
    date.classList.add('form-control');
    date.setAttribute('type', 'date');
    date.placeholder = placeholderText;
    date.min = minDate;
    date.max = maxDate;
}

function zeroOutInputFields(studentForm) {
    studentForm.nameInput.value = '';
    studentForm.facultyInput.value = '';
    studentForm.dataBirtInput.value = '';
    studentForm.yearsStudyInput.value = '';
}

function formatDateString(dateString) {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const currentDate = maxDate.split('-');
    const currentYear = Number(currentDate[0]);
    const currentMonth = Number(currentDate[1]);
    const currentDay = Number(currentDate[2]);
    let yearsOld;

    if (currentMonth > month || currentMonth === month && currentDay >= day) {
        yearsOld = currentYear - year;
    } else {
        yearsOld = currentYear - year - 1;
    }

    const formattedDay = (day < 10) ? `0${day}` : day;
    const formattedMonth = (month < 10) ? `0${month}` : month;

    return `${formattedDay}.${formattedMonth}.${year} (${yearsOld} лет)`;
}

function printYearsSchooling(dateString) {
    const dateObject = new Date(dateString);
    const yearStart = dateObject.getFullYear();
    const yearFinish = yearStart + 4;
    const currentDate = maxDate.split('-');
    const currentYear = Number(currentDate[0]);
    const currentMonth = Number(currentDate[1]);

    if ((yearFinish < currentYear) || (currentYear === yearFinish && currentMonth > 9)) {
        return `${yearStart}-${yearFinish} (закончил обучение)`
    }

    if (currentMonth > 8) {
        return `${yearStart}-${yearFinish} (${currentYear - yearStart + 1} курс)`
    }

    return `${yearStart}-${yearFinish} (${currentYear - yearStart} курс)`
}

function createStudent(studentForm) {
    const nameArray = studentForm.nameInput.value
        .split(/\s+/)
        .filter(str => str.trim() !== '')
        .map(str => str.trim());

    if (nameArray.length !== 3) {
        return;
    }

    const facultyArray = studentForm.facultyInput.value
        .split(/\s+/)
        .filter(str => str.trim() !== '')
        .map(str => str.trim());

    const student = {
        name: nameArray[1],
        surname: nameArray[0],
        middleName: nameArray[2],
        faculty: facultyArray.join(' '),
        dateOfBirth: new Date(studentForm.dataBirtInput.value),
        yearsStudy: new Date(studentForm.yearsStudyInput.value),
    };

    studentsArray.push(student);

    let row = document.createElement('tr');

    let name = document.createElement('td');
    name.textContent = Array(student.surname, student.name, student.middleName).join(' ');

    let faculty = document.createElement('td');
    faculty.textContent = student.faculty;

    let dataBirth = document.createElement('td');
    dataBirth.textContent = formatDateString(studentForm.dataBirtInput.value);

    let yearsStudy = document.createElement('td');
    yearsStudy.textContent = printYearsSchooling(studentForm.yearsStudyInput.value);

    row.appendChild(name);
    row.appendChild(faculty);
    row.appendChild(dataBirth);
    row.appendChild(yearsStudy);

    return row;
}

function createStudentForm() {
    let form = document.createElement('form');
    let nameInput = document.createElement('input');
    let facultyInput = document.createElement('input');
    let dataBirtInput = document.createElement('input');
    let yearsStudyInput = document.createElement('input');
    let button = document.createElement('button');
    let buttonWrapper = document.createElement('div');

    form.classList.add('input-group', 'mb-3');

    nameInput.classList.add('form-control');
    nameInput.placeholder = 'Введите ФИО (Ивано Иван Иванович)';

    facultyInput.classList.add('form-control');
    facultyInput.placeholder = 'Введите название факультета'

    defineTemporalData(dataBirtInput, 'Введите дату рождения', '1900-01-01', maxDate);
    defineTemporalData(yearsStudyInput, 'Введите дату начала обучения', '2000-01-01', maxDate);

    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить студента'
    buttonWrapper.classList.add('input-group-append', 'd-block');

    buttonWrapper.append(button);
    form.append(nameInput);
    form.append(facultyInput);
    form.append(dataBirtInput);
    form.append(yearsStudyInput);
    form.append(buttonWrapper);

    return {
        form,
        nameInput,
        facultyInput,
        dataBirtInput,
        yearsStudyInput,
        button,
    };
}

let studentForm = createStudentForm();
let inputForm = document.getElementById('input-form');
let tableBody = document.getElementById('table-body');

inputForm.append(studentForm.form);

studentForm.nameInput.addEventListener('input', function () {
    studentForm.facultyInput.addEventListener('input', function () {
        studentForm.dataBirtInput.addEventListener('input', function () {
            studentForm.yearsStudyInput.addEventListener('input', function () {
                studentForm.button.disabled = !(
                    studentForm.nameInput.value &&
                    studentForm.facultyInput.value &&
                    studentForm.dataBirtInput.value &&
                    studentForm.yearsStudyInput.value
                )
            })
        })
    })
})

studentForm.button.disabled = !(
    studentForm.nameInput.value &&
    studentForm.facultyInput.value &&
    studentForm.dataBirtInput.value &&
    studentForm.yearsStudyInput.value
)

studentForm.form.addEventListener('submit', function (e) {
    e.preventDefault();

    studentForm.button.disabled = true;

    let row = createStudent(studentForm);

    if (!row) {
        studentForm.button.disabled = false;
        alert('ФИО должно состоять из 3 слов. Если у вас сложное имя, то объединяйте его знаком "-" (тире)')
        return;
    }

    tableBody.append(row);
    zeroOutInputFields(studentForm);
})