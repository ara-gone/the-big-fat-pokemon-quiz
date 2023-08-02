const MAX_DEX_NUMBER = 898;

const quizContainer = document.getElementById('quiz');
const animationContainer = document.getElementById('animation');
const titleContainer = document.getElementById('title');
const startButton = document.getElementById('start');
// const resetButton = document.getElementById('reset');

let dexCounter = 0;
let questions = null;

// resetButton.addEventListener('click', resetPage);
startButton.addEventListener('click', displayQuestion);

function displayQuestion() {

    titleContainer.style.display = 'none';
    startButton.style.display = 'none';

    const questionElement = document.createElement('div');
    questionElement.className = 'button';
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

// $(document).ready(function() {
//     $.ajax({
//         type: "GET",
//         url: "data.txt",
//         dataType: "text",
//         success: function(data) {processData(data);}
//      });
// });

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