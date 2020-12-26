let white_king;
let white_knight;
let white_rook;
let white_pawn;
let white_queen;
let white_bishop;

let black_king;
let black_knight;
let black_rook;
let black_pawn;
let black_queen;
let black_bishop;

function preload() {
  white_king = loadImage("assets/white_king.png");
  white_knight = loadImage("assets/white_knight.png");
  white_rook = loadImage("assets/white_rook.png");
  white_pawn = loadImage("assets/white_pawn.png");
  white_bishop = loadImage("assets/white_bishop.png");
  white_queen = loadImage("assets/white_queen.png");

  black_king = loadImage("assets/black_king.png");
  black_knight = loadImage("assets/black_knight.png");
  black_rook = loadImage("assets/black_rook.png");
  black_pawn = loadImage("assets/black_pawn.png");
  black_bishop = loadImage("assets/black_bishop.png");
  black_queen = loadImage("assets/black_queen.png");
}

let tileSize = 70;
let pickedPiece;

let kingb;
let kingw;

let undoButton;
let winner = '';

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

let whiteMove = true;

function copyBoard(br) {
  let b = [];
  for (let i of br) {
    let k = [];
    for (let j of i) {
      if (j != '') k.push(j.copyPiece());
      else k.push('');
    }
    b.push(k);
  }
  return b;
}

function setup() {
  createCanvas(tileSize * 8, tileSize * 8);

  initBoard();
  angleMode(DEGREES);
}

function draw() {
  background(255);

  showBoard();
  showAllPieces();
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

function movePiece(piece, p1, p2, br) {
  if (!p1.equals(p2) && br == null) {
    whiteMove = !whiteMove;
  }

  if (br == null) br = board;

  if (piece instanceof Pawn) {
    if (p2.x == 0 || p2.x == 7) {
      piece = new Queen(p2.y, p2.x, piece.isWhite);
    }
  }

  br[p1.x][p1.y] = '';
  br[p2.x][p2.y] = piece;

  piece.updatePos(p2);

  return br;
}

function validCheckMove(a, b, isWhite) {
  if (isWhite == whiteMove) {
  }

  // TODO: when the king is in check:
  // 1. Move the king from the tile
  //       - If there is more than one check
  // 2. Kill the piece which is giving the check
  //       - With another piece
  //       - With the king
  //            . If the piece isn't backed up by another piece of the same color
  //            . If there is only one check
  // 3. Block the piece with another piece

  return true;
}


function mouseReleased() {
  if (pickedPiece != null) {
    let p = pickedPiece.drop();

    if (p != null) {
       board = movePiece(pickedPiece, p[0], p[1]);

       let b = checkForCheck(board);
       kingb.inCheck = b[0];
       kingw.inCheck = b[1];
    }

    pickedPiece = null;
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

        board[i][j] = new c(i, j, color == 'w');
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

function checkForCheck(br) {
  let wCheck = false;
  let bCheck = false;

  if (br == null) br = board;

  for (let t of getAllPieces(br)) {
    if (t.isWhite && t.isValidMove(kingb.pos))
      bCheck = true;

    if (!t.isWhite && t.isValidMove(kingw.pos))
      wCheck = true;
  }

  return [bCheck, wCheck];
}

function getAllPieces(br) {
  if (br == null) {
    br = board;
  }

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
    if (p instanceof King && p.inCheck) {
      fill(255, 0, 0);
      let pos = indexToPos(p.pos);
      rect(pos.x, pos.y, tileSize, tileSize);
    }
    p.show();
  }
}

function showBoard() {
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
