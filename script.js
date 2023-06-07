const playBoard = document.querySelector('.play-board');

let gameOver = false;
let foodX, foodY;
let snakeBody = [];
let snakeX = 5,
  snakeY = 10;
let vectorX = 0,
  vectorY = 0;
let setIntervalId;

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const changeDirection = (e) => {
  if (e.key === 'ArrowUp' && vectorY != 1) {
    vectorX = 0;
    vectorY = -1;
  } else if (e.key === 'ArrowDown' && vectorY != -1) {
    vectorX = 0;
    vectorY = 1;
  } else if (e.key === 'ArrowRight' && vectorX != -1) {
    vectorX = 1;
    vectorY = 0;
  } else if (e.key === 'ArrowLeft' && vectorX != 1) {
    vectorX = -1;
    vectorY = 0;
  }
  //   initGame();
};

const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert('Game Over! Press OK to replay the game');
  location.reload(); // what is the method called
};

const initGame = () => {
  if (gameOver) return handleGameOver(); // how it is work
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}" ></div>`;
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];
  snakeX += vectorX;
  snakeY += vectorY;
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }
  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}" ></div>`;
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
// initGame();
document.addEventListener('keydown', changeDirection);
setIntervalId = setInterval(initGame, 125);
