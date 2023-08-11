const MAX_DEX_NUMBER = 898;
const MAX_QUESTION_OPTIONS = 4;
const MAX_QUIZ_LENGTH = 20;

const quizContainer = document.getElementById('quiz');
const animationContainer = document.getElementById('animation');
const titleContainer = document.getElementById('title');
const submitButton = document.getElementById('submit');
const startButton = document.getElementById('start');
// const resetButton = document.getElementById('reset');

let screenWidth = $(window).width();

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
    Serious:0,
    Bug:0,Dark:0,Dragon:0,Electric:0,Fairy:0,Fighting:0,
    Fire:0,Flying:0,Ghost:0,Grass:0,Ground:0,Ice:0,
    Normal:0,Poison:0,Psychic:0,Rock:0,Steel:0,Water:0
};

// resetButton.addEventListener('click', resetPage);
startButton.addEventListener('click', setupQuiz);
submitButton.addEventListener('click', submitAnswer);

function showResult() {
    quizContainer.innerHTML = '';
    submitButton.style.display = 'none';
    const div = document.createElement("div");
    div.style.width = "100px";
    div.style.height = "100px";
    div.innerHTML = JSON.stringify(userScore);
    quizContainer.appendChild(div);
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    console.log(selectedOption);

    if (selectedOption) {
        const result = selectedOption.value;
        userScore[result]++;
        currentQuestion++;

        if (currentQuestion < questions.length) {
            displayQuestion();
        }
        else {
            showResult();
        }
    }
}

function setupQuiz() {
    // sortQuestions(chosenQuizLength);
    titleContainer.style.display = 'none';
    startButton.style.display = 'none';

    sortQuestions();
    displayQuestion();
}

function sortQuestions() {
    for (let i = 0; i < data.length; i++) {
        questions.push(data[i]);
        // TODO: ensure the same questions don't come up
        // questions.push(
        //     data[Math.floor(Math.random() * data.length)]
        // );
    }

    console.log(questions);
    questions = shuffleArray(questions).slice(0, MAX_QUIZ_LENGTH);
    console.log(questions);
}

function shuffleArray (arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
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
        natureValue = null;
        switch(i){
            case 0:
                optionText = questions[currentQuestion].answer_1;
                natureValue = questions[currentQuestion].result_1;
                break;
            case 1:
                optionText = questions[currentQuestion].answer_2;
                natureValue = questions[currentQuestion].result_2;
                break;
            case 2:
                optionText = questions[currentQuestion].answer_3;
                natureValue = questions[currentQuestion].result_3;
                break;
            case 3:
                optionText = questions[currentQuestion].answer_4;
                natureValue = questions[currentQuestion].result_4;
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
            radio.value = natureValue;

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
    // TODO: create multiple flying mons?
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
loopFunction(10000, 
    function() {
        
        url_base = "assets/sprites/icons/";
        dexCounter++;
        if (dexCounter >= 1000) {
            dexCounter = 0; // unused atm
        }

        animations = document.getElementsByClassName("sprites");

        for (let anim of animations) {
            right_edge = anim.clientWidth + anim.leftOffset;

            // if (right_edge-screenWidth > anim.clientWidth * 1.2) {
            //     anim.src = url_base + (Math.floor(Math.random() * MAX_DEX_NUMBER) + 1) + ".png";
            //     anim.style.top = `${Math.floor(Math.random() * 60)}%`;
            //     anim.style['animation-duration'] = `${Math.floor(Math.random() * 20) + 10}s`;

            //     x = Math.floor((Math.random() * 2) + 1);
            //     if (x == 1) {
            //         anim.style['animation-name'] = 'l_r';
            //     }
            //     else if (x == 2) {
            //         anim.style['animation-name'] = 'r_l';
            //     }
            // }
            anim.src = url_base + (Math.floor(Math.random() * MAX_DEX_NUMBER) + 1) + ".png";
            // anim.style.top = `${Math.floor(Math.random() * 60)}%`;
            // anim.style['animation-duration'] = `${Math.floor(Math.random() * 20) + 10}s`;
            
            x = Math.floor((Math.random() * 2) + 1);
            if (x == 1) {
                anim.style['animation-name'] = 'fade-left-to-right';
            }
            else if (x == 2) {
                anim.style['animation-name'] = 'fade-right-to-left';
            }
        }
    });

setup();