const questionContainer = document.getElementById('triviaQuestions');
const startGamebtn = document.getElementById('startGame');
const gameTimer = document.getElementById('timeDisplay')

var intervalId = "";
var timerRunning = false;
var time = 0;
var questionNumber = -1;
var searchWord = "";
var questionMessage = "";
let numCorrect = 0;
let numWrong = 0;
let seconds30 = 15;
let minutes = 0;
let seconds = 0;


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
        GiffSearchWord: "pig"
    },
];

var numberOfQuestions = (Object.keys(gameQuestions));
console.log(numberOfQuestions);
numberOfQuestions = numberOfQuestions.length++;
console.log(numberOfQuestions);
questionContainer.innerHTML = "Select Start to begin the game";
// start the games
startGamebtn.addEventListener('click', initGame);

//
function initGame() {
    console.log(gameQuestions);
    questionContainer.innerHTML = "";
    startGamebtn.style.display = "none";
    gameTimer.innerText = "Countdown: 00:00";
    time = 0;
    timer = 0;
    stopTimer();
    seconds30 = 15;
    startTimer(seconds30,gameTimer);
    questionNumber++;
    buildQuestion();
    //setTimeout(checkAnswers, 1000 * 15);
};

function startTimer(duration, gameTimer) {
        if (!timerRunning) {
            timerRunning = true;
            var timer = duration, minutes, seconds;
            intervalId =  setInterval(function () {
                console.log(intervalId)
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            gameTimer.innerText = "Countdown: " + minutes + ":" + seconds;
    
            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    } else{
        stopTimer();
    }
};
function stopTimer() {
   // DONE: Use clearInterval to stop the count here and set the clock to not be running.
   clearInterval(intervalId);
    timerRunning = false;
};


function buildQuestion() {
    if (questionNumber < numberOfQuestions) {
        console.log(questionNumber);
        console.log(gameQuestions.lenght + 1);
        // we'll need a place to store the HTML output
        const output = [];
        var currentQuestion = gameQuestions[questionNumber];
        console.log(currentQuestion);
        questionContainer.innerHTML = output;

        // for each question...
        console.log('questionNumber ' + questionNumber);

        // we'll want to store the list of answer choices
        const answers = [];
        const gifWords = [];
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
        console.log(answers);
        output.push(

            `<div class="question"> ${currentQuestion.question} </div>
           <div id="answerbuttons"> ${answers.join("")} </div>`
        );
        gifWords.push(currentQuestion.GiffSearchWord);

        console.log('output ' + output);
        questionContainer.innerHTML = output.join("");
    }
    else {
        endGame();
    };

};

$(questionContainer).on('click',".ansbuttons", function() {
    console.log('click answer buttons');
    console.log(this);
    var userAnswer = $(this).attr("answer")
    console.log(userAnswer);
    checkAnswers(userAnswer)
});

function endGame() {
    var gameoverTemplate = `
        <p> Your score is ${numCorrect} out of ${gameQuestions.length}`;
    questionContainer.innerHTML = gameoverTemplate;
    // show number of correct answers out of total
    stopTimer();
    startGamebtn.style.display = "initial";
    startGamebtn.textContent= "Restart";
    questionNumber = -1;
    numCorrect = 0;
    numWrong = 0;
    time = 0;
};

function checkAnswers(ans) {
stopTimer();
    // for each question...
    var currentQuestion = gameQuestions[questionNumber];
    console.log(questionNumber);
    console.log(currentQuestion);
    questionContainer.innerHTML = "  ";

    searchWord = currentQuestion.GiffSearchWord;
     console.log('button userAnswer ' + ans);
    // if answer is correct
    if (ans === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;
        questionMessage = `You are correct. The answer is ${currentQuestion.correctAnswer}`
    }
    // if answer is wrong or blank
    else {
        numWrong++;
    questionMessage = ` That is incorrect. The correct answer is ${currentQuestion.correctAnswer} `
    }

    displayCorrectAnswer(searchWord);
    // startTimer(seconds30,gameTimer);
    setTimeout(initGame,1000 * 5 );
 };

function displayCorrectAnswer(searchWord) {
    // Example queryURL for Giphy API
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchWord}&api_key=dc6zaTOxFJmzC&limit=1`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.data[0].url);
        var results = response.data[0];
        // Only taking action if the photo has an appropriate rating
        if (results.rating !== "r" && results.rating !== "pg-13") {
            // Creating a div template gif
            var ptemplate = `<p>
                ${questionMessage}</p>
                <div>
                <img src="${ results.images.fixed_height.url }">
                </div>`
            questionContainer.innerHTML = ptemplate;

        }
    });
};
