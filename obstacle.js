import { food } from "./food.js";
import { randomGridPosition } from "./gird.js";
import { onSnake } from "./snake.js";

let obstacles = [];
const SHUFFLE_POSITION_EVERY = 3; 
const MAX_OBSTACLES = 6; // -1 for infinite
const TIME_RENDER = 2;

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
    } while (
        newObstaclePosition == null ||
        onSnake(newObstaclePosition) ||
        isFood(newObstaclePosition)
    );
    return newObstaclePosition;
}

function isFood(position) {
    return position.x === food.x && position.y === food.y;
}

setInterval(() => {
    console.log("Render obstacle", obstacles.length);

    if (obstacles.length < MAX_OBSTACLES || MAX_OBSTACLES === -1) {
        if (obstacles.length % SHUFFLE_POSITION_EVERY === 0 && obstacles.length != 0) {
            const length = obstacles.length;
            obstacles = [];
            for (let i = 0; i < length + 1; i++) {
                obstacles.push(getRandomObstaclePosition());
            }
        } else {
            obstacles.push(getRandomObstaclePosition());
        }
    } else {
        obstacles = [];
    }
}, TIME_RENDER * 1000);
