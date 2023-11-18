const studentsArray = [];
const date = new Date();
const maxDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

document.addEventListener('DOMContentLoaded', function () {
    const tableHeaders = document.querySelectorAll('.data-sort');
    const tableBody = document.getElementById('table-body');
    let sortOrder = 1;

    tableHeaders.forEach(function (header, index) {
        header.addEventListener('click', function () {
            switch (index) {
                case 0:
                    handleSortClick('fullname');
                    break;
                case 1:
                    handleSortClick('faculty');
                    break;
                case 2:
                    handleSortClick('dateOfBirth');
                    break;
                case 3:
                    handleSortClick('yearsStudy');
                    break;
            }

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

        students.sort(function (a, b) {
            const valueA = a[columnIndex];
            const valueB = b[columnIndex];

            if (valueA < valueB) return -sortOrder;
            if (valueA > valueB) return sortOrder;
            return 0;
        });

        students.forEach(function (student) {
            const row = document.createElement('tr');

            const name = document.createElement('td');
            name.textContent = Array(student.surname, student.name, student.middleName).join(' ');

            const faculty = document.createElement('td');
            faculty.textContent = student.faculty;

            const dataBirth = document.createElement('td');
            dataBirth.textContent = formatDateString(student.dateOfBirth);

            const yearsStudy = document.createElement('td');
            yearsStudy.textContent = printYearsSchooling(student.yearsStudy);

            row.appendChild(name);
            row.appendChild(faculty);
            row.appendChild(dataBirth);
            row.appendChild(yearsStudy);

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
            fullname: nameArray.join(' '),
            faculty: facultyArray.join(' '),
            dateOfBirth: new Date(studentForm.dataBirtInput.value),
            yearsStudy: new Date(studentForm.yearsStudyInput.value),
        };

        studentsArray.push(student);

        const row = document.createElement('tr');

        const name = document.createElement('td');
        name.textContent = Array(student.surname, student.name, student.middleName).join(' ');

        const faculty = document.createElement('td');
        faculty.textContent = student.faculty;

        const dataBirth = document.createElement('td');
        dataBirth.textContent = formatDateString(studentForm.dataBirtInput.value);

        const yearsStudy = document.createElement('td');
        yearsStudy.textContent = printYearsSchooling(studentForm.yearsStudyInput.value);

        row.appendChild(name);
        row.appendChild(faculty);
        row.appendChild(dataBirth);
        row.appendChild(yearsStudy);

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

    filterForm.append(studentFilterForm.form);
    inputForm.append(studentForm.form);

    studentFilterForm.fullnameSearch.addEventListener('input', applyFilters);
    studentFilterForm.facultySearch.addEventListener('input', applyFilters);
    studentFilterForm.yearBeginningStudy.addEventListener('input', applyFilters);
    studentFilterForm.yearGraduation.addEventListener('input', applyFilters);
    
    studentFilterForm.clearButton.addEventListener('click', function (e) {
        e.preventDefault();
        
        studentFilterForm.fullnameSearch.value = '';
        studentFilterForm.facultySearch.value = '';
        studentFilterForm.yearBeginningStudy.value = '';
        studentFilterForm.yearGraduation.value = '';

        applyFilters();
    })

    studentForm.nameInput.addEventListener('input', handleInputChange);
    studentForm.facultyInput.addEventListener('input', handleInputChange);
    studentForm.dataBirtInput.addEventListener('input', handleInputChange);
    studentForm.yearsStudyInput.addEventListener('input', handleInputChange);

    handleInputChange();

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
});