const boxLetters = document.querySelector('.boxLetters')
const startButton = document.querySelector('.startButton')
const win = document.querySelector('.win')
const loose = document.querySelector('.loose')
let words = ['ALURA', 'ORACLE', 'ONE']
let randomWord
let word
let splitedWord
let alreadyFoundLetters = []
let wrongTryes = 0
let numberOfLettersFound = 0
let gameOn

function generateRandomWord() {
  randomWord = -Math.ceil(Math.random() * (0 - words.length) + 0)
  word = words[randomWord]
  splitedWord = word.split('')
}

function startGame() {
  gameOn = true
  generateRandomWord()
  win.style.display = 'none'
  loose.style.display = 'none'
  startButton.style.display = 'none'

  for (let i = 0; i < word.length; i++) {
    let indivBox = document.createElement('div')
    boxLetters.appendChild(indivBox)
    indivBox.classList.add('letters')
    if (splitedWord[i] == ' ') {
      indivBox.classList.add('vazio')
    } else {
      indivBox.classList.add(`${splitedWord[i]}`)
    }
    indivBox.id = `letra${i + 1}`
  }
}

startGame()

document.addEventListener('keydown', async e => {
  let keyName = e.key.toLocaleUpperCase()
  let foundAnyLetter = findLetters(splitedWord, keyName)
  let isAlreadyFound = findLetters(alreadyFoundLetters, keyName)

  if (isAlreadyFound) {
    addRemoveAnimation(3000, warning)
  } else if (foundAnyLetter) {
    ;(async function addLetterOnScreen() {
      splitedWord.forEach(e => {
        if (e == keyName) {
          numberOfLettersFound++
          alreadyFoundLetters.push(e)
        }
      })
      document.querySelectorAll(`.${keyName}`).forEach(element => {
        let span = document.createElement('span')
        element.appendChild(span)
        span.classList.add('letras')
        span.innerHTML = keyName
      })
      if (numberOfLettersFound == word.length) {
        winGame()
      }
    })()
  } else {
    if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(keyName) > -1) {
      if (gameOn == true) {
        wrongTryes++
        pushChar()
      }
      if (wrongTryes == 6) {
        endGame()
        setTimeout(() => {
          loose.style.display = 'block'
        }, 2000)
      }
    }
  }
})

function findLetters(array, letter) {
  return array.indexOf(letter) > -1
}

function winGame() {
  win.style.display = 'block'
  resetGame()
}

function endGame() {
  leftEye.classList.add('looseEyeEffect')
  rightEye.classList.add('looseEyeEffect')
  char.classList.add('fallChar')
  setTimeout(() => {
    resetGame()
  }, 2000)
}

function resetGame() {
  char.classList.remove('fallChar')
  leftEye.classList.remove('looseEyeEffect')
  rightEye.classList.remove('looseEyeEffect')

  pushPercent = -3.12
  char.style.transform = `translate(${pushPercent}rem, -50%)`
  gameOn = false
  startButton.style.display = 'block'
  document.querySelectorAll('.letters').forEach(e => {
    e.remove()
  })
  alreadyFoundLetters = []
  wrongTryes = 0
  numberOfLettersFound = 0
}

async function addRemoveAnimation(time, element) {
  element.style.display = 'block'
  setTimeout(() => {
    element.style.display = 'none'
  }, time)
}
