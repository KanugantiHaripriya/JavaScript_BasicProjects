// Select all the tic-tac-toe box elements using their class
let boxes = document.querySelectorAll('.box'); // Selects all elements with class "box"

// Select the reset button using its ID
let resetBtn = document.querySelector('#reset'); // Selects element with id "reset"

// Select the new game button using its ID
let newGameBtn = document.querySelector('#new-game'); // Selects element with id "new-game"

// Select the container where the winning/draw message is shown
let msgContainer = document.querySelector('.msg-container'); // Selects element with class "msg-container"

// Select the message text element
let msg = document.querySelector('#msg'); // Selects element with id "msg"

// Initialize the game with player O's turn first
let turnO = true; // true => O's turn, false => X's turn

// Counter to track the number of moves played
let count = 0; // Used to detect draw condition (when count reaches 9)

// Array of winning index combinations in the grid
const winPatterns = [
    [0, 1, 2], // Top row
    [0, 3, 6], // Left column
    [0, 4, 8], // Left-to-right diagonal
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [2, 4, 6], // Right-to-left diagonal
    [3, 4, 5], // Middle row
    [6, 7, 8]  // Bottom row
];

// Reset the game state
const resetGame = () => {
    turnO = true; // Reset to player O's turn
    count = 0; // Reset move count
    enableBoxes(); // Enable and clear all boxes
    msgContainer.classList.add("hide"); // Hide the win/draw message
};

// Loop through each box and add a click event listener
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Check whose turn it is and set the box text accordingly
        if (turnO) {
            box.innerText = "O"; // O's move
            turnO = false; // Switch turn to X
        } else {
            box.innerText = "X"; // X's move
            turnO = true; // Switch turn to O
        }
        box.disabled = true; // Disable the box so it can't be clicked again
        count++; // Increase move count

        // Check for a winner after each move
        let iswinner = checkWinner();

        // If all 9 moves are played and no winner, it's a draw
        if (count === 9 && !iswinner) {
            gameDraw();
        }
    });
});

// Function to handle a draw situation
const gameDraw = () => {
    msg.innerText = `Game is Draw`; // Show draw message
    msgContainer.classList.remove("hide"); // Display message container
    disableBoxes(); // Disable all boxes
};

// Disable all boxes (no further moves allowed)
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes and clear their text (used for reset)
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = ""; // Clear the box content
    }
};

// Display the winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`; // Show winner message
    msgContainer.classList.remove("hide"); // Display message container
    disableBoxes(); // Disable all boxes
};

// Function to check if any win condition is met
const checkWinner = () => {
    for (let pattern of winPatterns) {
        // Get the values from the pattern indexes
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        // Check if all three boxes in the pattern are filled and equal
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val); // Call showWinner with the winner's symbol
                return true; // Exit function after detecting a winner
            }
        }
    }
    return false; // Return false if no win condition is met
};

// Add event listeners to the reset and new game buttons
resetBtn.addEventListener("click", resetGame); // Reset button resets the game
newGameBtn.addEventListener("click", resetGame); // New game button also resets the game
