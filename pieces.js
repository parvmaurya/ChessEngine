
class Piece{
    constructor(x,y,isWhite,letter){
        this.matrixPosition = createVector(x,y);
        this.pixelPosition = createVector(x*squareHeight + squareHeight/2, y*squareHeight + squareHeight/2);

        this.isWhite = isWhite;
        this.letter = letter;
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
        this.legalMoves = [];  
    }
}

class Queen extends Piece{
    constructor(x,y,isWhite){
        super(x,y,isWhite);
        this.letter = "Q"; 
        this.legalMoves = []; 
    }
}

class Bishop extends Piece{
    constructor(x,y,isWhite){
        super(x,y,isWhite);
        this.letter = "B"; 
        this.moving = false;
        this.legalMoves = [];   
    }
}

class Rook extends Piece{
    constructor(x,y,isWhite){
        super(x,y,isWhite);
        this.letter = "R";  
        this.legalMoves = [];  
    }
}

class Pawn extends Piece{
    constructor(x,y,isWhite){
        super(x,y,isWhite);
        this.letter = "P";  
        this.legalMoves = [];  
    }
}

class Knight extends Piece{
    constructor(x,y,isWhite){
        super(x,y,isWhite);
        this.letter = "Kn"; 
        this.legalMoves = [];
    }
}