function CreateMap(width, height) {
    let map = [];
    for (let row = 0; row < height; row++) {
        map[row] = [];
        for (let col = 0; col < width; col++) {
            map[row][col] = 0;
        }
    }
    return map;
}

function drawMap(map) {
    let result = '<table>';
    for (let row = 0; row < map.length; row++){
        result += '<tr>';
        for (let col = 0; col < map[row].length; col++) {
            result += '<th onclick = "clickCell('+ row + ',' + col + ')">';
            switch (map[row][col]) {
                case 0:
                    break;
                case 1:
                    result += '<span style="color:black">X</span>';
                    break;
                case 2:
                    result += '<span style="color:red">O</span>';
                    break;
            }
            result += '</th>';
        }
        result += '</tr>';
    }
    document.getElementById('caro').innerHTML = result;
}
let size = 20;
let board = CreateMap(size,size);
drawMap(board);

let turnPlay = 1;
function clickCell(row,col) {
    if (board[row][col] !== 0 && turnPlay === 3) {
        return;
    }
    board[row][col] = turnPlay;
    drawMap(board);
    if (checkWin(row, col, turnPlay)){
        turnPlay = 3;
        return;
    }
    switch (turnPlay) {
        case 1:
            turnPlay = 2;
            break;
        case 2:
            turnPlay = 1;
            break;
    }
}


function alertResult(turn) {
    switch (turn) {
        case 1:
            alert('X win');
            break;
        case 2:
            alert('O win');
            break;
    }
    return true;
}

function checkWin(row, col, turn) {
    let count = 1;
    for (let i = col - 1; i >= 0; i--) {
        if (board[row][i] !== turn) {
            break;
        }
        count ++;
    }
    for (let i = col + 1; i < board[0].length; i++) {
        if (board[row][i] !== turn) {
            break;
        }
        count++;
    }
    if ((count >= 5) && alertResult(turn)){
        return true;
    }

    count = 1;
    for (let i = row - 1; i >= 0; i--) {
        if (board[i][col] !== turn) {
            break;
        }
        count ++;
    }
    for (let i = row + 1; i < board[0].length; i++) {
        if (board[i][col] !== turn) {
            break;
        }
        count++;
    }
    if ((count >= 5) && alertResult(turn)){
        return true;
    }

    count = 1;
    let max = Math.max(board.length, board[0].length)*2;
    for (let i = 1; i < max; i++) {
        if (row - i < 0 || col + i >= board[0].length) {
            break;
        }
        if (board[row - i][col + i] !== turn) {
            break;
        }
        count++;
    }
    for (let i = 1; i < max; i++) {
        if (row + i > board.length || col - i < 0) {
            break;
        }
        if (board[row + i][col - i] !== turn) {
            break;
        }
        count ++;
    }
    if (count >=5 && alertResult(turn)){
        return true;
    }

    count = 1;
    for (let i = 1; i < max; i++) {
        if (row + i > board.length || col + i >= board[0].length) {
            break;
        }
        if (board[row + i][col + i] !== turn) {
            break;
        }
        count ++;
    }
    for (let i = 1; i < max; i++) {
        if (row - i < 0 || col - i < 0) {
            break;
        }
        if (board[row - i][col - i] !== turn) {
            break;
        }
        count ++;
    }
    if (count >=5 && alertResult(turn)){
        return true;
    }
}