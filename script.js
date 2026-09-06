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
        board.forEach((row) => {
            row.forEach((cell) => {
                if (cell.getCoord()[0] === mark[0] && cell.getCoord()[1] === cell.getCoord()[1]){
                    return cell;
                }
            })
        })
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

    function checkRows(mark){
        let matchMark;
        board.getBoard().forEach((row) => {
            matchMark = 0;
            row.forEach((cell) => {
                if (cell.readMark() === mark){
                    matchMark++;
                }
            })
            if (matchMark === 3){
                return true;
            }
        })
    }


    function checkColumns(mark){
        for(let i = 0; i < 3; i++){
            if (board.getCellAt([0, i]).readMark() === mark && board.getCellAt([1, i]).readMark() === mark && board.getCellAt([2, i]).readMark() === mark) {
                return true;
            }
        }
    }

}


// board = gameBoard();
// newCell = ''
// arr = [0,2];
// coord = board.getBoard()[0][2].getCoord();
// console.log(coord);
