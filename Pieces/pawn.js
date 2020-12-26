class Pawn extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = 'P';

    if (this.isWhite) this.img = white_pawn;
    else this.img = black_pawn;
  }

  isValidMove(goto) {
    let current = this.pos;

    if (current.x >= 7 || current.x <= 0) {
      return false;
    }

    // relative moves possible
    let arr = [
      [-1, 0],
      [-2, 0],
      [-1, -1],
      [-1, 1]
    ]

    for (let i = 0; i < 4; i++) {
      let a = current.x + arr[i][0] * (this.isWhite ? 1 : -1);
      let b = current.y + arr[i][1];

      // if first or second moves
      if (
        i == 0 || // first move
        (!this.hasMoved && i == 1) // second move and ensure that the pawn hasn't moved before
      ) {
        if (board[a][b] == "" && goto.equals(createVector(a, b))) return true;
      }

      // if third or fourth - diagonal moves
      if (i==2 || i==3) {
        if (board[a][b] != '' && goto.equals(createVector(a, b))) return true;
      }
    }

    return false;
  }
}