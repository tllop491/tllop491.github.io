const gameContainer = document.getElementById('gameContainer');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gridSize = 20;
let tileSize;
let snake = [{x: 10, y: 10}];
let food = {x: 5, y: 5};
let snakeSpeed = {x: 0, y: 0};
let score = 0;

function resizeCanvas() {
  const size = Math.min(gameContainer.clientWidth, gameContainer.clientHeight);
  canvas.width = canvas.height = size;
  tileSize = canvas.width / gridSize;
}

window.addEventListener('resize', resizeCanvas);
document.addEventListener('keydown', handleKeyPress);

resizeCanvas();

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

// The rest of the functions remain the same as before

main();

