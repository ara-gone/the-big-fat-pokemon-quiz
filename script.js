const quizContainer = document.getElementById('quiz');
const titleContainer = document.getElementById('title');
const startButton = document.getElementById('start');

startButton.addEventListener('click', displayQuestion);

function displayQuestion() {
    titleContainer.style.display = 'none';
    startButton.style.display = 'none';

    const questionElement = document.createElement('div');
    questionElement.className = 'button';
    questionElement.innerHTML = 'this will be a question soon :)';

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
}