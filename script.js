function gameBoard(){
    const board = [];

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
    const getBoard = () => board;

    const getCellAt = (coord) => {
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
    return { getBoard, getCellAt };
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

function displayController(){
    board = gameBoard();

    function allCellsMarked(){
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                cell = board.getCellAt([i,j]);
                if(cell.readMark() === ""){ // condition for checking empty cell
                    return false;
                } else{
                    continue;
                }
            }
        }
        return true;
    }

    const checkRows = (mark) => {
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if (board.getCellAt([i, 0]).readMark() === mark && board.getCellAt([i,1]).readMark() === mark && board.getCellAt([i,2]).readMark() === mark){
                    return true;
                }
            }
        }
        return false;
    }


    const checkColumns = (mark) => {
        for(let i = 0; i < 3; i++){
            if (board.getCellAt([0, i]).readMark() === mark && board.getCellAt([1, i]).readMark() === mark && board.getCellAt([2, i]).readMark() === mark) {
                return true;
            }
        }
        return false;
    }

    const checkForTie = () => {
        if ( allCellsMarked() && !checkColumns() && !checkColumns() ){
            return true;
        } else{
            return false;
        }
    }

    const registerMove = (coord, playerObj) => {
        let cell = board.getCellAt(coord);
        cell.setMark(playerObj.mark);
    }

    return { checkRows, checkColumns, registerMove, checkForTie };
}

function UserInput(playerObj1, playerObj2){
    const startGameBtn = document.querySelector("#submit");
    const inputContainer = document.querySelector("#input-container");
    const form = document.querySelector("#form");
    const playerOneName = form.elements["player1-name"];
    const playerTwoName = form.elements["player2-name"];

    startGameBtn.addEventListener("click", (e) => {
        e.preventDefault();
        playerObj1.setUsername(playerOneName.value);
        playerObj2.setUsername(playerTwoName.value);
        playerObj1.setPlayerMark("X");
        playerObj2.setPlayerMark("O");
        inputContainer.remove();
    });
}
