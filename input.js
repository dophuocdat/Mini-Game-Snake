let inputDirection = { x: 0, y: 0 }; // the direction the snake is moving
window.addEventListener("keydown", (e) => {
    // listen for keydown events
    switch (
        e.key // switch on the key property of the event object
    ) {
        case "ArrowUp": // if the key is the up arrow
            if (inputDirection.y !== 0) break; // if the snake is already moving up or down, break out of the switch statement
            window.snakeHead = "up";
            inputDirection = { x: 0, y: -1 }; // set the inputDirection to up
            break;
        case "ArrowDown": // if the key is the down arrow
            if (inputDirection.y !== 0) break; // if the snake is already moving up or down, break out of the switch statement
            window.snakeHead = "down";
            inputDirection = { x: 0, y: 1 }; // set the inputDirection to down
            break;
        case "ArrowLeft": // if the key is the left arrow
            if (inputDirection.x !== 0) break; // if the snake is already moving left or right, break out of the switch statement
            window.snakeHead = "left";
            inputDirection = { x: -1, y: 0 }; // set the inputDirection to left
            break;
        case "ArrowRight": // if the key is the right arrow
            if (inputDirection.x !== 0) break; // if the snake is already moving left or right, break out of the switch statement
            window.snakeHead = "right";
            inputDirection = { x: 1, y: 0 }; // set the inputDirection to right
            break;
    }
});
export function getInputDirection() {
    return inputDirection;
}
