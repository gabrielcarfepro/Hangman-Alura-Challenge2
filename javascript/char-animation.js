let x
let y
const leftEye = document.querySelector('#leftEye')
const rightEye = document.querySelector('#rightEye')

char.addEventListener('mouseenter', () => {
  let humor = Math.round(Math.random() * (2 - 1) + 1)
  window.addEventListener('mousemove', trackMouse)
  setTimeout(() => {
    if (humor == 1) {
      leftEye.classList.add('tiredExpression')
      rightEye.classList.add('tiredExpression')
      setTimeout(() => {
        leftEye.classList.remove('tiredExpression')
        rightEye.classList.remove('tiredExpression')
      }, 1500)
    }
    window.removeEventListener('mousemove', trackMouse)
    leftEye.style.transform = `translate(0%, 0%)`
    rightEye.style.transform = `translate(0%, 0%)`
  }, 6000)
})

function trackMouse(e) {
  x = e.clientX
  y = e.clientY
  let porcentX = ((x / window.screen.width) * 100).toFixed(0)
  let porcentY = ((y / window.screen.height) * 100).toFixed(0)
  let Xposition = (porcentX * 16) / 50
  Xposition -= 16
  let Yposition = (porcentY * 30) / 50
  Yposition -= 25
  leftEye.style.transform = `translate(${Xposition}%, ${Yposition}%)`
  rightEye.style.transform = `translate(${Xposition}%, ${Yposition}%)`
}

/*function paidAttention() {
  leftEye.style.transform = 'scale(1.5) translate(-20%, -14%)'
  rightEye.style.transform = 'scale(1.5) translate(-14%, -14%)'
}*/

// ANIMAÇÃO PERSONAGEM SENDO EMPURRADO
let pushPercent = -3.12
function pushChar() {
  pushPercent += 5.3
  char.style.transform = `translate(${pushPercent}rem, -50%)`
}
