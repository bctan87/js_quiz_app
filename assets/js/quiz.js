// Timer/Score function
function countdown() {
    setInterval(function(){
        // When user runs out of time, go to end page and get zero score
        if(score <= 0) {
            clearInterval(score = 0)
            localStorage.setItem('mostRecentScore', score)
            return window.location.assign('./end.html')
        }
        scoreDisplay.innerHTML = score
        score -=1; 
    }, 1000)
}

// Timer/Score deductor
const takeoffPoints = 5
deductScore = num => {
    score -=num
    scoreDisplay.innerText = score
}

// This section determines the default Timer/Score
const scoreDisplay = document.querySelector('#score');
let score = 60

// This section pertains to the questions
const question = document.querySelector('#question');
const questionLimit = 5
let questionsLeft = []
let currentQuestion = {}
let questions = [
    {
        question: "True or false: The DOM is built into the JavaScript language.",
        choice1: "True",
        choice2: "False",
        answer: 2,
    },{
        question: "What does event.preventDefault() do?",
        choice1: "It stops the browser from reloading the page upon a form submission.",
        choice2: "It stops the browser from allowing the form submission event to occur. ",
        answer: 1,
    },{
        question: "How do we use JavaScript to get the information entered into a form’s input field?",
        choice1: "We can select the form’s input element and use the value property to read its data.",
        choice2: "We can select the form itself and use the value property to read all of its data.",
        answer: 1,
    },{
        question: "When we set a style using the setAttribute() method, does the resulting CSS get written to our style sheet or to the HTML element it’s applied to?",
        choice1: "It’s written to the style sheet.",
        choice2: "It’s written to the HTML element it’s applied to.",
        answer : 2,
    },{
        question: "If you save your array of objects to the browser’s local storage and it looks like [Object object] when you visit it in Chrome’s DevTools, what’s wrong?",
        choice1: "The array wasn’t stringified with JSON.stringify() before saving it in Local Storage.",
        choice2: "The array wasn’t parsed with JSON.parse() before saving it to Local Storage.",
        answer: 1,
    }
]

// This function shows the new questions 
function displayNextQuestion () {
    // When user runs out of questions, go to end page and get score
    if(questionsLeft.length === 0) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('./end.html')
    }

    // This randomizes the questions
    const questionsIndex = Math.floor(Math.random() * questionsLeft.length)
    currentQuestion = questionsLeft[questionsIndex]
    question.innerText = currentQuestion.question

    answers.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    questionsLeft.splice(questionsIndex, 1)
    acceptingAnswers = true
}

const answers = Array.from(document.querySelectorAll('.choice-text'));
let acceptingAnswers = true
// End Questions Array

// Answer Checker
answers.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        // Rates user answers as correct or incorrect
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        // Point deductor
        if(classToApply === 'incorrect') {
            deductScore(takeoffPoints)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            displayNextQuestion()

        }, 1000)
    })
})

function startGame() {
    questionsLeft = [...questions]
    displayNextQuestion()
    countdown()
}

startGame()