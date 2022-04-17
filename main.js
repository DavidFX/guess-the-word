const userInput = document.getElementById('wordToGuess')
const hearts = Array.from(document.querySelectorAll('.heart'))

const raw = prompt("What word would you pick: ")
const word = raw.toLowerCase()
console.log(word);
const toGuess = Array.from(word)
const guested = []

var lives = 5
var j = 0

for(let i = 0; i < word.length;i++){
  guested[i] = '_'
}

const sliceWord = (word) => {
    guested.map((symbol) => {
      if(symbol !== ' '){
        userInput.value += symbol + " "
      } else userInput.value += ' '
    }) 
}

const indexesOf = (arr, item) => 
  arr.reduce(
    (acc, v, i) => (v === item && acc.push(i), acc),
  []);

sliceWord(word)

const gameOver = () => {
  const lose = new Audio('/audio/lose.wav')
  lose.play()
  userInput.value = word
  setTimeout(() => {
    alert("Game Over!")
    document.location.reload(true)
  }, 1000)
} 

const youWin = () => {
  const win = new Audio('/audio/win.wav')
  win.play()
  setTimeout(()=>{
    alert("You Win!")
    document.location.reload(true)
  }, 1000)
}

const pressBtn = (letter) => {
  const succes = new Audio('/audio/succes.wav')
  const unsecces = new Audio('/audio/unsecces.wav')

  let place = indexesOf(toGuess, letter)
  if(place.length !== 0) {
    place.map((i) => {
      guested[i] = letter
      userInput.value = ''
      sliceWord(word)
      succes.play()
      event.target.classList.add('used')
      event.target.classList.remove('btn')
      if(word == guested.join('')){
        youWin()
      }
    })
  } else {
    hearts[j].classList.add('lost')
    j++
    lives--
    event.target.classList.add('wrong')
    event.target.classList.remove('btn')
    unsecces.play()
    if(lives === 0){
      gameOver()
    }
  }
}
  

