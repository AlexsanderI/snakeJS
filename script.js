// const playBoard = document.querySelector('.play-board');
// const scoreElement = document.querySelector('.score');

// let gameOver = false;
// let foodX, foodY;
// let snakeBody = [];
// let snakeX = 5,
//   snakeY = 10;
// let vectorX = 0,
//   vectorY = 0;
// let setIntervalId;
// let score = 0;

// const changeFoodPosition = () => {
//   foodX = Math.floor(Math.random() * 30) + 1;
//   foodY = Math.floor(Math.random() * 30) + 1;
// };

// const changeDirection = (e) => {
//   if (e.key === 'ArrowUp' && vectorY != 1) {
//     vectorX = 0;
//     vectorY = -1;
//   } else if (e.key === 'ArrowDown' && vectorY != -1) {
//     vectorX = 0;
//     vectorY = 1;
//   } else if (e.key === 'ArrowRight' && vectorX != -1) {
//     vectorX = 1;
//     vectorY = 0;
//   } else if (e.key === 'ArrowLeft' && vectorX != 1) {
//     vectorX = -1;
//     vectorY = 0;
//   }
//   //   initGame();
// };

// const handleGameOver = () => {
//   clearInterval(setIntervalId);
//   alert('Game Over! Press OK to replay the game');
//   location.reload(); // what is the method called
// };

// const initGame = () => {
//   if (gameOver) return handleGameOver(); // how it is work
//   let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}" ></div>`;
//   if (snakeX === foodX && snakeY === foodY) {
//     changeFoodPosition();
//     snakeBody.push([foodX, foodY]);
//     score++;

//     scoreElement.innerText = `Score: ${score}`;
//   }

//   for (let i = snakeBody.length - 1; i > 0; i--) {
//     snakeBody[i] = snakeBody[i - 1];
//   }

//   snakeBody[0] = [snakeX, snakeY];
//   snakeX += vectorX;
//   snakeY += vectorY;
//   if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
//     gameOver = true;
//   }
//   for (let i = 0; i < snakeBody.length; i++) {
//     htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}" ></div>`;
//     if (
//       i !== 0 &&
//       snakeBody[0][1] === snakeBody[i][1] &&
//       snakeBody[0][0] === snakeBody[i][0]
//     ) {
//       gameOver = true;
//     }
//   }

//   playBoard.innerHTML = htmlMarkup;
// };

// changeFoodPosition();
// // initGame();
// document.addEventListener('keydown', changeDirection);
// setIntervalId = setInterval(initGame, 125);

const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");

let gameOver = false;
let foodX, foodY;
let snakeBody = [];
let snakeX = 5,
  snakeY = 10;
let vectorX = 0,
  vectorY = 0;
let setIntervalId;
let score = 0;

const gameProtocol = {
  events: [],
  snakeX: snakeX,
  snakeY: snakeY,
  score: score,

  recordEvent: function (eventType, eventData) {
    this.events.push({
      type: eventType,
      data: eventData,
      timestamp: new Date(),
    });
  },

  startGame: function () {
    this.recordEvent("start", { snakeX: this.snakeX, snakeY: this.snakeY });
  },

  foodEaten: function () {
    score++;
    this.recordEvent("foodEaten", { snakeX, snakeY, score });
  },

  endGame: function () {
    this.recordEvent("end", {
      snakeX: this.snakeX,
      snakeY: this.snakeY,
      score: this.score,
    });
  },

  gameOver: function () {
    this.recordEvent("gameOver", {
      snakeX: this.snakeX,
      snakeY: this.snakeY,
      score: this.score,
    });
  },

  movement: function (x, y) {
    this.recordEvent("movement", { x: x, y: y });
    vectorX = x;
    vectorY = y;
  },
};

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const changeDirection = (e) => {
  let newVectorX = vectorX;
  let newVectorY = vectorY;

  if (e.key === "ArrowUp" && vectorY !== 1) {
    newVectorX = 0;
    newVectorY = -1;
  } else if (e.key === "ArrowDown" && vectorY !== -1) {
    newVectorX = 0;
    newVectorY = 1;
  } else if (e.key === "ArrowRight" && vectorX !== -1) {
    newVectorX = 1;
    newVectorY = 0;
  } else if (e.key === "ArrowLeft" && vectorX !== 1) {
    newVectorX = -1;
    newVectorY = 0;
  }

  if (newVectorX !== vectorX || newVectorY !== vectorY) {
    gameProtocol.movement(newVectorX, newVectorY);
  }
  initGame();
};
const handleGameOver = () => {
  clearInterval(setIntervalId);
  // gameProtocol.gameOver();
  alert("Game Over! Press OK to replay the game");
  // location.reload();
};

const initGame = () => {
  if (gameOver) return handleGameOver();

  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}" ></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    gameProtocol.foodEaten();
    scoreElement.innerText = `Score: ${score}`;
    // gameProtocol.recordEvent("foodEaten", { snakeX, snakeY, score });
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];
  snakeX += vectorX;
  snakeY += vectorY;

  gameProtocol.snakeX = snakeX;
  gameProtocol.snakeY = snakeY;
  gameProtocol.score = score;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
    gameProtocol.endGame();
  }

  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}" ></div>`;
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
      gameProtocol.endGame();
    }
  }

  console.log("gameProtocol:", gameProtocol);

  playBoard.innerHTML = htmlMarkup;
};

// console.log(gameProtocol);

changeFoodPosition();
gameProtocol.startGame();
initGame();
document.addEventListener("keydown", changeDirection);
// setIntervalId = setInterval(initGame, 125);
