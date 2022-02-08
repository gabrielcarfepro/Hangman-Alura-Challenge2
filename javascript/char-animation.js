let x
let y
const leftEye = document.querySelector('#leftEye')
const rightEye = document.querySelector('#rightEye')

char.addEventListener('mouseenter', () => {
  window.addEventListener('mousemove', trackMouse)
  setTimeout(() => {
    leftEye.style.transform = `translate(0%, 0%)`
    rightEye.style.transform = `translate(0%, 0%)`
    window.removeEventListener('mousemove', trackMouse)
  }, 10000)
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
