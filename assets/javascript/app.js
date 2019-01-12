const questionContainer = document.getElementById('triviaQuestions');
const possibleAnswersContainer = document.getElementById('possibleAnswers');
const startGamebtn = document.getElementById('startGame');
const gameTimer = document.getElementById('timeDisplay')
const correctAnswerContainer = document.getElementById("correctAnswerDisplay");

var intervalId;
var timerRunning = false;
var time = 0;
var questionNumber = -1;
var searchWord = "";
var questionMessage = "";
let numCorrect = 0;
let numWrong = 0;
let seconds30 = 15;

const gameQuestions = [
    {
        question: "test question 1?",
        answers: {
            a: "ans a",
            b: "ans b",
            c: "ans cat"
        },
        correctAnswer: "c",
        GiffSearchWord: "cat"
    },
    {
        question: "test question 2?",
        answers: {
            a: "ans2 a",
            b: "ans2 b",
            c: "ans2 c"
        },
        correctAnswer: "b",
        GiffSearchWord: "pig"

    },
    {
        question: "test question 3?",
        answers: {
            a: "ans3 a",
            b: "ans3 b",
            c: "ans3 c",
        },
        correctAnswer: "a",
        GiffSearchWord: "dog"
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
    questionContainer.innerHTML = "";
    gameTimer.innerHTML = "0.00";
    correctAnswerContainer.innerHTML = "";
    time = 0;
    stopTimer();
    startTimer(seconds30,gameTimer);
    questionNumber++;
    buildQuestion();
    setTimeout(checkAnswers, 1000 * 15);
};

function startTimer(duration, display) {
        if (!timerRunning) {
            timerRunning = true;
            var timer = duration, minutes, seconds;
            intervalId =  setInterval(function () {
                console.log(intervalId)
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.textContent = minutes + ":" + seconds;
    
            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }
};
function stopTimer() {
   // DONE: Use clearInterval to stop the count here and set the clock to not be running.
   console.log(intervalId) 
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
        questionContainer.innerHTML = "game over!!!"
        // show number of correct answers out of total
        possibleAnswersContainer.innerHTML = numCorrect + ' out of ' + gameQuestions.length;
        stopTimer();
    };

};

$(questionContainer).on('click',".ansbuttons", function() {
    console.log('click answer buttons');
    console.log(this);
    var userAnswer = $(this).attr("answer")
    console.log(userAnswer);
    checkAnswers(userAnswer)
});

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
    startTimer();
    setTimeout(initGame,1000 * 5 );
   // initGame();
  //  possibleAnswersContainer.innerHTML = numCorrect + ' out of ' + gameQuestions.length;
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
        // correctAnswerContainer.innerHTML(response.data[0].url);
        var results = response.data[0];

        // Looping over every result item
        // for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results.rating !== "r" && results.rating !== "pg-13") {
            // Creating a div for the gif
            var ptemplate = `<p>
                ${questionMessage}</p>
                <div>
                <img src="${ results.images.fixed_height.url }">
                </div>`
            questionContainer.innerHTML = ptemplate;

        }
    });
};
