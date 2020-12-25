// utility function to transform screen position to board index
function posToIndex(pos) {
  let n = p5.Vector.div(pos, tileSize)
  return createVector(n.y, n.x);
}

// general class for piece - will be inherited
class Piece {
  constructor(x, y, isWhite) {
    this.pos = p5.Vector.mult(createVector(x, y), tileSize);
    this.isWhite = isWhite;

    this.updatePrevPos();

    this.lifted = false;
    this.hasMoved = false;
  }

  copyPiece() {
    let arr = [Pawn, Queen, Rook, Bishop, King, Knight];
    let t;
    for (let c of arr) {
      if (this instanceof c) {
        t = new c(this.x, this.y, this.isWhite);
      }
    }
    t.prevPos = this.prevPos.copy();
    t.pos = this.pos.copy();
    t.lifted = this.lifted;
    t.hasMoved = this.hasMoved;
    return t;
  }

  mouseOver() {
    return (this.pos.x < mouseX && mouseX < this.pos.x + tileSize &&
      this.pos.y < mouseY && mouseY < this.pos.y + tileSize);
  }

  updatePrevPos() {
    this.prevPos = this.pos.copy();
  }

  lift() {
    this.lifted = true;
  }

  drop() {
    this.lifted = false;
    let p = createVector(
      floor(mouseX / tileSize) * tileSize,
      floor(mouseY / tileSize) * tileSize
    );

    let notOffScreen = (0 <= p.x && p.x <= width && 0 <= p.y && p.y <= height);

    if (
      this.isWhite == whiteMove && this.isValidMove(p) &&
      notOffScreen &&
      validCheckMove(this, p)
    ) {
      this.pos = p;
      this.hasMoved = true;
    } else {
      this.pos = this.prevPos.copy();
    }

    return [this.prevPos, this.pos];
  }

  show() {
    if (this.lifted) {
      this.pos.set(mouseX - tileSize / 2, mouseY - tileSize / 2);
      image(this.img, this.pos.x - tileSize/4, this.pos.y - tileSize/4, tileSize * 1.5, tileSize * 1.5);
    }
    else {
      image(this.img, this.pos.x, this.pos.y, tileSize, tileSize);
    }

  }
}