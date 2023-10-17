import {client} from './client.js'
const btnStart = document.querySelector('.btn-start')
const startCountDown = document.querySelector('.start-count__down')
const quizStart = document.querySelector('.quiz-start')
const quizContent = document.querySelector('.quiz-content')
const quizPerform = document.querySelector('.quiz-perform')
const soundCorrect = document.querySelector('.correct-answer')
const soundIncorrect = document.querySelector('.incorrect-answer')
let isAgain = false
let countStreak = 0
let streakQuestion = 0
let QUESTION = 1
let SCORE = 0
let CORRECT_QUESTION = 0
let duration = 4000
let animationId
const getTotalQuestion = async () => {
  const {data} = await client.get(`/questions`)
  return data
}
const getQuestion = async (id) => {
  const {data:questions} = await client.get(`/questions/${id}`)
  const {data:answers} = await client.get(`/answers?questionId=${id}`)
  return {questions,answers};
}

const handleQuestionQuiz = async () => {
  const listQuestion = await getTotalQuestion()
  const totalQuestion = listQuestion.length;
  if(QUESTION > totalQuestion) {
    QUESTION = totalQuestion
  }
  if(isAgain) {
    QUESTION = 1
  }
  isAgain = false
  console.log('QUESTION',QUESTION);
  const data = await getQuestion(QUESTION)
  const dataQuestion = data.questions
  const dataAnswer = data.answers
  quizContent.innerHTML = `
  <div class="quiz-info">
    <div class="time-question"></div>
    <div class="info-bottom">
      <div class="left-info">
        <div class="number"><span>${QUESTION}</span>/${totalQuestion}</div>
        <div class="streak">
          <div></div>
          <div></div>
          <span class="num-streak"></span>
        </div>
      </div>
      <div class="score">Score: <span>${SCORE}</span></div>
    </div>
  </div>
  <div class="item-quiz">
    <div class="quiz-list">
      <div class="question">
        ${dataQuestion.textQuestion}
        ${dataQuestion.correctAnswerId.length > 1 ? `<i style="display: block;margin-top: 8px; font-size: small;">This question have ${dataQuestion.correctAnswerId.length} answers</i>`: ""}
      </div>
      <ul class="answers">
      ${dataAnswer.map((ans) => (
        `<li data-id = ${ans.id}>${ans.textAnswer}</li>`
      )).join("")}
      </ul>
    </div>
  </div>
  <div class="quiz-noti"></div>
  `
  //Handle time question
  function handleTimeQuestion() {
      const timeQuestion = document.querySelector(".time-question");
      const animationDuration = 8000;
      let startTime = null;
      function animate(currentTime) {
        if (!startTime) {
          startTime = currentTime;
        }
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(1, elapsedTime / animationDuration);

        timeQuestion.style.width = `${(1 - progress) * 100}%`;
        if (progress < 1) {
          animationId = requestAnimationFrame(animate)
        } else {
          handleNextQuestion()
          console.log('next1');
        }
      }
      animationId = requestAnimationFrame(animate);
  }
  const timeId = setTimeout(() => {
    handleTimeQuestion()
  },duration)
  duration = 0
  // Handle next question
  const handleNextQuestion =() => {
    QUESTION+=1
    if(QUESTION > totalQuestion) {
      setTimeout(() => {
        QUESTION = totalQuestion
        quizContent.style.display = 'none'
        quizPerform.style.display = 'block'
        
        quizPerform.innerHTML =  `
        <div class="result-quiz">
          <div class="container">
            <p>Game performance</p>
            <div class="accuracy">
              Accuracy
              <div class="accuracy-progress">
                <div class="progress-bar"></div>
              </div>
            </div>
            <div class="performance">
              <div><span>${SCORE}</span>Score</div>
              <div><span>${countStreak}</span>Streak</div>
              <div><span>${CORRECT_QUESTION}</span>Correct</div>
              <div><span>${totalQuestion - CORRECT_QUESTION}</span>Incorrect</div>
            </div>
            <button>Play again</button>
          </div>
        </div>`
        
        const progressBar = document.querySelector('.accuracy-progress .progress-bar')
        progressBar.style.width = Math.round(CORRECT_QUESTION * 100 / totalQuestion).toFixed(2) + '%'
        progressBar.innerText = Math.round(CORRECT_QUESTION * 100 / totalQuestion).toFixed(0) + '%'
        // Handle Click Button play again
        const handlePlayAgain = () => {
          const btnPlay = document.querySelector('.result-quiz button')
          btnPlay.addEventListener('click',function() {
            // cancelAnimationFrame(animationId);
            isAgain = true
            const countDown = startCountDown.querySelector('span')
            countDown.innerText = 3;
            quizStart.style.display = 'flex'
            btnStart.classList.remove('hide')
            startCountDown.classList.add('hide')
            quizContent.style.transform = 'translateX(-100%)'
            quizContent.style.display = 'none'
            QUESTION = 1
            SCORE = 0
            CORRECT_QUESTION = 0
            streakQuestion = 0
            countStreak = 0
            quizPerform.innerHTML = ""
            handleClickStart()
            handleQuestionQuiz()
          })
        }
        handlePlayAgain()
      },2000)
    } else {
      handleQuestionQuiz()
    }
  }

  // Streak question
  const streak = document.querySelector('.streak .num-streak')
  let withStreak = streakQuestion / 3 * 100
  if(withStreak >= 100) {
    countStreak = 1
    withStreak = 100
  }
  streak.style.width = withStreak + '%'
  const answerQuiz = quizContent.querySelector('.answers')
  const notiQuiz = quizContent.querySelector('.quiz-noti')
  const arrIdAnswer = []
  // Handle when choose answer
  answerQuiz.addEventListener('click',function(e) {
    e.target.classList.add('selected')
    const idChooseAnswer = +e.target.getAttribute('data-id')
    arrIdAnswer.push(idChooseAnswer)
    const handleSelectAnswer = () => {
      const arrIdCorrect = dataQuestion.correctAnswerId
      const listAns = answerQuiz.querySelectorAll('li')
      const list = answerQuiz.querySelectorAll('li:not(.selected)')
      const listAnsSelected =  answerQuiz.querySelectorAll('li.selected')
      listAns.forEach((item) => {
        if(arrIdCorrect.includes(+item.getAttribute('data-id'))) {
          item.classList.remove('selected')
          item.style.background = 'green'
        }
      })
      listAnsSelected.forEach((item) => {
        if(arrIdCorrect.includes(+item.getAttribute('data-id'))) {
          item.classList.remove('selected')
          item.style.background = 'green'
        } else {
          item.style.background = 'red'
        }
      })
      list.forEach(item => {
        if(arrIdCorrect.includes(+item.getAttribute('data-id'))) {
          item.style.background = 'green'
        } else {
          item.style.opacity = '0',item.style.visibility = 'hidden'
        }
      })
      const isEqual = JSON.stringify(arrIdAnswer) === JSON.stringify(arrIdCorrect) || JSON.stringify(arrIdAnswer.reverse()) === JSON.stringify(arrIdCorrect)
      notiQuiz.style.display = 'block'
      if(isEqual) {
        streakQuestion++
        let withStreak = streakQuestion / 3 * 100
        if(withStreak >= 100) {
          countStreak = 1
          withStreak = 100
        }
        streak.style.width = withStreak + '%'
        notiQuiz.innerText = 'Correct'
        notiQuiz.style.background = 'green'
        soundCorrect.play()
        SCORE+= 1000
        CORRECT_QUESTION+=1
        const score = document.querySelector('.score span')
        score.innerText = SCORE
        handleNextQuestion()
      } else {
        streakQuestion = 0
        streak.style.width = 0
        soundIncorrect.play()
        notiQuiz.innerText = 'Incorrect'
        notiQuiz.style.background = 'red'
        handleNextQuestion()
      }
    }
    if(dataQuestion.correctAnswerId.length === 1) {
      cancelAnimationFrame(animationId);
      handleSelectAnswer()
    } else {
      const answerSelected = answerQuiz.querySelectorAll('.selected')
      if(answerSelected.length === dataQuestion.correctAnswerId.length) {
        cancelAnimationFrame(animationId);
        handleSelectAnswer()
      }
    }
  })
}
handleQuestionQuiz()

// handle start quiz
const handleClickStart = () => {
  btnStart.addEventListener('click',function() {
    this.classList.add('hide')
    startCountDown.classList.remove('hide')
    const countDown = startCountDown.querySelector('span')
    let numCountDown = countDown.innerText
    const interval = setInterval(function() {
      --numCountDown;
      if(numCountDown === 0) {
        countDown.innerText = 'Go!'
      } else if (numCountDown === -1) {
          clearInterval(interval);
          quizStart.style.display = 'none'
          quizContent.style.transform = 'translateX(0)'
          quizContent.style.display = 'block'
        } else {
        countDown.innerText = numCountDown;
        }
    }, 1000);
  })
}

handleClickStart()