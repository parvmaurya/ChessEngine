function minimax(boardPosition, depth, isMax){
    if(depth==0){
        boardPosition.pieceValueScore();
        return boardPosition.score;
    }
    if(isMax){
        var whitePiecesTemp = [];
        for(let i=0; i<boardPosition.whitePieces.length; ++i){
            pc = Object.assign(Object.create(boardPosition.whitePieces[i]), boardPosition.whitePieces[i]);
            whitePiecesTemp.push(pc);
        }

        var blackPiecesTemp = [];
        for(let i=0; i<boardPosition.blackPieces.length; ++i){
            pc = Object.assign(Object.create(boardPosition.blackPieces[i]), boardPosition.blackPieces[i]);
            blackPiecesTemp.push(pc);
        }
        var bestEval = Number.MIN_SAFE_INTEGER;
        var currentEvaluation;
        for(let k=0; k<boardPosition.whitePieces.length; ++k){
            for(let l=0; l<boardPosition.whitePieces[k].legalMoves.length; ++l){
                var fromX1 = boardPosition.whitePieces[k].matrixPosition.x;
                var fromY1 = boardPosition.whitePieces[k].matrixPosition.y;
                var toX1 = boardPosition.whitePieces[k].legalMoves[l][0];
                var toY1 = boardPosition.whitePieces[k].legalMoves[l][1];
                
                boardPosition.movePieceFromTo(fromX1, fromY1, toX1, toY1,true);
                boardPosition.updateLegalMoves();
                boardPosition.isWhiteKingCheckMated();
                boardPosition.isBlackKingCheckMated();
                boardPosition.updateIfWhiteKingInCheck();
                boardPosition.updateIfBlackKingInCheck();

                var currentEvaluation = minimax(boardPosition, depth-1, !isMax);
                // console.log("--------------");
                // console.log(boardPosition);

                // console.log(currentEvaluation);
                // console.log("--------------");
                boardPosition.blackPieces = [];
                boardPosition.whitePieces = [];

                for(let i=0; i<whitePiecesTemp.length; ++i){
                    pc = Object.assign(Object.create(whitePiecesTemp[i]), whitePiecesTemp[i]);
                    boardPosition.whitePieces.push(pc);
                }

                for(let i=0; i<blackPiecesTemp.length; ++i){
                    pc = Object.assign(Object.create(blackPiecesTemp[i]), blackPiecesTemp[i]);
                    boardPosition.blackPieces.push(pc);
                }
                if(currentEvaluation>bestEval){
                    bestEval = currentEvaluation;
                }
            }
        }
        return bestEval;
    }
    else{
        breakpoint;
    }
}

function computerMakeMove(position, isItWhiteToMove){
    position.extractStringFromPosition();
    console.log(position);
    console.log(position.positionInString);
    position.extractPositionFromPositionString(position.positionInString);
    console.log(position);
    position.updateLegalMoves();
    position.isWhiteKingCheckMated();
    position.isBlackKingCheckMated();
    position.updateIfWhiteKingInCheck();
    position.updateIfBlackKingInCheck();
    position.isWhiteKingCheckMated();
    position.isBlackKingCheckMated();
    var identityOfBestMoveX;
    var identityOfBestMoveY;
    var bestValue = Number.MAX_SAFE_INTEGER;
    var val;

    var tempStorageOfPosition = [];
    for(let i=0; i<position.positionInString.length; ++i){
        tempStorageOfPosition.push(position.positionInString[i].slice());
    }
    
    for(let i=0; i<position.blackPieces.length; ++i){
        for(let j=0; j<position.blackPieces[i].legalMoves.length; ++j){
            //make the move
            var fromX = position.blackPieces[i].matrixPosition.x;
            var fromY = position.blackPieces[i].matrixPosition.y;
            var toX = position.blackPieces[i].legalMoves[j][0];
            var toY = position.blackPieces[i].legalMoves[j][1];
            position.movePieceFromTo(fromX, fromY, toX, toY, false);
            position.updateLegalMoves();
            position.isWhiteKingCheckMated();
            position.isBlackKingCheckMated();
            position.updateIfWhiteKingInCheck();
            position.updateIfBlackKingInCheck();
            position.isWhiteKingCheckMated();
            position.isBlackKingCheckMated();
            

            //check the value
            val = minimax(position, 0, true);
            console.log(val);
            //undo the move
            
            position.extractPositionFromPositionString(tempStorageOfPosition);
            position.updateLegalMoves();
            position.isWhiteKingCheckMated();
            position.isBlackKingCheckMated();
            position.updateIfWhiteKingInCheck();
            position.updateIfBlackKingInCheck();
            position.isWhiteKingCheckMated();
            position.isBlackKingCheckMated();
            // console.log(position.blackPieces);
            // console.log(position.whitePieces);

            if(val<bestValue){
                bestValue = val;
                identityOfBestMoveX = i;
                identityOfBestMoveY = j;
            }
            
        }
    }
    // console.log(blackPiecesTemp);
    // console.log(position.positionInString);
    position.extractPositionFromPositionString(tempStorageOfPosition);
    position.updateLegalMoves();
    position.isWhiteKingCheckMated();
    position.isBlackKingCheckMated();
    position.updateIfWhiteKingInCheck();
    position.updateIfBlackKingInCheck();
    position.isWhiteKingCheckMated();
    position.isBlackKingCheckMated();
    // console.log(position.positionInString);
    // console.log(position.whitePieces);
    // console.log(position.blackPieces);
    // console.log(position);
    console.log(position.blackPieces[identityOfBestMoveX].matrixPosition.x);
    console.log(position.blackPieces[identityOfBestMoveX].matrixPosition.y);
    console.log(position.blackPieces[identityOfBestMoveX].legalMoves[identityOfBestMoveY][0]);
    console.log(position.blackPieces[identityOfBestMoveX].legalMoves[identityOfBestMoveY][1]);
    position.movePieceFromTo(position.blackPieces[identityOfBestMoveX].matrixPosition.x, 
        position.blackPieces[identityOfBestMoveX].matrixPosition.y,
        position.blackPieces[identityOfBestMoveX].legalMoves[identityOfBestMoveY][0], 
        position.blackPieces[identityOfBestMoveX].legalMoves[identityOfBestMoveY][1],false);
    // console.log(position);
    // position.show();
    // breakpoint;
}
