let score = 0;
let questionCount = 0;
let incorrectCount = 0;
let time = 10;
let timerInterval;
const questionElement = document.getElementById("question");
const wordElement = document.getElementById("word");
const option1Element = document.getElementById("option1");
const option2Element = document.getElementById("option2");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

function generateQuestion() {
  const questionTypes = ["wordColor", "meaning"];
  const questionType =
    questionTypes[Math.floor(Math.random() * questionTypes.length)];
  const wordColors = ["RED", "BLUE"];
  const wordColor = wordColors[Math.floor(Math.random() * wordColors.length)];
  const wordText = wordColor;
  const wordTextColor =
    wordColors[Math.floor(Math.random() * wordColors.length)];

  wordElement.innerText = wordText;
  wordElement.style.color = wordTextColor === "RED" ? "red" : "blue";

  let option1Text, option1Color, option2Text, option2Color;
  if (questionType === "wordColor") {
    questionElement.innerText = "Which color is the word?";
    option1Text = "RED";
    option1Color = "red";
    option2Text = "BLUE";
    option2Color = "blue";
  } else {
    questionElement.innerText = "Which color means the word?";
    option1Text = "RED";
    option1Color =
      wordColors[Math.floor(Math.random() * wordColors.length)] === "RED"
        ? "red"
        : "blue";
    option2Text = "BLUE";
    option2Color =
      wordColors[Math.floor(Math.random() * wordColors.length)] === "RED"
        ? "blue"
        : "red";
  }

  option1Element.innerText = option1Text;
  option1Element.style.backgroundColor = option1Color;
  option2Element.innerText = option2Text;
  option2Element.style.backgroundColor = option2Color;

  option1Element.onclick = () => {
    checkAnswer(questionType, wordTextColor, option1Text);
  };

  option2Element.onclick = () => {
    checkAnswer(questionType, wordTextColor, option2Text);
  };

  startTimer();
}

function checkAnswer(questionType, wordTextColor, answer) {
  if (questionType === "wordColor") {
    if (
      (wordTextColor === "RED" && answer === "RED") ||
      (wordTextColor === "BLUE" && answer === "BLUE")
    ) {
      score++;
      scoreElement.innerText = `Score: ${score}`;
      incorrectCount = 0;
    } else {
      incorrectCount++;
    }
  } else {
    if (
      (wordTextColor === "RED" && answer === "RED") ||
      (wordTextColor === "BLUE" && answer === "BLUE")
    ) {
      score++;
      scoreElement.innerText = `Score: ${score}`;
      incorrectCount = 0;
    } else {
      incorrectCount++;
    }
  }

  if (incorrectCount === 3) {
    gameOver();
  } else {
    questionCount++;
    if (questionCount >= 5 && time > 3) {
      time--;
    }
    generateQuestion();
  }
}

function startTimer() {
  timerElement.innerText = `Time: ${time}s`;
  let currentTime = time;
  timerInterval = setInterval(() => {
    currentTime--;
    timerElement.innerText = `Time: ${currentTime}s`;
    if (currentTime === 0) {
      clearInterval(timerInterval);
      incorrectCount++;
      if (incorrectCount === 3) {
        gameOver();
      } else {
        questionCount++;
        if (questionCount >= 5 && time > 3) {
          time--;
        }
        generateQuestion();
      }
    }
  }, 1000);
}

function gameOver() {
  clearInterval(timerInterval);
  const gameOverElement = document.createElement("div");
  gameOverElement.style.position = "fixed";
  gameOverElement.style.top = "0";
  gameOverElement.style.left = "0";
  gameOverElement.style.width = "100%";
  gameOverElement.style.height = "100%";
  gameOverElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  gameOverElement.style.display = "flex";
  gameOverElement.style.justifyContent = "center";
  gameOverElement.style.alignItems = "center";
  gameOverElement.innerHTML = `
        <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
            <h1>Game Over!</h1>
            <p>Your final score is: ${score}</p>
            <button onclick="location.reload()">Play Again</button>
        </div>
    `;
  document.body.appendChild(gameOverElement);
}

generateQuestion();
