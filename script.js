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

function getRandomAnimation(diceValue) {
  const baseRotations = 3; // Minimum number of full rotations
  const extraRotations = diceValue - 1; // Extra rotations based on dice value

  const xRotation = (baseRotations + extraRotations) * 360;
  const yRotation = (baseRotations + extraRotations) * 360;
  const zRotation = (baseRotations + extraRotations) * 360;

  return `
@keyframes roll3D-${diceValue} {
  0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  60% { transform: rotateX(${xRotation * 0.8}deg) rotateY(${
    yRotation * 0.8
  }deg) rotateZ(${zRotation * 0.8}deg); }
  75% { transform: rotateX(${xRotation * 0.9}deg) rotateY(${
    yRotation * 0.9
  }deg) rotateZ(${zRotation * 0.9}deg); }
  85% { transform: rotateX(${xRotation * 0.95}deg) rotateY(${
    yRotation * 0.95
  }deg) rotateZ(${zRotation * 0.95}deg); }
  92% { transform: rotateX(${xRotation * 0.98}deg) rotateY(${
    yRotation * 0.98
  }deg) rotateZ(${zRotation * 0.98}deg); }
  96% { transform: rotateX(${xRotation * 0.99}deg) rotateY(${
    yRotation * 0.99
  }deg) rotateZ(${zRotation * 0.99}deg); }
  100% { transform: ${getFinalRotation(diceValue)}; }
}
  `;
}
function getFinalRotation(diceValue) {
  switch (diceValue) {
    case 1:
      return 'rotateX(0deg) rotateY(0deg)';
    case 2:
      return 'rotateX(-90deg) rotateY(0deg)';
    case 3:
      return 'rotateY(-90deg)';
    case 4:
      return 'rotateY(90deg)';
    case 5:
      return 'rotateX(90deg) rotateY(0deg)';
    case 6:
      return 'rotateY(180deg)';
  }
}

diceRoll.addEventListener('click', function () {
  if (!playing) return;

  const diceValue = Math.trunc(Math.random() * 6) + 1;

  const randomAnimation = getRandomAnimation();

  dice.classList.remove('hidden');

  dice.classList.add('dice-rolling');
  dice.style.animationName = randomAnimation;

  setTimeout(() => {
    dice.classList.remove('dice-rolling');
    dice.style.animationName = '';

    // Set the final rotation based on the dice value
    switch (diceValue) {
      case 1:
        dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
        break;
      case 2:
        dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
        break;
      case 3:
        dice.style.transform = 'rotateY(-90deg)';
        break;
      case 4:
        dice.style.transform = 'rotateY(90deg)';
        break;
      case 5:
        dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
        break;
      case 6:
        dice.style.transform = 'rotateY(180deg)';
        break;
    }

    if (diceValue !== 1) {
      currentValue += diceValue;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentValue;
    } else {
      switching();
    }
  }, 1200); // Match this to your animation duration
});

function getRandomAnimation() {
  const animations = ['roll3D-1', 'roll3D-2', 'roll3D-3'];
  return animations[Math.floor(Math.random() * animations.length)];
}

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
