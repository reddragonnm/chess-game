class King extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'K';

    this.inCheck = [];
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
      for (let t of getAllPieces()) {
        if (0 <= a && a < 8 && 0 <= b && b < 8 && board[a][b].isWhite != this.isWhite) {
          if (goto.equals(createVector(a, b))) return true;
        }
      }
    }

    return false;
  }
}