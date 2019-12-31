var squareHeight = 60;
var test;
var movingPiece = -1;
var currentTurnOfWhite = true;
var isWhiteKingInCheck = false;
var isBlackKingInCheck = false;

function setup() {
  createCanvas(500, 500);
  whiteKing = loadImage('https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png');
  whiteQueen = loadImage('https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png');
  whiteKnight = loadImage('https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png');
  whiteBishop = loadImage('https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png');
  whitePawn = loadImage('https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png');
  whiteRook = loadImage('https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png');

  blackKing = loadImage('https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png');
  blackQueen = loadImage('https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png');
  blackKnight = loadImage('https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png');
  blackBishop = loadImage('https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png');
  blackPawn = loadImage('https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png');
  blackRook = loadImage('https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png');

  test = new Board();
}

function draw() {
  drawshit();
}

function drawshit(){ 
  background(220);
  for(let i=0; i<8; ++i){
    for(let j=0; j<8; ++j){
      if((i+j)%2==0){
        fill(0,130,0);
      }
      else{
        fill(255);
      }
      noStroke();
      rect(i*squareHeight, j*squareHeight, squareHeight, squareHeight);
    }
  }
  test.show();
}

function mouseClicked(){ 
    var tmp;
    //console.log(test.whitePieces[5].legalMoves);
    cellPosOfNowX = floor(mouseX/squareHeight);
    cellPosOfNowY = floor(mouseY/squareHeight);
    test.updateLegalMoves();

    if( test.pieceAt(cellPosOfNowX, cellPosOfNowY) ){
      tmp = test.getPiece(cellPosOfNowX,cellPosOfNowY);
      if(tmp.isWhite){
        movingPiece = test.getPiece(cellPosOfNowX,cellPosOfNowY);
      }
      else{
        positionOfPieceToBeRemovedX = movingPiece.matrixPosition.x;
        positionOfPieceToBeRemovedY = movingPiece.matrixPosition.y;
        isWhiteOfPieceToBeRemoved = movingPiece.isWhite;
        letterOfPieceToBeRemoved = movingPiece.letter;

        
        flag = false;
        for(i=0; i<movingPiece.legalMoves.length; ++i){
          if(cellPosOfNowX == movingPiece.legalMoves[i][0] & cellPosOfNowY == movingPiece.legalMoves[i][1]){
            flag = true;
          }
        }
        if(!flag){
          return;
        }
        
        test.movePieceFromTo(positionOfPieceToBeRemovedX, positionOfPieceToBeRemovedY,
          cellPosOfNowX, cellPosOfNowY, isWhiteOfPieceToBeRemoved);
        
        test.updateIfWhiteKingInCheck();
        test.updateIfBlackKingInCheck();
        test.isBlackKingCheckmated();
        test.isWhiteKingCheckmated();
        //currentTurnOfWhite = !currentTurnOfWhite;
        console.log(test.isBlackKingInCheck);


        test.updateLegalMoves();

        computerMakeMove(test, movingPiece.isWhite);
        test.updateIfWhiteKingInCheck();
        test.updateIfBlackKingInCheck();
        test.isBlackKingCheckmated();
        test.isWhiteKingCheckmated();

        console.log(test.isBlackKingInCheck);

        //currentTurnOfWhite = !currentTurnOfWhite;
      }
    }
    else{
      if(movingPiece!=-1){
        positionOfPieceToBeRemovedX = movingPiece.matrixPosition.x;
        positionOfPieceToBeRemovedY = movingPiece.matrixPosition.y;
        isWhiteOfPieceToBeRemoved = movingPiece.isWhite;
        letterOfPieceToBeRemoved = movingPiece.letter;

        flag = false;
        for(i=0; i<movingPiece.legalMoves.length; ++i){
          if(cellPosOfNowX == movingPiece.legalMoves[i][0] & cellPosOfNowY == movingPiece.legalMoves[i][1]){
            flag = true;
          }
        }
        if(!flag){
          return;
        }

        test.movePieceFromTo(positionOfPieceToBeRemovedX, positionOfPieceToBeRemovedY,
          cellPosOfNowX, cellPosOfNowY, isWhiteOfPieceToBeRemoved);
        test.updateLegalMoves();
        test.updateIfWhiteKingInCheck();
        test.updateIfBlackKingInCheck();
        test.isBlackKingCheckmated();
        test.isWhiteKingCheckmated();

        console.log(test.isBlackKingInCheck);

        computerMakeMove(test, movingPiece.isWhite);
        test.updateIfWhiteKingInCheck();
        test.updateIfBlackKingInCheck();
        test.isBlackKingCheckmated();
        test.isWhiteKingCheckmated();

        console.log(test.isBlackKingInCheck);
        //currentTurnOfWhite = !currentTurnOfWhite;
      }
    }
    drawshit();
    test.show();
}