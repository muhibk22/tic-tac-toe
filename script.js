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
            console.log("Already taken");
            return false;
        }
    };

    const reset = () => {
        boardArr.fill(0);
        moves=0;
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


function player(playerName, _mark) {
    let name = playerName;
    let score = 0;
    const mark=_mark;
    function setName(newName) {
        name = newName;
    }

    const getMark=()=>mark;
    const getName = () => name;
    const increaseScore = () => score++;
    const makeMove = (index) => {
        return gameBoard.makeMove(index, mark);
    };

    return {
        getName, increaseScore, makeMove, setName, getMark
    };

}

const game = (function () {
    const player1 = player("Player 1", "X");
    const player2 = player("Player 2", "O");
    let rounds = 0;
    let draws = 0;


    const blocks = document.querySelectorAll(".block");
    const play = () => {
        rounds = 0;
        gameBoard.reset();
        blocks.forEach(block => {
            block.textContent = '';
            block.removeEventListener("click", handleMove);
            block.addEventListener("click", handleMove,);
        });
    };

    const handleMove = (event) => {
        let index = event.target.dataset.index;
        let currentPlayer = rounds % 2 === 0 ? player1 : player2;

        if (currentPlayer.makeMove(index)) {
            const target = document.querySelector(`[data-index='${index}']`);
            target.textContent = currentPlayer.getMark();
            rounds++;
            if (gameBoard.checkWin()) {
                console.log(`${currentPlayer.getName()} won!`);
                currentPlayer.increaseScore();
                setTimeout(play, 1000);
            }
            else if (gameBoard.checkDraw()) {
                console.log("It's a draw!");
                draws++;
                setTimeout(play, 1000);
            }
        }

    };


    return {
        play
    };


})();


game.play();

