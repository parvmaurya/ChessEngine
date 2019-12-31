
class Piece{
    constructor(x,y,isWhite,letter){
        this.matrixPosition = createVector(x,y);
        this.pixelPosition = createVector(x*squareHeight + squareHeight/2, y*squareHeight + squareHeight/2);

        this.isWhite = isWhite;
        this.letter = letter;
        this.moving = false;
    }
    show(){
        textSize(30);
        strokeWeight(5);
        if(this.isWhite){
            fill(255);
            stroke(0);
        }
        else{
            fill(70);
            stroke(255);
        }
        textAlign(CENTER, CENTER);
        if(this.letter=='K' & this.isWhite){
            image(whiteKing, this.pixelPosition.x -squareHeight/2, this.pixelPosition.y - squareHeight/2);
        }
        else if(this.letter=='Q' & this.isWhite){
            image(whiteQueen, this.pixelPosition.x -squareHeight/2, this.pixelPosition.y - squareHeight/2);
        }
        else if(this.letter=='Kn' & this.isWhite){
            image(whiteKnight, this.pixelPosition.x -squareHeight/2, this.pixelPosition.y - squareHeight/2);
        }
        else if(this.letter=='B' & this.isWhite){
            image(whiteBishop, this.pixelPosition.x -squareHeight/2, this.pixelPosition.y - squareHeight/2);
        }
        else if(this.letter=='R' & this.isWhite){
            image(whiteRook, this.pixelPosition.x -squareHeight/2, this.pixelPosition.y - squareHeight/2);
        }
        else if(this.letter=='P' & this.isWhite){
            image(whitePawn, this.pixelPosition.x -squareHeight/2, this.pixelPosition.y - squareHeight/2);
        }
        else if(this.letter=='K' & !this.isWhite){
            image(blackKing, this.pixelPosition.x -squareHeight/2, this.pixelPosition.y - squareHeight/2);
        }
        else if(this.letter=='Q' & !this.isWhite){
            image(blackQueen, this.pixelPosition.x -squareHeight/2, this.pixelPosition.y - squareHeight/2);
        }
        else if(this.letter=='Kn' & !this.isWhite){
            image(blackKnight, this.pixelPosition.x -squareHeight/2, this.pixelPosition.y - squareHeight/2);
        }
        else if(this.letter=='B' & !this.isWhite){
            image(blackBishop, this.pixelPosition.x -squareHeight/2, this.pixelPosition.y - squareHeight/2);
        }
        else if(this.letter=='R' & !this.isWhite){
            image(blackRook, this.pixelPosition.x -squareHeight/2, this.pixelPosition.y - squareHeight/2);
        }
        else if(this.letter=='P' & !this.isWhite){
            image(blackPawn, this.pixelPosition.x -squareHeight/2, this.pixelPosition.y - squareHeight/2);
        }
    }
    checkRange(a,b){
        if(a>=0 & a<=7 & b>=0 & b<=7){
            return true;
        }
        return false;
    }
    move(){}
}

class King extends Piece{
    constructor(x,y,isWhite){
        super(x,y,isWhite);
        this.letter = "K";
        this.moving = false;   
        this.legalMoves = [];  
        this.findlegalMoves();
    }

    findlegalMoves(){
        // if(this.checkRange(this.matrixPosition.x-1, this.matrixPosition.y-1)){
        //     this.legalMoves.push([this.matrixPosition.x-1,this.matrixPosition.y-1]);
        // }
        // if(this.checkRange(this.matrixPosition.x-1, this.matrixPosition.y)){
        //     this.legalMoves.push([this.matrixPosition.x-1,this.matrixPosition.y]);
        // }
        // if(this.checkRange(this.matrixPosition.x-1, this.matrixPosition.y+1)){
        //     this.legalMoves.push([this.matrixPosition.x-1,this.matrixPosition.y+1]);
        // }
        // if(this.checkRange(this.matrixPosition.x, this.matrixPosition.y-1)){
        //     this.legalMoves.push([this.matrixPosition.x,this.matrixPosition.y-1]);
        // }
        // if(this.checkRange(this.matrixPosition.x, this.matrixPosition.y+1)){
        //     this.legalMoves.push([this.matrixPosition.x,this.matrixPosition.y+1]);
        // }
        // if(this.checkRange(this.matrixPosition.x+1, this.matrixPosition.y-1)){
        //     this.legalMoves.push([this.matrixPosition.x+1,this.matrixPosition.y-1]);
        // }
        // if(this.checkRange(this.matrixPosition.x+1, this.matrixPosition.y)){
        //     this.legalMoves.push([this.matrixPosition.x+1,this.matrixPosition.y]);
        // }
        // if(this.checkRange(this.matrixPosition.x+1, this.matrixPosition.y+1)){
        //     this.legalMoves.push([this.matrixPosition.x+1,this.matrixPosition.y+1]);
        // }
    }

