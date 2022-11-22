'use strict'

const PACMAN = '🥠'
var gPacman
var gGhostInterval
function createPacman(board) {
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false,
        deg: 0
    }
    gBoard[gPacman.location.i][gPacman.location.j] = getPacmanHTML(gPacman)
}

function movePacman(ev) {
    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return

    if (gFoodCount === 0) {
        setTimeout(() => {
            checkWin()
        }, 10);
    }

    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return

        gPacman.isSuper = true
        ghostToFood()

        setTimeout(() => {
            gPacman.isSuper = false
            ghostsTurnGhosts()
        }, 5000)
    }

    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            return gameOver()
        }
        else {
            killGhosts(nextLocation.i, nextLocation.j)
            updateScore(100)
        }
    }


    if (nextCell === FOOD) {
        gFoodCount--
        console.log('gFoodCount', gFoodCount);

        updateScore(1)
    }


    if (nextCell === CHERRY) {
        updateScore(10)
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)


    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    renderCell(nextLocation, getPacmanHTML(gPacman))
}


function getNextLocation(eventKeyboard) {

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            gPacman.deg = 270
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPacman.deg = 0
            break;
        case 'ArrowDown':
            nextLocation.i++
            gPacman.deg = 90
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gPacman.deg = 180
            break;
    }
    return nextLocation
}

function ghostToFood() {
    for (let i = 0; i < gGhosts.length; i++) {
        const currGhost = gGhosts[i];

        currGhost.color = '#38D5F2'
        renderCell(currGhost.location, getGhostHTML(currGhost.color))
    }
}

function killGhosts(i, j) {
    console.log(i, j);
    for (let idx = 0; idx < gGhosts.length; idx++) {
        const currGhost = gGhosts[idx];

        if (currGhost.location.i === i && currGhost.location.j === j) {
            console.log(idx);
            var deadGhost = gGhosts.splice(idx, 1)[0]
            gDeadGhosts.push(deadGhost)
            setTimeout(() => {
                gGhosts.push(...gDeadGhosts)
                gDeadGhosts = []
            }, 5000)

        }

    }

}

function ghostsTurnGhosts() {
    for (let i = 0; i < gGhosts.length; i++) {
        const currGhost = gGhosts[i];
        currGhost.color = getRandomColor()
    }
}

function getPacmanHTML(gPacman) {
    // return `<span class="pacman" style="transform: rotate(${gPacman.deg}deg) ">${PACMAN}</span>`
    return `<span class="pacman"  ><img style="transform: rotate(${gPacman.deg}deg);" src="Pacman_HD.png"></span>`
}
