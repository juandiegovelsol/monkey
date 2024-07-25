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
const playAgainButton = document.getElementById("play-again");

// Function to start the game
function startGame() {
  score = 0;
  questionCount = 0;
  incorrectCount = 0;
  time = 10;
  scoreElement.innerText = `Score: ${score}`;
  playAgainButton.style.display = "none";
  generateQuestion();
}

// Function to generate a new question
function generateQuestion() {
  clearInterval(timerInterval); // Clear the previous timer
  startTimer(); // Start a new timer for the current question

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
    option1Color = wordColor === "RED" ? "red" : "blue";
    option2Text = "BLUE";
    option2Color = wordColor === "BLUE" ? "blue" : "red";
  }

  option1Element.innerText = option1Text;
  option1Element.style.backgroundColor = option1Color;
  option2Element.innerText = option2Text;
  option2Element.style.backgroundColor = option2Color;

  // Attach event listeners to the options
  option1Element.onclick = () => {
    checkAnswer(questionType, wordTextColor, option1Text);
  };

  option2Element.onclick = () => {
    checkAnswer(questionType, wordTextColor, option2Text);
  };
}

// Function to check the answer and update the game state
function checkAnswer(questionType, wordTextColor, answer) {
  clearInterval(timerInterval); // Clear the timer on answer

  if (
    (questionType === "wordColor" && wordTextColor === answer) ||
    (questionType === "meaning" && wordTextColor === answer)
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
  questionElement.innerText = "Game Over!";
  wordElement.innerText = "";
  option1Element.style.display = "none";
  option2Element.style.display = "none";
  playAgainButton.style.display = "block";
}

// Event listener for the "Play Again" button
playAgainButton.addEventListener("click", startGame);

// Start the game initially
startGame();
