function gameBoard(){
    const board = [];
    const lastModifiedCells = [];

    function createGrid(){
        for (let i = 0; i < 3; i++) {
            board.push([]);
            for (let j = 0; j < 3; j++) {
                cell = createCell();
                cell.setCoord(i);
                cell.setCoord(j);
                board[i].push(cell);
            }
        }
    }
    createGrid();
    // const getBoard = () => board;

    function getCellAt(coord) {
        let desiredCell;
        board.forEach((row) => {
            row.forEach((cell) => {
                if (cell.getCoord()[0] === coord[0] && cell.getCoord()[1] === coord[1]){
                    desiredCell = cell;
                }
            })
        })
        return desiredCell;
    }

    function resetLastModifiedCellsTimeline(){
        while (lastModifiedCells.length > 0) {
            lastModifiedCells.pop();
        }
    }

    const spotTaken = (coord) => {
        cell = getCellAt(coord);

        for(let i = 0; i < lastModifiedCells.length; i++){
            if (lastModifiedCells[i] === cell){
                return true;
            }
        }
        return false;
    }

    const previousModifiedCellMark = () => {
        if(lastModifiedCells.length === 0){
            return "X";
        }

        if(lastModifiedCells.length === 1){
            return "O";
        }

        return lastModifiedCells[lastModifiedCells.length - 2].readMark();
    }

    const allCellsMarked = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                cell = getCellAt([i, j]);
                if (cell.readMark() === "") { // condition for checking empty cell
                    return false;
                } else {
                    continue;
                }
            }
        }
        return true;
    }

    const reset = () => {
        board.forEach((cells) => {
            cells.forEach((cell) => {
                if (cell.readMark() != ""){
                    cell.setMark("");
                }
            })
        })

        resetLastModifiedCellsTimeline();
    }

    const checkRows = (mark) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (getCellAt([i, 0]).readMark() === mark && getCellAt([i, 1]).readMark() === mark && getCellAt([i, 2]).readMark() === mark) {
                    return true;
                }
            }
        }
        return false;
    }

    const checkColumns = (mark) => {
        for (let i = 0; i < 3; i++) {
            if (getCellAt([0, i]).readMark() === mark && getCellAt([1, i]).readMark() === mark && getCellAt([2, i]).readMark() === mark) {
                return true;
            }
        }
        return false;
    }

    const checkDiagonals = (mark) => {
        if(getCellAt([0,0]).readMark() === mark && getCellAt([1,1]).readMark() === mark && getCellAt([2,2]).readMark() === mark){
            return true;
        }

        if (getCellAt([0, 2]).readMark() === mark && getCellAt([1, 1]).readMark() === mark && getCellAt([2, 0]).readMark() === mark) {
            return true;
        }

        return false;
    }

    const modifyCellAt = (coord, mark) => {
        cell = getCellAt(coord);
        if(cell.readMark() === ""){
            cell.setMark(mark);
            lastModifiedCells.push(cell);
        } else{
            return "can't modify";
        }
    }


    return { modifyCellAt, checkColumns, checkRows, checkDiagonals, allCellsMarked, previousModifiedCellMark, spotTaken, reset };
}


function createCell(){
    let mark = "";
    let coord = [];
    const readMark = () => mark;
    const setMark = (m) => {
        mark = m;
    }

    const setCoord = (c) => {
        coord.push(c);
    }

    const getCoord = () => coord;

    return { readMark, setMark, getCoord, setCoord };
}


function createPlayer(){
    let username;
    let mark;
    const setUsername = (name) => {
        username = name;
    }

    const getPlayerMark = () => mark;
    
    const setPlayerMark = (m) => {
        mark = m
    }

    const getUsername = () => username;

    return { setUsername, getUsername, getPlayerMark, setPlayerMark };
}


