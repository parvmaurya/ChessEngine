function updateLegalMovesAfterWhiteKingInCheck(currentPosition, indexOfPiece, indexOfLegalMove){
    console.log('Am I called');
    cpyWhitePieces = [];
    cpyBlackPieces = [];
    for(let i=0; i<currentPosition.whitePieces.length; ++i){
        var pcW = Object.assign(Object.create(currentPosition.whitePieces[i]),currentPosition.whitePieces[i]);
        cpyWhitePieces.push(pcW);
    }
    for(let i=0; i<currentPosition.blackPieces.length; ++i){
        var pcB = Object.assign(Object.create(currentPosition.blackPieces[i]), currentPosition.blackPieces[i]);
        cpyBlackPieces.push(pcB);
    }
    
    var currentX = currentPosition.whitePieces[indexOfPiece].matrixPosition.x;
    var currentY = currentPosition.whitePieces[indexOfPiece].matrixPosition.y;
    var newX = currentPosition.whitePieces[indexOfPiece].legalMoves[indexOfLegalMove][0];
    var newY = currentPosition.whitePieces[indexOfPiece].legalMoves[indexOfLegalMove][1];
    currentPosition.movePieceFromTo(currentX, currentY, newX, newY, true);
    currentPosition.updateLegalMoves();
    currentPosition.updateIfBlackKingInCheck();
    currentPosition.updateIfWhiteKingInCheck();
    currentPosition.whitePieces = [];
    currentPosition.blackPieces = [];
    currentPosition.whitePieces = cpyWhitePieces;
    currentPosition.blackPieces = cpyBlackPieces;
    if(currentPosition.isWhiteKingInCheck){
        return false;
    }
    return true;
}

function updateLegalMovesAfterBlackKingInCheck(currentPosition, indexOfPiece, indexOfLegalMove){
    cpyWhitePieces = [];
    cpyBlackPieces = [];
    for(let i=0; i<currentPosition.whitePieces.length; ++i){
        var pcW = Object.assign(Object.create(currentPosition.whitePieces[i]),currentPosition.whitePieces[i]);
        cpyWhitePieces.push(pcW);
    }
    for(let i=0; i<currentPosition.blackPieces.length; ++i){
        var pcB = Object.assign(Object.create(currentPosition.blackPieces[i]), currentPosition.blackPieces[i]);
        cpyBlackPieces.push(pcB);
    }
    
    var currentX = currentPosition.blackPieces[indexOfPiece].matrixPosition.x;
    var currentY = currentPosition.blackPieces[indexOfPiece].matrixPosition.y;
    var newX = currentPosition.blackPieces[indexOfPiece].legalMoves[indexOfLegalMove][0];
    var newY = currentPosition.blackPieces[indexOfPiece].legalMoves[indexOfLegalMove][1];
    currentPosition.movePieceFromTo(currentX, currentY, newX, newY, false);
    currentPosition.updateLegalMoves();
    currentPosition.updateIfBlackKingInCheck();
    currentPosition.updateIfWhiteKingInCheck();
    currentPosition.whitePieces = [];
    currentPosition.blackPieces = [];
    currentPosition.whitePieces = cpyWhitePieces;
    currentPosition.blackPieces = cpyBlackPieces;
    if(currentPosition.isBlackKingInCheck){
        return false;
    }
    return true;
}

class Board{
    constructor(){
        this.whitePieces = [];
        this.blackPieces = [];
        this.setupPieces();
        this.show();
        this.updateLegalMoves();
        this.isWhiteKingInCheck = false;
        this.isBlackKingInCheck = false;
        this.whiteKingCheckmated = false;
        this.blackKingCheckmated = false;
        this.score = 0;
    }

    pieceValueScore(){
        var valPieces = 0;
        for(let i=0; i<this.whitePieces.length; ++i){
            if(this.whitePieces[i].letter=="Q"){
                valPieces+=9;
            }
            else if(this.whitePieces[i].letter=="R"){
                valPieces+=5;
            }
            else if(this.whitePieces[i].letter=="B"){
                valPieces+=3;
            }
            else if(this.whitePieces[i].letter=="Kn"){
                valPieces+=3;
            }
            else if(this.whitePieces[i].letter=="P"){
                valPieces+=1;
            }
        }
        if(this.isWhiteKingCheckMated){
            valPieces+=10000;
        }
        for(let i =0; i<this.blackPieces.length; ++i){
            if(this.blackPieces[i].letter=="Q"){
                valPieces-=9;
            }
            else if(this.blackPieces[i].letter=="R"){
                valPieces-=5;
            }
            else if(this.blackPieces[i].letter=="B"){
                valPieces-=3;
            }
            else if(this.blackPieces[i].letter=="Kn"){
                valPieces-=3;
            }
            else if(this.blackPieces[i].letter=="P"){
                valPieces-=1;
            }
        }
        if(this.isBlackKingCheckMated){
            valPieces-=10000;
        }
        this.score = valPieces;
    }

    addWhitePiece(pc){
        this.whitePieces.push(pc);
    }

    addBlackPiece(pc){
        this.blackPieces.push(pc);
    }

