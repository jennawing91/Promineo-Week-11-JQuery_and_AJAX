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

const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.getElementById('winningMessageText');
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
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
}

function checkWin(currentTurn) {
	return winningCombos.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentTurn)
		})
	})
}

