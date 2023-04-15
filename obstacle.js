import { food } from "./food.js";
import { randomGridPosition } from "./gird.js";
import { onSnake } from "./snake.js";

let obstacles = [];

export function update() {
  for (const obstacle of obstacles) {
    if (onSnake(obstacle)) {
      return true;
    }
  }
}

export function draw(gameBoard) {
  obstacles.forEach((obstacle) => {
    const obstacleElement = document.createElement("div");
    obstacleElement.style.gridRowStart = obstacle.y;
    obstacleElement.style.gridColumnStart = obstacle.x;
    obstacleElement.classList.add("obstacle");
    gameBoard.appendChild(obstacleElement);
  });
}

function getRandomObstaclePosition() {
    let newObstaclePosition;
    do {
      newObstaclePosition = randomGridPosition();
    } while (newObstaclePosition == null || onSnake(newObstaclePosition) || isFood(newObstaclePosition));
    return newObstaclePosition;
  }
  
  function isFood(position) {
    return position.x === food.x && position.y === food.y;
  }
  
  

setInterval(() => {
  if (obstacles.length < 6) {
    obstacles.push(getRandomObstaclePosition());
  } else {
    obstacles = [];
  }
}, 2000);
