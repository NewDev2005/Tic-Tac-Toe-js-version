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
                if (JSON.stringify(cell.getCoord()) === JSON.stringify(coord)){
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

}


// board = gameBoard();
// newCell = ''
// arr = [0,2];
// coord = board.getBoard()[0][2].getCoord();
// console.log(coord);
