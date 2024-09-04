
// script.js
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Rome", "Berlin"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Mars", "Earth", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
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
    choiceButtons.forEach((button, index) => {
        button.textContent = currentQuestion.choices[index];
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    feedbackElement.textContent = '';
    nextButton.style.display = 'none';
    choiceButtons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = '#007BFF';
    });
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

    choiceButtons.forEach(button => button.disabled = true);
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








