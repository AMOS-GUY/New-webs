// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Set the snake starting position and direction
let snakeX = 200;
let snakeY = 200;
let direction = 'right';

// Set the snake body
let snakeBody = [];

// Set the food position
let foodX = Math.floor(Math.random() * 40) * 10;
let foodY = Math.floor(Math.random() * 40) * 10;

// Set the score
let score = 0;

// Draw the canvas
function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake
function drawSnake() {
  ctx.fillStyle = 'green';
  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillRect(snakeBody[i].x, snakeBody[i].y, 10, 10);
  }
  ctx.fillRect(snakeX, snakeY, 10, 10);
}

// Draw the food
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(foodX, foodY, 10, 10);
}

// Update the snake position
function updateSnake() {
  switch (direction) {
    case 'right':
      snakeX += 10;
      break;
    case 'left':
      snakeX -= 10;
      break;
    case 'up':
      snakeY -= 10;
      break;
    case 'down':
      snakeY += 10;
      break;
  }

  // Check for collision with the wall
  if (snakeX < 0 || snakeX > canvas.width - 10 || snakeY < 0 || snakeY > canvas.height - 10) {
    alert('Game Over!');
    return;
  }

  // Check for collision with the snake body
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
      alert('Game Over!');
      return;
    }
  }

  // Add the new head to the snake body
  snakeBody.push({ x: snakeX, y: snakeY });

  // Check if the snake has eaten the food
  if (snakeX === foodX && snakeY === foodY) {
    score++;
    foodX = Math.floor(Math.random() * 40) * 10;
    foodY = Math.floor(Math.random() * 40) * 10;
  } else {
    // Remove the tail of the snake
    snakeBody.shift();
  }
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowRight':
      direction = 'right';
      break;
    case 'ArrowLeft':
      direction = 'left';
      break;
    case 'ArrowUp':
      direction = 'up';
      break;
    case 'ArrowDown':
      direction = 'down';
      break;
  }
});

// Main game loop
setInterval(() => {
  drawCanvas();
  drawSnake();
  drawFood();
  updateSnake();
  document.getElementById('score').innerHTML = `Score: ${score}`;
}, 100);