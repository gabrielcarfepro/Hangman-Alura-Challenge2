let palavra = 'ALURA'
let tentativas = 0

document.addEventListener('keydown', e => {
  let keyName = e.key
  console.log(palavra.indexOf(keyName))
})