    setupPieces(){
        this.whitePieces.push(new King(4,7,true));
        // this.whitePieces.push(new Bishop(2,7,true));
        this.whitePieces.push(new Queen(0,6,true));
        // this.whitePieces.push(new Bishop(5,7,true));
        // this.whitePieces.push(new Rook(0,7,true));
        // this.whitePieces.push(new Rook(7,7,true));
        // this.whitePieces.push(new Queen(3,7,true));
        // this.whitePieces.push(new Knight(1,7,true));
        // this.whitePieces.push(new Knight(6,7,true));

        // this.whitePieces.push(new Pawn(0,6,true));
        // this.whitePieces.push(new Pawn(1,6,true));
        // this.whitePieces.push(new Pawn(2,6,true));
        // this.whitePieces.push(new Pawn(3,6,true));
        // this.whitePieces.push(new Pawn(4,6,true));
        // this.whitePieces.push(new Pawn(5,6,true));
        // this.whitePieces.push(new Pawn(6,6,true));
        // this.whitePieces.push(new Pawn(7,6,true));


        this.blackPieces.push(new King(4,0,false));
        // this.blackPieces.push(new Bishop(2,0,false));
        this.blackPieces.push(new Queen(2,1,false));
        // this.blackPieces.push(new Bishop(5,0,false));
        // this.blackPieces.push(new Rook(0,0,false));
        // this.blackPieces.push(new Rook(7,0,false));
        // this.blackPieces.push(new Queen(3,0,false));
        // this.blackPieces.push(new Knight(1,0,false));
        // this.blackPieces.push(new Knight(6,0,false));

        // this.blackPieces.push(new Pawn(0,1,false));
        // this.blackPieces.push(new Pawn(1,1,false));
        // this.blackPieces.push(new Pawn(2,1,false));
        // this.blackPieces.push(new Pawn(3,1,false));
        // this.blackPieces.push(new Pawn(4,1,false));
        // this.blackPieces.push(new Pawn(5,1,false));
        // this.blackPieces.push(new Pawn(6,1,false));
        // this.blackPieces.push(new Pawn(7,1,false));
    }

    pieceAt(xpos,ypos){
        for(let i=0; i<this.whitePieces.length; ++i){
            if(this.whitePieces[i].matrixPosition.x==xpos &
                this.whitePieces[i].matrixPosition.y==ypos){
                    return true;
                }
        }
        for(let i=0; i<this.blackPieces.length; ++i){
            if(this.blackPieces[i].matrixPosition.x==xpos &
                this.blackPieces[i].matrixPosition.y==ypos){
                return true;
            }
        }
        return false;
    }

    getPiece(x,y){
        var whitePieceLen = this.whitePieces.length;
        for(let i=0; i<whitePieceLen; ++i){
            if(this.whitePieces[i].matrixPosition.x==x &
                this.whitePieces[i].matrixPosition.y==y){
                    return this.whitePieces[i];
                }
        }
        var blackPieceLen = this.blackPieces.length;
        for(let i=0; i<blackPieceLen; ++i){
            if(this.blackPieces[i].matrixPosition.x==x &
                this.blackPieces[i].matrixPosition.y==y){
                    return this.blackPieces[i];
                }
        }
    }

    updateIfWhiteKingInCheck(){
        this.isWhiteKingInCheck = false;
        var KingX, KingY;
        for(let i=0; i<this.whitePieces.length; ++i){
            if(this.whitePieces[i].letter == "K"){
                KingX = this.whitePieces[i].matrixPosition.x;
                KingY = this.whitePieces[i].matrixPosition.y;
            }
        }
        for(let i=0; i<this.blackPieces.length; ++i){
            for(let j=0; j<this.blackPieces[i].legalMoves.length; ++j){
                if(this.blackPieces[i].legalMoves[j][0] == KingX & 
                    this.blackPieces[i].legalMoves[j][1] == KingY){
                        this.isWhiteKingInCheck = true;
                        break;
                    }
            }
        }
    }

    updateIfBlackKingInCheck(){
        this.isBlackKingInCheck = false;
        var KingX, KingY;
        for(let i=0; i<this.blackPieces.length; ++i){
            if(this.blackPieces[i].letter == "K"){
                KingX = this.blackPieces[i].matrixPosition.x;
                KingY = this.blackPieces[i].matrixPosition.y;
            }
        }
        for(let i=0; i<this.whitePieces.length; ++i){
            for(let j=0; j<this.whitePieces[i].legalMoves.length; ++j){
                if(this.whitePieces[i].legalMoves[j][0] == KingX & 
                    this.whitePieces[i].legalMoves[j][1] == KingY){
                        this.isBlackKingInCheck = true;
                        break;
                    }
            }
        }
    }

    removePieceAt(x,y){
        for(let i=0; i<this.whitePieces.length; ++i){
            if(this.whitePieces[i].matrixPosition.x==x &
                this.whitePieces[i].matrixPosition.y==y){
                    this.whitePieces.splice(i,1);
                    break;
                }
        }
        for(let i=0; i<this.blackPieces.length; ++i){
            if(this.blackPieces[i].matrixPosition.x==x &
                this.blackPieces[i].matrixPosition.y==y){
                    this.blackPieces.splice(i,1);
                    break;
                }
        }
    }

    addPieceAt(x,y, piece){
        if(piece.isWhite){
            this.whitePieces.push(piece);
        }
        else{
            this.blackPieces.push(piece);
        }
    }

    movePieceFromTo(x1,y1,x2,y2, pieceMovedIs){
        const originalPiece = this.getPiece(x1,y1);
        letterOfPieceToBeRemoved = originalPiece.letter;

        var pc;

        if(letterOfPieceToBeRemoved=="K"){
            pc = new King(x2, y2 , pieceMovedIs);
          }
          if(letterOfPieceToBeRemoved=="Q"){
            pc = new Queen(x2, y2,pieceMovedIs);
          }
          if(letterOfPieceToBeRemoved=="P"){
            pc = new Pawn(x2, y2, pieceMovedIs);
          }
          if(letterOfPieceToBeRemoved=="R"){
            pc = new Rook(x2, y2, pieceMovedIs);
          }
          if(letterOfPieceToBeRemoved=="Kn"){
            pc = new Knight(x2, y2,pieceMovedIs);
          }
          if(letterOfPieceToBeRemoved=="B"){
            pc = new Bishop(x2, y2, pieceMovedIs);
          }
          
        this.removePieceAt(x1,y1);

        if(this.pieceAt(x2,y2)){
            this.removePieceAt(x2,y2);
        }
        if(pieceMovedIs){
            this.whitePieces.push(pc);
        }
        else{
            this.blackPieces.push(pc);
        }
    }

