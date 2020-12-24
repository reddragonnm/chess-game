function posToIndex(pos) {
  return p5.Vector.div(pos, tileSize);
}

class Piece {
  constructor(x, y, isWhite) {
    this.pos = p5.Vector.mult(createVector(x, y), tileSize);
    this.prevPos = createVector(0, 0);
    this.isWhite = isWhite;

    this.lifted = false;
  }

  mouseOver() {
    return (this.pos.x < mouseX && mouseX < this.pos.x + tileSize &&
      this.pos.y < mouseY && mouseY < this.pos.y + tileSize);
  }

  lift() {
    this.lifted = true;
    this.prevPos = createVector(this.pos.x, this.pos.y);
  }

  drop() {
    this.lifted = false;
    let p = createVector(
      floor(mouseX / tileSize) * tileSize,
      floor(mouseY / tileSize) * tileSize
    );

    if (isBoardValidMove(p) && this.isValidMove(p)) {
      this.pos = p;
    } else {
      this.pos = this.prevPos;
    }

    return this.pos;
  }

  show() {
    if (this.lifted) {
      this.pos.set(mouseX - tileSize / 2, mouseY - tileSize / 2);
      textSize(70);
    } else {
      textSize(50);
    }

    if (this.isWhite) {
      fill(255);
      stroke(0);
    } else {
      fill(0);
      stroke(255);
    }

    strokeWeight(4);
    textAlign(CENTER, CENTER);
    text(this.letter, this.pos.x + tileSize / 2, this.pos.y + tileSize / 2);
  }
}

class Rook extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'R';
  }

  isValidMove(pos) {
    let pos = posToIndex(pos);
  }
}


class Queen extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'Q';
  }

  isValidMove(pos) {
    return true;
  }
}

class Pawn extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'P';
  }

  isValidMove(pos) {
    return true;
  }
}

class King extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'K';
  }

  isValidMove(pos) {
    return true;
  }
}

class Bishop extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'B';
  }

  isValidMove(pos) {
    return true;
  }
}

class Knight extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'N';
  }

  isValidMove(pos) {
    return true;
  }
}