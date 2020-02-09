function minimax(boardPosition, depth, isMax){
    return Math.floor(Math.random()*100) +1;
}

function computerMakeMove(position, isItWhiteToMove){
    var identityOfBestMoveX;
    var identityOfBestMoveY;
    var bestValue = 1000;
    var val;
    var pc;

    var whitePiecesTemp = [];
    for(let i=0; i<position.whitePieces.length; ++i){
        pc = Object.assign(Object.create(position.whitePieces[i]), position.whitePieces[i]);
        whitePiecesTemp.push(pc);
    }

    var blackPiecesTemp = [];
    for(let i=0; i<position.blackPieces.length; ++i){
        pc = Object.assign(Object.create(position.blackPieces[i]), position.blackPieces[i]);
        blackPiecesTemp.push(pc);
    }
    // console.log(position.blackPieces.length); 16
    // console.log(blackPiecesTemp.length); 16

    // for(let i=0; i<position.blackPieces.length; ++i){
    //     for(let j=0; j<position.blackPieces[i].legalMoves.length; ++j){
    //         console.log(position.blackPieces[i].legalMoves);
    //     }
    // }

    for(let i=0; i<position.blackPieces.length; ++i){
        for(let j=0; j<position.blackPieces[i].legalMoves.length; ++j){
            // console.log("piece is "+position.blackPieces[i].letter);
            // console.log("length is"+position.blackPieces[i].legalMoves.length);
            //make the move
            var fromX = position.blackPieces[i].matrixPosition.x;
            var fromY = position.blackPieces[i].matrixPosition.y;
            var toX = position.blackPieces[i].legalMoves[j][0];
            var toY = position.blackPieces[i].legalMoves[j][1];
            // console.log(fromX);
            // console.log(fromY);
            // console.log(toX);
            // console.log(toY);
            // console.log("__________");
            // position.movePieceFromTo(fromX, fromY, toX, toY, false);
            //check the value
            val = minimax(position, 1, false);
            //undo the move
            position.blackPieces = blackPiecesTemp;
            position.whitePieces = whitePiecesTemp;

            // position.updateLegalMoves();
            // position.updateIfWhiteKingInCheck();
            // position.updateIfBlackKingInCheck();
            // position.isBlackKingCheckMated();
            if(val<bestValue){
                bestValue = val;
                identityOfBestMoveX = i;
                identityOfBestMoveY = j;
            }
        }
    }
    console.log(blackPiecesTemp);
    position.movePieceFromTo(position.blackPieces[identityOfBestMoveX].matrixPosition.x, 
        position.blackPieces[identityOfBestMoveX].matrixPosition.y,
        position.blackPieces[identityOfBestMoveX].legalMoves[identityOfBestMoveY][0], 
        position.blackPieces[identityOfBestMoveX].legalMoves[identityOfBestMoveY][1]);
}
