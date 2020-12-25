class Pawn extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'P';
  }

  validCheckMove() {
    return true;
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