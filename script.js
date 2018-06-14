const gameField = document.querySelector("canvas");
const ctx = gameField.getContext("2d");

gameField.width = 1000;
gameField.height = 500;

const fieldWidth = gameField.width,
  fieldHeight = gameField.height;

const lineWidth = 6;
const lineHeight = 16;

const ballSize = 20;
let ballX = fieldWidth / 2 - ballSize / 2,
  ballY = fieldHeight / 2 - ballSize / 2;

const paddleHeight = 100,
  paddleWidth = 20;



//paletki

const playerX = 70,
  computerX = 910;

let playerY = 200,
  computerY = 200;

let ballSpeedX = 1;
let ballSpeedY = 1;

function playerPaddle() {
  ctx.fillStyle = "green";
  ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
}

function computerPaddle() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(computerX, computerY, paddleWidth, paddleHeight);
}

function playerBounce() {
  if (ballX <= playerX + paddleWidth && ballY >= playerY && ballY + ballSize <= playerY + paddleHeight) {
    ballSpeedX = -ballSpeedX
  };
}

function computerBounce() {
  if (ballX + ballSize >= computerX && ballY >= computerY && ballY + ballSize <= computerY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  };
}

function ball() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(ballX, ballY, ballSize, ballSize);

  //ruch piłki
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY + ballSize >= fieldHeight) {
    ballSpeedY = -ballSpeedY;
    speedUp();
  }
  if (ballX <= 0 || ballX + ballSize >= fieldWidth) {
    ballSpeedX = -ballSpeedX;
    speedUp();
  }
  computerBounce();
  playerBounce();
}



function table() {
  //stół
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, fieldWidth, fieldHeight);

  //linia na środku
  for (let linePosition = 20; linePosition < fieldHeight; linePosition += 30) {
    ctx.fillStyle = "gray";
    ctx.fillRect(
      fieldWidth / 2 - lineWidth / 2,
      linePosition,
      lineWidth,
      lineHeight
    );
  }
}

topGameField = gameField.offsetTop;

function playerPosition(e) {
  playerY = e.clientY - topGameField - paddleHeight / 2;

  if (playerY >= fieldHeight - paddleHeight) {
    playerY = fieldHeight - paddleHeight;
  }

  if (playerY <= 0) {
    playerY = 0;
  }
}

//AI

function computerPosition() {
  const middlePaddle = computerY + paddleHeight / 2;
  const middleBall = ballY + ballSize / 2;

  if (ballX > 500) {
    if (middlePaddle - middleBall > 200) {
      computerY -= 20;
    } else if (middlePaddle - middleBall > 50) {
      computerY -= 10;
    } else if (middlePaddle - middleBall < -200) {
      computerY += 20;
    } else if (middlePaddle - middleBall < -50) {
      computerY += 10;
    }
  } else if (ballX <= 500 && ballX > 150) {
    if (middlePaddle - middleBall > 100) {
      computerY -= 5;
    } else if (middlePaddle - middleBall < -100) {
      computerY += 5;
    }
  }
}

function speedUp() {
  //console.log(ballSpeedX + " , " + ballSpeedY);
  if (ballSpeedX > 0 && ballSpeedX < 16) {
    ballSpeedX += 0.5;
  } else if (ballSpeedX < 0 && ballSpeedX > -16) {
    ballSpeedX -= 0.5;
  }

  if (ballSpeedY > 0 && ballSpeedY < 16) {
    ballSpeedY += 0.5;
  } else if (ballSpeedY < 0 && ballSpeedY > -16) {
    ballSpeedY -= 0.5;
  }
}

gameField.addEventListener("mousemove", playerPosition);

function game() {
  table();
  ball();
  playerPaddle();
  computerPaddle();
  computerPosition();
}

setInterval(game, 1000 / 60);