const boxLetters = document.querySelector('.boxLetters')
const startButton = document.querySelector('.startButton')
const win = document.querySelector('.win')
const loose = document.querySelector('.loose')
let words = ['ALURA', 'ORACLE', 'ONE', 'ESTUDO', 'PROGRAMAÇAO', 'CHALLENGE']
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

// CAPTURAR LETRAS DO TECLADO

document.addEventListener('keydown', e => {
  gameLogic(e.key)
})

// KEYBOARD MOBILE

window.onload = async function () {
  document.querySelectorAll('.keys').forEach(e => {
    e.addEventListener('click', function () {
      gameLogic(e.textContent)
    })
  })
}

async function gameLogic(e) {
  let keyName = e.toLocaleUpperCase()
  let foundAnyLetter = findLetters(splitedWord, keyName)
  let isAlreadyFound = findLetters(alreadyFoundLetters, keyName)

  if (isAlreadyFound) {
    addRemoveAnimation(3000, warning)
  } else if (foundAnyLetter && gameOn) {
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
        wrongTryes = 0
        winGame()
      }
    })()
  } else {
    if ('ABCÇDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(keyName) > -1) {
      if (gameOn) {
        wrongTryes++
        pushChar()
      }
      if (wrongTryes == 6) {
        wrongTryes = 0
        endGame()
        setTimeout(() => {
          loose.style.display = 'block'
        }, 2000)
      }
    }
  }
}

function findLetters(array, letter) {
  return array.indexOf(letter) > -1
}

function winGame() {
  gameOn = false
  win.style.display = 'block'
  startButton.style.display = 'block'
  char.style.transform = `translate(-3.12rem, -50%)`
  // ANIMAÇÃO FOGOS DE ARTIFÍCIO NO DISPLAY
  winLeftEye.style = 'display: none; transform: translate(0, -28%)'
  winRightEye.style = 'display: none; transform: translate(0, -28%)'
  let boxFirework = document.querySelector('#boxFirework')
  let img = document.createElement('img')
  boxFirework.appendChild(img)
  img.classList.add('winFirework')
  img.src = 'assets/firework.gif'
  setTimeout(() => {
    img.remove()
    winLeftEye.style = 'display: block; transform: translate(0, -28%)'
    winRightEye.style = 'display: block; transform: translate(0, -28%)'
    setTimeout(() => {
      winLeftEye.style = 'display: block; transform: translate(0, 0)'
      winRightEye.style = 'display: block; transform: translate(0, 0)'
    }, 10)
  }, 1500)
}

function endGame() {
  gameOn = false
  leftEye.classList.add('looseEyeEffect')
  rightEye.classList.add('looseEyeEffect')
  char.classList.add('fallChar')
  setTimeout(() => {
    char.classList.remove('fallChar')
    resetGame()
  }, 2000)
}

function resetGame() {
  alreadyFoundLetters = []
  numberOfLettersFound = 0
  char.classList.remove('fallChar')
  leftEye.classList.remove('looseEyeEffect')
  rightEye.classList.remove('looseEyeEffect')
  pushPercent = -3.12
  pushPercentMobile = -9.3
  if (window.screen.width <= 413) {
    char.style.transform = `translate(${pushPercentMobile}rem, -40%)`
  } else {
    char.style.transform = `translate(${pushPercent}rem, -50%)`
  }

  document.querySelectorAll('.letters').forEach(e => {
    e.remove()
  })
  startGame()
}

async function addRemoveAnimation(time, element) {
  if (gameOn) {
    element.style.display = 'block'
    setTimeout(() => {
      element.style.display = 'none'
    }, time)
  }
}

let cor = '#2c363f'
theme.addEventListener('click', () => {
  if (cor == '#2c363f') {
    console.log('cinza')
    cor = 'aqua'
    document.querySelector('body').style.backgroundColor = 'aqua'
  } else {
    console.log('azul')
    cor = '#2c363f'
    document.querySelector('body').style.backgroundColor = '#2c363f'
  }
})
