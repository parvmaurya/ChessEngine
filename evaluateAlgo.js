function minimax(boardPositionString, depth, isMax){
    if(depth==0){
        var str = [];
        for(let i=0; i<boardPositionString.length; ++i){
            str.push(boardPositionString[i].slice());
        }
        boardPosition = new Board();
        boardPosition.extractPositionFromPositionString(str);
        boardPosition.extractStringFromPosition();
        boardPosition.updateLegalMoves();
        boardPosition.isWhiteKingCheckMated();
        boardPosition.isBlackKingCheckMated();
        boardPosition.updateIfWhiteKingInCheck();
        boardPosition.updateIfBlackKingInCheck();
        boardPosition.didBlackWin();
        boardPosition.didWhiteWin();
        boardPosition.pieceValueScore();
        return boardPosition.score;
    }
    if(isMax){
        var str = [];
        for(let i=0; i<boardPositionString.length; ++i){
            str.push(boardPositionString[i].slice());
        }
        boardPosition = new Board();
        boardPosition.extractPositionFromPositionString(str);
        boardPosition.extractStringFromPosition();
        boardPosition.updateLegalMoves();
        boardPosition.isWhiteKingCheckMated();
        boardPosition.isBlackKingCheckMated();
        boardPosition.updateIfWhiteKingInCheck();
        boardPosition.updateIfBlackKingInCheck();
        boardPosition.didBlackWin();
        boardPosition.didWhiteWin();
        var tempStorageOfPositionInsideMinMax = [];
        for(let i=0; i<boardPosition.positionInString.length; ++i){
            tempStorageOfPositionInsideMinMax.push(boardPosition.positionInString[i].slice());
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
                boardPosition.didBlackWin();
                boardPosition.didWhiteWin();
                boardPosition.extractStringFromPosition();
                var sst = [];
                for(let i=0; i<boardPosition.positionInString.length; ++i){
                    sst.push(boardPosition.positionInString[i].slice());
                }
                //evaluate the position
                // console.log(boardPosition);
                currentEvaluation = minimax(sst, depth-1, !isMax);
                //undo the move
                boardPosition.extractPositionFromPositionString(tempStorageOfPositionInsideMinMax);
                boardPosition.updateLegalMoves();
                boardPosition.isWhiteKingCheckMated();
                boardPosition.isBlackKingCheckMated();
                boardPosition.updateIfWhiteKingInCheck();
                boardPosition.updateIfBlackKingInCheck();
                boardPosition.didBlackWin();
                boardPosition.didWhiteWin();
                boardPosition.extractStringFromPosition();
                if(currentEvaluation>bestEval){
                    bestEval = currentEvaluation;
                }
            }
        }
        return bestEval;
    }
    else{
        var str = [];
        for(let i=0; i<boardPositionString.length; ++i){
            str.push(boardPositionString[i].slice());
        }
        boardPosition = new Board();
        boardPosition.extractPositionFromPositionString(str);
        boardPosition.extractStringFromPosition();
        boardPosition.updateLegalMoves();
        boardPosition.isWhiteKingCheckMated();
        boardPosition.isBlackKingCheckMated();
        boardPosition.updateIfWhiteKingInCheck();
        boardPosition.updateIfBlackKingInCheck();
        boardPosition.didBlackWin();
        boardPosition.didWhiteWin();
        var tempStorageOfPositionInsideMinMax = [];
        for(let i=0; i<boardPosition.positionInString.length; ++i){
            tempStorageOfPositionInsideMinMax.push(boardPosition.positionInString[i].slice());
        }
        var bestEval = Number.MAX_SAFE_INTEGER;
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
                boardPosition.didBlackWin();
                boardPosition.didWhiteWin();
                boardPosition.extractStringFromPosition();
                var sst = [];
                for(let i=0; i<boardPosition.positionInString.length; ++i){
                    sst.push(boardPosition.positionInString[i].slice());
                }
                //evaluate the position
                currentEvaluation = minimax(sst, depth-1, !isMax);
                //undo the move
                boardPosition.extractPositionFromPositionString(tempStorageOfPositionInsideMinMax);
                boardPosition.updateLegalMoves();
                boardPosition.isWhiteKingCheckMated();
                boardPosition.isBlackKingCheckMated();
                boardPosition.updateIfWhiteKingInCheck();
                boardPosition.updateIfBlackKingInCheck();
                boardPosition.didBlackWin();
                boardPosition.didWhiteWin();
                if(currentEvaluation<bestEval){
                    bestEval = currentEvaluation;
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
    position.didWhiteWin();
    position.didBlackWin();
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
            position.didBlackWin();
            position.didWhiteWin();
            
            position.extractStringFromPosition();
            st = [];
            for(let i=0; i<position.positionInString.length; ++i){
                st.push(position.positionInString[i].slice());
            }
            //check the value
            val = minimax(st, 1, true);
            // console.log(val);
            //undo the move
            
            position.extractPositionFromPositionString(tempStorageOfPosition);
            position.updateLegalMoves();
            position.isWhiteKingCheckMated();
            position.isBlackKingCheckMated();
            position.updateIfWhiteKingInCheck();
            position.updateIfBlackKingInCheck();
            position.didWhiteWin();
            position.didBlackWin();

            position.extractStringFromPosition();
            if(val<bestValue){
                bestValue = val;
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

    // position.show();
}
