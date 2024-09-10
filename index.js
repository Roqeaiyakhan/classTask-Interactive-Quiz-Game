
// script.js
const questions = [
    {
        question: " What is the boiling point of water at sea level?",
        choices: ["90°C","100°C", "110°C", "120°C"],      
        correctAnswer: "100°C"
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Pablo Picasso", "Vincent van Gogh", " Leonardo da Vinci", "Claude Monet"],
        correctAnswer: " Leonardo da Vinci"
    },
    {
        question: "Who wrote 'To be, or not to be'?",
        choices: ["Shakespeare", "Dickens", "Hemingway", "Poe"],
        correctAnswer: "Shakespeare"
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic", "Pacific", "Indian", "Arctic"],
        correctAnswer: "Pacific"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const choiceButtons = document.querySelectorAll('.choice');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-question');
const scoreElement = document.getElementById('score');


function loadQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    for (let i = 0; i < choiceButtons.length; i++) {
        choiceButtons[i].textContent = currentQuestion.choices[i];
        choiceButtons[i].onclick = selectAnswer;  
    }
}

function resetState() {
    feedbackElement.textContent = '';
    nextButton.style.display = 'none';
    for (let i = 0; i < choiceButtons.length; i++) {
        choiceButtons[i].disabled = false;
        choiceButtons[i].style.backgroundColor = '#007BFF';
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const selectedAnswer = selectedButton.textContent;
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        selectedButton.style.backgroundColor = '#28a745';
        feedbackElement.textContent = 'Correct!';
        score++;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        selectedButton.style.backgroundColor = '#dc3545';
        feedbackElement.textContent = 'Try Again!';
    }

    for (let i = 0; i < choiceButtons.length; i++) {
        choiceButtons[i].disabled = true;
    }

    nextButton.style.display = 'block';
}


function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showEndScreen();
    }
}

function showEndScreen() {
    questionElement.textContent = `Quiz Complete! You scored ${score} out of ${questions.length}.`;
    choiceButtons.forEach(button => button.style.display = 'none');
    nextButton.textContent = 'Play Again';
    nextButton.addEventListener('click', restartQuiz);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    nextButton.textContent = 'Next Question';
    choiceButtons.forEach(button => button.style.display = 'block');
    loadQuestion();
}

nextButton.addEventListener('click', nextQuestion);

document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key >= 1 && key <= 4) {
        const buttonIndex = key - 1;
        choiceButtons[buttonIndex].click();
    }
 });

loadQuestion();






// let fruits = ['apple', 'banana', 'cherry'];

// fruits.forEach(function(fruit, index) {
//     console.log(index + ": " + fruit);
// });


