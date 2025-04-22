let taskCounter = 0;
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
    nameTask.textContent = `Name ${taskCounter}`;
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
}


function addCard() {
    const taskElement = this.parentNode
    const containerForCards = taskElement.querySelector('.container-for-cards');
    const card = document.createElement('div');
    card.classList.add('cards');
    containerForCards.insertBefore(card,containerForCards.firstChild);
}