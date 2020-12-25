let tileSize = 70;
let pickedPiece;

let kingb;
let kingw;

let undoButton;

let board = [
  ['rb', 'nb', 'bb', 'qb', 'kb', 'bb', 'nb', 'rb'],
  ['pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['pw', 'pw', 'pw', 'pw', 'pw', 'pw', 'pw', 'pw'],
  ['rw', 'nw', 'bw', 'qw', 'kw', 'bw', 'nw', 'rw']
];

let history = [board];

function setup() {
  createCanvas(tileSize * 8, tileSize * 8);

  undoButton = createButton('Undo move');
  undoButton.mousePressed(undoBoard);

  initBoard();
  angleMode(DEGREES);
}

function draw() {
  background(255);



  // TODO: when the king is in check:
  // 1. Move the king from the tile
  //       - If there is more than one check
  // 2. Kill the piece which is giving the check
  //       - With another piece
  //       - With the king
  //            . If the piece isn't backed up by another piece of the same color
  //            . If there is only one check
  // 3. Block the piece with another piece

  drawGrid();
  showAllPieces();
  highlightAvailableMoves();

}

function keyPressed() {
  if (key == 's') console.log(history);
}

function mousePressed() {
  if (pickedPiece == null) {
    for (let tile of getAllPieces()) {
      if (tile.mouseOver()) {
        pickedPiece = tile;
        tile.lift();
        break;
      }
    }
  }
}

function undoBoard() {
  if (history.length >= 2) {
    board = history[history.length - 1];
    initBoard();
    history.splice(-1, 1);
  }
}

function mouseReleased() {
  if (pickedPiece != null) {

    let p = pickedPiece.drop();

    let p1 = posToIndex(p[0]);
    let p2 = posToIndex(p[1]);


    if (pickedPiece instanceof Pawn) {
      if (p2.x == 0 || p2.x == 7) {
        pickedPiece = new Queen(p2.y, p2.x, pickedPiece.isWhite);
      }
    }

    board[p1.x][p1.y] = '';
    board[p2.x][p2.y] = pickedPiece;

    pickedPiece.updatePrevPos();

    history.push(boardToString(board));
    pickedPiece = null;
    checkForCheck();
  }
}

function initBoard() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let t = board[i][j];
      if (t != '') {
        let type = t[0];
        let color = t[1];

        let c;

        if (type == 'r') c = Rook;
        if (type == 'n') c = Knight;
        if (type == 'b') c = Bishop;
        if (type == 'q') c = Queen;
        if (type == 'k') c = King;
        if (type == 'p') c = Pawn;

        board[i][j] = new c(j, i, color == 'w');
        if (c == King) {
          if (color == 'w') {
            kingw = board[i][j]
          } else {
            kingb = board[i][j];
          }
        }
      }
    }
  }
}

function boardToString(br) {
  let b = [];
  for (let i = 0; i < 8; i++) {
    let arr = [];
    for (let j = 0; j < 8; j++) {
      let s = '';
      let t = br[i][j];

      if (t == '') {
        arr.push('');
        continue;
      }

      if (t instanceof Pawn) s = 'p';
      if (t instanceof Queen) s = 'q';
      if (t instanceof Rook) s = 'r';
      if (t instanceof King) s = 'k';
      if (t instanceof Knight) s = 'n';
      if (t instanceof Bishop) s = 'b';

      s += (t.isWhite ? 'w' : 'b');
      arr.push(s);
      console.log(t);
    }
    b.push(arr);
  }
  return b;
}

function highlightAvailableMoves() {
  noStroke();
  if (pickedPiece != null) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let t;
        if (pickedPiece.isWhite) t = (kingw.inCheck.length == 0);
        else t = (kingb.inCheck.length == 0);

        if (t) {
          if (pickedPiece.isValidMove(i, j)) {
            fill(125, 255, 0);
            circle(j * tileSize + tileSize / 2, i * tileSize + tileSize / 2, 20);
          }
        } else if (!t && pickedPiece.validCheckMove(i, j)) {
          fill(255, 0, 0);
          circle(j * tileSize + tileSize / 2, i * tileSize + tileSize / 2, 20);
        }
      }
    }
  }
}

function checkForCheck() {
  kingb.inCheck = [];
  kingw.inCheck = [];

  for (let t of getAllPieces()) {
    if (t.isWhite && t.isValidMove(kingb.pos)) {
      kingb.inCheck.push(t);
    }

    if (!t.isWhite && t.isValidMove(kingw.pos)) {
      kingw.inCheck.push(t);
    }
  }
}

function getAllPieces() {
  let arr = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let t = board[i][j];
      if (t != '') arr.push(t);
    }
  }
  return arr;
}

function showAllPieces() {
  for (let p of getAllPieces()) {
    if (p instanceof King && p.inCheck.length > 0) {
      fill(255, 0, 0);
      rect(p.pos.x, p.pos.y, tileSize, tileSize);
    }
    p.show();
  }
}

function drawGrid() {
  stroke(0);
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (i % 2 != j % 2)
        fill(0);
      else
        fill(255);

      rect(i * tileSize, j * tileSize, tileSize, tileSize);
    }
  }
}