    boundryCheck(x,y){
        if(x>=0 & x<=7 & y>=0 & y<=7){
            return true;
        }
        return false;
    }

    isWhiteKingCheckMated(){
        for(let i=this.whitePieces.length-1; i>=0; --i){
            for(let j=this.whitePieces[i].legalMoves.length-1; j>=0; --j){
                var isThisLegalMove = updateLegalMovesAfterWhiteKingInCheck(this,i,j);
                if(!isThisLegalMove){
                    this.whitePieces[i].legalMoves.splice(j,1);
                }
            }
        }
        var mvCNT = 0;
        for(let i=0; i<this.whitePieces.length; ++i){
            mvCNT+=this.whitePieces[i].legalMoves.length;
        }
        if(mvCNT==0){
            console.log('Black Won');
            // alert('Black Won');
        }
    }

    isBlackKingCheckMated(){
        for(let i=this.blackPieces.length-1; i>=0; --i){
            for(let j=this.blackPieces[i].legalMoves.length-1; j>=0; --j){
                var isThisLegalMove = updateLegalMovesAfterBlackKingInCheck(this,i,j);
                if(!isThisLegalMove){
                    this.blackPieces[i].legalMoves.splice(j,1);
                }
            }
        }
        var mvCNT = 0;
        for(let i=0; i<this.blackPieces.length; ++i){
            mvCNT+=this.blackPieces[i].legalMoves.length;
        }
        if(mvCNT==0){
            // alert('White Won');
            console.log('White Won');
        }
    }

