let questions = [
  {
    question: "8 x 21 = ?",
    answers: [168, 160, 180, 170, 169, 167, 165, 161, 162, 164],
    correctAnswer: 168,
  },
  {
    question: "7 x 9 = ?",
    answers: [63, 60, 61, 62, 65, 64, 67, 66, 68, 69],
    correctAnswer: 63,
  },
  {
    question: "11 x 11 = ?",
    answers: [121, 120, 122, 123, 124, 125, 119, 118, 117, 116],
    correctAnswer: 121,
  },
  {
    question: "9 x 8 = ?",
    answers: [72, 70, 71, 73, 74, 75, 76, 78, 79, 77],
    correctAnswer: 72,
  },
  {
    question: "6 x 6 = ?",
    answers: [36, 30, 31, 32, 35, 34, 37, 38, 39, 33],
    correctAnswer: 36,
  },
];

let currentQuestion = 0;
let score = 0;
let timerId;

function showQuestion() {
  // Check if the game is over
  if (currentQuestion >= questions.length) {
    document.getElementById("question").innerHTML = "Game Over!";
    document.getElementById("bubbles").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("timer").innerHTML = "";
    document.getElementById("score").innerHTML = "Your score: " + score;
    document.getElementById("restart").style.display = "block";
    return;
  }

  let question = questions[currentQuestion];
  document.getElementById("question").innerHTML = question.question;

  // Display answer bubbles
  let bubblesHtml = "";
  for (let i = 0; i < question.answers.length; i++) {
    bubblesHtml += `<div class="bubble" data-answer="${question.answers[i]}">${question.answers[i]}</div>`;
  }
  document.getElementById("bubbles").innerHTML = bubblesHtml;

  // Add event listeners to bubbles
  let bubbles = document.querySelectorAll(".bubble");
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].addEventListener("click", checkAnswer);
  }

  startTimer();
}

function checkAnswer(event) {
  let answer = parseInt(event.target.dataset.answer);
  let correctAnswer = questions[currentQuestion].correctAnswer;

  if (answer === correctAnswer) {
    document.getElementById("result").innerHTML = "Correct answer!";
    score++;
    clearInterval(timerId);
    currentQuestion++;
    setTimeout(function () {
      document.getElementById("result").innerHTML = "";
      showQuestion();
    }, 1000);
  } else {
    document.getElementById("result").innerHTML = "Wrong answer!";
    if (score > 0) {
      score--;
    }
    clearInterval(timerId);
    currentQuestion++;
    setTimeout(function () {
      document.getElementById("result").innerHTML = "";
      showQuestion();
    }, 1000);
  }
}

function startTimer() {
  let timeLeft = 5;
  timerId = setInterval(function () {
    document.getElementById("timer").innerHTML =
      "Time left: " + timeLeft + " seconds";
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timerId);
      document.getElementById("result").innerHTML = "Time's up!";
      if (score > 0) {
        score--;
      }
      currentQuestion++;
      setTimeout(function () {
        document.getElementById("result").innerHTML = "";
        showQuestion();
      }, 1000);
    }
  }, 1000);
}

function restartGame() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("score").innerHTML = "";
  document.getElementById("restart").style.display = "none";
  showQuestion();
}

showQuestion();
