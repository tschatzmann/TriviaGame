const questionContainer = document.getElementById('triviaQuestions');
const possibleAnswersContainer = document.getElementById('possibleAnswers');
const submitAnswerbtn = document.getElementById('submitAnswers');
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;


const gameQuestions = [
    {
        question: "test question 1?",
        answers: {
            a: "ans a",
            b: "ans b",
            c: "ans c"
        },
        correctAnswer: "c"
    },
    {
        question: "test question 2?",
        answers: {
            a: "ans a",
            b: "ans b",
            c: "ans c"
        },
        correctAnswer: "c"
    },
    {
        question: "test question 3?",
        answers: {
            a: "ans a",
            b: "ans b",
            c: "ans c",
            d: "ans d"
        },
        correctAnswer: "d"
    }
];

// display questions right away
buildQuestion();

// on submit, show possibleAnswers
submitAnswerbtn.addEventListener('click', showpossibleAnswers);

function buildQuestion() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    gameQuestions.forEach(
        (currentQuestion, questionNumber) => {

            // we'll want to store the list of answer choices
            const answers = [];

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

            // output.push(
            //    `<div class="slide">
            //  <div class="question"> ${currentQuestion.question} </div>
            //<div class="answers"> ${answers.join("")} </div>
            //</div>`
            //);


            // add this question and its answers to the output
            output.push(
                `<div class="slide">
                 <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>
            </div>`
            );
            console.log(output);
            // finally combine our output list into one string of HTML and put it on the page
            questionContainer.innerHTML = output.join('');
    })
};


function showpossibleAnswers() {

            // gather answer containers from our questions
            const answerContainers = questionContainer.querySelectorAll('.answers');

            // keep track of user's answers
            let numCorrect = 0;

            // for each question...
            gameQuestions.forEach((currentQuestion, questionNumber) => {

                // find selected answer
                const answerContainer = answerContainers[questionNumber];
                const selector = 'input[name=question' + questionNumber + ']:checked';
                const userAnswer = (answerContainer.querySelector(selector) || {}).value;

                // if answer is correct
                if (userAnswer === currentQuestion.correctAnswer) {
                    // add to the number of correct answers
                    numCorrect++;

                    // color the answers green
                    answerContainers[questionNumber].style.color = 'lightgreen';
                }
                // if answer is wrong or blank
                else {
                    // color the answers red
                    answerContainers[questionNumber].style.color = 'red';
                }
            });

            // show number of correct answers out of total
            possibleAnswersContainer.innerHTML = numCorrect + ' out of ' + gameQuestions.length;
        };
    function showSlide(n) {
        console.log(slides)
        //document.getElementsByClassName(slide).classList.add('active-slide')
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === 0) {
            previousButton.style.display = 'none';
        }
        else {
            previousButton.style.display = 'inline-block';
        }
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
        else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    };
    showSlide(0);

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);

