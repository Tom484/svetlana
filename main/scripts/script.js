import QUESTIONS from "./questionsData.js"

const btnStart = document.getElementById("btn-start")
const btnNext = document.getElementById("btn-next")
const btnReset = document.getElementById("btn-reset")
const btnResult = document.getElementById("btn-result")
const questionElement = document.getElementById("question")
const scoreElement = document.getElementById("score")

const options = document.querySelectorAll(".option")

let currentQuestion = 0
let numberOfQuestions = QUESTIONS.length
let score = 0
let optionSelect = false

function startQuiz() {
  btnStart.classList.add("hide")
  questionElement.classList.remove("hide")
  questionElement.textContent = QUESTIONS[currentQuestion].question
  updateQuestion()
  toggleShowQuestions()

  optionSelect = false
}

function updateQuestion() {
  options.forEach((option, i) => {
    option.textContent = QUESTIONS[currentQuestion].options[i].option
  })
}

function checkQuiz(playerOption) {
  if (optionSelect) return
  optionSelect = true

  const correctQuestionIndex = QUESTIONS[currentQuestion].options.findIndex(
    option => option.correct
  )

  options.forEach((option, i) => {
    if (i == playerOption) {
      option.classList.add("user-select")
    }
    if (correctQuestionIndex === i) {
      option.classList.add("correct")
    } else {
      option.classList.add("incorrect")
    }
  })

  const correct = playerOption == correctQuestionIndex
  if (correct) {
    score++
  }

  if (currentQuestion + 1 !== numberOfQuestions) {
    btnNext.classList.remove("hide")
  } else {
    btnResult.classList.remove("hide")
  }
  updateScoreElement()
}

function nextQuestion() {
  resetQuestionsClasses()
  btnNext.classList.add("hide")
  optionSelect = false

  currentQuestion++
}

function toggleShowQuestions() {
  options.forEach(option => {
    option.classList.toggle("hide")
  })
}

function resetQuestionsClasses() {
  options.forEach(option => {
    option.classList.remove("correct")
    option.classList.remove("incorrect")
    option.classList.remove("user-select")
  })
}

function showResults() {
  toggleShowQuestions()
  resetQuestionsClasses()

  questionElement.classList.add("hide")
  btnResult.classList.add("hide")
  btnReset.classList.remove("hide")

  alert(`Gratuluji vase skore je ${score} z moznych ${numberOfQuestions}`)
}

function updateScoreElement() {
  scoreElement.classList.remove("hide")
  scoreElement.textContent = `Vase score je ${score}/${numberOfQuestions}`
}

function resetQuiz() {
  currentQuestion = 0
  score = 0

  btnReset.classList.add("hide")
  btnStart.classList.remove("hide")
  updateScoreElement()
}

// Event listeners
btnStart.addEventListener("click", () => {
  startQuiz()
})
btnNext.addEventListener("click", () => {
  nextQuestion()
})
btnReset.addEventListener("click", () => {
  resetQuiz()
})

btnResult.addEventListener("click", () => {
  showResults()
})

options.forEach(option => {
  option.addEventListener("click", () => {
    checkQuiz(option.dataset.option)
  })
})
