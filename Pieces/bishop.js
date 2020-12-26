class Bishop extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'B';

    if (this.isWhite) this.img = white_bishop;
    else this.img = black_bishop;
  }

  isValidMove(goto) {    
    let current = this.pos;

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