let words = {
  easy: ['book', 'game', 'lamp', 'star', 'fish', 'ring', 'cake', 'milk', 'frog', 'ball'],
  medium: ['puzzle', 'planet', 'bridge', 'travel', 'castle', 'jungle', 'ocean', 'hunter', 'guitar', 'rocket'],
  hard: ['hypothesis', 'abstraction', 'revolutionary', 'juxtaposition', 'metamorphic',
         'cryptography', 'philosopher', 'rhinoceros', 'parliamentary', 'transcendent']
};

let currentWord = '', scrambled = '', score = 0, highScore = 0, timeLeft = 30, timer;

const scrambledWordElement = document.getElementById('scrambled-word');
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit-guess');
const hintButton = document.getElementById('hint-btn');
const message = document.getElementById('message');
const timerElement = document.getElementById('timer');
const progressBarFill = document.getElementById('progress-bar-fill');
const levelSelector = document.getElementById('level');

function shuffleWord(word) {
  return word.split('').sort(() => 0.5 - Math.random()).join('');
}

function generateWord() {
  const level = levelSelector.value;
  const wordList = words[level];
  currentWord = wordList[Math.floor(Math.random() * wordList.length)];
  scrambled = shuffleWord(currentWord);
  while (scrambled === currentWord) {
    scrambled = shuffleWord(currentWord);
  }
  scrambledWordElement.textContent = scrambled;
  resetTimer();
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timerElement.textContent = timeLeft;
  progressBarFill.style.width = '100%';
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    progressBarFill.style.width = `${(timeLeft / 30) * 100}%`;
    if (timeLeft === 0) {
      clearInterval(timer);
      message.textContent = `Time's up! The word was: ${currentWord}`;
      guessInput.value = '';
      generateWord();
    }
  }, 1000);
}

submitButton.addEventListener('click', () => {
  const guess = guessInput.value.trim().toLowerCase();
  if (guess === currentWord) {
    score += 10;
    document.getElementById('score').textContent = score;
    showPopup(currentWord);
    message.textContent = '';
    generateWord();
    guessInput.value = '';
    if (score > highScore) {
      highScore = score;
      document.getElementById('high-score').textContent = highScore;
    }
  } else {
    message.textContent = 'Try again!';
  }
});

hintButton.addEventListener('click', () => {
  message.textContent = `Hint: The word starts with "${currentWord[0]}"`;
});

levelSelector.addEventListener('change', () => {
  score = 0;
  document.getElementById('score').textContent = score;
  message.textContent = '';
  guessInput.value = '';
  generateWord();
});

function showPopup(word) {
  const popup = document.getElementById('popup');
  const wordSpan = document.getElementById('correct-word');
  wordSpan.textContent = word;
  popup.classList.add('show');
  setTimeout(() => {
    popup.classList.remove('show');
  }, 2500);
}

generateWord();
