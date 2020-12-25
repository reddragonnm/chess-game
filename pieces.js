function posToIndex(pos) {
  let n = p5.Vector.div(pos, tileSize)
  return createVector(n.y, n.x);
}

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
    console.log(this.king);
    this.lifted = true;
  }

  drop() {
    this.lifted = false;
    let p = createVector(
      floor(mouseX / tileSize) * tileSize,
      floor(mouseY / tileSize) * tileSize
    );

    let notOffScreen = (0 <= p.x && p.x <= width && 0 <= p.y && p.y <= height);

    if (this.isValidMove(p) && notOffScreen) {
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

class Rook extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'R';
  }

  isValidMove(a, b) {
    let goto;
    if (a instanceof p5.Vector) goto = posToIndex(a);
    else goto = createVector(a, b);
    let current = posToIndex(this.prevPos);

    // if (pos.x == tp.x || pos.y == tp.y) return true;

    // right
    for (let i = current.y; i < 8; i++) {
      let t = board[current.x][i];
      if (t == this) continue;

      if (t == '') {
        if (goto.equals(createVector(current.x, i))) return true;
      } else if (t.isWhite != this.isWhite) { // not same color
        if (goto.equals(createVector(current.x, i))) return true;
        break;
      } else {
        break;
      }
    }

    // left
    for (let i = current.y; i >= 0; i--) {
      let t = board[current.x][i];
      if (t == this) continue;

      if (t == '') {
        if (goto.equals(createVector(current.x, i))) return true;
      } else if (t.isWhite != this.isWhite) { // not same color
        if (goto.equals(createVector(current.x, i))) return true;
        break;
      } else {
        break;
      }
    }

    // up
    for (let i = current.x; i >= 0; i--) {
      let t = board[i][current.y];
      if (t == this) continue;

      if (t == '') {
        if (goto.equals(createVector(i, current.y))) return true;
      } else if (t.isWhite != this.isWhite) { // not same color
        if (goto.equals(createVector(i, current.y))) return true;
        break;
      } else {
        break;
      }
    }

    // down
    for (let i = current.x; i < 8; i++) {
      let t = board[i][current.y];
      if (t == this) continue;

      if (t == '') {
        if (goto.equals(createVector(i, current.y))) return true;
      } else if (t.isWhite != this.isWhite) { // not same color
        if (goto.equals(createVector(i, current.y))) return true;
        break;
      } else {
        break;
      }
    }

    return false;
  }
}

class Pawn extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'P';
  }

  isValidMove(a, b) {
    let goto;
    let current = posToIndex(this.prevPos);

    if (a instanceof p5.Vector) {
      goto = posToIndex(a);
    } else goto = createVector(a, b);

    if ((!this.isWhite && current.x >= 7) || (this.isWhite && current.x <= 0)) {
      return false;
    }

    if (this.isWhite) {
      if (goto.equals(createVector(current.x - 1, current.y)) && board[current.x - 1][current.y] == '') return true;
      if (!this.hasMoved)
        if (goto.equals(createVector(current.x - 2, current.y)) && board[current.x - 2][current.y] == '') return true;

      let t = board[current.x - 1][current.y - 1];
      if (t != null && t != '' && !t.isWhite) {
        if (goto.equals(createVector(current.x - 1, current.y - 1))) return true;
      }

      t = board[current.x - 1][current.y + 1];
      if (t != null && t != '' && !t.isWhite) {
        if (goto.equals(createVector(current.x - 1, current.y + 1))) return true;

      }
    } else {
      if (goto.equals(createVector(current.x + 1, current.y)) && board[current.x + 1][current.y] == '') return true;
      if (!this.hasMoved)
        if (goto.equals(createVector(current.x + 2, current.y)) && board[current.x + 2][current.y] == '') return true;

      let t = board[current.x + 1][current.y - 1];
      if (t != null && t != '' && t.isWhite) {
        if (goto.equals(createVector(current.x + 1, current.y - 1))) return true;
      }

      t = board[current.x + 1][current.y + 1];
      if (t != null && t != '' && t.isWhite) {
        if (goto.equals(createVector(current.x + 1, current.y + 1))) return true;
      }
    }

    return false;
  }
}

class Bishop extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'B';
  }

  isValidMove(a, b) {
    let goto;
    let current = posToIndex(this.prevPos);

    if (a instanceof p5.Vector) {
      goto = posToIndex(a);
    } else goto = createVector(a, b);

    for (let i = 0; i < 8; i++) {
      let a = current.x - i;
      let b = current.y - i;

      if (a < 0 || b < 0) break;

      let t = board[a][b];
      if (t == this) continue;

      if (t == '') {
        if (goto.equals(createVector(a, b))) return true;
      } else if (t.isWhite != this.isWhite) {
        if (goto.equals(createVector(a, b))) return true;
        break;
      } else {
        break;
      }
    }

    for (let i = 0; i < 8; i++) {
      let a = current.x + i;
      let b = current.y + i;

      if (a > 7 || b > 7) break;

      let t = board[a][b];
      if (t == this) continue;

      if (t == '') {
        if (goto.equals(createVector(a, b))) return true;
      } else if (t.isWhite != this.isWhite) {
        if (goto.equals(createVector(a, b))) return true;
        break;
      } else {
        break;
      }
    }

    for (let i = 0; i < 8; i++) {
      let a = current.x + i;
      let b = current.y - i;

      if (a > 7 || b > 7 || a < 0 || b < 0) break;

      let t = board[a][b];
      if (t == this) continue;

      if (t == '') {
        if (goto.equals(createVector(a, b))) return true;
      } else if (t.isWhite != this.isWhite) {
        if (goto.equals(createVector(a, b))) return true;
        break;
      } else {
        break;
      }
    }

    for (let i = 0; i < 8; i++) {
      let a = current.x - i;
      let b = current.y + i;

      if (a > 7 || b > 7 || a < 0 || b < 0) break;

      let t = board[a][b];
      if (t == this) continue;

      if (t == '') {
        if (goto.equals(createVector(a, b))) return true;
      } else if (t.isWhite != this.isWhite) {
        if (goto.equals(createVector(a, b))) return true;
        break;
      } else {
        break;
      }
    }

    return false;
  }
}


