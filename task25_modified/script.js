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

// Function to generate a new question
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

  // Attach event listeners to the options
  option1Element.onclick = () => {
    checkAnswer(questionType, wordTextColor, wordText, option1Text);
  };

  option2Element.onclick = () => {
    checkAnswer(questionType, wordTextColor, wordText, option2Text);
  };
  clearInterval(timerInterval); // Clear previous interval
  startTimer();
}

// Function to check the answer and update the game state
function checkAnswer(questionType, wordTextColor, wordText, answer) {
  if (
    (questionType === "wordColor" && wordTextColor === answer) ||
    (questionType === "meaning" && wordText === answer)
  ) {
    score++;
    incorrectCount = 0;
  } else {
    incorrectCount++;
  }

  scoreElement.innerText = `Score: ${score}`;

  if (incorrectCount === 3) {
    gameOver();
  } else {
    questionCount++;
    if (questionCount >= 5 && time > 3) {
      time--;
    }
    generateQuestion(); // Generate a new question after answering
  }
}

// Function to start the timer
function startTimer() {
  let currentTime = time;
  timerElement.innerText = `Time: ${currentTime}s`;
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

// Function to handle game over
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
            <button onclick="playAgain()">Play Again</button>
        </div>
    `;
  document.body.appendChild(gameOverElement);
}

// Function to start the game
function playAgain() {
  score = 0;
  questionCount = 0;
  incorrectCount = 0;
  time = 10;
  scoreElement.innerText = `Score: ${score}`;
  const gameOverElement = document.body.querySelector(
    'div[style*="position: fixed"]'
  );
  document.body.removeChild(gameOverElement);
  generateQuestion();
}

// Start the game initially
generateQuestion();
