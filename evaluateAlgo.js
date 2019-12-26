function computerMakeMove(position, isItWhiteToMove){
    const clone = position;
    var bPiece = clone.blackPieces;
    var wPiece = clone.whitePieces;
    isItWhiteToMove = false;
    for(let i=0; i<=bPiece.length; ++i){
        if(bPiece[i].legalMoves.length!=0){
            var mv = Math.floor(Math.random()*bPiece[i].legalMoves.length);
            position.movePieceFromTo(bPiece[i].matrixPosition.x, bPiece[i].matrixPosition.y,
                bPiece[i].legalMoves[mv][0], bPiece[i].legalMoves[mv][1]);
                break;
        }
    }   
}
