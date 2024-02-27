document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const gameOverPopup = document.getElementById('gameOverPopup');
    let snake = [];
    let direction = 'right';
    let food = {x: 0, y: 0};
    let gameInterval;
    let score = 0;
    const gameSize = 400;
    const cellSize = 20;
  
    function createSnake() {
      gameArea.innerHTML = ''; 
      snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${segment.x}px`;
        snakeElement.style.top = `${segment.y}px`;
        snakeElement.classList.add('snake');
        gameArea.appendChild(snakeElement);
      });
      const foodElement = document.createElement('div');
      foodElement.style.left = `${food.x}px`;
      foodElement.style.top = `${food.y}px`;
      foodElement.classList.add('food');
      gameArea.appendChild(foodElement);
    }
  
    function moveSnake() {
      const head = {
        x: snake[0].x + (direction === 'right' ? cellSize : direction === 'left' ? -cellSize : 0),
        y: snake[0].y + (direction === 'down' ? cellSize : direction === 'up' ? -cellSize : 0)
      };
      snake.unshift(head);
  
      if (head.x === food.x && head.y === food.y) {
        score++; 
        placeFood(); 
      } else {
        snake.pop(); 
      }
    }
  
    function placeFood() {
      food.x = Math.floor(Math.random() * (gameSize / cellSize)) * cellSize;
      food.y = Math.floor(Math.random() * (gameSize / cellSize)) * cellSize;
    }
  
    function checkCollision() {
      const head = snake[0];
      return head.x < 0 || head.x >= gameSize || head.y < 0 || head.y >= gameSize || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    }
  
    function gameOver() {
      clearInterval(gameInterval);
      document.getElementById('finalScore').innerText = `Your score: ${score}`;
      gameOverPopup.style.display = 'flex';
      startButton.style.display = 'none'; 
    }
  
    function gameLoop() {
      if (checkCollision()) {
        gameOver();
        return;
      }
      moveSnake();
      createSnake();
    }
  
    function changeDirection(event) {
      const keyPressed = event.key;
      const directions = {ArrowLeft: 'left', ArrowUp: 'up', ArrowRight: 'right', ArrowDown: 'down'};
      const oppositeDirections = {'left': 'right', 'right': 'left', 'up': 'down', 'down': 'up'};
      if (directions[keyPressed] && directions[keyPressed] !== oppositeDirections[direction]) {
        direction = directions[keyPressed];
      }
    }
  
    function startGame() {
      score = 0; // Reset score
      snake = [{x: 160, y: 200}, {x: 140, y: 200}, {x: 120, y: 200}];
      direction = 'right';
      placeFood();
      if (gameInterval) clearInterval(gameInterval);
      gameInterval = setInterval(gameLoop, 100);
      gameOverPopup.style.display = 'none';
    }
  
    document.addEventListener('keydown', changeDirection);
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame); 
  });
  