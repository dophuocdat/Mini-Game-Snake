import { randomGridPosition } from "./gird.js";
import { expandSnake, onSnake } from "./snake.js";


export let food = getRandomFoodPosition();
const EXPANSION_RATE = 20;

export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition();
    }
    // console.log(onSnake(food));
}
export function draw(gameBoard) {

    const foodElement = document.createElement('div'); // create a div element
    foodElement.style.gridRowStart = food.y; // set the gridRowStart property of the div element to the y property of the current segment
    foodElement.style.gridColumnStart = food.x; // set the gridColumnStart property of the div element to the x property of the current segment
    foodElement.classList.add('food'); // add the 'snake' class to the div element
    gameBoard.appendChild(foodElement); // append the div element to the gameBoard


}


function getRandomFoodPosition() { // the positions to compare 
    let newFoodPosition; // return true if the x and y properties of the two positions are equal
    while (newFoodPosition == null || onSnake(newFoodPosition)) { // while the newFoodPosition is null or on the snake
        newFoodPosition = randomGridPosition(); // set the newFoodPosition to a random position
    }
    return newFoodPosition; // return the newFoodPosition
}