    setLegalMoveToMinus(x,y){
        for(let i=0; i<this.legalMoves.length; ++i){
            if(this.legalMoves[i][0] == x & this.legalMoves[i][1] == y){
                this.legalMoves[i][0] = -1;
                this.legalMoves[i][1] = -1;
            }
        }
    }

    returnLetter(){
        return this.letter;
    }
}

class Queen extends Piece{
    constructor(x,y,isWhite){
        super(x,y,isWhite);
        this.letter = "Q"; 
        this.moving = false;  
        this.legalMoves = []; 
        this.findlegalMoves();
    }

    findlegalMoves(){
        // for(let i=1; i<8; ++i){
        //     if(this.checkRange(this.matrixPosition.x+i, this.matrixPosition.y+i)){
        //         this.legalMoves.push([this.matrixPosition.x+i, this.matrixPosition.y+i]);
        //     }
        //     if(this.checkRange(this.matrixPosition.x+i, this.matrixPosition.y-i)){
        //         this.legalMoves.push([this.matrixPosition.x+i, this.matrixPosition.y-i]);
        //     }
        //     if(this.checkRange(this.matrixPosition.x-i, this.matrixPosition.y+i)){
        //         this.legalMoves.push([this.matrixPosition.x-i, this.matrixPosition.y+i]);
        //     }
        //     if(this.checkRange(this.matrixPosition.x-i, this.matrixPosition.y-i)){
        //         this.legalMoves.push([this.matrixPosition.x-i, this.matrixPosition.y-i]);
        //     }
        // }

        // for(let i=1; i<8; ++i){
        //     if(this.checkRange(this.matrixPosition.x+i, this.matrixPosition.y)){
        //         this.legalMoves.push([this.matrixPosition.x+i, this.matrixPosition.y]);
        //     }
        //     if(this.checkRange(this.matrixPosition.x-i, this.matrixPosition.y)){
        //         this.legalMoves.push([this.matrixPosition.x-i, this.matrixPosition.y]);
        //     }
        //     if(this.checkRange(this.matrixPosition.x, this.matrixPosition.y+i)){
        //         this.legalMoves.push([this.matrixPosition.x, this.matrixPosition.y+i]);
        //     }
        //     if(this.checkRange(this.matrixPosition.x, this.matrixPosition.y-i)){
        //         this.legalMoves.push([this.matrixPosition.x, this.matrixPosition.y-i]);
        //     }
        // }

    }

    removeLegalMove(x,y){
        for(let i=0; i<this.legalMoves.length; ++i){
            if(this.legalMoves[i][0] == x & this.legalMoves[i][1] == y){
                this.legalMoves.splice(i,1);
            }
        }
    }
    

    returnLetter(){
        return this.letter;
    }
}

class Bishop extends Piece{
    constructor(x,y,isWhite){
        super(x,y,isWhite);
        this.letter = "B"; 
        this.moving = false;
        this.legalMoves = [];
        this.findlegalMoves();    
    }

    findlegalMoves(){
        // for(let i=1; i<8; ++i){
        //     if(this.checkRange(this.matrixPosition.x+i, this.matrixPosition.y+i)){
        //         this.legalMoves.push([this.matrixPosition.x+i, this.matrixPosition.y+i]);
        //     }
        //     if(this.checkRange(this.matrixPosition.x+i, this.matrixPosition.y-i)){
        //         this.legalMoves.push([this.matrixPosition.x+i, this.matrixPosition.y-i]);
        //     }
        //     if(this.checkRange(this.matrixPosition.x-i, this.matrixPosition.y+i)){
        //         this.legalMoves.push([this.matrixPosition.x-i, this.matrixPosition.y+i]);
        //     }
        //     if(this.checkRange(this.matrixPosition.x-i, this.matrixPosition.y-i)){
        //         this.legalMoves.push([this.matrixPosition.x-i, this.matrixPosition.y-i]);
        //     }
        // }
    }

    returnLetter(){
        return this.letter;
    }

