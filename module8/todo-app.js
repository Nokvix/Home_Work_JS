(function() {
    // массив для хранения дел в виде объектов
    let todos = [];

    function dataToJson(data) {
        return JSON.stringify(data);
    }

    function jsonToData(data) {
        return JSON.parse(data);
    }

    function getCartData(key) {
        return localStorage.getItem(key);
    }

    function setCartData(key, data) {
        return localStorage.setItem(key, data);
    }

    function addToLocalStorage(key, data) {
        let cart = getCartData(key);
        cart = cart ? jsonToData(cart) : [];
        let existingElem = cart.find((elem) => elem.id === data.id)
        if (!existingElem) {
            cart.push(data);
            setCartData(key, dataToJson(cart));
        }
    }

    function removeFromLocalStorage(key, id) {
        let cart = jsonToData(getCartData(key));
        
        let newCart = cart.filter((elem) => elem.id !== id);

        setCartData(key, dataToJson(newCart));
    }

    function caseEdit(key, data) {
        let cart = jsonToData(getCartData(key));

        let foundObject = cart.find((elem) => elem.id === data.id);
        if (foundObject) {
            foundObject.done = !foundObject.done;
            setCartData(key, dataToJson(cart));
        }
    }

    function loadTodosFromLocalStorage(listName) {
        let data = getCartData(listName);
        if (data) {
            todos = [];
            todos = jsonToData(data);
        }
    }

    function eventHandling(todoItem, listName, todo) {
        todoItem.doneButton.addEventListener('click', function() {
            caseEdit(listName, todo);
            todoItem.item.classList.toggle('list-group-item-success');
        });

        todoItem.deleteButton.addEventListener('click', function() {
            if (confirm('Вы уверены?')) {
                todos = todos.filter((elem) => elem.id !== todo.id);
                todoItem.item.remove();
                removeFromLocalStorage(listName, todo.id);
            }
        });
        
        return todoItem;
    }

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

    function createTodoItem(object, listName, fromLocalStorage = false) {
        let item = document.createElement('li');
        // Кнопки помещаем в элемент, который красиво покажет их в одной группе
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button'); // отметить, что дело сделано
        let deleteButton = document.createElement('button'); // удалить дело

        // Устанавливаем стили для элемента списка, а также для размещения кнопок
        // в его правой части с помощью flex
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        // list-group-item: красиво показать элемент внутри списка; остальные три класса для выравнивания
        item.textContent = object.name; // не innerHTML, тк в name могут быть спец символы (<, >, ...)
        buttonGroup.classList.add('btn-group', 'btn-group-sm'); // btn-group: применяет стили; btn-group-sm: уменьшает высоту объекта
        doneButton.classList.add('btn', 'btn-success'); // btn-success: делает кнопку зелёной
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger'); // btn-danger: делает кнопку красной
        deleteButton.textContent = 'Удалить';

        // вкладываем кнопки в отдельный элемент, чтобы они объединилсь в один блок
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        let caseData = {}
        if (!fromLocalStorage) {
            caseData = {
                id: todos.length + 1, // Генерируем уникальный id, увеличивая на 1 больше предыдущего максимального
                name: object.name,
                done: false
            }
        

            // добавляю дело в массив дел
            todos.push(caseData);

            addToLocalStorage(listName, caseData);

            let id = todos.length;

            // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
            return {
                item,
                doneButton,
                deleteButton,
                id,
            };
        } else {
            caseData = {
                id: todos.length, // Генерируем уникальный id, увеличивая на 1 больше предыдущего максимального
                name: object.name,
                done: false
            }

            // добавляю дело в массив дел
            let elemInTodos = todos.find((elem) => elem.id === caseData.id);
            if (!elemInTodos) {
                todos.push(caseData);
            } 

            addToLocalStorage(listName, caseData);

            let id = caseData.id;

            // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
            return {
                item,
                doneButton,
                deleteButton,
                id,
            };
        }
    };

    function createTodoApp(container, listName, title = 'Список дел') { 
        // localStorage.clear();
        loadTodosFromLocalStorage(listName);
        
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        
        if (!todoItemForm.input.value) {
            todoItemForm.button.disabled = true;
        }

        todoItemForm.input.addEventListener('input', function() {
            if (!todoItemForm.input.value) {
                todoItemForm.button.disabled = true;
            } else {
                todoItemForm.button.disabled = false;
            }
        });

    // Цикл для создания элементов для каждой задачи в массиве todos
    todos.forEach(function(todo) {
        let todoItem = createTodoItem(todo, listName, true);

        // todoItem.doneButton.addEventListener('click', function() {
        //     caseEdit(listName, todo);
        //     todoItem.item.classList.toggle('list-group-item-success');
        // });

        // todoItem.deleteButton.addEventListener('click', function() {
        //     if (confirm('Вы уверены?')) {
        //         todos = todos.filter((elem) => elem.id !== todo.id);
        //         todoItem.item.remove();
        //         removeFromLocalStorage(listName, todo.id);
        //     }
        // });
        
        todoItem = eventHandling(todoItem, listName, todo);

        todoList.append(todoItem.item);
    });

        // браузер создаёт событие submit на форме по нажатию Enter или на кнопку создания дела
        todoItemForm.form.addEventListener('submit', function(e) {
            // эта строчка необходима, чтобы предотвратить стандартной действие браузера
            // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
            e.preventDefault();

            // игнорируем создание элемента, если пользователь ничего не ввёл в поле
            if (!todoItemForm.input.value) {
                return;
            }

            todoItemForm.button.disabled = true;

            let todoItem = createTodoItem({
                name: todoItemForm.input.value, 
                done: false,
            }, 
            listName);

            // добавляем обработчики событий
            // todoItem.doneButton.addEventListener('click', function() {
            //     let foundObject = todos.find((elem) => elem.id === todoItem.id);
            //     caseEdit(listName, foundObject);
            //     todoItem.item.classList.toggle('list-group-item-success'); // list-group-item-success: bootstrap красит элемент в зелёный
            // });
            // todoItem.deleteButton.addEventListener('click', function() {
            //     if (confirm('Вы уверены?')) {
            //         let todoElem = todos.find((elem) => elem.id === todoItem.id);
            //         todos = todos.filter((elem) => elem.id !== todoItem.id);
            //         todoItem.item.remove();
            //         removeFromLocalStorage(listName, todoElem.id)
            //     }
            // });

            let foundObject = todos.find((elem) => elem.id === todoItem.id);
            todoItem = eventHandling(todoItem, listName, foundObject);

            // создаём и добавляем в список новое дело с названием из поля для ввода
            todoList.append(todoItem.item);

            // обнуляем значение в поле, чтобы не пришлось его стирать вручную
            todoItemForm.input.value = '';
        });
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        createTodoApp(document.getElementById('my-todos'), 'my', 'Мои дела');
        createTodoApp(document.getElementById('dad-todos'), 'dad', 'Дела для папы');     
        createTodoApp(document.getElementById('mom-todos'), 'mom', 'Дела для мамы');
    });

    window.createTodoApp = createTodoApp;
})();