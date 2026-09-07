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
    const editUsername = (name) => {
        username = name;
    }

    const getUsername = () => username;

    return { editUsername, getUsername };
}

function game(){
    board = gameBoard();
    player1 = createPlayer();
    player2 = createPlayer();

    const checkRows = (mark) => {
        for(let i = 0; i < 2; i++){
            for(let j = 0; j < 2; j++){
                if (board.getCellAt([i, 0]).readMark() === mark && board.getCellAt([i,1]).readMark() === mark && board.getCellAt([i,2]).readMark() === mark){
                    return true;
                }
            }
        }
    }


    const checkColumns = (mark) => {
        for(let i = 0; i < 3; i++){
            if (board.getCellAt([0, i]).readMark() === mark && board.getCellAt([1, i]).readMark() === mark && board.getCellAt([2, i]).readMark() === mark) {
                return true;
            }
        }
    }

    return { checkRows, checkColumns };

}


board = gameBoard();
// cell1 = board.getCellAt([0,0]);
// cell2 = board.getCellAt([0,1]);
// cell3 = board.getCellAt([0,2]);

// cell1.setMark("O");
// cell2.setMark("O");
// cell3.setMark("x");

// function checkColumns(mark) {
//     for (let i = 0; i < 3; i++) {
//         if (board.getCellAt([0, i]).readMark() === mark && board.getCellAt([1, i]).readMark() === mark && board.getCellAt([2, i]).readMark() === mark) {
//             return true;
//         }
//     }
// }


// function checkRows(mark) {
//     for (let i = 0; i < 2; i++) {
//         for (let j = 0; j < 2; j++) {
//             if (board.getCellAt([i, 0]).readMark() === mark && board.getCellAt([i, 1]).readMark() === mark && board.getCellAt([i, 2]).readMark() === mark) {
//                 return true;
//             }
//         }
//     }
// }


// if(checkRows("O")){
//     console.log("found match");
// } else{
//     console.log("no match found");
// }