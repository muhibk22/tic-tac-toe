const gameBoard = (function () {
    let boardArr = new Array(9).fill(0);

    const getBoard = () => boardArr;
    const value = (i, j) => boardArr[i * 3 + j];

    const makeMove = (index, mark) => {
        if (boardArr[index] === 0) {
            boardArr[index] = mark;
        }
        else {
            console.log("alreday taken");
        }
    };

    const checkRows = () => {
        for (let i = 0; i < 9; i += 3) {
            if (boardArr[i] && boardArr[i] === boardArr[i + 1] && boardArr[i] === boardArr[i + 2]) {
                return true;
            }
        }
        return false;
    };

    const checkCols = () => {
        for (let i=0; i<3; i++){
            if (boardArr[i] && boardArr[i]===boardArr[i+3] && boardArr[i]===boardArr[i+6]){
                return true;
            }
        }
        return false;
    };

    const checkDiagonals=()=>{
        if ((boardArr[0] && boardArr[0]===boardArr[4] && boardArr[0]===boardArr[8]) || (boardArr[2] && boardArr[2]===boardArr[4] && boardArr[2]===boardArr[6])){
            return true;
        }
        return false;
    };

    const checkWin = ()=>{
        return checkRows() || checkCols() || checkDiagonals();
    }

    const printBoard = () => {
        for (let i = 0; i < 3; i++) {
            let row = "|";
            for (let j = 0; j < 3; j++) {
                let val = value(i, j);
                row += (val === 0 ? " " : (val === 1 ? "X" : "O")) + "|";
            }
            console.log(row);
        }
    }

    return {
        getBoard, printBoard, makeMove, checkWin
    };
})();


function player(playerName) {
    const name = playerName;

}

gameBoard.makeMove(1, 1);
gameBoard.makeMove(0, 1);
console.log(gameBoard.checkWin());
gameBoard.makeMove(2, 1);
console.log(gameBoard.checkWin());

