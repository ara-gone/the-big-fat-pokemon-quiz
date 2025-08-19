const MAX_DEX_NUMBER = 898;
const MAX_QUESTION_OPTIONS = 4;
const MAX_QUIZ_LENGTH = 10;
const MAX_NUMBER_DISPLAYED_SPRITES = 20;

const quizContainer = document.getElementById('quiz');
const animationContainer = document.getElementById('animation');
const titleContainer = document.getElementById('title');
const submitButton = document.getElementById('submit');
const startButton = document.getElementById('start');
// const resetButton = document.getElementById('reset');

let screenWidth = $(window).width();

let dexCounter = 0; // for chronological ordering of pokemon

let questions_csv = null;
let questions = [];
let poke_csv = null;
let poke_data = [];

let currentQuestion = 0;

let personaScore = {
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

let typeScore = {
    Bug:0,Dark:0,Dragon:0,Electric:0,Fairy:0,Fighting:0,
    Fire:0,Flying:0,Ghost:0,Grass:0,Ground:0,Ice:0,
    Normal:0,Poison:0,Psychic:0,Rock:0,Steel:0,Water:0
};

let sprite_list = []

// resetButton.addEventListener('click', resetPage);
startButton.addEventListener('click', setupQuiz);
submitButton.addEventListener('click', submitAnswer);

function showResult() {

    let personality_result = 'Serious';
    let best_personality_score = 0;

    // determine the user's personality type by score
    console.log(personaScore);
    for (var key in personaScore) {
        if (personaScore.hasOwnProperty(key)) {
            if (personaScore[key] > best_personality_score) {
                console.log(personaScore[key])

                best_personality_score = personaScore[key];
                personality_result = key;
            }
        }
    }

    // determine the user's preferred pokemon type[s]

    let typing_1 = 'Normal'; // set defaults
    t1_score = 0;
    let typing_2 = 'Normal';
    t2_score = 0;

    console.log(typeScore); 
    for (var key in typeScore) {
        if (typeScore.hasOwnProperty(key)) {
            if (typeScore[key] > t1_score) {
                // knock down the currently preferred type by a rank
                t2_score = t1_score;
                typing_2 = typing_1;

                // then update first preference type
                t1_score = typeScore[key];
                typing_1 = key; 
            }
            else if (typeScore[key] > t2_score) {
                // replace second preference
                t2_score = typeScore[key];
                typing_2 = key;
            }
        }
    }

    console.log(typing_1);
    console.log(typing_2);

    for (let i = 0; i < poke_csv.length; i++) {
        if (poke_csv[i].Personality == personality_result && 
            (poke_csv[i].Type1 == typing_1 
            || poke_csv[i].Type2 == typing_1
            || poke_csv[i].Type1 == typing_2
            || poke_csv[i].Type2 == typing_2)
            ) {
            poke_data.push(poke_csv[i]);
        }
    }

    console.log(poke_data);
    pokemon_result = null
    if (poke_data.length == 0) {
        console.log('no pokemon result available!');
        pokemon_result = poke_csv[Math.floor(Math.random() * poke_csv.length)];
    }
    else {
        pokemon_result = poke_data[Math.floor(Math.random() * poke_data.length)];
    }

    console.log(pokemon_result);
    fetchPokeData(pokemon_result.Name);

    quizContainer.innerHTML = '';
    submitButton.style.display = 'none';
    const div = document.createElement("div");
    div.style.width = "500px";
    div.style.height = "100px";
    div.innerHTML = 'You are... the ' + personality_result + ' type. \nYou must be... a ' + pokemon_result.Name + '!';
    // div.innerHTML = JSON.stringify(userScore);

    const pokemonImage = document.getElementById('result');
    pokemonImage.style.display = "inline-block";

    quizContainer.appendChild(div);
}

async function fetchPokeData(name) {
    // assuming capitalized pokemon names...
    
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase());
    const pokemon = await response.json();
    console.log(pokemon);
    console.log(pokemon.sprites.other['official-artwork'].front_default);

    // const div = document.createElement("div");
    // div.style.width = "100px";
    // div.style.height = "100px";
    // div.innerHTML = 'TEST';
    // quizContainer.appendChild(div);

    var img = document.createElement("img");
    img.src = pokemon.sprites.other['official-artwork'].front_default;
    img.className = "artwork";
    quizContainer.appendChild(img);

    return pokemon.sprites.other['official-artwork'].front_default;
  }

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    console.log(selectedOption);

    if (selectedOption) {
        const result = selectedOption.value;
        console.log(result);
        if (personaScore.hasOwnProperty(result)) {
            personaScore[result]++;
        }
        else if (typeScore.hasOwnProperty(result)) {
            typeScore[result]++;
        }
        // userScore[result]++;
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
    for (let i = 0; i < questions_csv.length; i++) {
        questions.push(questions_csv[i]);
    }

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

    const div = document.createElement("div");
    div.style.width = "500px";
    div.style.height = "20px";
    div.innerHTML = (currentQuestion+1) + "/" + MAX_QUIZ_LENGTH;
    quizContainer.appendChild(div);
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
    const initial_sprite = document.getElementById("initial");

    for (i = 0; i < MAX_NUMBER_DISPLAYED_SPRITES; i++) {
        const cloned_sprite = initial_sprite.cloneNode(true);

        cloned_sprite.id = "clone";
        sprite_list.push(cloned_sprite);
    
        document.body.appendChild(cloned_sprite);
    }

    $.get("data/questions.csv", function(questions) {
         questions_csv = $.csv.toObjects(questions);
         console.log(questions_csv);
    });

    $.get("data/pokemon.csv", function(questions) {
        poke_csv = $.csv.toObjects(questions);
        console.log(poke_csv);
   });
}

// change this to function that resets image + position on page border hit
loopFunction(3000, 
    function() {
        url_base = "assets/sprites/icons/";
        animations = document.getElementsByClassName("sprites");
        
        for (let anim of animations) {
            anim.src = url_base + (Math.floor(Math.random() * MAX_DEX_NUMBER) + 1) + ".png";
            if (anim.id == "clone") {
                anim.style.left = (Math.random() * screenWidth) + "px";
                anim.style.top = (Math.random() * screenWidth) + "px";
            }
        }
    });

setup();