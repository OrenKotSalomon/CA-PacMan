'use strict'

const WALL = '🧱'
const FOOD = '🍙'
const EMPTY = ' '
var SUPER_FOOD = '🥑'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false
}
var gInterval
var gBoard
var gFoodCount

function onInit() {
    toReset()
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    document.querySelector('h2 span').innerText = 0
    gInterval = setInterval(addCherry, 15000)
    console.log(gFoodCount);

}

function toReset() {
    gGhosts = []
    gGame.score = 0
    gGame.isOn = true
    gFoodCount = -6
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }


            if (board[i][j] === FOOD) gFoodCount++
        }
    }
    board[1][1] = SUPER_FOOD
    board[1][8] = SUPER_FOOD
    board[8][8] = SUPER_FOOD
    board[8][1] = SUPER_FOOD
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    var elLosingModal = document.querySelector('.losing-message')
    // TODO
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
    elLosingModal.style.display = 'flex'
}

function playAgain() {
    var elLosingModal = document.querySelector('.losing-message')
    var elWinningModal = document.querySelector('.winning-message')
    elLosingModal.style.display = 'none'
    elWinningModal.style.display = 'none'
    onInit()
}

function checkWin() {
    var elWinningModal = document.querySelector('.winning-message')
    elWinningModal.style.display = 'flex'
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    clearInterval(gInterval)
}

function checkForFood() {
    for (var i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell === FOOD) gFoodCount++
        }
    }
}

function getEmptyCells() {
    const emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell === EMPTY) {
                emptyCells.push({ i, j })
            }
        }
    }
    return emptyCells
}
function addCherry() {
    var emptyCells = getEmptyCells()
    var idx = getRandomIntInclusive(0, emptyCells.length)
    var currEmptyCell = emptyCells[idx]
    gBoard[currEmptyCell.i][currEmptyCell.j] = CHERRY
    renderCell(currEmptyCell, CHERRY)
}