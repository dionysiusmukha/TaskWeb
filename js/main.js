let taskCounter = 0;
let taskEmpty = 0;
document.getElementById('main-btn').addEventListener('click', addTask);


function addTask() {
    const container = document.getElementById('container-main');
    taskCounter++;

    const task = document.createElement('div');
    task.classList.add('task');
    container.appendChild(task);


    const nameAndCategory = document.createElement('div');
    nameAndCategory.classList.add('name-and-category');
    task.appendChild(nameAndCategory);

    const nameTask = document.createElement('p');
    nameTask.classList.add('name-task');
    nameAndCategory.appendChild(nameTask);
    nameTask.setAttribute('contenteditable','true')
    nameTask.textContent = `Name ${taskCounter}`;
    nameTask.addEventListener('blur', function () {
       if (this.textContent.trim() === '') {
           taskEmpty++;
           this.textContent = `Name Empty${taskEmpty}`;
       }
    });
    nameTask.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.blur();
        }
    });
    const MAX_LENGTH = 18; // Максимальное количество символов

    nameTask.addEventListener('input', function() {
        if (this.textContent.length > MAX_LENGTH) {
            this.textContent = this.textContent.substring(0, MAX_LENGTH);
            alert(`Максимальная длина - ${MAX_LENGTH} символов`);
        }
    });

    const categoryTask = document.createElement('p');
    categoryTask.classList.add('category');
    nameAndCategory.appendChild(categoryTask);
    categoryTask.textContent = `Category ${taskCounter}`;

    const containerForCards = document.createElement('div');
    containerForCards.classList.add('container-for-cards');
    task.appendChild(containerForCards);


    const textElemnt = document.createElement('p');
    textElemnt.textContent = "+ Добавить карточку";
    textElemnt.classList.add('textInRect');
    task.appendChild(textElemnt);
    textElemnt.addEventListener('click',addCard);

    const deleteCardBtn = document.createElement('img');
    deleteCardBtn.setAttribute('id', 'delete-card-btn');
    deleteCardBtn.setAttribute('src', 'img/bin.svg')
    task.appendChild(deleteCardBtn);
    deleteCardBtn.addEventListener('click', deleteTask);
}


function addCard() {
    const taskElement = this.parentNode
    const containerForCards = taskElement.querySelector('.container-for-cards');
    const card = document.createElement('div');
    card.classList.add('cards');
    containerForCards.insertBefore(card,containerForCards.firstChild);
}

function deleteTask() {
    const taskElement = this.parentNode;
    taskElement.remove();
}