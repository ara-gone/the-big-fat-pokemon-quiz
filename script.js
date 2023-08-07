const MAX_DEX_NUMBER = 898;
const MAX_QUESTION_OPTIONS = 4;
const MAX_QUIZ_LENGTH = 10;

const quizContainer = document.getElementById('quiz');
const animationContainer = document.getElementById('animation');
const titleContainer = document.getElementById('title');
const submitButton = document.getElementById('submit');
const startButton = document.getElementById('start');
// const resetButton = document.getElementById('reset');

let dexCounter = 0; // for chronological ordering of pokemon

let questions = [];
let currentQuestion = 0;

let data = null;
let userScore = {
    Hardy:0,
    Lonely:0,
    Adamant:0,
    Naughty:0,
    Brave:0,
    Bold:0,
    Docile:0,
    Impish:0,
    Lax:0,
    Relaxed:0,
    Modest:0,
    Mild:0,
    Bashful:0,
    Rash:0,
    Quiet:0,
    Calm:0,
    Gentle:0,
    Careful:0,
    Quirky:0,
    Sassy:0,
    Timid:0,
    Hasty:0,
    Jolly:0,
    Naive:0,
    Serious:0
};

// resetButton.addEventListener('click', resetPage);
startButton.addEventListener('click', setupQuiz);
//nextButton.addEventListener('click', submitAnswer);

function showResult() {

}

function setupQuiz() {
    // sortQuestions(chosenQuizLength);
    titleContainer.style.display = 'none';
    startButton.style.display = 'none';

    sortQuestions();
    console.log(questions);
    displayQuestion();
}

function sortQuestions() {
    for (let i = 0; i < MAX_QUIZ_LENGTH; i++) {
        // TODO: ensure the same questions don't come up
        questions.push(
            data[Math.floor(Math.random() * data.length)]
        );
    }
}

function displayQuestion() {

    console.log(questions[currentQuestion]);
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questions[currentQuestion].question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    for (let i = 0; i < MAX_QUESTION_OPTIONS; i++) {
        optionText = null;
        switch(i){
            case 0:
                optionText = questions[currentQuestion].answer_1;
                break;
            case 1:
                optionText = questions[currentQuestion].answer_2;
                break;
            case 2:
                optionText = questions[currentQuestion].answer_3;
                break;
            case 3:
                optionText = questions[currentQuestion].answer_4;
                break;
            default:
            break;
        }

        if (optionText != "" && optionText != null) {
            const option = document.createElement('label');
            option.className = 'option';
        
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'quiz';
            radio.value = option;

            // Bad variable name!
            const text = document.createTextNode(optionText);

            option.appendChild(radio);
            option.appendChild(text);
            optionsElement.appendChild(option);
        }
    }
    
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);

    submitButton.style.display = 'inline-block';
    // quizContainer.appendChild(submitButton);
}

function resetPage() {
    quizContainer.style.display = 'none';
    titleContainer.style.display = 'block';
    startButton.style.display = 'block';
}

function loopFunction(delay, callback){
    var loop = function(){
        callback();
        setTimeout(loop, delay);
    }; loop();
};

function setup(){
    // animations = document.getElementsByClassName("animation");
    // for (let anim of animations) {
    //     anim.style.backgroundImage = url_base + (Math.floor(Math.random() * 100) + 1) + ".png\"";
    // }

    let img = document.createElement('img');
    img.src = 'assets/sprites/icons/1.png';
    img.class = 'sprites';
    img.style.top = "60%";
    // document.getElementById('body').appendChild(img);

    // (Math.floor(Math.random() * 10) + 1)

    $.get("data/questions.csv", function(questions) {
         data = $.csv.toObjects(questions);
         console.log(data);
    });
}

// change this to function that resets image + position on page border hit
loopFunction(20000, 
    function() {
        
        url_base = "assets/sprites/icons/";
        dexCounter++;
        if (dexCounter >= 1000) {
            dexCounter = 0; // unused atm
        }

        animations = document.getElementsByClassName("sprites");

        for (let anim of animations) {
            anim.src = url_base + (Math.floor(Math.random() * MAX_DEX_NUMBER) + 1) + ".png";
            anim.style.top = `${Math.floor(Math.random() * 100)}%`;
        }
    });

setup();