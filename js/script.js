let snake = [{ x: 10, y: 10 }];
const food = { x: 15, y: 10 };
const gameBoard = document.getElementById("gameBoard");
let direction = "right";
let gameInterval;
let gameSpeed = 200;
const scoreDisplay = document.getElementById("score");
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const title = document.querySelector("#title");
const upButton = document.querySelector(".up");
const downButton = document.querySelector(".down");
const leftButton = document.querySelector(".left");
const rightButton = document.querySelector(".right");
let score = 0;
const eatSound = new Audio("./assets/sounds/beep.wav");
const fail = new Audio("./assets/sounds/fail.wav");

startButton.addEventListener("click", function () {
  fail.pause();
  fail.currentTime = 0;

  resetGame();
  startScreen.style.display = "none";

  startGameLoop();
});

function startGameLoop() {
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, gameSpeed);
}

function resetGame() {
  clearInterval(gameInterval);
  snake = [{ x: 10, y: 10 }];
  direction = "right";
  score = 0;
  gameSpeed = 200;
  scoreDisplay.textContent = score;
  foodSpawning();
  drawGame();
}
function increaseSpeed() {
  if (score % 3 === 0 && gameSpeed > 80) {
    gameSpeed -= 20;
    startGameLoop();
  }
}
function gameOver() {
  clearInterval(gameInterval);
  startScreen.style.display = "flex";
  title.textContent = "Game Over";
  startButton.textContent = "Restart Game";
}
function drawGame() {
  gameBoard.innerHTML = "";
  snake.forEach(function (part, index) {
    const snakeElement = document.createElement("div");
    snakeElement.classList.add("snake");

    if (index === 0) {
      snakeElement.classList.add("snake-head");
    }

    snakeElement.style.gridColumn = part.x;
    snakeElement.style.gridRow = part.y;
    gameBoard.appendChild(snakeElement);
  });

  const foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.gridColumn = food.x;
  foodElement.style.gridRow = food.y;
  gameBoard.appendChild(foodElement);
}
drawGame();

function moveSnake() {
  const head = { ...snake[0] };
  if (direction === "right") {
    head.x++;
  } else if (direction === "left") {
    head.x--;
  } else if (direction === "up") {
    head.y--;
  } else if (direction === "down") {
    head.y++;
  }
  if (head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20) {
    fail.play();
    gameOver();
    return;
  }
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      fail.play();
      gameOver();
      return;
    }
  }

  if (head.x === food.x && head.y === food.y) {
    eatSound.play();
    foodSpawning();
    score++;
    scoreDisplay.textContent = score;
    increaseSpeed();
  } else {
    snake.pop();
  }
  snake.unshift(head);
}

function foodSpawning() {
  let foodOnSnake = true;
  let randomNum1;
  let randomNum2;
  while (foodOnSnake) {
    foodOnSnake = false;
    randomNum1 = Math.floor(Math.random() * 20) + 1;
    randomNum2 = Math.floor(Math.random() * 20) + 1;
    snake.forEach((part) => {
      if (part.x === randomNum1 && part.y === randomNum2) {
        foodOnSnake = true;
      }
    });
  }
  food.x = randomNum1;
  food.y = randomNum2;
}
function gameLoop() {
  moveSnake();
  drawGame();
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    changeDirection("right");
  } else if (event.key === "ArrowLeft") {
    changeDirection("left");
  } else if (event.key === "ArrowUp") {
    changeDirection("up");
  } else if (event.key === "ArrowDown") {
    changeDirection("down");
  }
});

function changeDirection(newDirection) {
  if (newDirection === "right" && direction !== "left") {
    direction = "right";
  } else if (newDirection === "left" && direction !== "right") {
    direction = "left";
  } else if (newDirection === "up" && direction !== "down") {
    direction = "up";
  } else if (newDirection === "down" && direction !== "up") {
    direction = "down";
  }
}

upButton.addEventListener("click", function () {
  changeDirection("up");
});

downButton.addEventListener("click", function () {
  changeDirection("down");
});

leftButton.addEventListener("click", function () {
  changeDirection("left");
});

rightButton.addEventListener("click", function () {
  changeDirection("right");
});
