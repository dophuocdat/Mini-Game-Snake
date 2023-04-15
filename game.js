import {
    update as updateSnake,
    draw as drawSnake,

    getSnakeHead,
    snakeIntersection,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { update as updateObstacle, draw as drawObstacle } from "./obstacle.js";
import { outsideGrid } from "./gird.js";
let lastRenderTime = 0; // the time the last frame was rendered
let gameOver = false; // whether or not the game is over
const gameBoard = document.getElementById("game-board"); // get the gameBoard element

let SNAKE_SPEED = 0;

document.getElementById("level").addEventListener("change", function () {
    SNAKE_SPEED = this.value;
    this.blur();
});

function showNotification() {

    return (Swal.fire({
        iconHtml: '<img src="image/youLost.svg" class="overGame">',
        confirmButtonText: 'Close'
    }).then((r) => {
        window.location = '/';
    }));

}

function main(currentTime) {
    if (gameOver) {
        if (showNotification()) {
           return;
        }
        
    }
    window.requestAnimationFrame(main); // requestAnimationFrame is a browser API that calls the function you pass to it whenever the browser is ready to render the next frame.
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000; // 1000 is the number of milliseconds in a second (1000ms = 1s)
    if (SNAKE_SPEED === 0) {
        console.log("SNAKE_SPEED is 0");
    } else {
        console.log("SNAKE_SPEED is " + SNAKE_SPEED);
    }
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return; // if the time since the last render is less than the time it takes to render the next frame, return and don't render the next frame
    //    console.log('Render'); // if the time since the last render is greater than the time it takes to render the next frame, log 'Render' to the console
    lastRenderTime = currentTime; // set the lastRenderTime to the current time so that the next time this function is called, the time since the last render will be accurate
    update();
    draw();
}

window.requestAnimationFrame(main); // requestAnimationFrame is a browser API that calls the function you pass to it whenever the browser is ready to render the next frame.

function update() {
    updateSnake();
    updateFood();
    updateObstacle();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = ""; // clear the gameBoard
    drawSnake(gameBoard); // draw the snake to the gameBoard
    drawFood(gameBoard); // draw the food to the gameBoard
    drawObstacle(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || updateObstacle(); // if the snake's head is outside the grid or if the snake's head is intersecting with the snake's body, set gameOver to true
}
