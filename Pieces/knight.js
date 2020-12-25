class Knight extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'N';
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