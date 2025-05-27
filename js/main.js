
let taskCounter = 0;
let taskEmpty = 0;
let cardCounter = 0;
let cardEmpty = 0;
document.getElementById('main-btn').addEventListener('click', () => addTask());

function addTask(initialalName = null) {
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
    nameTask.setAttribute('contenteditable','true');
    nameTask.textContent = initialalName || `Цель ${taskCounter}`;
    let taskName = nameTask.textContent.toLowerCase().trim();
    if (taskName === 'планируется') {
        nameAndCategory.classList.add('task-header', 'planned');
    } else if (taskName === 'в работе') {
        nameAndCategory.classList.add('task-header', 'in-progress');
    } else if (taskName === 'готово') {
        nameAndCategory.classList.add('task-header', 'done');
    } else {
        nameAndCategory.classList.add('task-header', 'default');
    }

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
    const MAX_LENGTH = 18;
    nameTask.addEventListener('input', function() {
        if (this.textContent.length > MAX_LENGTH) {
            this.textContent = this.textContent.substring(0, MAX_LENGTH);
            alert(`Максимальная длина - ${MAX_LENGTH} символов`);
        }
    });

    const containerForCards = document.createElement('div');
    containerForCards.classList.add('container-for-cards');
    task.appendChild(containerForCards);

    containerForCards.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    containerForCards.addEventListener('drop', function (e) {
        e.preventDefault();
        dragCounter = 0;
        task.classList.remove('drag-over');

        const cardId = e.dataTransfer.getData('text/plain');
        const draggedCard = document.getElementById(cardId);

        if (draggedCard) {
            const afterElement = getDragAfterElement(this, e.clientY);

            if (afterElement && afterElement !== draggedCard) {
                this.insertBefore(draggedCard, afterElement);
            } else {
                this.appendChild(draggedCard);
            }

            draggedCard.classList.remove(
                'card-accent-planned',
                'card-accent-in-progress',
                'card-accent-done',
                'card-accent-default'
            );
            draggedCard.classList.add(getTaskColorClass(task));
            draggedCard.classList.add('card-enter');
            setCardDragEvents(draggedCard);
        }
    });


    let dragCounter = 0;
    task.addEventListener('dragenter', function (e) {
        e.preventDefault();
        dragCounter++;
        this.classList.add('drag-over');
    });

    task.addEventListener('dragleave', function (e) {
        e.preventDefault();
        dragCounter--;
        if (dragCounter === 0) {
            task.classList.remove('drag-over');
        }
    });

    const containerForTextAndDelete = document.createElement('div');
    containerForTextAndDelete.setAttribute('id', 'cont-text-for-and-delete');
    task.appendChild(containerForTextAndDelete);

    const textElemnt = document.createElement('p');
    textElemnt.textContent = "Добавить карточку...";
    textElemnt.classList.add('textInRect');
    containerForTextAndDelete.appendChild(textElemnt);
    textElemnt.addEventListener('click', addCard);

    const deleteTaskBtn = document.createElement('img');
    deleteTaskBtn.setAttribute('id', 'delete-task-btn');
    deleteTaskBtn.setAttribute('src', 'img/bin.svg');
    containerForTextAndDelete.appendChild(deleteTaskBtn);
    deleteTaskBtn.addEventListener('click', deleteTask);
}

function addCard() {
    cardCounter++;
    const taskElement = this.parentNode.parentNode;
    const containerForCards = taskElement.querySelector('.container-for-cards');
    const card = document.createElement('div');
    card.id = `card-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    card.classList.add('cards');
    containerForCards.appendChild(card);

    const cardName = document.createElement('p');
    cardName.setAttribute('id', 'card-name');
    cardName.setAttribute('contenteditable','true');
    cardName.textContent = `Задача ${cardCounter}`;
    card.appendChild(cardName);
    const colorClass = getTaskColorClass(taskElement);
    card.classList.add(colorClass);

    cardName.addEventListener('blur', function () {
        if (this.textContent.trim() === '') {
            cardEmpty++;
            this.textContent = `Name Empty${cardEmpty}`;
        }
    });
    cardName.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.blur();
        }
    });
    const MAX_LENGTH = 30;
    cardName.addEventListener('input', function() {
        if (this.textContent.length > MAX_LENGTH) {
            this.textContent = this.textContent.substring(0, MAX_LENGTH);
            alert(`Максимальная длина - ${MAX_LENGTH} символов`);
        }
    });

    const mainCard = document.createElement('div');
    mainCard.classList.add('main-card');
    card.appendChild(mainCard);
    card.setAttribute('draggable', 'true');

    const deleteCardBtn = document.createElement('img');
    deleteCardBtn.setAttribute('id', 'delete-card-btn');
    deleteCardBtn.setAttribute('src', 'img/bin.svg');
    card.appendChild(deleteCardBtn);
    deleteCardBtn.addEventListener('click', deleteCard);

    setCardDragEvents(card);
}

function deleteTask() {
    const taskElement = this.parentNode.parentNode;
    taskElement.remove();
}

function deleteCard() {
    const card = this.parentNode;
    card.remove();
}

function setCardDragEvents(card) {
    card.setAttribute('draggable', 'true');
    card.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text/plain', card.id);
        e.dataTransfer.effectAllowed = 'move';
        card.classList.add('dragging');
    });

    card.addEventListener('dragend', function () {
        card.classList.remove('dragging');
    });
}

function getTaskColorClass(taskElement) {
    const header = taskElement.querySelector('.name-and-category');
    if (header.classList.contains('planned')) {
        return 'card-accent-planned';
    } else if (header.classList.contains('in-progress')) {
        return 'card-accent-in-progress';
    } else if (header.classList.contains('done')) {
        return 'card-accent-done';
    } else {
        return 'card-accent-default';
    }
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.cards:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}


window.addEventListener('DOMContentLoaded', () => {
    addTask('Планируется');
    addTask('В работе');
    addTask('Готово');
});
