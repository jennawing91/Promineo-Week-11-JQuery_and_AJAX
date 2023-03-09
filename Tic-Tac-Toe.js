const X = "X";
const O = "O";
const winningCombos = [    //creates all possible winning combinations
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

const cellElements = document.querySelectorAll('.cell');    //reference back to all the cells indicated in html
console.log(cellElements);
const boardElement = document.getElementById('board');    //reference to the overall board created in html
console.log(boardElement);
const winningMessageElement = document.getElementById('winningMessage');     //reference to the message id in html
const restartButton = document.getElementById('restartButton');        //reference to the button to restart the game, shows up on completion of the game
const winningMessageTextElement = document.getElementById('winningMessageText');   
console.log(winningMessageTextElement);
let isOturn = false;   //defines that it is not O's 

startGame();

restartButton.addEventListener('click', startGame);  //uses a click to start the game. This is defined in a function below

function startGame() {    //to start the game it will begin with player x, when x clicks on a cell it will start the game
	isOturn = false
	cellElements.forEach(cell => {
		cell.classList.remove(X);
		cell.classList.remove(O);
		cell.removeEventListener('click', handleCellClick);
		cell.addEventListener('click', handleCellClick, { once: true })
	})
    //console.log("test");
    // for (let i = 0; i < cellElements.length; i++){
    //     console.log(cellElements);
    // //     cell.classList.remove(X);
	// // 	cell.classList.remove(O);
	// // 	cell.removeEventListener('click', handleCellClick);
	// // 	cell.addEventListener('click', handleCellClick, { once: true })
	// //}
	setBoardHoverClass();  //allows a player to hover over a cell on the board before they hit click
    //console.log(setBoardHoverClass);
	winningMessageElement.classList.remove('show')
}

function handleCellClick(e) {       //defines how a click will be managed, including how to reference player turn and place a mark
	const cell = e.target;
	const currentTurn= isOturn ? O : X;
    placeMark(cell, currentTurn)
	if (checkWin(currentTurn)) {    //for each click it will check to see if there is a winning combination on the board
		endGame(false)            //if there is no winning combination then it will move to the else if
        //console.log(checkWin);
        //console.log(endGame);
	} else if (isDraw()) {      //if there is no draw then it will check to see if there is anything else
		endGame(true)
	} else {     //if there is no winning combination and there is no draw then it will swap player turns
		swapTurns()
		setBoardHoverClass()
	}
    //console.log(cell);
    //console.log(currentTurn);

}

function endGame(draw) {     //if there is a draw or a winner then the game concludes with a message
    if(draw) {
        winningMessageTextElement.innerHTML = "It is a draw!"     
    } else {
        winningMessageTextElement.innerHTML = `Player with ${isOturn ? "O's" : "X's"} wins!`
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {     //defines what a draw means...every cell is occupied by either an X or an O and there is no winning combination
    return[...cellElements].every(cell => {
        return cell.classList.contains(X) || cell.classList.contains(O)
    })
}

function placeMark(cell, currentTurn) {    //creates a way to place either an X or an O in a particular cell based on which turn
	cell.classList.add(currentTurn)
    console.log(cell.classList)
}

function swapTurns() {     //boolean function to determine whether it is X or O turn
	isOturn = !isOturn
}

function setBoardHoverClass() {        //on hovering over a cell it shows which players turn it is by displaying the X or O
	boardElement.classList.remove(X)
	boardElement.classList.remove(O)
	if (isOturn) {
		boardElement.classList.add(O)
	} else {
		boardElement.classList.add(X)
	}
}

function checkWin(currentTurn) {      //looks for a winning combination of numbers on each turn
	return winningCombos.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentTurn)
		})
	})
}