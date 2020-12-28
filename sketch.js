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

let maxDepth = 2;
let tileSize = 65;
let pickedPiece;
let halfMoves = 0;

let kingb;
let kingw;
let enPassant;

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

function movePiece(piece, p2, br) {
  let p1 = piece.pos;

  if (!p1.equals(p2) && br == null) {
    piece.hasMoved = true;
    whiteMove = !whiteMove;
    halfMoves += 1;
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

function validCheckMove(piece, goto) {
  let pPos = piece.pos.copy();
  let prevP = '';
  if (board[goto.x][goto.y] != '')
    prevP = board[goto.x][goto.y].copyPiece();

  let a = checkForCheck(board);

  piece.updatePos(goto);

  board[pPos.x][pPos.y] = '';
  board[goto.x][goto.y] = piece;

  let b = checkForCheck(board);

  piece.updatePos(pPos);
  board[pPos.x][pPos.y] = piece;
  board[goto.x][goto.y] = prevP;

  if (a[0] && a[0] == b[0]) return false;
  if (a[1] && a[1] == b[1]) return false;

  if (!piece.isWhite && !whiteMove) {
    if (!a[0] && b[0]) return false;
  }

  if (piece.isWhite && whiteMove) {
    if (!a[1] && b[1]) return false;
  }

  return true;
}

function mouseReleased() {
  if (pickedPiece != null) {
    let p = pickedPiece.drop();

    if (p != null) {
      board = movePiece(pickedPiece, p);

      let b = checkForCheck(board);
      kingb.inCheck = b[0];
      kingw.inCheck = b[1];
    }

    pickedPiece = null;

    winner = checkForGameOver(board);
    if (winner != '') {
      let p = createElement('h1', winner);
    }
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

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let t = br[i][j];
      for (let p of getAllPieces(br)) {
        if (p instanceof King && t != '') {
          if (p.isWhite) {
            if (!t.isWhite && t.isValidMove(p.pos)) {
              wCheck = true;
            }
          } else {
            if (t.isWhite && t.isValidMove(p.pos)) {
              bCheck = true;
            }
          }
        }
      }
    }
  }

  return [bCheck, wCheck];
}

function checkForGameOver(br) {
  if (br == null) br = board;

  let canGoN = 0;
  let w = '';

  for (let p of getAllPieces(br)) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (p.canGo(createVector(i, j))) canGoN++;
      }
    }
  }

  if (canGoN == 0) {
    if (whiteMove && kingw.inCheck) w = 'Checkmate by black';
    else if (!whiteMove && kingb.inCheck) w = 'Checkmate by white';
    else w = 'Stalemate';
  }
  if (halfMoves >= 100) {
    w = 'Draw by 50 move rule';
  }

  return w;
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