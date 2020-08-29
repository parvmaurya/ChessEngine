function minimax(boardPositionString, depth, isMax, alpha, beta){
    if(depth==0){
        var str = [];
        for(let i=0; i<boardPositionString.length; ++i){
            str.push(boardPositionString[i].slice());
        }
        boardPosition = new Board();
        boardPosition.extractPositionFromPositionString(str);
        boardPosition.pieceValueScore();
        return boardPosition.score;
    }
    if(isMax){
        var str1 = [];
        for(let i=0; i<boardPositionString.length; ++i){
            str1.push(boardPositionString[i].slice());
        }
        boardPosition1 = new Board();
        boardPosition1.extractPositionFromPositionString(str1);
        boardPosition1.extractStringFromPosition();
        boardPosition1.updateLegalMoves();
        boardPosition1.isWhiteKingCheckMated();
        boardPosition1.isBlackKingCheckMated();
        boardPosition1.updateIfWhiteKingInCheck();
        boardPosition1.updateIfBlackKingInCheck();
        if(depth==0){
            boardPosition1.pieceValueScore();
            return boardPosition1.score;
        }
        var tempStorageOfPositionInsideMinMax = [];
        for(let i=0; i<boardPosition1.positionInString.length; ++i){
            tempStorageOfPositionInsideMinMax.push(boardPosition1.positionInString[i].slice());
        }
        var bestEval = Number.MIN_SAFE_INTEGER;
        var currentEvaluation;
        lp1:
        for(let k=0; k<boardPosition1.whitePieces.length; ++k){
            for(let l=0; l<boardPosition1.whitePieces[k].legalMoves.length; ++l){
                var fromX1 = boardPosition1.whitePieces[k].matrixPosition.x;
                var fromY1 = boardPosition1.whitePieces[k].matrixPosition.y;
                var toX1 = boardPosition1.whitePieces[k].legalMoves[l][0];
                var toY1 = boardPosition1.whitePieces[k].legalMoves[l][1];
                
                boardPosition1.movePieceFromTo(fromX1, fromY1, toX1, toY1,true);
                boardPosition1.updateLegalMoves();
                boardPosition1.isWhiteKingCheckMated();
                boardPosition1.isBlackKingCheckMated();
                boardPosition1.updateIfWhiteKingInCheck();
                boardPosition1.updateIfBlackKingInCheck();
                boardPosition1.extractStringFromPosition();
                var sst = [];
                for(let i=0; i<boardPosition1.positionInString.length; ++i){
                    sst.push(boardPosition1.positionInString[i].slice());
                }
                //evaluate the position
                if(depth-1 ==0){
                    boardPosition1.pieceValueScore();
                    currentEvaluation = boardPosition1.score;
                }
                else{
                    console.log("did we come here");
                    currentEvaluation = minimax(sst, depth-1, !isMax, alpha, beta);
                }
                //undo the move
                boardPosition1.extractPositionFromPositionString(tempStorageOfPositionInsideMinMax);
                boardPosition1.updateLegalMoves();
                boardPosition1.isWhiteKingCheckMated();
                boardPosition1.isBlackKingCheckMated();
                boardPosition1.updateIfWhiteKingInCheck();
                boardPosition1.updateIfBlackKingInCheck();
                boardPosition1.extractStringFromPosition();
                bestEval = max(bestEval, currentEvaluation);
                alpha = max(alpha, bestEval);
                if(beta <= alpha){
                    console.log("reached here");
                    return bestEval;
                }
            }
        }
        return bestEval;
    }
    else{
        var str2 = [];
        for(let i=0; i<boardPositionString.length; ++i){
            str2.push(boardPositionString[i].slice());
        }
        boardPosition2 = new Board();
        boardPosition2.extractPositionFromPositionString(str2);
        boardPosition2.extractStringFromPosition();
        boardPosition2.updateLegalMoves();
        boardPosition2.isWhiteKingCheckMated();
        boardPosition2.isBlackKingCheckMated();
        boardPosition2.updateIfWhiteKingInCheck();
        boardPosition2.updateIfBlackKingInCheck();
        if(depth==0){
            boardPosition1.pieceValueScore();
            return boardPosition1.score;
        }
        var tempStorageOfPositionInsideMinMax = [];
        for(let i=0; i<boardPosition2.positionInString.length; ++i){
            tempStorageOfPositionInsideMinMax.push(boardPosition2.positionInString[i].slice());
        }
        var bestEval = Number.MAX_SAFE_INTEGER;
        var currentEvaluation;
        lp2:
        for(let k=0; k<boardPosition2.whitePieces.length; ++k){
            for(let l=0; l<boardPosition2.whitePieces[k].legalMoves.length; ++l){
                var fromX1 = boardPosition2.whitePieces[k].matrixPosition.x;
                var fromY1 = boardPosition2.whitePieces[k].matrixPosition.y;
                var toX1 = boardPosition2.whitePieces[k].legalMoves[l][0];
                var toY1 = boardPosition2.whitePieces[k].legalMoves[l][1];
                
                boardPosition2.movePieceFromTo(fromX1, fromY1, toX1, toY1,true);
                boardPosition2.updateLegalMoves();
                boardPosition2.isWhiteKingCheckMated();
                boardPosition2.isBlackKingCheckMated();
                boardPosition2.updateIfWhiteKingInCheck();
                boardPosition2.updateIfBlackKingInCheck();
                boardPosition2.extractStringFromPosition();
                var sst = [];
                for(let i=0; i<boardPosition2.positionInString.length; ++i){
                    sst.push(boardPosition2.positionInString[i].slice());
                }
                //evaluate the position
                currentEvaluation = minimax(sst, depth-1, !isMax, alpha, beta);
                //undo the move
                boardPosition2.extractPositionFromPositionString(tempStorageOfPositionInsideMinMax);
                boardPosition2.updateLegalMoves();
                boardPosition2.isWhiteKingCheckMated();
                boardPosition2.isBlackKingCheckMated();
                boardPosition2.updateIfWhiteKingInCheck();
                boardPosition2.updateIfBlackKingInCheck();
                if(currentEvaluation<bestEval){
                    bestEval = currentEvaluation;
                }
                beta = min(bestEval, beta);
                
                if(beta<=alpha){
                    console.log("reached here");
                    return bestEval;
                }
            }
        }
        return bestEval;
    }
}