class Queen extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'Q';
  }

  isValidMove(a, b) {
    let goto;
    let current = posToIndex(this.prevPos);

    if (a instanceof p5.Vector) {
      goto = posToIndex(a);
    } else goto = createVector(a, b);

    for (let i = current.y; i < 8; i++) {
      let t = board[current.x][i];
      if (t == this) continue;

      if (t == '') {
        if (goto.equals(createVector(current.x, i))) return true;
      } else if (t.isWhite != this.isWhite) { // not same color
        if (goto.equals(createVector(current.x, i))) return true;
        break;
      } else {
        break;
      }
    }

    // left
    for (let i = current.y; i >= 0; i--) {
      let t = board[current.x][i];
      if (t == this) continue;

      if (t == '') {
        if (goto.equals(createVector(current.x, i))) return true;
      } else if (t.isWhite != this.isWhite) { // not same color
        if (goto.equals(createVector(current.x, i))) return true;
        break;
      } else {
        break;
      }
    }

    // up
    for (let i = current.x; i >= 0; i--) {
      let t = board[i][current.y];
      if (t == this) continue;

      if (t == '') {
        if (goto.equals(createVector(i, current.y))) return true;
      } else if (t.isWhite != this.isWhite) { // not same color
        if (goto.equals(createVector(i, current.y))) return true;
        break;
      } else {
        break;
      }
    }

    // down
    for (let i = current.x; i < 8; i++) {
      let t = board[i][current.y];
      if (t == this) continue;

      if (t == '') {
        if (goto.equals(createVector(i, current.y))) return true;
      } else if (t.isWhite != this.isWhite) { // not same color
        if (goto.equals(createVector(i, current.y))) return true;
        break;
      } else {
        break;
      }
    }

    for (let i = 0; i < 8; i++) {
      let a = current.x - i;
      let b = current.y - i;

      if (a < 0 || b < 0) break;

      let t = board[a][b];
      if (t == this) continue;

      if (t == '') {
        if (goto.equals(createVector(a, b))) return true;
      } else if (t.isWhite != this.isWhite) {
        if (goto.equals(createVector(a, b))) return true;
        break;
      } else {
        break;
      }
    }

    for (let i = 0; i < 8; i++) {
      let a = current.x + i;
      let b = current.y + i;

      if (a > 7 || b > 7) break;

      let t = board[a][b];
      if (t == this) continue;

      if (t == '') {
        if (goto.equals(createVector(a, b))) return true;
      } else if (t.isWhite != this.isWhite) {
        if (goto.equals(createVector(a, b))) return true;
        break;
      } else {
        break;
      }
    }

    for (let i = 0; i < 8; i++) {
      let a = current.x + i;
      let b = current.y - i;

      if (a > 7 || b > 7 || a < 0 || b < 0) break;

      let t = board[a][b];
      if (t == this) continue;

      if (t == '') {
        if (goto.equals(createVector(a, b))) return true;
      } else if (t.isWhite != this.isWhite) {
        if (goto.equals(createVector(a, b))) return true;
        break;
      } else {
        break;
      }
    }

    for (let i = 0; i < 8; i++) {
      let a = current.x - i;
      let b = current.y + i;

      if (a > 7 || b > 7 || a < 0 || b < 0) break;

      let t = board[a][b];
      if (t == this) continue;

      if (t == '') {
        if (goto.equals(createVector(a, b))) return true;
      } else if (t.isWhite != this.isWhite) {
        if (goto.equals(createVector(a, b))) return true;
        break;
      } else {
        break;
      }
    }

    return false;
  }
}

class King extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'K';

    this.inCheck = [];
  }

  isValidMove(a, b) {
    let goto;
    let current = posToIndex(this.prevPos);

    if (a instanceof p5.Vector) {
      goto = posToIndex(a);
    } else goto = createVector(a, b);

    let arr = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ]

    for (let i of arr) {
      let a = i[0] + current.x;
      let b = i[1] + current.y;
      if (0 <= a && a < 8 && 0 <= b && b < 8 && board[a][b].isWhite != this.isWhite) {
        if (goto.equals(createVector(a, b))) return true;
      }
    }

    return false;
  }
}

class Knight extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'N';
  }

  isValidMove(a, b) {
    let goto;
    let current = posToIndex(this.prevPos);

    if (a instanceof p5.Vector) {
      goto = posToIndex(a);
    } else goto = createVector(a, b);

    let arr = [
      [-2, -1],
      [-2, 1],
      [-1, 2],
      [-1, -2],

      [2, -1],
      [2, 1],
      [1, 2],
      [1, -2],
    ]

    for (let i of arr) {
      let a = i[0] + current.x;
      let b = i[1] + current.y;
      if (0 <= a && a < 8 && 0 <= b && b < 8 && board[a][b].isWhite != this.isWhite) {
        if (goto.equals(createVector(a, b))) return true;
      }
    }

    return false;
  }
}