// utility function to transform board index to screen position
function indexToPos(pos) {
  let n = p5.Vector.mult(pos, tileSize);
  return createVector(n.y, n.x);
}

// general class for piece - will be inherited
class Piece {
  constructor(x, y, isWhite) {
    this.pos = createVector(x, y);

    this.isWhite = isWhite;

    this.lifted = false;
    this.hasMoved = false;
  }

  copyPiece() {
    let arr = [Pawn, Queen, Rook, Bishop, King, Knight];
    let t;
    for (let c of arr) {
      if (this instanceof c) {
        t = new c(this.pos.x, this.pos.y, this.isWhite);
      }
    }
    t.pos = this.pos.copy();
    t.lifted = this.lifted;
    t.hasMoved = this.hasMoved;
    return t;
  }

  mouseOver() {
    let pos = indexToPos(this.pos);
    return (
      pos.x < mouseX &&
      mouseX < pos.x + tileSize &&
      pos.y < mouseY &&
      mouseY < pos.y + tileSize
    );
  }

  updatePos(pos) {
    this.pos = pos;
  }

  lift() {
    this.lifted = true;
  }

  drop() {
    this.lifted = false;
    let p = createVector(
      constrain(floor(mouseY / tileSize), 0, 7),
      constrain(floor(mouseX / tileSize), 0, 7)
    );

    if (this.canGo(p)) {
      this.hasMoved = true;
      return [this.pos, p];
    }
  }

  canGo(p) {
    return this.isWhite == whiteMove && this.isValidMove(p) && validCheckMove(this, p);
  }

  show() {
    if (this.lifted) {
      imageMode(CENTER);
      image(this.img, mouseX, mouseY, tileSize * 1.5, tileSize * 1.5);
    }
    else {
      imageMode(CORNER);
      let pos = indexToPos(this.pos);
      image(this.img, pos.x, pos.y, tileSize, tileSize);
    }

  }
}