const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileSize = canvas.width / gridSize;

let snake = [{x: 10, y: 10}];
let food = {x: 5, y: 5};
let snakeSpeed = {x: 0, y: 0};
let score = 0;

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(e) {
  switch (e.key) {
    case 'ArrowUp': snakeSpeed = {x: 0, y: -1}; break;
    case 'ArrowDown': snakeSpeed = {x: 0, y: 1}; break;
    case 'ArrowLeft': snakeSpeed = {x: -1, y: 0}; break;
    case 'ArrowRight': snakeSpeed = {x: 1, y: 0}; break;
  }
}

function main() {
  setTimeout(() => {
    moveSnake();
    checkFoodCollision();
    checkSnakeCollision();
    draw();
    main();
  }, 100);
}

function moveSnake() {
  let head = {x: snake[0].x + snakeSpeed.x, y: snake[0].y + snakeSpeed.y};
  snake.unshift(head);
  snake.pop();
}

function checkFoodCollision() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    generateFood();
    growSnake();
    score++;
  }
}

function checkSnakeCollision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      resetGame();
    }
  }
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
  };
}

function growSnake() {
  let tail = { ...snake[snake.length - 1] };
  snake.push(tail);
}

function resetGame() {
  snake = [{x: 10, y: 10}];
  snakeSpeed = {x: 0, y: 0};
  score = 0;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = 'lime';
  for (let segment of snake) {
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  }

  // Draw food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

  // Draw score
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

main();

