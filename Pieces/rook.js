class Rook extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'R';

    if (this.isWhite) this.img = white_rook;
    else this.img = black_rook;
  }

  isValidMove(goto) {
    let current = this.pos;

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