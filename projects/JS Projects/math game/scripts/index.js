let currentQuestionIndex = 0;
let score = localStorage.getItem("mathGameScore") ? parseInt(localStorage.getItem("mathGameScore")) : 0;
const totalQuestions = 10;
let difficulty = "easy";
let questions = [];

function generateQuestion(difficulty) {
    let range;
    switch (difficulty) {
        case "easy":
            range = 1;
            break;
        case "normal":
            range = 11;
            break;
        case "hard":
            range = 111;
            break;
    }

    let num1 = Math.floor(Math.random() * range) + range;
    let num2 = Math.floor(Math.random() * range) + range;
    const operators = ["+", "-", "*", "/"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let question = `${num1} ${operator} ${num2}`;
    let answer;
    switch (operator) {
        case "+":
            answer = num1 + num2;
            break;
        case "-":
            answer = num1 - num2;
            break;
        case "*":
            answer = num1 * num2;
            break;
        case "/":
            answer = parseFloat((num1 / num2).toFixed(2));
            break;
    }

    return { question, answer };
}

function checkAnswer() {
    const answerInput = document.getElementById("answerInput");
    const userAnswer = answerInput.value.trim();
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer === "") {
        alert("Please type an answer");
        return;
    }

    if (parseFloat(userAnswer) === currentQuestion.answer) {
        alert("Well done!");
        score++;
        localStorage.setItem("mathGameScore", score);
    } else {
        alert(`Try again! The correct answer was ${currentQuestion.answer}`);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex >= totalQuestions) {
        showFinalScore();
    } else {
        document.getElementById("question").innerText = questions[currentQuestionIndex].question;
        answerInput.value = "";
    }
}

function showFinalScore() {
    alert(`Game Over! Your final score is ${score} out of ${totalQuestions}`);
    document.getElementById("question").innerText = `Game Over! Final score: ${score}`;
    document.getElementById("answerInput").style.display = "none";
    document.getElementById("submitButton").style.display = "none";
    document.getElementById("goBackButton").style.display = "block";
}

function startGame(selectedDifficulty) {
    difficulty = selectedDifficulty;
    questions = [];
    currentQuestionIndex = 0;

    for (let i = 0; i < totalQuestions; i++) {
        questions.push(generateQuestion(difficulty));
    }

    document.getElementById("question").innerText = questions[currentQuestionIndex].question;
    document.querySelector(".game").style.display = "flex";
    document.getElementById("difficultyButtons").style.display = "none";
    document.getElementById("goBackButton").style.display = "block";
    document.getElementById("answerInput").style.display = "inline-block";
    document.getElementById("submitButton").style.display = "inline-block";
    document.getElementById("answerInput").value = "";
}

function showDifficulty() {
    document.querySelector(".game").style.display = "none";
    document.getElementById("difficultyButtons").style.display = "block";
    document.getElementById("answerInput").style.display = "none";
    document.getElementById("submitButton").style.display = "none";
    document.getElementById("goBackButton").style.display = "none";
}

window.onload = function () {
    document.querySelector(".game").style.display = "none";
    const difficultyButtons = document.getElementById("difficultyButtons");
    ["easy", "normal", "hard"].forEach(level => {
        const button = document.createElement("button");
        button.innerText = level.charAt(0).toUpperCase() + level.slice(1);
        button.onclick = () => startGame(level);
        difficultyButtons.appendChild(button);
    });

    document.getElementById("goBackButton").style.display = "none";
};
