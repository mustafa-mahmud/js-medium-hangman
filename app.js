'use strict';

const figureParts = document.querySelectorAll('.figure-part');
const wrongContent = document.getElementById('wrong-letters');
const wordContainer = document.getElementById('word');
const finalMsg = document.getElementById('final-message');
const playBtn = document.getElementById('play-button');
const popupContainer = document.getElementById('popup-container');
const notiContainer = document.getElementById('notification-container');

const wordArr = [
  'c',
  'python',
  'java',
  'ruby',
  'go',
  'swift',
  'perl',
  'typescript',
  'kotlin',
  'javascript',
  'php',
];

let temp = [];
let correctLetters = [];
let wrongLetters = [];
const randomWord =
  wordArr[Math.floor(Math.random() * wordArr.length)].split('');

const wordShowUI = (e) => {
  const userInput = e?.key.toLowerCase();
  if (userInput) {
    if (!correctLetters.includes(userInput) && randomWord.includes(userInput))
      correctLetters.push(userInput);
    else if (
      !wrongLetters.includes(userInput) &&
      !randomWord.includes(userInput)
    ) {
      if (wrongLetters.length >= figureParts.length - 1) {
        setTimeout(() => {
          return gameOver('OOPS!! 😭 you lost, please try again.');
        }, 500);
      }

      wrongLetters.push(userInput);
      wrongContent.textContent = wrongLetters.join(',');
      figureParts[wrongLetters.length - 1].style.display = 'flex';
    } else showMsg(userInput);
  }
  wordContainer.innerHTML = '';
  randomWord.forEach((letter) => {
    wordContainer.innerHTML += `
		<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>
		`;
  });

  if (randomWord.includes(userInput)) temp++;

  const win = randomWord.every((letter) => correctLetters.includes(letter));

  if (win) {
    setTimeout(() => {
      return gameOver('HORRAYYYYYY 🥳 you won, please play again.');
    }, 500);
  }
};

const showMsg = (letter) => {
  notiContainer.innerHTML = `
	<p>This letter already has been typed "${letter}"</p>
	`;

  notiContainer.classList.add('show');

  setTimeout(() => {
    notiContainer.classList.remove('show');
  }, 2000);
};

const gameOver = (msg) => {
  popupContainer.style.display = 'flex';
  finalMsg.textContent = msg;
};

wordShowUI();

document.addEventListener('keypress', wordShowUI);
playBtn.addEventListener('click', () => location.reload());
