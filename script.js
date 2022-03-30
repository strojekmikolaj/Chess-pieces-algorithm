let currentColor = 'white';
const rulesList = document.querySelector('.project-info');
let position = {
    a3: 'wP',
    b3: 'wP',
    c3: 'wP',
    d3: 'wP',
    e3: 'wP',
    f3: 'wP',
    g3: 'wP',
    h3: 'wP',
    d1: 'wQ',
    e1: 'wK',
    a6: 'bP',
    b6: 'bP',
    c6: 'bP',
    d6: 'bP',
    e6: 'bP',
    f6: 'bP',
    g6: 'bP',
    h6: 'bP',
    e8: 'bQ',
    d8: 'bK',
}

const onDragStart = (source, piece, figurePostion, orientation) => {
    if(piece[0] !== currentColor[0]){
        return false;
    }
    position = board.position();
}

const returnKingArray = (piece) => {
    let kingArray = [];
   
    if(String.fromCharCode(piece.charCodeAt(0) + 1) < 'i'){
        kingArray.push(String.fromCharCode(piece.charCodeAt(0) + 1) + piece[1]);
    }
    if(parseInt(piece[1]) + 1 < 9){
        kingArray.push(piece[0] + (parseInt(piece[1]) + 1));
    }
    if(String.fromCharCode(piece.charCodeAt(0) - 1) > 'a'){
        kingArray.push(String.fromCharCode(piece.charCodeAt(0) - 1) + piece[1]);
    }
    if(parseInt(piece[1]) - 1 > 0){
        kingArray.push(piece[0] + (parseInt(piece[1]) - 1));
    }

    return kingArray;
}

const checkKingMove = (piece, square, positionFigure) => {
    const kingArray = returnKingArray(piece);

    return kingArray.indexOf(square)!= -1 && (position[square] == undefined || position[square] && position[square][0] != currentColor[0])
}


const checkQueenMove = (piece, square, positionFigure) => {
    let queenArray = returnKingArray(piece);

    if(String.fromCharCode(piece.charCodeAt(0) - 1) > 'a' && parseInt(piece[1]) + 1 < 9){
        queenArray.push(String.fromCharCode(piece.charCodeAt(0) - 1) + (parseInt(piece[1]) + 1));
    }
    if(String.fromCharCode(piece.charCodeAt(0) - 1) > 'a' && parseInt(piece[1]) - 1 > 0){
        queenArray.push(String.fromCharCode(piece.charCodeAt(0) - 1) + (parseInt(piece[1]) - 1));
    }
    if(String.fromCharCode(piece.charCodeAt(0) + 1) < 'i' && parseInt(piece[1]) + 1 < 9){
        queenArray.push(String.fromCharCode(piece.charCodeAt(0) + 1) + (parseInt(piece[1]) + 1));
    }
    if(String.fromCharCode(piece.charCodeAt(0) + 1) < 'i' && parseInt(piece[1]) - 1 > 0){
        queenArray.push(String.fromCharCode(piece.charCodeAt(0) + 1) + (parseInt(piece[1]) - 1));
    }
    return queenArray.indexOf(square) != -1 && (position[square] == undefined || position[square] && position[square][0] != currentColor[0]);

}
const checkPownMove = (piece, square, positionFigure) => {
    if(square[0] == piece[0] && !position[square] && ((positionFigure == 'wP' && square[1] == parseInt(piece[1]) + 1) || (positionFigure == 'bP' &&  square[1] == parseInt(piece[1]) - 1))){   
        console.log(square[0], piece[0])
        return true;   
    }

        const color = currentColor[0] == 'w' ? 'b' : 'w'; 
        const pieceNumber = currentColor[0] == 'w' ? parseInt(piece[1]) + 1 : parseInt(piece[1]) - 1;


        if(square[0] === String.fromCharCode(piece[0].charCodeAt(0) + 1) && square[1] == pieceNumber && position[square] && position[square][0] == color ) {    
            return true;
        }
        else if(square[0] == String.fromCharCode(piece[0].charCodeAt(0) - 1) && square[1] == pieceNumber && position[square] && position[square][0] == color){
            return true;
        }
    


    return false;
}

const onSnapEnd = (piece, square, positionFigure, orientation) => {
    let isLegalMove = false;

    if(positionFigure[1] == 'P'){
        isLegalMove = checkPownMove(piece, square, positionFigure);
        if(square[1] == '8' || square[1] == '1'){
            position[square] = currentColor[0] + 'Q';
            delete position[piece];
            board.position(position);
        }
    }
    
    if(positionFigure[1] == 'K'){
        isLegalMove = checkKingMove(piece, square, positionFigure);
    }

    if(positionFigure[1] == 'Q'){
        isLegalMove = checkQueenMove(piece, square, positionFigure);
    }

    if(!isLegalMove){
        board.position(position);
        return;
    }

    if(currentColor == 'white'){
        currentColor = 'black';
    }
    else{
        currentColor = 'white';
    }
}

document.querySelector('#apply').addEventListener('click', () => {
    document.body.style.overflow = "auto"
    document.querySelector('.page-info').style.display = 'none';
})

const rulesBttn = document.querySelector('#rules');
rulesBttn.addEventListener('click', () => {
    console.log(rulesList);
    if(rulesList.style.display == 'none') {
        rulesList.style.display = 'block';
        //rulesBttn.textContent = 'Zwiń!';
        rulesBttn.style.background = 'white';
        rulesBttn.style.color = 'black';

    }
    else {
        rulesList.style.display = 'none';
        //rulesBttn.textContent = 'Reguły';
        rulesBttn.style = 'null';
    }
})

const config = {
    onDragStart: onDragStart,
    onSnapEnd: onSnapEnd,
    position: position,
    draggable: true
}

const board = Chessboard('board', config);
