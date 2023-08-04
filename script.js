const MAX_DEX_NUMBER = 898;
const MAX_QUESTION_OPTIONS = 4;

const quizContainer = document.getElementById('quiz');
const animationContainer = document.getElementById('animation');
const titleContainer = document.getElementById('title');
const startButton = document.getElementById('start');
// const resetButton = document.getElementById('reset');

let dexCounter = 0;
let data = null;

// resetButton.addEventListener('click', resetPage);
startButton.addEventListener('click', displayQuestion);

function displayQuestion() {

    titleContainer.style.display = 'none';
    startButton.style.display = 'none';

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    question_id = Math.floor(Math.random() * data.length);
    questionElement.innerHTML = data[question_id].question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    console.log(data);
    for (let i = 0; i < MAX_QUESTION_OPTIONS; i++) {
        optionText = null;
        switch(i){
            case 0:
                optionText = data[question_id].answer_1;
                break;
            case 1:
                optionText = data[question_id].answer_2;
                break;
            case 2:
                optionText = data[question_id].answer_3;
                break;
            case 3:
                optionText = data[question_id].answer_4;
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
    animations = document.getElementsByClassName("animation");
    for (let anim of animations) {
        anim.style.backgroundImage = url_base + (Math.floor(Math.random() * 100) + 1) + ".png\"";
    }

    $.get("questions.csv", function(questions) {
        //  console.log(questions);
         data = $.csv.toObjects(questions);
         console.log(data);
    });

    // questions = $.csv.toArray('questions.csv');
    // console.log(questions);
}

loopFunction(10000, 
    function() {
        
        url_base = "url(\"assets/sprites/icons/";
        dexCounter++;
        if (dexCounter >= 1000) {
            dexCounter = 0;
        }

        animations = document.getElementsByClassName("animation");

        for (let anim of animations) {
            anim.style.backgroundImage = url_base + (Math.floor(Math.random() * MAX_DEX_NUMBER)) + ".png\"";
        }
    });

setup();