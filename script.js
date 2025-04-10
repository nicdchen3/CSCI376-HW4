// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Madrid", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Scripts", correct: false },
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style Syntax", correct: false }
    ]
  },
  {
    question: "What animal is Williams College's mascot?",
    answers: [
      { text: "Elk", correct: false },
      { text: "Horse", correct: false },
      { text: "Cow", correct: true },
      { text: "Bear", correct: false }
    ]
  }
];

// 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
  // We find these ids by looking at the HTML file. 
  // The ids "question", "answer-buttons", and "next-btn" are written as attributes in elements in the index.html file.
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const hintButton = document.getElementById("hint-btn");

let currentQuestionIndex = 0;
let score = 0;
let hintUsed = false;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  hintUsed = false;

  currentQuestion.answers.forEach(answer => {
    // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
      // The buttons are created dynamically because they change with each question. 
      // It's more efficient to generate them in JavaScript than to hardcode every possible answer in the HTML.
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    // 4. What is the line below doing? 
      // This line adds the button we just created to the answer container on the webpage, making it visible to the user.
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  hintButton.style.display = "block";
  answerButtonsElement.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtonsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
    // Without this line, the Next button would stay hidden after answering a question because it starts with display: none in CSS. 
    // The user wouldn't be able to continue to the next question.
  nextButton.style.display = "block";
  hintButton.style.display = "none";
}

function showHint() {
  if (hintUsed) return; // Prevent multiple hints for the same question
  
  // Get all incorrect answer buttons
  const incorrectButtons = Array.from(answerButtonsElement.children).filter(
    button => button.dataset.correct !== "true"
  );
  
  // Randomly select one incorrect answer and mark it red
  if (incorrectButtons.length > 0) {
    const randomIndex = Math.floor(Math.random() * incorrectButtons.length);
    incorrectButtons[randomIndex].classList.add("wrong");
    incorrectButtons[randomIndex].disabled = true;
    hintUsed = true;
  }
}

function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
  nextButton.textContent = "Restart";
  nextButton.style.display = "block";
  hintButton.style.display = "none";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// 6. Summarize in your own words what you think this block of code is doing. 
  // This code handles the Next button clicks. 
  // If there are more questions, it shows the next one. 
  // If we've finished all questions, it restarts the quiz.
nextButton.addEventListener("click", () => { 
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

// Add event listener for the hint button
hintButton.addEventListener("click", showHint);

startQuiz();