const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeBody = [];
let snakeX = 5,
  snakeY = 10;
// let   = 0,
//   vectorY = 0;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;
console.log(localStorage.getItem("protocol"));

const protocol = [{ event: "start", step: 0, extra: "" }];
// const protocol = [{ event: "start", step: 0, extra: "" }];

// const protocol = [{ event: "start", step: 0, extra: "" }];

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const changeDirection = (e) => {
  // if (e.key === 'ArrowUp' && vectorY != 1) {
  //   vectorX = 0;
  //   vectorY = -1;
  // } else if (e.key === 'ArrowDown' && vectorY != -1) {
  //   vectorX = 0;
  //   vectorY = 1;
  // } else if (e.key === 'ArrowRight' && vectorX != -1) {
  //   vectorX = 1;
  //   vectorY = 0;
  // } else if (e.key === 'ArrowLeft' && vectorX != 1) {
  //   vectorX = -1;
  //   vectorY = 0;
  // }
  const { event } = protocol[protocol.length - 1];
  if (e.key === "ArrowUp" && event != "move y") {
    protocol.push({ event: "move y", step: -1, extra: "" });
  } else if (e.key === "ArrowDown" && event != "move y") {
    protocol.push({ event: "move y", step: 1, extra: "" });
  } else if (e.key === "ArrowRight" && event != "move x") {
    protocol.push({ event: "move x", step: 1, extra: "" });
  } else if (e.key === "ArrowLeft" && event != "move x") {
    protocol.push({ event: "move x", step: -1, extra: "" });
  }

  initGame();
};

controls.forEach((key) => {
  key.addEventListener("click", () =>
    changeDirection({ key: key.dataset.key })
  );
});

const handleGameOver = () => {
  clearInterval(setIntervalId);

  alert("Game Over! Press OK to replay the game");

  localStorage.setItem("protocol", JSON.stringify(protocol));
};

const initGame = () => {
  if (gameOver) return handleGameOver(); // how it is work

  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}" ></div>`;
  if (snakeX === foodX && snakeY === foodY) {
    score++;
    // changeFoodPosition();
    // snakeBody.push([foodX, foodY]);
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `core: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;

    protocol[protocol.length - 1] = {
      ...protocol[protocol.length - 1],
      extra: "food eaten",
    };
    // protocol[protocol.length - 1].extra = "food eaten";
  }

  const { event, step, extra } = protocol[protocol.length - 1];

  // switch (extra) {
  //   case "food eaten":
  //     snakeBody.push([foodX, foodY]);
  //     changeFoodPosition();
  //     protocol[protocol.length - 1].extra = "";
  //     protocol.push(
  //       (protocol[protocol.length - 1] = {
  //         ...protocol[protocol.length - 2],
  //         extra: "food eaten",
  //       })
  //     );
  //     protocol.pop(
  //       (protocol[protocol.length - 1] = {
  //         ...protocol[protocol.length - 1],
  //         extra: "food eaten",
  //       })
  //     );
  //     break;
  // }

  switch (extra) {
    case "food eaten":
      snakeBody.push([foodX, foodY]);
      changeFoodPosition();
      protocol[protocol.length - 1].extra = "";

      const lastEvent = protocol[protocol.length - 1];

      if (lastEvent.event !== "food eaten") {
        protocol.push({
          event: "food eaten",
          step: 0,
          extra: "food eaten",
        });
      }

      break;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
    // console.log(snakeBody[i]);
  }

  snakeBody[0] = [snakeX, snakeY];

  switch (event) {
    case "move x":
      snakeX += step;
      break;
    case "move y":
      snakeY += step;
      break;
  }

  // snakeX += vectorX;
  // snakeY += vectorY;
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
  console.log(protocol);
};

changeFoodPosition();

document.addEventListener("keydown", changeDirection);
initGame();
// setIntervalId = setInterval(initGame, 125);