function domController(){
    const board = gameBoard();
    const player1 = createPlayer();
    const player2 = createPlayer();
    const inputContainer = document.querySelector("#input-container");
    const mainContainer = document.querySelector("#main-container");

    function buildGrid(boardContainer) {
        for (let i = 0; i < 3; i++) {
            row = document.createElement("div");
            row.setAttribute("id", "row");
            boardContainer.appendChild(row);
            for (let j = 0; j < 3; j++) {
                let div = document.createElement("div");
                let markPara = document.createElement("p");
                div.setAttribute("class", "cell");
                div.setAttribute("data-coord", `${i},${j}`);
                markPara.setAttribute("class", "mark-para");
                row.appendChild(div);
                div.appendChild(markPara);
            }
        }
    }


    function displayBoard() {
        const boardContainer = document.createElement("div");
        const messageContainer = document.createElement("div");
        const btnContainer = document.createElement("div");
        const childDiv1 = document.createElement("div");
        const playAgainBtn = document.createElement("button");
        let msgPara =  document.createElement("p");
        msgPara.innerHTML = whoseTurn();
        btnContainer.setAttribute("id", "btn-container");
        boardContainer.setAttribute("id", "board-container");
        messageContainer.setAttribute("id", "message");
        playAgainBtn.setAttribute("id", "play-again");
        playAgainBtn.innerHTML = "Play Again";
        // mainContainer = document.querySelector("#main-container");

        childDiv1.appendChild(playAgainBtn);
        btnContainer.appendChild(childDiv1);
        mainContainer.appendChild(messageContainer);
        messageContainer.appendChild(msgPara);
        mainContainer.appendChild(boardContainer);
        mainContainer.appendChild(btnContainer);
        buildGrid(boardContainer);
    }


    const userInput = () => {
        const startGameBtn = document.querySelector("#submit");
        // const inputContainer = document.querySelector("#input-container");
        const form = document.querySelector("#form");
        const playerOneName = form.elements["player1-name"];
        const playerTwoName = form.elements["player2-name"];

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            player1.setUsername(playerOneName.value);
            player2.setUsername(playerTwoName.value);
            player1.setPlayerMark("X");
            player2.setPlayerMark("O");
            inputContainer.remove();
            displayBoard();
            registerMove();
            playAgain();
           
        });
    }

    function registerMove() {
        const cells = document.querySelectorAll(".cell");
        
        cells.forEach((div) => {
            div.addEventListener("click", attachEvent);
        });
    }

    function attachEvent(e){
        console.log(e.currentTarget);
        const cellCoord = [Number(e.currentTarget.dataset.coord[0]), Number(e.currentTarget.dataset.coord[2])];
        if (board.spotTaken(cellCoord) || checkDraw() || checkWinner()){
            return;
        }

        e.currentTarget.firstChild.innerHTML = board.previousModifiedCellMark();
        board.modifyCellAt(cellCoord, board.previousModifiedCellMark());
        displayMessage();
    }

    function whoseTurn(){
        if (board.previousModifiedCellMark() === "X"){
            return `${player1.getUsername()}'s turn...`;
        } else{
            return `${player2.getUsername()}'s turn...`;
        }
    }

    function displayMessage(){
        const para = document.querySelector("#message").firstChild;

        if (checkWinner()){
            para.innerHTML = checkWinner();
            return;
        } 

        if (checkDraw()) {
            para.innerHTML = `Ehhh Draw!!`;
        } else {
            para.innerHTML = whoseTurn();
        }
    }

    function checkWinner(){
        if (board.checkRows("X") || board.checkColumns("X") || board.checkDiagonals("X")){
            return `${player1.getUsername()} WON!! Let's Gooooo BBY...`;
        }

        if (board.checkRows("O") || board.checkColumns("O") || board.checkDiagonals("O")) {
            return `${player2.getUsername()} WON!! Let's Gooooo BBY...`;
        }

        return false
    }

    function checkDraw(){
        if (!checkWinner() && board.allCellsMarked()){
            return true;
        }

        return false;
    }

    function restrictMove(){

    }

    function playAgain(){
        const para = document.querySelector("#message").firstChild;
        const btn = document.querySelector("#play-again");
        btn.addEventListener("click", () => {
            board.reset();
            resetDom();
            para.innerHTML = `${player1.getUsername()}'s turn...`;
        });
    }

    function resetDom(){
       const cells = document.querySelectorAll(".cell");
       cells.forEach((cell) => {
        cell.firstChild.innerHTML = "";
       });
    }

    return { userInput };

}

game = domController();
game.userInput();