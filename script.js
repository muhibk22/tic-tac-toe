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
        moves = 0;
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


function player(playerName, _mark, scoreText) {
    let name = playerName;
    let score = 0;
    const mark = _mark;
    function setName(newName) {
        name = newName;
    }
    const getMark = () => mark;
    const getName = () => name;
    const increaseScore = () => {
        score++;
        scoreText.innerText=score;
    }

    const makeMove = (index) => {
        return gameBoard.makeMove(index, mark);
    };

    return {
        getName, increaseScore, makeMove, setName, getMark
    };

}

const game = (function () {
    const score1 = document.getElementById("player1");
    const score2 = document.getElementById("player2");
    const player1 = player("Player 1", "X", score1);
    const player2 = player("Player 2", "O", score2);
    let rounds = 0;
    let draws = 0;
    const blocks = document.querySelectorAll(".block");
    const restart = document.getElementById("restart");
    const displayMsg = document.getElementById("msg");
    const ties = document.getElementById("ties");
    const play = () => {

        displayMsg.innerText = `${player1.getName()}'s turn!`;
        rounds = 0;
        gameBoard.reset();
        blocks.forEach(block => {
            block.textContent = '';
            block.removeEventListener("click", handleMove);
            block.addEventListener("click", handleMove);
        });
    };
    function start(){
        const playButton=document.getElementById("play");
        const preLoad=document.getElementById("pre-load");
        const postLoad=document.getElementById("post-load");
        const name1=document.getElementById("name1");
        const name2=document.getElementById("name2");
        playButton.addEventListener("click", function(){
            const nameText1=document.getElementById("nameInput1").value;
            const nameText2=document.getElementById("nameInput2").value;
            if (nameText1!==""){
                name1.innerText=nameText1;
                player1.setName(nameText1);
            }
            if (nameText2!==""){
                name2.innerText=nameText2;
                player2.setName(nameText2);
            }
            preLoad.classList.add("display-none");
            postLoad.classList.remove("display-none");
            play();
        });
        
    }

    restart.addEventListener("click", play);

    function updateTurnMsg() {
        displayMsg.innerText = rounds % 2 === 0 ? `${player1.getName()}'s turn!` : `${player2.getName()}'s turn!`;
    }
    const handleMove = (event) => {
        let index = event.target.dataset.index;
        let currentPlayer = rounds % 2 === 0 ? player1 : player2;
        if (currentPlayer.makeMove(index)) {
            const target = document.querySelector(`[data-index='${index}']`);
            target.textContent = currentPlayer.getMark();
            if (rounds%2===0){
                target.classList.remove("player1", "player2");
                target.classList.add("player1");
            }
            else{
                target.classList.remove("player1", "player2");
                target.classList.add("player2");
            }
            rounds++;
            updateTurnMsg();
            if (gameBoard.checkWin()) {
                blocks.forEach(block=>{
                    block.removeEventListener("click", handleMove);
                });
                displayMsg.innerText = (`${currentPlayer.getName()} won the round!`);
                currentPlayer.increaseScore();
                setTimeout(play, 3000);
                
            }
            else if (gameBoard.checkDraw()) {
                blocks.forEach(block=>{
                    block.removeEventListener("click", handleMove);
                });
                draws++;
                ties.innerText = draws;
                displayMsg.innerText = `It's a tie!`;
                setTimeout(play, 3000);
            }
        }

    };


    return {
        start
    };


})();


game.start();