function computerMakeMove(position, isItWhiteToMove){
    position.extractStringFromPosition();
    position.extractPositionFromPositionString(position.positionInString);
    position.updateLegalMoves();
    position.isWhiteKingCheckMated();
    position.isBlackKingCheckMated();
    position.updateIfWhiteKingInCheck();
    position.updateIfBlackKingInCheck();
    var identityOfBestMoveX;
    var identityOfBestMoveY;
    var bestValue = Number.MAX_SAFE_INTEGER;
    var val;
    var tempStorageOfPosition = [];
    var st = [];
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
            
            position.extractStringFromPosition();
            st = [];
            for(let i=0; i<position.positionInString.length; ++i){
                st.push(position.positionInString[i].slice());
            }
            //check the value
            val = minimax(st, 0, true, -100000 , 100000);
            console.log(val);
            //undo the move
            
            position.extractPositionFromPositionString(tempStorageOfPosition);
            position.updateLegalMoves();
            position.isWhiteKingCheckMated();
            position.isBlackKingCheckMated();
            position.updateIfWhiteKingInCheck();
            position.updateIfBlackKingInCheck();

            position.extractStringFromPosition();
            if(val<bestValue){
                bestValue = val;
                identityOfBestMoveX = i;
                identityOfBestMoveY = j;
            }
            if(val==bestValue && Math.random()<0.1){
                identityOfBestMoveX = i;
                identityOfBestMoveY = j;
            }
        }
    }

    position.extractPositionFromPositionString(tempStorageOfPosition);
    position.updateLegalMoves();
    position.isWhiteKingCheckMated();
    position.isBlackKingCheckMated();
    position.updateIfWhiteKingInCheck();
    position.updateIfBlackKingInCheck();
    position.movePieceFromTo(position.blackPieces[identityOfBestMoveX].matrixPosition.x, 
        position.blackPieces[identityOfBestMoveX].matrixPosition.y,
        position.blackPieces[identityOfBestMoveX].legalMoves[identityOfBestMoveY][0], 
        position.blackPieces[identityOfBestMoveX].legalMoves[identityOfBestMoveY][1],false);

}
