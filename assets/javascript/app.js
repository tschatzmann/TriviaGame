const questionContainer = document.getElementById('triviaQuestions');
const possibleAnswersContainer = document.getElementById('possibleAnswers');
const submitAnswerbtn = document.getElementById('submitAnswers');
const startGamebtn = document.getElementById('startGame');
const gameTimer = document.getElementById('timeDisplay')
const correctAnswerContainer = document.getElementById("correctAnswerDisplay");
const gifContainer = document.getElementById("gifs-appear-here");
var intervalId;
var timerRunning = false;
var time = 0;
var questionNumber = -1;
var searchWord = "";
var questionMessage = "";
let numCorrect = 0;
let numWrong = 0;

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
            a: "ans a",
            b: "ans b",
            c: "ans c"
        },
        correctAnswer: "b",
        GiffSearchWord: "pig"

    },
    {
        question: "test question 3?",
        answers: {
            a: "ans a",
            b: "ans b",
            c: "ans c",
        },
        correctAnswer: "a",
        GiffSearchWord: "dog"
    },
];

var numberOfQuestions = (Object.keys(gameQuestions));
console.log(numberOfQuestions);
numberOfQuestions = numberOfQuestions.length++;
console.log(numberOfQuestions);
// start the games
startGamebtn.addEventListener('click', initGame);


// on submit, show possibleAnswers
submitAnswerbtn.addEventListener('click', function () {
    stopTimer();
    checkAnswers();
    //displayCorrectAnswer(searchWord);
    //initGame();
});


//
function initGame() {
    questionContainer.innerHTML = "";
    gameTimer.innerHTML = "0.00";
    correctAnswerContainer.innerHTML = "";
    gifContainer.innerHTML = "";
    time = 0;
    stopTimer();
    startTimer();
    questionNumber++;
    buildQuestion();
    setTimeout(checkAnswers, 1000 * 15);
};

function startTimer() {

    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!timerRunning) {
        intervalId = setInterval(count, 1000);
        timerRunning = true;
    }
};
function stopTimer() {

    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    timerRunning = false;
};

function count() {

    // DONE: increment time by 1, remember we cant use "this" here.
    time++;

    // DONE: Get the current time, pass that into the timeConverter function,
    //       and save the result in a variable.
    var converted = timeConverter(time);
    console.log(converted);

    // DONE: Use the variable we just created to show the converted time in the "display" div.
    gameTimer.innerHTML = converted;
}

var converted = timeConverter(time);
console.log(converted);

// DONE: Use the variable we just created to show the converted time in the "display" div.
gameTimer.innerHTML = converted;


function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    }
    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}

function buildQuestion() {
    if (questionNumber < numberOfQuestions) {
        console.log(questionNumber);
        console.log(gameQuestions.lenght + 1);
        // we'll need a place to store the HTML output
        const output = [];
        var currentQuestion = gameQuestions[questionNumber];
        console.log(currentQuestion);

        // for each question...
        console.log('questionNumber ' + questionNumber);

        // we'll want to store the list of answer choices
        const answers = [];
        const gifWords = [];
        // and for each available answer...
        for (letter in currentQuestion.answers) {

            // ...add an HTML radio button
            answers.push(
                `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
            );
        }
        console.log(answers);
        output.push(

            `<div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>`
        );
        gifWords.push(currentQuestion.GiffSearchWord)

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


function checkAnswers() {

    // for each question...
    var currentQuestion = gameQuestions[questionNumber];
    console.log(questionNumber);
    console.log(currentQuestion);

    // find selected answer
    const possibleAnswersContainer = questionContainer.querySelectorAll('.answers');
    const answerContainer = possibleAnswersContainer[0];
    console.log(answerContainer);
    console.log(possibleAnswersContainer)
    console.log(possibleAnswersContainer[0])
    const selector = 'input[name=question' + questionNumber + ']:checked';
    console.log('selector ' + selector);
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    console.log("userAnswer + " + userAnswer);
    searchWord = currentQuestion.GiffSearchWord;
    // if answer is correct
    if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        questionMessage = "You win"
        //displayCorrectAnswer(searchWord);

        // color the answers green
        possibleAnswersContainer[0].style.color = 'lightgreen';
    }
    // if answer is wrong or blank
    else {
        // color the answers red
        numWrong++;
        questionMessage = "you loose"
        possibleAnswersContainer[0].style.color = 'red';
    }

    // show number of correct answers out of total
    displayCorrectAnswer(searchWord);
    initGame();
    possibleAnswersContainer.innerHTML = numCorrect + ' out of ' + gameQuestions.length;
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
            var gifDiv = $("<div>");
            // var answerText = $(<p>${message}</p>)
            // Creating an image tag
            var answerImage = $("<img>");
            var ptemplate = `<p>
                ${questionMessage}</p>`
            correctAnswerContainer.innerHTML = ptemplate;

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            answerImage.attr("src", results.images.fixed_height.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(answerImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
        }
        // }
    });
    // });

};
