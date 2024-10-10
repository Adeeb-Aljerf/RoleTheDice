'use strict';

// const firstPlayer = prompt(`add the name of the first player:`);
// const secondPlayer = prompt(`add the name of the second player:`);

// document.querySelector('#name--0').textContent = firstPlayer;
// document.querySelector('#name--1').textContent = secondPlayer;

//? Selecting Element

const score1 = document.querySelector('#score--0');
const score2 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const diceRoll = document.querySelector('.btn--roll');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let score = [0, 0];
let activePlayer = 0;
let currentValue = 0;
let playing = true;

//? build a function for switch to the active player (when 1 is elected or when hold)

const switching = function () {
  //? switching players

  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentValue = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  //? to change the background for each player

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//? Starting conditions

score1.textContent = 0;
score2.textContent = 0;
dice.classList.add('hidden');

//? when i click on roll dice

diceRoll.addEventListener('click', function () {
  if (!playing) removeEventListener('click', diceRoll);
  if (playing) {
    const diceValue = Math.trunc(Math.random() * 6) + 1;

    dice.classList.remove('hidden');
    dice.src = `dice-${diceValue}.png`;

    if (diceValue !== 1) {
      //? putting the value of the dice for the right player

      currentValue += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentValue;
    } else {
      // document.querySelector('.player--1').classList.add('player--active');
      // document.querySelector('.player--0').classList.remove('player--active');

      switching();
    }
  }
});

//? when clicking on hold button

const hold = document
  .querySelector('.btn--hold')
  .addEventListener('click', function () {
    if (!playing) removeEventListener('click', hold);
    if (playing) {
      //activePlayer===0 ? score[0]+=currentValue : score[1]+=currentValue;

      score[activePlayer] += currentValue;
      document.querySelector(`#score--${activePlayer}`).textContent =
        score[activePlayer];

      if (score[activePlayer] >= 10) {
        console.log(`${activePlayer + 1} win`);

        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');

        dice.classList.add('hidden');

        playing = false;
      } else {
        switching();
      }
    }
  });

//? to reset the game
const reset = document
  .querySelector('.btn--new')
  .addEventListener('click', function () {
    //? return to the  start condition
    score1.textContent = 0;
    score2.textContent = 0;
    activePlayer = 0;
    playing = true;
    dice.classList.add('hidden');
    addEventListener('click', diceRoll);
    addEventListener('click', hold);

    //? make the score 0
    score = [0, 0];
    currentValue = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    //? make the winner background get back to the defalut
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');

    //? defalut switcing
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
  });
