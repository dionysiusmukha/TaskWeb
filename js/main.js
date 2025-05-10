let taskCounter = 0;
let taskEmpty = 0;
let cardCounter = 0;
let cardEmpty = 0;
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
    nameTask.setAttribute('contenteditable','true');
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

    const containerForTextAndDelete = document.createElement('div');
    containerForTextAndDelete.setAttribute('id', 'cont-text-for-and-delete');
    task.appendChild(containerForTextAndDelete);


    const textElemnt = document.createElement('p');
    textElemnt.textContent = "+ Добавить карточку";
    textElemnt.classList.add('textInRect');
    containerForTextAndDelete.appendChild(textElemnt);
    textElemnt.addEventListener('click',addCard);

    const deleteTaskBtn = document.createElement('img');
    deleteTaskBtn.setAttribute('id', 'delete-task-btn');
    deleteTaskBtn.setAttribute('src', 'img/bin.svg')
    containerForTextAndDelete.appendChild(deleteTaskBtn);
    deleteTaskBtn.addEventListener('click', deleteTask);
}


function addCard() {
    cardCounter++;
    const taskElement = this.parentNode.parentNode;
    const containerForCards = taskElement.querySelector('.container-for-cards');
    const card = document.createElement('div');
    card.classList.add('cards');
    containerForCards.insertBefore(card,containerForCards.firstChild);

    const cardName = document.createElement('p');
    cardName.setAttribute('id', 'card-name');
    cardName.setAttribute('contenteditable','true');
    cardName.textContent = `Card ${cardCounter}`;
    card.appendChild(cardName);

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

    const deleteCardBtn = document.createElement('img');
    deleteCardBtn.setAttribute('id', 'delete-card-btn');
    deleteCardBtn.setAttribute('src', 'img/bin.svg')
    card.appendChild(deleteCardBtn);
    deleteCardBtn.addEventListener('click', deleteCard);

}

function deleteTask() {
    const taskElement = this.parentNode.parentNode;
    taskElement.remove();
}

function deleteCard() {
    const card = this.parentNode;
    card.remove();
}