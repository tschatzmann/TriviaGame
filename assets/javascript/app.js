const questionContainer = document.getElementById('triviaQuestions');
const startGamebtn = document.getElementById('startGame');
const gameTimer = document.getElementById('timeDisplay');
const correctAnswersDisplay = document.getElementById('correctAnswersDisplay');

var intervalId = "";
var timerRunning = false;
var questionNumber = -1;
var searchWord = "";
var questionMessage = "";
let numCorrect = 0;
let numWrong = 0;
let seconds5 = 5;
let minutes = 0;
let seconds = 0;
let answerText = '';


const gameQuestions = [
    {
        question: "The slowest animal on Earth?",
        answers: {
            a: "Turtle",
            b: "Snail",
            c: "three-toed sloth"
        },
        correctAnswer: "c",
        GiffSearchWord: "three-toed sloth"
    },
    {
        question: "A snail can sleep how many years?",
        answers: {
            a: "5 years",
            b: "3 years",
            c: "10 years"
        },
        correctAnswer: "b",
        GiffSearchWord: "snail"

    },
    {
        question: "A group of young pigs is called?",
        answers: {
            a: "Drift",
            b: "Heard",
            c: "School",
        },
        correctAnswer: "a",
        GiffSearchWord: "baby pigs"
    },
    {
        question: "What animal has the longest lifespan?",
        answers: {
            a: "Elephant",
            b: "Blue Whale",
            c: "Giant Tortoise",
            d: "Locust",
        },
        correctAnswer: "c",
        GiffSearchWord: "Giant Tortoise"
    },
    {
        question: "What is the fastest flying bird in the world?",
        answers: {
            a: "Harpy Eagle",
            b: "Peregrine Falcon",
            c: "Horned Sungem",
            d: "Spine-tailed Swift",
        },
        correctAnswer: "b",
        GiffSearchWord: "Peregrine Falcon"
    },
    {
        question: " What is the largest of the great apes?",
        answers: {
            a: "Orangutan",
            b: "Western Lowland Gorilla",
            c: "Eastern Lowland Gorilla",
            d: "Mountain Gorilla",
        },
        correctAnswer: "d",
        GiffSearchWord: "Mountain Gorilla"
    }
];

var numberOfQuestions = (Object.keys(gameQuestions));
numberOfQuestions = numberOfQuestions.length++;
questionContainer.innerHTML = "Select Start to begin the game";
// start the games
startGamebtn.addEventListener('click', initGame);

//
function initGame() {
    questionContainer.innerHTML = "";
    correctAnswersDisplay.innerHTML = "";
    startGamebtn.style.display = "none";
    gameTimer.innerText = "Countdown: 00:00";
    timer = 0;
    stopTimer();
    startTimer(seconds5, gameTimer);
    questionNumber++;
    buildQuestion();
};

function startTimer(duration, gameTimer) {
    if (!timerRunning) {
        timerRunning = true;
        var timer = duration, minutes, seconds;
        intervalId = setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            gameTimer.innerText = "Countdown: " + minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
                checkAnswers();
            }
        }, 1000);
    }
};
function stopTimer() {
    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    timerRunning = false;
};


function buildQuestion() {
    if (questionNumber < numberOfQuestions) {
        const output = [];
        var currentQuestion = gameQuestions[questionNumber];
        questionContainer.innerHTML = output;
        // for each question...
        // store the list of answer choices, seaerch word and answer text
        const answers = [];
        const gifWords = [];
        answerText = '';
        // and for each available answer...
        for (letter in currentQuestion.answers) {
            // ...add an HTML radio button
            answers.push(
                `<button class="ansbuttons"
             name="question${questionNumber}" answer="${letter}" 
            >            
            ${letter} :
            ${currentQuestion.answers[letter]}
          </button>`
            );
        }
        output.push(

            `<div class="question"> ${currentQuestion.question} </div>
           <div id="answerbuttons"> ${answers.join("")} </div>`
        );
        gifWords.push(currentQuestion.GiffSearchWord);
        answerText = (currentQuestion.answers[currentQuestion.correctAnswer])
        questionContainer.innerHTML = output.join("");
    }
    else {
        endGame();
    };

};

$(questionContainer).on('click', ".ansbuttons", function () {
    var userAnswer = $(this).attr("answer")
    checkAnswers(userAnswer)
});



function checkAnswers(ans) {
    stopTimer();
    // for each question...
    var currentQuestion = gameQuestions[questionNumber];
    questionContainer.innerHTML = "  ";
    searchWord = currentQuestion.GiffSearchWord;
    // if answer is correct
    if (ans === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;
        questionMessage = `You are correct. The answer is ${answerText}`
    }
    // if answer is wrong or blank
    else {
        numWrong++;
        questionMessage = ` That is incorrect. The correct answer is ${answerText} `
    }
    displayCorrectAnswer(searchWord);
    startTimer(seconds5, gameTimer);
    //sleep between questions
    sleep(3000).then(() => {
        initGame();
    })
};

function displayCorrectAnswer(searchWord) {
    // Example queryURL for Giphy API
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchWord}&api_key=dc6zaTOxFJmzC&limit=1`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data[0];
        // Only taking action if the photo has an appropriate rating
        if (results.rating !== "r" && results.rating !== "pg-13") {
            // Creating a div template gif
            var ptemplate = `<p>
                ${questionMessage}</p>
                <div>
                <img src="${ results.images.fixed_height.url}">
                </div>`
            correctAnswersDisplay.innerHTML = ptemplate;
        }
    });
};

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

function endGame() {
    var gameoverTemplate = `
        <p> Your score is ${numCorrect} out of ${gameQuestions.length}`;
    questionContainer.innerHTML = gameoverTemplate;
    // show number of correct answers out of total
    stopTimer();
    // reset vars
    startGamebtn.style.display = "initial";
    startGamebtn.textContent = "Restart";
    questionNumber = -1;
    numCorrect = 0;
    numWrong = 0;
    time = 0;
    minutes = 0;
    seconds = 0;
    questionContainer.innerHTML = "Select Start to begin the game";
};
