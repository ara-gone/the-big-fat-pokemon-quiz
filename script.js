const quizContainer = document.getElementById('quiz');
const titleContainer = document.getElementById('title');
const startButton = document.getElementById('start');
// const resetButton = document.getElementById('reset');

// resetButton.addEventListener('click', resetPage);
startButton.addEventListener('click', displayQuestion);

function displayQuestion() {
    titleContainer.style.display = 'none';
    startButton.style.display = 'none';

    const questionElement = document.createElement('div');
    questionElement.className = 'button';
    // g.setAttribute("id", "Div1");
    questionElement.innerHTML = 'this will be a question soon :)';
    
    // resetButton = document.createElement('div');
    // resetButton.className = 'button';
    // resetButton.setAttribute("id", "reset");
    // resetButton.innerHTML = 'this will be a question soon :)';

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
}

function resetPage() {
    quizContainer.style.display = 'none';

    titleContainer.style.display = 'block';
    startButton.style.display = 'block';
}