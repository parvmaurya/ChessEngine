class Board{
    constructor(){
        this.whitePieces = [];
        this.blackPieces = [];
        this.setupPieces();
        this.show();
        this.updateLegalMoves();
        this.isWhiteKingInCheck = false;
        this.isBlackKingInCheck = false;
    }

    addWhitePiece(pc){
        this.whitePieces.push(pc);
    }

    addBlackPiece(pc){
        this.blackPieces.push(pc);
    }

    setupPieces(){
        this.whitePieces.push(new King(4,7,true));
        this.whitePieces.push(new Bishop(2,7,true));
        this.whitePieces.push(new Bishop(5,7,true));
        this.whitePieces.push(new Rook(0,7,true));
        this.whitePieces.push(new Rook(7,7,true));
        this.whitePieces.push(new Queen(3,7,true));
        this.whitePieces.push(new Knight(1,7,true));
        this.whitePieces.push(new Knight(6,7,true));

        this.whitePieces.push(new Pawn(0,6,true));
        this.whitePieces.push(new Pawn(1,6,true));
        this.whitePieces.push(new Pawn(2,6,true));
        this.whitePieces.push(new Pawn(3,6,true));
        this.whitePieces.push(new Pawn(4,6,true));
        this.whitePieces.push(new Pawn(5,6,true));
        this.whitePieces.push(new Pawn(6,6,true));
        this.whitePieces.push(new Pawn(7,6,true));


        this.blackPieces.push(new King(4,0,false));
        this.blackPieces.push(new Bishop(2,0,false));
        this.blackPieces.push(new Bishop(5,0,false));
        this.blackPieces.push(new Rook(0,0,false));
        this.blackPieces.push(new Rook(7,0,false));
        this.blackPieces.push(new Queen(3,0,false));
        this.blackPieces.push(new Knight(1,0,false));
        this.blackPieces.push(new Knight(6,0,false));

        this.blackPieces.push(new Pawn(0,1,false));
        this.blackPieces.push(new Pawn(1,1,false));
        this.blackPieces.push(new Pawn(2,1,false));
        this.blackPieces.push(new Pawn(3,1,false));
        this.blackPieces.push(new Pawn(4,1,false));
        this.blackPieces.push(new Pawn(5,1,false));
        this.blackPieces.push(new Pawn(6,1,false));
        this.blackPieces.push(new Pawn(7,1,false));
    }

    pieceAt(xpos,ypos){
        //console.log(this.whitePieces.length);
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
        for(let i=0; i<this.whitePieces.length; ++i){
            if(this.whitePieces[i].matrixPosition.x==x &
                this.whitePieces[i].matrixPosition.y==y){
                    return this.whitePieces[i];
                }
        }
        for(let i=0; i<this.blackPieces.length; ++i){
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
                        //console.log(this.whitePieces[i].legalMoves);
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

    updateLegalMoves(){

        for(let i=0; i<this.whitePieces.length; ++i){
            if(this.whitePieces[i].letter == "K"){
                var posX = this.whitePieces[i].matrixPosition.x;
                var posY = this.whitePieces[i].matrixPosition.y;
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
                    if(this.boundryCheck(posX+1, posY+1)){
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
                    if(this.pieceAt(tmp, posY)){
                        if(this.getPiece(tmp,posY).isWhite){
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
                        if(!this.getPiece(tmpX,tmpY).isWhite){
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
                        if(!this.getPiece(tmpX,tmpY).isWhite){
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
                        if(!this.getPiece(tmpX,tmpY).isWhite){
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
                        if(!this.getPiece(tmpX,tmpY).isWhite){
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
                        if(!this.getPiece(tmp,posY).isWhite){
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
                        if(!this.getPiece(tmp,posY).isWhite){
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
                    if(this.pieceAt(tmp, posY)){
                        if(!this.getPiece(tmp,posY).isWhite){
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
                        if(!this.getPiece(posX,tmp).isWhite){
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
        }

        for(let i=0; i<this.blackPieces.length; ++i){
            if(this.blackPieces[i].letter == "K"){
                var posX = this.blackPieces[i].matrixPosition.x;
                var posY = this.blackPieces[i].matrixPosition.y;
                if(this.pieceAt(posX-1,posY-1) & this.boundryCheck(posX-1, posY-1)){
                    if(!this.getPiece(posX-1, posY-1).isWhite){
                        this.blackPieces[i].legalMoves.push([posX-1, posY-1]);
                    }
                }
                else{
                    if(this.boundryCheck([posX-1, posY-1])){
                        this.blackPieces[i].legalMoves.push([posX-1, posY-1]);
                    }
                }

                if(this.pieceAt(posX-1,posY) & this.boundryCheck(posX-1, posY)){
                    if(!this.getPiece(posX-1, posY).isWhite){
                        this.blackPieces[i].legalMoves.push([posX-1, posY]);
                    }
                }
                else{
                    if(this.boundryCheck(posX-1, posY)){
                        this.blackPieces[i].legalMoves.push([posX-1, posY]);
                    }
                }

                if(this.pieceAt(posX-1,posY+1) & this.boundryCheck(posX-1, posY+1)){
                    if(!this.getPiece(posX-1, posY+1).isWhite){
                        this.blackPieces[i].legalMoves.push([posX-1, posY+1]);
                    }
                }
                else{
                    if(this.boundryCheck(posX-1, posY+1)){
                        this.blackPieces[i].legalMoves.push([posX-1, posY+1]);
                    }
                }

                if(this.pieceAt(posX,posY-1) & this.boundryCheck(posX, posY-1)){
                    if(!this.getPiece(posX, posY-1).isWhite){
                        this.blackPieces[i].legalMoves.push([posX, posY-1]);
                    }
                }
                else{
                    if(this.boundryCheck(posX, posY-1)){
                        this.blackPieces[i].legalMoves.push([posX, posY-1]);
                    }
                }

                if(this.pieceAt(posX,posY+1) & this.boundryCheck(posX, posY+1)){
                    if(!this.getPiece(posX, posY+1).isWhite){
                        this.blackPieces[i].legalMoves.push([posX, posY+1]);
                    }
                }
                else{
                    if(this.boundryCheck(posX, posY+1)){
                        this.blackPieces[i].legalMoves.push([posX, posY+1]);
                    }
                }

                if(this.pieceAt(posX+1,posY-1) & this.boundryCheck(posX+1, posY-1)){
                    if(!this.getPiece(posX+1, posY-1).isWhite){
                        this.blackPieces[i].legalMoves.push([posX+1, posY-1]);
                    }
                }
                else{
                    if(this.boundryCheck(posX+1, posY-1)){
                        this.blackPieces[i].legalMoves.push([posX+1, posY-1]);
                    }
                }

                if(this.pieceAt(posX+1,posY) & this.boundryCheck(posX+1, posY)){
                    if(!this.getPiece(posX+1, posY).isWhite){
                        this.blackPieces[i].legalMoves.push([posX+1, posY]);
                    }
                }
                else{
                    if(this.boundryCheck(posX+1, posY+1)){
                        this.blackPieces[i].legalMoves.push([posX+1, posY]);
                    }
                }

                if(this.pieceAt(posX+1,posY+1) & this.boundryCheck(posX+1, posY+1)){
                    if(!this.getPiece(posX+1, posY+1).isWhite){
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