function gameBoard(){
    const board = [];

    function createGrid(){
        for (let i = 0; i < 3; i++) {
            board.push([]);
            for (let j = 0; j < 3; j++) {
                cell = createCell();
                cell.setCoord(`${i},${j}`);
                board[i].push(cell);
            }
        }
    }
    
    const getBoard = () => board;
    createGrid();
    return { getBoard }
}


function createCell(){
    let mark = "";
    let coord = ""
    const readMark = () => mark;
    const setMark = (m) => {
        mark = m;
    }

    const setCoord = (c) => {
        coord = c
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