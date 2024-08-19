const gameBoard = (function () {
    let boardArr = new Array(9).fill(0);
    let moves = 0;

    const getBoard = () => boardArr;
    const value = (i, j) => boardArr[i * 3 + j];

    const makeMove = (index, mark) => {
        if (boardArr[index] === 0) {
            boardArr[index] = mark;
            moves++;
            return true;
        }
        else {
            console.log("alreday taken");
            return false;
        }
    };

    const reset = () => {
        boardArr.fill(0);
    }

    const checkRows = () => {
        for (let i = 0; i < 9; i += 3) {
            if (boardArr[i] && boardArr[i] === boardArr[i + 1] && boardArr[i] === boardArr[i + 2]) {
                return true;
            }
        }
        return false;
    };

    const checkCols = () => {
        for (let i = 0; i < 3; i++) {
            if (boardArr[i] && boardArr[i] === boardArr[i + 3] && boardArr[i] === boardArr[i + 6]) {
                return true;
            }
        }
        return false;
    };

    const checkDiagonals = () => {
        if ((boardArr[0] && boardArr[0] === boardArr[4] && boardArr[0] === boardArr[8]) || (boardArr[2] && boardArr[2] === boardArr[4] && boardArr[2] === boardArr[6])) {
            return true;
        }
        return false;
    };

    const checkWin = () => {
        return checkRows() || checkCols() || checkDiagonals();
    }

    const checkDraw = () => {
        if (moves >= 9 && !checkWin()) {
            return true;
        }
        return false;
    }
    const printBoard = () => {
        for (let i = 0; i < 3; i++) {
            let row = "|";
            for (let j = 0; j < 3; j++) {
                let val = value(i, j);
                row += val + "|";
            }
            console.log(row);
        }
    }

    return {
        getBoard, printBoard, makeMove, checkWin, checkDraw, reset
    };
})();


function player(playerName) {
    const name = playerName;
    let score = 0;

    const getName = () => name;
    const increaseScore = () => score++;
    const makeMove = () => {
        let index=Math.floor(Math.random()*10);
       return gameBoard.makeMove(index, name);
    }

    return {
        getName, increaseScore, makeMove
    };

}

const game = (function () {
    const player1 = player("X");
    const player2 = player("O");
    let rounds=0;
    //let index;
    const play = () => {
        while (true) {
            if (gameBoard.checkDraw()){
                console.log("game drawn");
                break;
            }

            if (gameBoard.checkWin){
                console.log()
            }
            if (rounds % 2 === 0) {
                console.log("Player 1's Turn");
               // index=prompt("Player 1's Turn");
                if (player1.makeMove()){
                    rounds++;
                    gameBoard.printBoard();
                }
                if (gameBoard.checkWin()){
                    console.log("Player 1 won");
                    break;
                }
            }
            else {
                console.log("Player 2's turn");
                //index=prompt("Player 2's turn");
                if (player2.makeMove()){
                    rounds++;
                    gameBoard.printBoard();
                }
                if (gameBoard.checkWin()){
                    console.log("Player 2 won");
                    break;
                }
            }
        }
    }
    return {
        play
    }
})();



game.play();