    updateLegalMoves(){
        for(let i=0; i<this.whitePieces.length; ++i){
            if(this.whitePieces[i].letter == "K"){
                var posX = this.whitePieces[i].matrixPosition.x;
                var posY = this.whitePieces[i].matrixPosition.y;
                this.whitePieces[i].legalMoves = [];
                if(this.pieceAt(posX-1,posY-1) & this.boundryCheck(posX-1, posY-1)){
                    if(!this.getPiece(posX-1, posY-1).isWhite){
                        this.whitePieces[i].legalMoves.push([posX-1, posY-1]);
                    }
                }
                else{
                    if(this.boundryCheck(posX-1, posY-1)){
                        this.whitePieces[i].legalMoves.push([posX-1, posY-1]);
                    }
                }

                if(this.pieceAt(posX-1,posY) & this.boundryCheck(posX-1, posY)){
                    if(!this.getPiece(posX-1, posY).isWhite){
                        this.whitePieces[i].legalMoves.push([posX-1, posY]);
                    }
                }
                else{
                    if(this.boundryCheck(posX-1, posY)){
                        this.whitePieces[i].legalMoves.push([posX-1, posY]);
                    }
                }

                if(this.pieceAt(posX-1,posY+1) & this.boundryCheck(posX-1, posY+1)){
                    if(!this.getPiece(posX-1, posY+1).isWhite){
                        this.whitePieces[i].legalMoves.push([posX-1, posY+1]);
                    }
                }
                else{
                    if(this.boundryCheck(posX-1, posY+1)){
                        this.whitePieces[i].legalMoves.push([posX-1, posY+1]);
                    }
                }

                if(this.pieceAt(posX,posY-1) & this.boundryCheck(posX, posY-1)){
                    if(!this.getPiece(posX, posY-1).isWhite){
                        this.whitePieces[i].legalMoves.push([posX, posY-1]);
                    }
                }
                else{
                    if(this.boundryCheck(posX, posY-1)){
                        this.whitePieces[i].legalMoves.push([posX, posY-1]);
                    }
                }

                if(this.pieceAt(posX,posY+1) & this.boundryCheck(posX, posY+1)){
                    if(!this.getPiece(posX, posY+1).isWhite){
                        this.whitePieces[i].legalMoves.push([posX, posY+1]);
                    }
                }
                else{
                    if(this.boundryCheck(posX, posY+1)){
                        this.whitePieces[i].legalMoves.push([posX, posY+1]);
                    }
                }

                if(this.pieceAt(posX+1,posY-1) & this.boundryCheck(posX+1, posY-1)){
                    if(!this.getPiece(posX+1, posY-1).isWhite){
                        this.whitePieces[i].legalMoves.push([posX+1, posY-1]);
                    }
                }
                else{
                    if(this.boundryCheck(posX+1, posY-1)){
                        this.whitePieces[i].legalMoves.push([posX+1, posY-1]);
                    }
                }

                if(this.pieceAt(posX+1,posY) & this.boundryCheck(posX+1, posY)){
                    if(!this.getPiece(posX+1, posY).isWhite){
                        this.whitePieces[i].legalMoves.push([posX+1, posY]);
                    }
                }
                else{
                    if(this.boundryCheck(posX+1, posY)){
                        this.whitePieces[i].legalMoves.push([posX+1, posY]);
                    }
                }

                if(this.pieceAt(posX+1,posY+1) & this.boundryCheck(posX+1, posY+1)){
                    if(!this.getPiece(posX+1, posY+1).isWhite){
                        this.whitePieces[i].legalMoves.push([posX+1, posY+1]);
                    }
                }
                else{
                    if(this.boundryCheck(posX+1, posY+1)){
                        this.whitePieces[i].legalMoves.push([posX+1, posY+1]);
                    }
                }
            }
            if(this.whitePieces[i].letter == "P"){
                this.whitePieces[i].legalMoves = [];
                var posX = this.whitePieces[i].matrixPosition.x;
                var posY = this.whitePieces[i].matrixPosition.y;
                if(this.whitePieces[i].matrixPosition.y == 6 ){
                    if(posX>=0 & posX<=7 & posY-1>=0 & posY-1<=7 & 
                        !this.pieceAt(posX,posY-1)){
                        this.whitePieces[i].legalMoves.push([posX,posY-1]);
                        if(posX>=0 & posX<=7 & posY-2>=0 & posY-2<=7 & 
                        !this.pieceAt(posX,posY-2)){
                            this.whitePieces[i].legalMoves.push([posX,posY-2]);
                        }
                    }
                    
                    if(posX+1>=0 & posX+1<=7 & posY-1>=0 & posY-1<=7 & 
                        this.pieceAt(posX+1,posY-1)){
                        if(!this.getPiece(posX+1,posY-1).isWhite)
                            {
                                this.whitePieces[i].legalMoves.push([posX+1, posY-1]);
                            }
                    }
                    if(posX-1>=0 & posX-1<=7 & posY-1>=0 & posY-1<=7 & 
                        this.pieceAt(posX-1,posY-1)){
                        if(!this.getPiece(posX-1,posY-1).isWhite){
                            this.whitePieces[i].legalMoves.push([posX-1, posY-1]);
                        }
                    }
                }
                else{
                    if(posX>=0 & posX<=7 & posY-1>=0 & posY-1<=7 & 
                        !this.pieceAt(posX,posY-1)){
                        this.whitePieces[i].legalMoves.push([posX,posY-1]);
                    }
                    if(posX+1>=0 & posX+1<=7 & posY-1>=0 & posY-1<=7 & 
                        this.pieceAt(posX+1,posY-1)){
                        if(!this.getPiece(posX+1,posY-1).isWhite)
                            {
                                this.whitePieces[i].legalMoves.push([posX+1, posY-1]);
                            }
                    }
                    if(posX-1>=0 & posX-1<=7 & posY-1>=0 & posY-1<=7 & 
                        this.pieceAt(posX-1,posY-1)){
                        if(!this.getPiece(posX-1,posY-1).isWhite){
                            this.whitePieces[i].legalMoves.push([posX-1, posY-1]);
                        }
                    }
                }
            }

            if(this.whitePieces[i].letter == "Q"){
                this.whitePieces[i].legalMoves = [];
                var posX = this.whitePieces[i].matrixPosition.x;
                var posY = this.whitePieces[i].matrixPosition.y;
                var tmpX = posX-1;
                var tmpY = posY-1;

                while(tmpX>=0 && tmpY>=0){
                    if(this.pieceAt(tmpX,tmpY)){
                        if(this.getPiece(tmpX,tmpY).isWhite){
                            break;
                        }
                        this.whitePieces[i].legalMoves.push([tmpX,tmpY]);
                        break;
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([tmpX,tmpY]);
                    }
                    --tmpX; --tmpY;
                }

                tmpX = posX+1;
                tmpY = posY-1;
                while(tmpX<=7 && tmpY>=0){
                    if(this.pieceAt(tmpX,tmpY)){
                        if(this.getPiece(tmpX,tmpY).isWhite){
                            break;
                        }
                        this.whitePieces[i].legalMoves.push([tmpX,tmpY]);
                        break;
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([tmpX,tmpY]);
                    }
                    ++tmpX; --tmpY;
                }

                tmpX = posX-1;
                tmpY = posY+1;
                while(tmpX>=0 && tmpY<=7){
                    if(this.pieceAt(tmpX,tmpY)){
                        if(this.getPiece(tmpX,tmpY).isWhite){
                            break;
                        }
                        this.whitePieces[i].legalMoves.push([tmpX,tmpY]);
                        break;
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([tmpX,tmpY]);
                    }
                    --tmpX; ++tmpY;
                }


                tmpX = posX+1;
                tmpY = posY+1;
                while(tmpX<=7 && tmpY<=7){
                    if(this.pieceAt(tmpX,tmpY)){
                        if(this.getPiece(tmpX,tmpY).isWhite){
                            break;
                        }
                        this.whitePieces[i].legalMoves.push([tmpX,tmpY]);
                        break;
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([tmpX,tmpY]);
                    }
                    ++tmpX; ++tmpY;
                }

                var tmp = posX-1;
                while(tmp>=0){
                    if(this.pieceAt(tmp, posY)){
                        if(this.getPiece(tmp,posY).isWhite){
                            break;
                        }
                        this.whitePieces[i].legalMoves.push([tmp,posY]);
                        break;
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([tmp,posY]);
                    }
                    --tmp;
                }

                tmp = posX+1;

                while(tmp<=7){
                    if(this.pieceAt(tmp, posY)){
                        if(this.getPiece(tmp,posY).isWhite){
                            break;
                        }
                        this.whitePieces[i].legalMoves.push([tmp,posY]);
                        break;
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([tmp,posY]);
                    }
                    ++tmp;
                }

                tmp = posY-1;

                while(tmp>=0){
                    if(this.pieceAt(posX, tmp)){
                        if(this.getPiece(posX,tmp).isWhite){
                            break;
                        }
                        this.whitePieces[i].legalMoves.push([posX,tmp]);
                        break;
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([posX,tmp]);
                    }
                    --tmp;
                }
                tmp = posY+1;

                while(tmp<=7){
                    if(this.pieceAt(posX, tmp)){
                        if(this.getPiece(posX,tmp).isWhite){
                            break;
                        }
                        this.whitePieces[i].legalMoves.push([posX,tmp]);
                        break;
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([posX,tmp]);
                    }
                    ++tmp;
                }



            }
            if(this.whitePieces[i].letter == "B"){
                this.whitePieces[i].legalMoves = [];
                var posX = this.whitePieces[i].matrixPosition.x;
                var posY = this.whitePieces[i].matrixPosition.y;
                var tmpX = posX-1;
                var tmpY = posY-1;

                while(tmpX>=0 && tmpY>=0){
                    if(this.pieceAt(tmpX,tmpY)){
                        if(this.getPiece(tmpX,tmpY).isWhite){
                            break;
                        }
                        this.whitePieces[i].legalMoves.push([tmpX,tmpY]);
                        break;
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([tmpX,tmpY]);
                    }
                    --tmpX; --tmpY;
                }

                tmpX = posX+1;
                tmpY = posY-1;
                while(tmpX<=7 && tmpY>=0){
                    if(this.pieceAt(tmpX,tmpY)){
                        if(this.getPiece(tmpX,tmpY).isWhite){
                            break;
                        }
                        this.whitePieces[i].legalMoves.push([tmpX,tmpY]);
                        break;
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([tmpX,tmpY]);
                    }
                    ++tmpX; --tmpY;
                }

                tmpX = posX-1;
                tmpY = posY+1;
                while(tmpX>=0 && tmpY<=7){
                    if(this.pieceAt(tmpX,tmpY)){
                        if(this.getPiece(tmpX,tmpY).isWhite){
                            break;
                        }
                        this.whitePieces[i].legalMoves.push([tmpX,tmpY]);
                        break;
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([tmpX,tmpY]);
                    }
                    --tmpX; ++tmpY;
                }


                tmpX = posX+1;
                tmpY = posY+1;
                while(tmpX<=7 && tmpY<=7){
                    if(this.pieceAt(tmpX,tmpY)){
                        if(this.getPiece(tmpX,tmpY).isWhite){
                            break;
                        }
                        this.whitePieces[i].legalMoves.push([tmpX,tmpY]);
                        break;
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([tmpX,tmpY]);
                    }
                    ++tmpX; ++tmpY;
                }

            }
            if(this.whitePieces[i].letter == "R"){
                this.whitePieces[i].legalMoves = [];
                var posX = this.whitePieces[i].matrixPosition.x;
                var posY = this.whitePieces[i].matrixPosition.y;
                var tmp = posX-1;
                while(tmp>=0){
                    if(this.pieceAt(tmp, posY)){
                        if(this.getPiece(tmp,posY).isWhite){
                            break;
                        }
                        this.whitePieces[i].legalMoves.push([tmp,posY]);
                        break;
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([tmp,posY]);
                    }
                    --tmp;
                }

                tmp = posX+1;

                while(tmp<=7){
                    if(this.pieceAt(tmp, posY)){
                        if(this.getPiece(tmp,posY).isWhite){
                            break;
                        }
                        this.whitePieces[i].legalMoves.push([tmp,posY]);
                        break;
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([tmp,posY]);
                    }
                    ++tmp;
                }

                tmp = posY-1;

                while(tmp>=0){
                    if(this.pieceAt(posX, tmp)){
                        if(this.getPiece(posX, tmp).isWhite){
                            break;
                        }
                        this.whitePieces[i].legalMoves.push([posX,tmp]);
                        break;
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([posX,tmp]);
                    }
                    --tmp;
                }
                tmp = posY+1;

                while(tmp<=7){
                    if(this.pieceAt(posX, tmp)){
                        if(this.getPiece(posX,tmp).isWhite){
                            break;
                        }
                        this.whitePieces[i].legalMoves.push([posX,tmp]);
                        break;
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([posX,tmp]);
                    }
                    ++tmp;
                }
                
            }
            if(this.whitePieces[i].letter == "Kn"){
                var posX = this.whitePieces[i].matrixPosition.x;
                var posY = this.whitePieces[i].matrixPosition.y;
                this.whitePieces[i].legalMoves = [];
                if(this.boundryCheck(posX+2 , posY+1)){
                    if(this.pieceAt(posX+2, posY+1)){
                        if(!this.getPiece(posX+2, posY+1).isWhite){
                            this.whitePieces[i].legalMoves.push([posX+2, posY+1]);
                        }
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([posX+2, posY+1]);
                    }
                }
                if(this.boundryCheck(posX+2 , posY-1)){
                    if(this.pieceAt(posX+2, posY-1)){
                        if(!this.getPiece(posX+2, posY-1).isWhite){
                            this.whitePieces[i].legalMoves.push([posX+2, posY-1]);
                        }
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([posX+2, posY-1]);
                    }
                }
                if(this.boundryCheck(posX-2 , posY+1)){
                    if(this.pieceAt(posX-2, posY+1)){
                        if(!this.getPiece(posX-2, posY+1).isWhite){
                            this.whitePieces[i].legalMoves.push([posX-2, posY+1]);
                        }
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([posX-2, posY+1]);
                    }
                }
                if(this.boundryCheck(posX-2 , posY-1)){
                    if(this.pieceAt(posX-2, posY-1)){
                        if(!this.getPiece(posX-2, posY-1).isWhite){
                            this.whitePieces[i].legalMoves.push([posX-2, posY-1]);
                        }
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([posX-2, posY-1]);
                    }
                }
                if(this.boundryCheck(posX+1 , posY+2)){
                    if(this.pieceAt(posX+1, posY+2)){
                        if(!this.getPiece(posX+1, posY+2).isWhite){
                            this.whitePieces[i].legalMoves.push([posX+1, posY+2]);
                        }
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([posX+1, posY+2]);
                    }
                }
                if(this.boundryCheck(posX-1 , posY+2)){
                    if(this.pieceAt(posX-1, posY+2)){
                        if(!this.getPiece(posX-1, posY+2).isWhite){
                            this.whitePieces[i].legalMoves.push([posX-1, posY+2]);
                        }
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([posX-1, posY+2]);
                    }
                }
                if(this.boundryCheck(posX+1 , posY-2)){
                    if(this.pieceAt(posX+1, posY-2)){
                        if(!this.getPiece(posX+1, posY-2).isWhite){
                            this.whitePieces[i].legalMoves.push([posX+1, posY-2]);
                        }
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([posX+1, posY-2]);
                    }
                }
                if(this.boundryCheck(posX-1 , posY-2)){
                    if(this.pieceAt(posX-1, posY-2)){
                        if(!this.getPiece(posX-1, posY-2).isWhite){
                            this.whitePieces[i].legalMoves.push([posX-1, posY-2]);
                        }
                    }
                    else{
                        this.whitePieces[i].legalMoves.push([posX-1, posY-2]);
                    }
                }
            }
        }

        for(let i=0; i<this.blackPieces.length; ++i){
            if(this.blackPieces[i].letter == "K"){
                this.blackPieces[i].legalMoves = [];
                var posX = this.blackPieces[i].matrixPosition.x;
                var posY = this.blackPieces[i].matrixPosition.y;
                //console.log(posX+" "+posY);
                if(this.pieceAt(posX-1,posY-1) & this.boundryCheck(posX-1, posY-1)){
                    if(this.getPiece(posX-1, posY-1).isWhite){
                        this.blackPieces[i].legalMoves.push([posX-1, posY-1]);
                    }
                }
                else{
                    if(this.boundryCheck(posX-1, posY-1)){
                        this.blackPieces[i].legalMoves.push([posX-1, posY-1]);
                    }
                }

                if(this.pieceAt(posX-1,posY) & this.boundryCheck(posX-1, posY)){
                    if(this.getPiece(posX-1, posY).isWhite){
                        this.blackPieces[i].legalMoves.push([posX-1, posY]);
                    }
                }
                else{
                    if(this.boundryCheck(posX-1, posY)){
                        this.blackPieces[i].legalMoves.push([posX-1, posY]);
                    }
                }

                if(this.pieceAt(posX-1,posY+1) & this.boundryCheck(posX-1, posY+1)){
                    if(this.getPiece(posX-1, posY+1).isWhite){
                        this.blackPieces[i].legalMoves.push([posX-1, posY+1]);
                    }
                }
                else{
                    if(this.boundryCheck(posX-1, posY+1)){
                        this.blackPieces[i].legalMoves.push([posX-1, posY+1]);
                    }
                }

                if(this.pieceAt(posX,posY-1) & this.boundryCheck(posX, posY-1)){
                    if(this.getPiece(posX, posY-1).isWhite){
                        this.blackPieces[i].legalMoves.push([posX, posY-1]);
                    }
                }
                else{
                    if(this.boundryCheck(posX, posY-1)){
                        this.blackPieces[i].legalMoves.push([posX, posY-1]);
                    }
                }

                if(this.pieceAt(posX,posY+1) & this.boundryCheck(posX, posY+1)){
                    if(this.getPiece(posX, posY+1).isWhite){
                        this.blackPieces[i].legalMoves.push([posX, posY+1]);
                    }
                }
                else{
                    if(this.boundryCheck(posX, posY+1)){
                        this.blackPieces[i].legalMoves.push([posX, posY+1]);
                    }
                }

                if(this.pieceAt(posX+1,posY-1) & this.boundryCheck(posX+1, posY-1)){
                    if(this.getPiece(posX+1, posY-1).isWhite){
                        this.blackPieces[i].legalMoves.push([posX+1, posY-1]);
                    }
                }
                else{
                    if(this.boundryCheck(posX+1, posY-1)){
                        this.blackPieces[i].legalMoves.push([posX+1, posY-1]);
                    }
                }

                if(this.pieceAt(posX+1,posY) & this.boundryCheck(posX+1, posY)){
                    if(this.getPiece(posX+1, posY).isWhite){
                        this.blackPieces[i].legalMoves.push([posX+1, posY]);
                    }
                }
                else{
                    if(this.boundryCheck(posX+1, posY+1)){
                        this.blackPieces[i].legalMoves.push([posX+1, posY]);
                    }
                }

                if(this.pieceAt(posX+1,posY+1) & this.boundryCheck(posX+1, posY+1)){
                    if(this.getPiece(posX+1, posY+1).isWhite){
                        this.blackPieces[i].legalMoves.push([posX+1, posY+1]);
                    }
                }
                else{
                    if(this.boundryCheck(posX+1, posY+1)){
                        this.blackPieces[i].legalMoves.push([posX+1, posY+1]);
                    }
                }
            }
            if(this.blackPieces[i].letter == "P"){
                this.blackPieces[i].legalMoves = [];
                var posX = this.blackPieces[i].matrixPosition.x;
                var posY = this.blackPieces[i].matrixPosition.y;
                if(this.blackPieces[i].matrixPosition.y == 1){
                    if(posX>=0 & posX<=7 & posY+1>=0 & posY+1<=7 & 
                        !this.pieceAt(posX,posY+1)){
                        this.blackPieces[i].legalMoves.push([posX,posY+1]);
                        if(posX>=0 & posX<=7 & posY+2>=0 & posY+2<=7 & 
                            !this.pieceAt(posX,posY+2)){
                            this.blackPieces[i].legalMoves.push([posX,posY+2]);
                        }
                    }
                    
                    if(posX+1>=0 & posX+1<=7 & posY+1>=0 & posY+1<=7 & 
                        this.pieceAt(posX+1,posY+1)){
                        if(this.getPiece(posX+1,posY+1).isWhite)
                            {
                                this.blackPieces[i].legalMoves.push([posX+1, posY+1]);
                            }
                    }
                    if(posX-1>=0 & posX-1<=7 & posY+1>=0 & posY+1<=7 & 
                        this.pieceAt(posX-1,posY+1)){
                        if(this.getPiece(posX-1,posY+1).isWhite){
                            this.blackPieces[i].legalMoves.push([posX-1, posY+1]);
                        }
                    }
                }
                else{
                    if(posX>=0 & posX<=7 & posY+1>=0 & posY+1<=7 & 
                        !this.pieceAt(posX,posY+1)){
                        this.blackPieces[i].legalMoves.push([posX,posY+1]);
                    }
                    if(posX+1>=0 & posX+1<=7 & posY+1>=0 & posY+1<=7 & 
                        this.pieceAt(posX+1,posY+1)){
                        if(this.getPiece(posX+1,posY+1).isWhite)
                            {
                                this.blackPieces[i].legalMoves.push([posX+1, posY+1]);
                            }
                    }
                    if(posX-1>=0 & posX-1<=7 & posY+1>=0 & posY+1<=7 & 
                        this.pieceAt(posX-1,posY+1)){
                        if(this.getPiece(posX-1,posY+1).isWhite){
                            this.blackPieces[i].legalMoves.push([posX-1, posY+1]);
                        }
                    }
                }
            }

            if(this.blackPieces[i].letter == "Q"){
                this.blackPieces[i].legalMoves = [];
                var posX = this.blackPieces[i].matrixPosition.x;
                var posY = this.blackPieces[i].matrixPosition.y;
                var tmpX = posX-1;
                var tmpY = posY-1;

                while(tmpX>=0 && tmpY>=0){
                    if(this.pieceAt(tmpX,tmpY)){
                        if(!this.getPiece(tmpX,tmpY).isWhite){
                            break;
                        }
                        this.blackPieces[i].legalMoves.push([tmpX,tmpY]);
                        break;
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([tmpX,tmpY]);
                    }
                    --tmpX; --tmpY;
                }

                tmpX = posX+1;
                tmpY = posY-1;
                while(tmpX<=7 && tmpY>=0){
                    if(this.pieceAt(tmpX,tmpY)){
                        if(!this.getPiece(tmpX,tmpY).isWhite){
                            break;
                        }
                        this.blackPieces[i].legalMoves.push([tmpX,tmpY]);
                        break;
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([tmpX,tmpY]);
                    }
                    ++tmpX; --tmpY;
                }

                tmpX = posX-1;
                tmpY = posY+1;
                while(tmpX>=0 && tmpY<=7){
                    if(this.pieceAt(tmpX,tmpY)){
                        if(!this.getPiece(tmpX,tmpY).isWhite){
                            break;
                        }
                        this.blackPieces[i].legalMoves.push([tmpX,tmpY]);
                        break;
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([tmpX,tmpY]);
                    }
                    --tmpX; ++tmpY;
                }


                tmpX = posX+1;
                tmpY = posY+1;
                while(tmpX<=7 && tmpY<=7){
                    if(this.pieceAt(tmpX,tmpY)){
                        if(!this.getPiece(tmpX,tmpY).isWhite){
                            break;
                        }
                        this.blackPieces[i].legalMoves.push([tmpX,tmpY]);
                        break;
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([tmpX,tmpY]);
                    }
                    ++tmpX; ++tmpY;
                }

                var tmp = posX-1;
                while(tmp>=0){
                    if(this.pieceAt(tmp, posY)){
                        if(!this.getPiece(tmp,posY).isWhite){
                            break;
                        }
                        this.blackPieces[i].legalMoves.push([tmp,posY]);
                        break;
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([tmp,posY]);
                    }
                    --tmp;
                }

                tmp = posX+1;

                while(tmp<=7){
                    if(this.pieceAt(tmp, posY)){
                        if(!this.getPiece(tmp,posY).isWhite){
                            break;
                        }
                        this.blackPieces[i].legalMoves.push([tmp,posY]);
                        break;
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([tmp,posY]);
                    }
                    ++tmp;
                }

                tmp = posY-1;

                while(tmp>=0){
                    if(this.pieceAt(tmp, posY)){
                        if(!this.getPiece(tmp,posY).isWhite){
                            break;
                        }
                        this.blackPieces[i].legalMoves.push([posX,tmp]);
                        break;
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([posX,tmp]);
                    }
                    --tmp;
                }
                tmp = posY+1;

                while(tmp<=7){
                    if(this.pieceAt(posX, tmp)){
                        if(!this.getPiece(posX,tmp).isWhite){
                            break;
                        }
                        this.blackPieces[i].legalMoves.push([posX,tmp]);
                        break;
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([posX,tmp]);
                    }
                    ++tmp;
                }

            }
            if(this.blackPieces[i].letter == "B"){
                this.blackPieces[i].legalMoves = [];
                var posX = this.blackPieces[i].matrixPosition.x;
                var posY = this.blackPieces[i].matrixPosition.y;
                var tmpX = posX-1;
                var tmpY = posY-1;

                while(tmpX>=0 && tmpY>=0){
                    if(this.pieceAt(tmpX,tmpY)){
                        if(!this.getPiece(tmpX,tmpY).isWhite){
                            break;
                        }
                        this.blackPieces[i].legalMoves.push([tmpX,tmpY]);
                        break;
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([tmpX,tmpY]);
                    }
                    --tmpX; --tmpY;
                }

                tmpX = posX+1;
                tmpY = posY-1;
                while(tmpX<=7 && tmpY>=0){
                    if(this.pieceAt(tmpX,tmpY)){
                        if(!this.getPiece(tmpX,tmpY).isWhite){
                            break;
                        }
                        this.blackPieces[i].legalMoves.push([tmpX,tmpY]);
                        break;
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([tmpX,tmpY]);
                    }
                    ++tmpX; --tmpY;
                }

                tmpX = posX-1;
                tmpY = posY+1;
                while(tmpX>=0 && tmpY<=7){
                    if(this.pieceAt(tmpX,tmpY)){
                        if(!this.getPiece(tmpX,tmpY).isWhite){
                            break;
                        }
                        this.blackPieces[i].legalMoves.push([tmpX,tmpY]);
                        break;
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([tmpX,tmpY]);
                    }
                    --tmpX; ++tmpY;
                }


                tmpX = posX+1;
                tmpY = posY+1;
                while(tmpX<=7 && tmpY<=7){
                    if(this.pieceAt(tmpX,tmpY)){
                        if(!this.getPiece(tmpX,tmpY).isWhite){
                            break;
                        }
                        this.blackPieces[i].legalMoves.push([tmpX,tmpY]);
                        break;
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([tmpX,tmpY]);
                    }
                    ++tmpX; ++tmpY;
                }

            }
            if(this.blackPieces[i].letter == "R"){
                this.blackPieces[i].legalMoves = [];
                var posX = this.blackPieces[i].matrixPosition.x;
                var posY = this.blackPieces[i].matrixPosition.y;
                var tmp = posX-1;
                while(tmp>=0){
                    if(this.pieceAt(tmp, posY)){
                        if(!this.getPiece(tmp,posY).isWhite){
                            break;
                        }
                        this.blackPieces[i].legalMoves.push([tmp,posY]);
                        break;
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([tmp,posY]);
                    }
                    --tmp;
                }

                tmp = posX+1;

                while(tmp<=7){
                    if(this.pieceAt(tmp, posY)){
                        if(!this.getPiece(tmp,posY).isWhite){
                            break;
                        }
                        this.blackPieces[i].legalMoves.push([tmp,posY]);
                        break;
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([tmp,posY]);
                    }
                    ++tmp;
                }

                tmp = posY-1;

                while(tmp>=0){
                    if(this.pieceAt(posX, tmp)){
                        if(!this.getPiece(posX,tmp).isWhite){
                            break;
                        }
                        this.blackPieces[i].legalMoves.push([posX,tmp]);
                        break;
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([posX,tmp]);
                    }
                    --tmp;
                }
                tmp = posY+1;

                while(tmp<=7){
                    if(this.pieceAt(posX, tmp)){
                        if(!this.getPiece(posX,tmp).isWhite){
                            break;
                        }
                        this.blackPieces[i].legalMoves.push([posX,tmp]);
                        break;
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([posX,tmp]);
                    }
                    ++tmp;
                }
                
            }
            if(this.blackPieces[i].letter == "Kn"){
                var posX = this.blackPieces[i].matrixPosition.x;
                var posY = this.blackPieces[i].matrixPosition.y;
                this.blackPieces[i].legalMoves = [];
                if(this.boundryCheck(posX+2 , posY+1)){
                    if(this.pieceAt(posX+2, posY+1)){
                        if(this.getPiece(posX+2, posY+1).isWhite){
                            this.blackPieces[i].legalMoves.push([posX+2, posY+1]);
                        }
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([posX+2, posY+1]);
                    }
                }
                if(this.boundryCheck(posX+2 , posY-1)){
                    if(this.pieceAt(posX+2, posY-1)){
                        if(this.getPiece(posX+2, posY-1).isWhite){
                            this.blackPieces[i].legalMoves.push([posX+2, posY-1]);
                        }
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([posX+2, posY-1]);
                    }
                }
                if(this.boundryCheck(posX-2 , posY+1)){
                    if(this.pieceAt(posX-2, posY+1)){
                        if(this.getPiece(posX-2, posY+1).isWhite){
                            this.blackPieces[i].legalMoves.push([posX-2, posY+1]);
                        }
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([posX-2, posY+1]);
                    }
                }
                if(this.boundryCheck(posX-2 , posY-1)){
                    if(this.pieceAt(posX-2, posY-1)){
                        if(this.getPiece(posX-2, posY-1).isWhite){
                            this.blackPieces[i].legalMoves.push([posX-2, posY-1]);
                        }
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([posX-2, posY-1]);
                    }
                }
                if(this.boundryCheck(posX+1 , posY+2)){
                    if(this.pieceAt(posX+1, posY+2)){
                        if(this.getPiece(posX+1, posY+2).isWhite){
                            this.blackPieces[i].legalMoves.push([posX+1, posY+2]);
                        }
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([posX+1, posY+2]);
                    }
                }
                if(this.boundryCheck(posX-1 , posY+2)){
                    if(this.pieceAt(posX-1, posY+2)){
                        if(this.getPiece(posX-1, posY+2).isWhite){
                            this.blackPieces[i].legalMoves.push([posX-1, posY+2]);
                        }
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([posX-1, posY+2]);
                    }
                }
                if(this.boundryCheck(posX+1 , posY-2)){
                    if(this.pieceAt(posX+1, posY+2)){
                        if(this.getPiece(posX+1, posY+2).isWhite){
                            this.blackPieces[i].legalMoves.push([posX+1, posY+2]);
                        }
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([posX+1, posY+2]);
                    }
                }
                if(this.boundryCheck(posX-1 , posY-2)){
                    if(this.pieceAt(posX-1, posY-2)){
                        if(this.getPiece(posX-1, posY-2).isWhite){
                            this.blackPieces[i].legalMoves.push([posX-1, posY-2]);
                        }
                    }
                    else{
                        this.blackPieces[i].legalMoves.push([posX-1, posY-2]);
                    }
                }
                
            }
        }
    }

    show(){
        for(let i=0; i<this.whitePieces.length; ++i){
            this.whitePieces[i].show();
        }
        for(let i=0; i<this.blackPieces.length; ++i){
            this.blackPieces[i].show();
        }
    }
}