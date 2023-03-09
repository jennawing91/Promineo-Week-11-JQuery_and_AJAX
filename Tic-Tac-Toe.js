const X = "X";
const O = "O";
const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

const cellElements = document.querySelectorAll('.cell');
console.log(cellElements);
const boardElement = document.getElementById('board');
console.log(boardElement);
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.getElementById('winningMessageText');
console.log(winningMessageTextElement);
let isOturn = false;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
	isOturn = false
	cellElements.forEach(cell => {
		cell.classList.remove(X);
		cell.classList.remove(O);
		cell.removeEventListener('click', handleCellClick);
		cell.addEventListener('click', handleCellClick, { once: true })
	})
    console.log("test");
    // for (let i = 0; i < cellElements.length; i++){
    //     console.log(cellElements);
    // //     cell.classList.remove(X);
	// // 	cell.classList.remove(O);
	// // 	cell.removeEventListener('click', handleCellClick);
	// // 	cell.addEventListener('click', handleCellClick, { once: true })
	// //}
	setBoardHoverClass();  
    console.log(setBoardHoverClass);
	winningMessageElement.classList.remove('show')
}

function handleCellClick(e) {
	const cell = e.target;
	const currentTurn= isOturn ? O : X;
    placeMark(cell, currentTurn)
	if (checkWin(currentTurn)) {
		endGame(false)
        //console.log(checkWin);
        //console.log(endGame);
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
    //console.log(cell);
    //console.log(currentTurn);

}

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerHTML = "It is a draw!"
    } else {
        winningMessageTextElement.innerHTML = `Player with ${isOturn ? "O's" : "X's"} wins!`
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return[...cellElements].every(cell => {
        return cell.classList.contains(X) || cell.classList.contains(O)
    })
}

function placeMark(cell, currentTurn) {
	cell.classList.add(currentTurn)
    console.log(cell.classList)
}

function swapTurns() {
	isOturn = !isOturn
}

function setBoardHoverClass() {
	boardElement.classList.remove(X)
	boardElement.classList.remove(O)
	if (isOturn) {
		boardElement.classList.add(O)
	} else {
		boardElement.classList.add(X)
	}
}

function checkWin(currentTurn) {
	return winningCombos.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentTurn)
		})
	})
}