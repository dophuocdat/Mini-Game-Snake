import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 10; // the number of frames per second

const snakeBody = [
    { x: 11, y: 11 }

]; // the snake's body is an array of objects with x and y properties

let newSegments = 0; // the number of new segments to add to the snake
export function update() {
    addSegments();
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) { // loop through the snakeBody array starting at the second to last element
        snakeBody[i + 1] = { ...snakeBody[i] }; // copy the x and y properties of the current segment to the next segment
    }
    snakeBody[0].x += inputDirection.x; // increment the x property of the first segment by 1
    snakeBody[0].y += inputDirection.y; // increment the y property of the first segment by 1

  
}
export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div'); // create a div element
        snakeElement.style.gridRowStart = segment.y; // set the gridRowStart property of the div element to the y property of the current segment
        snakeElement.style.gridColumnStart = segment.x; // set the gridColumnStart property of the div element to the x property of the current segment
        snakeElement.classList.add('snake'); // add the 'snake' class to the div element
        gameBoard.appendChild(snakeElement); // append the div element to the gameBoard
    })

}


export function expandSnake(amount) { // the amount of segments to add to the snake
    newSegments += amount; // add the amount to the newSegments variable
}

export function onSnake(position, { ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return equalPositions(segment, position);
    });
}



function equalPositions(pos1, pos2) { // the positions to compare
    return pos1.x === pos2.x && pos1.y === pos2.y; // return true if the x and y properties of the two positions are equal
}

export function getSnakeHead() { // return the first element of the snakeBody array
    return snakeBody[0];
}

export function snakeIntersection() { // return true if the snake's head is on the snake's body
    // console.log( "snakeIntersection: " + onSnake(snakeBody[0], { ignoreHead: true }))
    return onSnake(snakeBody[0], { ignoreHead: true }); // return true if the snake's head is on the snake's body
}


// return true if the snake's eating obstacle is on the snake's body and the snake's head is on the snake's body 


function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] }); // add a new segment to the snakeBody array

    }
    newSegments = 0; // reset the newSegments variable
}