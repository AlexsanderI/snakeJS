const playBoard = document.querySelector('.play-board');

let foodX, foodY;
let snakeBody = [];
let snakeX = 5,
  snakeY = 10;
let vectorX = 0,
  vectorY = 0;

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const changeDirection = (e) => {
  if (e.key === 'ArrowUp') {
    vectorX = 0;
    vectorY = -1;
  } else if (e.key === 'ArrowDown') {
    vectorX = 0;
    vectorY = 1;
  } else if (e.key === 'ArrowRight') {
    vectorX = 1;
    vectorY = 0;
  } else if (e.key === 'ArrowLeft') {
    vectorX = -1;
    vectorY = 0;
  }
  //   initGame();
};

const initGame = () => {
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}" ></div>`;
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    console.log(snakeBody);
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];
  snakeX += vectorX;
  snakeY += vectorY;

  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}" ></div>`;
  }

  playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
// initGame();
document.addEventListener('keydown', changeDirection);
setInterval(initGame, 125);