    removeLegalMove(x,y){
        for(let i=0; i<this.legalMoves.length; ++i){
            if(this.legalMoves[i][0] == x & this.legalMoves[i][1] == y){
                this.legalMoves.splice(i,1);
            }
        }
    }

}

class Rook extends Piece{
    constructor(x,y,isWhite){
        super(x,y,isWhite);
        this.letter = "R";  
        this.moving = false;
        this.legalMoves = [];   
        this.findlegalMoves();
    }

    findlegalMoves(){
        //     for(let i=1; i<8; ++i){
        //         if(this.checkRange(this.matrixPosition.x+i, this.matrixPosition.y)){
        //             this.legalMoves.push([this.matrixPosition.x+i, this.matrixPosition.y]);
        //         }
        //         if(this.checkRange(this.matrixPosition.x-i, this.matrixPosition.y)){
        //             this.legalMoves.push([this.matrixPosition.x-i, this.matrixPosition.y]);
        //         }
        //         if(this.checkRange(this.matrixPosition.x, this.matrixPosition.y+i)){
        //             this.legalMoves.push([this.matrixPosition.x, this.matrixPosition.y+i]);
        //         }
        //         if(this.checkRange(this.matrixPosition.x, this.matrixPosition.y-i)){
        //             this.legalMoves.push([this.matrixPosition.x, this.matrixPosition.y-i]);
        //         }
        // }
    }

    returnLetter(){
        return this.letter;
    }

    removeLegalMove(x,y){
        for(let i=0; i<this.legalMoves.length; ++i){
            if(this.legalMoves[i][0] == x & this.legalMoves[i][1] == y){
                this.legalMoves.splice(i,1);
            }
        }
    }

}

class Pawn extends Piece{
    constructor(x,y,isWhite){
        super(x,y,isWhite);
        this.letter = "P";  
        this.moving = false;
        this.legalMoves = [];   
        this.findlegalMoves();
    }

    findlegalMoves(){
        // if(this.isWhite & this.matrixPosition.y==6){
        //     this.legalMoves.push([this.matrixPosition.x, this.matrixPosition.y-2]);
        // }
        // if(!this.isWhite & this.matrixPosition.y==1){
        //     this.legalMoves.push([this.matrixPosition.x, this.matrixPosition.y+2]);
        // }
        // if(this.isWhite){
        //     this.legalMoves.push([this.matrixPosition.x, this.matrixPosition.y-1]);
        // }
        // else{
        //     this.legalMoves.push([this.matrixPosition.x, this.matrixPosition.y+1]);
        // }
    }

    returnLetter(){
        return this.letter;
    }

    removeLegalMove(x,y){
        for(let i=0; i<this.legalMoves.length; ++i){
            if(this.legalMoves[i][0] == x & this.legalMoves[i][1] == y){
                this.legalMoves.splice(i,1);
            }
        }
    }
}

class Knight extends Piece{
    constructor(x,y,isWhite){
        super(x,y,isWhite);
        this.letter = "Kn"; 
        this.moving = false;
        this.legalMoves = [];
        this.findlegalMoves();
    }
    findlegalMoves(){
            // if(this.checkRange(posX+2 , posY+1)){
            //     this.legalMoves.push([posX+2, posY+1]);
            // }
            // if(this.checkRange(posX+2 , posY-1)){
            //     this.legalMoves.push([posX+2, posY-1]);
            // }
            // if(this.checkRange(posX-2 , posY+1)){
            //     this.legalMoves.push([posX-2, posY+1]);
            // }
            // if(this.checkRange(posX-2 , posY-1)){
            //     this.legalMoves.push([posX-2, posY-1]);
            // }
            // if(this.checkRange(posX+1 , posY+2)){
            //     this.legalMoves.push([posX+1, posY+2]);
            // }
            // if(this.checkRange(posX-1 , posY+2)){
            //     this.legalMoves.push([posX-1, posY+2]);
            // }
            // if(this.checkRange(posX+1 , posY-2)){
            //     this.legalMoves.push([posX+1, posY-2]);
            // }
            // if(this.checkRange(posX-1 , posY-2)){
            //     this.legalMoves.push([posX-1, posY-2]);
            // }
        }

    returnLetter(){
        return this.letter;
    }

    removeLegalMove(x,y){
        for(let i=0; i<this.legalMoves.length; ++i){
            if(this.legalMoves[i][0] == x & this.legalMoves[i][1] == y){
                this.legalMoves.splice(i,1);
            }
        }
    }
}