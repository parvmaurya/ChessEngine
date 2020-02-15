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
        var bestEval = -1000;
        var currentEvaluation;
        for(let k=0; k<boardPosition.whitePieces.length; ++k){
            for(let l=0; l<boardPosition.whitePieces[k].legalMoves.length; ++l){
                var fromX1 = boardPosition.whitePieces[k].matrixPosition.x;
                var fromY1 = boardPosition.whitePieces[k].matrixPosition.y;
                var toX1 = boardPosition.whitePieces[k].legalMoves[l][0];
                var toY1 = boardPosition.whitePieces[k].legalMoves[l][1];
                
                boardPosition.movePieceFromTo(fromX1, fromY1, toX1, toY1);
                boardPosition.updateLegalMoves();
                boardPosition.isWhiteKingCheckMated();
                boardPosition.isBlackKingCheckMated();
                boardPosition.updateIfWhiteKingInCheck();
                boardPosition.updateIfBlackKingInCheck();

                var currentEvaluation = minimax(boardPosition, depth-1, !isMax);

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
    for(let i=0; i<position.blackPieces.length; ++i){
        for(let j=0; j<position.blackPieces[i].legalMoves.length; ++j){
            //make the move
            var fromX = position.blackPieces[i].matrixPosition.x;
            var fromY = position.blackPieces[i].matrixPosition.y;
            var toX = position.blackPieces[i].legalMoves[j][0];
            var toY = position.blackPieces[i].legalMoves[j][1];
            position.movePieceFromTo(fromX, fromY, toX, toY, false);
            // position.updateLegalMoves();
            // position.updateIfWhiteKingInCheck();
            // position.updateIfBlackKingInCheck();
            // position.isWhiteKingCheckMated();
            // position.isBlackKingCheckMated();

            //check the value
            val = minimax(position, 0, true);
            
            //undo the move
            
            position.blackPieces = [];
            position.whitePieces = [];

            for(let k=0; k<whitePiecesTemp.length; ++k){
                pc = Object.assign(Object.create(whitePiecesTemp[k]), whitePiecesTemp[k]);
                position.whitePieces.push(pc);
            }

            for(let k=0; k<blackPiecesTemp.length; ++k){
                pc = Object.assign(Object.create(blackPiecesTemp[k]), blackPiecesTemp[k]);
                position.blackPieces.push(pc);
            }

            if(val<bestValue){
                bestValue = val;
                identityOfBestMoveX = i;
                identityOfBestMoveY = j;
            }
            
        }
    }
    // console.log(blackPiecesTemp);
    position.movePieceFromTo(position.blackPieces[identityOfBestMoveX].matrixPosition.x, 
        position.blackPieces[identityOfBestMoveX].matrixPosition.y,
        position.blackPieces[identityOfBestMoveX].legalMoves[identityOfBestMoveY][0], 
        position.blackPieces[identityOfBestMoveX].legalMoves[identityOfBestMoveY][1]);
}
