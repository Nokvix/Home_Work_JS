const studentsArray = [];
const date = new Date();
const maxDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

document.addEventListener('DOMContentLoaded', async () => {
    const tableHeaders = document.querySelectorAll('.data-sort');
    const tableBody = document.getElementById('table-body');
    let sortOrder = 1;
    const dictionary = {
        0: 'fullname',
        1: 'faculty',
        2: 'dateOfBirth',
        3: 'yearsStudy',
    }

    tableHeaders.forEach((header, index) => {
        header.addEventListener('click', function () {
            handleSortClick(dictionary[index]);
        });
    });

    function applyFilters() {
        const filteredStudents = studentsArray.filter(student => {
            const fullnameFilter = studentFilterForm.fullnameSearch.value.toLowerCase();
            const facultyFilter = studentFilterForm.facultySearch.value.toLowerCase();
            const yearBeginningStudyFilter = studentFilterForm.yearBeginningStudy.value;
            const yearGraduationFilter = studentFilterForm.yearGraduation.value;

            return (
                student.fullname.toLowerCase().includes(fullnameFilter) &&
                student.faculty.toLowerCase().includes(facultyFilter) &&
                (!yearBeginningStudyFilter || student.yearsStudy.getFullYear() == yearBeginningStudyFilter) &&
                (!yearGraduationFilter || (student.yearsStudy.getFullYear() + 4) == yearGraduationFilter)
            );
        });

        handleSortClick('fullname', filteredStudents);
    }

    function handleSortClick(columnIndex, students = studentsArray) {
        tableBody.innerHTML = '';

        students.sort((a, b) => {
            const valueA = a[columnIndex];
            const valueB = b[columnIndex];

            return valueA < valueB ? -sortOrder : valueA > valueB ? sortOrder : 0;
        });

        students.forEach((student) => {
            const row = createTableRow(student, handler)
            tableBody.appendChild(row);
        });
    }

    function defineTemporalData(date, placeholderText, minDate, maxDate) {
        date.classList.add('form-control');
        date.setAttribute('type', 'date');
        date.placeholder = placeholderText;
        date.min = minDate;
        date.max = maxDate;
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

    function deleteSpaces(input) {
        return input
            .split(/\s+/)
            .filter(str => str.trim() !== '')
            .map(str => str.trim());
    }

    function createStudent(faculty, dataBirt, yearsStudy, nameArray, id = undefined) {
        const facultyArray = deleteSpaces(faculty);
        
        if (!id) {
            id = new Date().getTime();
        } 

        const student = {
            name: nameArray[1],
            surname: nameArray[0],
            middleName: nameArray[2],
            fullname: nameArray.join(' '),
            faculty: facultyArray.join(' '),
            dateOfBirth: new Date(dataBirt),
            yearsStudy: new Date(yearsStudy),
            id: id,
        };

        studentsArray.push(student);

        return student;
    }

    function createTableRow(student, { onDelete }) {
        const row = document.createElement('tr');

        const name = document.createElement('td');
        name.textContent = student.fullname;

        const faculty = document.createElement('td');
        faculty.textContent = student.faculty;

        const dataBirth = document.createElement('td');
        dataBirth.textContent = formatDateString(student.dateOfBirth);

        const yearsStudy = document.createElement('td');
        yearsStudy.textContent = printYearsSchooling(student.yearsStudy);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.addEventListener('click', () => {
            onDelete({ student, element: row });
        });

        const deleteCell = document.createElement('td');
        deleteCell.appendChild(deleteButton);

        row.appendChild(name);
        row.appendChild(faculty);
        row.appendChild(dataBirth);
        row.appendChild(yearsStudy);
        row.appendChild(deleteCell);

        return row;
    }

    function createStudentForm() {
        const form = document.createElement('form');
        const nameInput = document.createElement('input');
        const facultyInput = document.createElement('input');
        const dataBirtInput = document.createElement('input');
        const yearsStudyInput = document.createElement('input');
        const button = document.createElement('button');
        const buttonWrapper = document.createElement('div');

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

    function handleInputChange() {
        studentForm.button.disabled = !(
            studentForm.nameInput.value &&
            studentForm.facultyInput.value &&
            studentForm.dataBirtInput.value &&
            studentForm.yearsStudyInput.value
        );
    }

    function createFilterForm() {
        const form = document.createElement('form');
        const fullnameSearch = document.createElement('input');
        const facultySearch = document.createElement('input');
        const yearBeginningStudy = document.createElement('input');
        const yearGraduation = document.createElement('input');
        const clearButton = document.createElement('button');

        form.classList.add('input-group', 'mb-3');

        fullnameSearch.classList.add('form-control');
        fullnameSearch.placeholder = 'Введите часть имени для поиска';

        facultySearch.classList.add('form-control');
        facultySearch.placeholder = 'Введите часть названия факультета для поиска';

        yearBeginningStudy.classList.add('form-control');
        yearBeginningStudy.placeholder = 'Введите год начала обучения для поиска';

        yearGraduation.classList.add('form-control');
        yearGraduation.placeholder = 'Введите год окончания обучения для поиска';

        clearButton.classList.add('btn', 'btn-primary');
        clearButton.textContent = 'Очистить фильтры';

        form.append(fullnameSearch);
        form.append(facultySearch);
        form.append(yearBeginningStudy);
        form.append(yearGraduation);
        form.append(clearButton);

        return {
            form,
            fullnameSearch,
            facultySearch,
            yearBeginningStudy,
            yearGraduation,
            clearButton,
        };
    }


    applyFilters();

    const studentFilterForm = createFilterForm();
    const filterForm = document.getElementById('filter-form');
    const studentForm = createStudentForm();
    const inputForm = document.getElementById('input-form');
    const handler = {
        onDelete({ student, element }) {
            if (!confirm('Вы уверены?')) {
                return;
            }
            element.remove();
            fetch(`http://localhost:3000/students/${student.id}`, {
                method: 'DELETE',
            });
        },
    };

    filterForm.append(studentFilterForm.form);
    inputForm.append(studentForm.form);

    const response = await fetch('http://localhost:3000/students');
    const studentsListDB = await response.json();

    studentsListDB.forEach(student => {
        const nameArray = deleteSpaces(student.fullname);
        const studentFromDB = createStudent(
            student.faculty,
            student.dateOfBirth.substr(0, 10),
            student.yearsStudy,
            nameArray,
            student.id,
        );

        const row = createTableRow(studentFromDB, handler);
        tableBody.append(row);
    })

    const { clearButton, ...otherFilter } = studentFilterForm;

    Object.values(otherFilter).forEach(input => input.addEventListener('input', applyFilters));

    studentFilterForm.clearButton.addEventListener('click', (e) => {
        e.preventDefault();

        Object.values(otherFilter).forEach(input => input.value = '');

        applyFilters();
    })

    const { button, ...other } = studentForm;

    Object.values(other).forEach(input => input.addEventListener('input', handleInputChange));

    handleInputChange();

    studentForm.form.addEventListener('submit', async (e) => {
        e.preventDefault();

        studentForm.button.disabled = true;

        const nameArray = deleteSpaces(studentForm.nameInput.value);

        if (nameArray.length !== 3) {
            studentForm.button.disabled = false;
            alert('ФИО должно состоять из 3 слов. Если у вас сложное имя, то объединяйте его знаком "-" (тире)')
            return;
        }

        const studentObj = createStudent(
            studentForm.facultyInput.value,
            studentForm.dataBirtInput.value,
            studentForm.yearsStudyInput.value,
            nameArray
        );

        const response = await fetch('http://localhost:3000/students', {
            method: 'POST',
            body: JSON.stringify(studentObj),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const student = await response.json();

        const row = createTableRow(student, handler);

        tableBody.append(row);
        Object.values(other).forEach(input => input.value = '');
    })
});