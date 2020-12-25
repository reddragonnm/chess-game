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

    if (this.isWhite) {
      this.king = kingw;
    } else {
      this.king = kingb;
    }

    this.lifted = false;
    this.hasMoved = false;
  }

  mouseOver() {
    return (this.pos.x < mouseX && mouseX < this.pos.x + tileSize &&
      this.pos.y < mouseY && mouseY < this.pos.y + tileSize);
  }

  updatePrevPos() {
    this.prevPos = createVector(this.pos.x, this.pos.y);
  }

  lift() {
    if (this.isWhite) this.king = kingw;
    else this.king = kingb;

    this.lifted = true;
  }

  drop() {
    this.lifted = false;
    let p = createVector(
      floor(mouseX / tileSize) * tileSize,
      floor(mouseY / tileSize) * tileSize
    );

    let notOffScreen = (0 <= p.x && p.x <= width && 0 <= p.y && p.y <= height);

    if (this.isValidMove(p) && notOffScreen && this.king.inCheck.length == 0) {
      this.pos = p;
      this.hasMoved = true;
    } else if (this.king.inCheck.length > 0 && this.validCheckMove(p) && notOffScreen) {
      this.pos = p;
      this.hasMoved = true;
    } else {
      this.pos = this.prevPos;
    }

    return [this.prevPos, this.pos];
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