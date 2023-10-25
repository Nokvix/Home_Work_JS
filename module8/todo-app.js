(function() {
    // Создаём и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    // Создаём и возвращаем форму для создания дела
    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3'); // input-group: группа элементов формы, спец. образом стилизуется bootstrap; 
                                                  // mb-3: оставляет отступ после формы
        input.classList.add('form-control'); // form-control: для правильного отображения bootstrap формы
        input.placeholder = 'Введите название нового дела'; // Пояснение, что нужно вводить в поле
        buttonWrapper.classList.add('input-group-append'); // input-group-append: позиционирует объект формы справа от поля ввода
        button.classList.add('btn', 'btn-primary'); // btn: применит стили bootstrap к кнопке; 
                                                    //btn-primary: окрасит кнопку в синий цвет (единственная кнопка или основ. действ.)
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper); // объединяем всё в одну структуру

        return {
            form,
            input,
            button, // вернули не только form, тк нужно получить доступ к input и button
        };
    }

    // Создаём и возвращаем список элементов
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name) {
        let item = document.createElement('li');
        // Кнопки помещаем в элемент, который красиво покажет их в одной группе
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button'); // отметить, что дело сделано
        let deleteButton = document.createElement('button'); // удалить дело

        // Устанавливаем стили для элемента списка, а также для размещения кнопок
        // в его правой части с помощью flex
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        // list-group-item: красиво показать элемент внутри списка; остальные три класса для выравнивания
        item.textContent = name; // не innerHTML, тк в name могут быть спец символы (<, >, ...)
        buttonGroup.classList.add('btn-group', 'btn-group-sm'); // btn-group: применяет стили; btn-group-sm: уменьшает высоту объекта
        doneButton.classList.add('btn', 'btn-success'); // btn-success: делает кнопку зелёной
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger'); // btn-danger: делает кнопку красной
        deleteButton.textContent = 'Удалить';

        // вкладываем кнопки в отдельный элемент, чтобы они объединилсь в один блок
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
        return {
            item,
            doneButton,
            deleteButton,
        };
    };

    function createTodoApp(container, title = 'Список дел') {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        // браузер создаёт событие submit на форме по нажатию Enter или на кнопку создания дела
        todoItemForm.form.addEventListener('submit', function(e) {
            // эта строчка необходима, чтобы предотвратить стандартной действие браузера
            // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
            e.preventDefault();

            // игнорируем создание элемента, если пользователь ничего не ввёл в поле
            if (!todoItemForm.input.value) {
                return;
            }

            let todoItem = createTodoItem(todoItemForm.input.value);

            // добавляем обработчики событий
            todoItem.doneButton.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success'); // list-group-item-success: bootstrap красит элемент в зелёный
            });
            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                }
            });

            // создаём и добавляем в список новое дело с названием из поля для ввода
            todoList.append(todoItem.item);

            // обнуляем значение в поле, чтобы не пришлось его стирать вручную
            todoItemForm.input.value = '';
        });
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        createTodoApp(document.getElementById('my-todos'), 'Мои дела');
        createTodoApp(document.getElementById('mom-todos'), 'Дела для мамы');
        createTodoApp(document.getElementById('dad-todos'), 'Дела для папы');     
    });

    window.createTodoApp = createTodoApp;
})();