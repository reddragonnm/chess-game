class Knight extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.points = 3;

    if (this.isWhite) this.img = white_knight;
    else this.img = black_knight;
  }

  isValidMove(goto) {
    let current = this.pos;

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