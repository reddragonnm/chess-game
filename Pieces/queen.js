class Queen extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'Q';
  }

  validCheckMove(a, b) {
    let goto;
    if (a instanceof p5.Vector) goto = posToIndex(a);
    else goto = createVector(a, b);
    let current = posToIndex(this.prevPos);

    // Kill the piece which is giving the check
    for (let t of this.king.inCheck) {
      if (goto.equals(posToIndex(t.pos)) && this.isValidMove(t.pos)) return true;
    }

    return false;
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