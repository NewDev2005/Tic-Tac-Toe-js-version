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


    return { modifyCellAt, checkColumns, checkRows, checkDiagonals, allCellsMarked, previousModifiedCellMark, spotTaken };
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
        boardContainer = document.createElement("div");
        boardContainer.setAttribute("id", "board-container");
        // mainContainer = document.querySelector("#main-container");

        mainContainer.appendChild(boardContainer);
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
        if (board.spotTaken([Number(e.currentTarget.dataset.coord[0]), Number(e.currentTarget.dataset.coord[2])])){
            return 
        }

        e.currentTarget.firstChild.innerHTML = board.previousModifiedCellMark();
        board.modifyCellAt([Number(e.currentTarget.dataset.coord[0]), Number(e.currentTarget.dataset.coord[2])], board.previousModifiedCellMark());
    }


    return { userInput };

}

game = domController();
game.userInput();

// board = gameBoard();
// board.modifyCellAt([0,0], "X")
// board.modifyCellAt([1,1], "");
// board.modifyCellAt([2,2], "X");

// if (board.checkDiagonals("X")){
//     console.log("found a match");
// } else {
//     console.log("no match found");
// }
