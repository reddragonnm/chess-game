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

let history = [];
let hn = 0;

let whiteMove = true;

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
  white_king = loadImage('assets/white_king.png');
  white_knight = loadImage('assets/white_knight.png');
  white_rook = loadImage('assets/white_rook.png');
  white_pawn = loadImage('assets/white_pawn.png');
  white_bishop = loadImage('assets/white_bishop.png');
  white_queen = loadImage('assets/white_queen.png');

  black_king = loadImage("assets/black_king.png");
  black_knight = loadImage("assets/black_knight.png");
  black_rook = loadImage("assets/black_rook.png");
  black_pawn = loadImage("assets/black_pawn.png");
  black_bishop = loadImage("assets/black_bishop.png");
  black_queen = loadImage("assets/black_queen.png");
}

function copyBoard(br) {
  let b = [];
  for (let i of br) {
    let k = [];
    for (let j of i) {
      if (j != "") k.push(j.copyPiece());
      else k.push("");
    }
    b.push(k);
  }
  return b;
}

function setup() {
  createCanvas(tileSize * 8, tileSize * 8);

  undoButton = createButton('Undo move');
  undoButton.mousePressed(undoBoard);

  initBoard();
  angleMode(DEGREES);
}

function draw() {
  background(255);

  drawGrid();
  showAllPieces();

  let t = checkForCheck(board);
  kingb.inCheck = t[0];
  kingw.inCheck = t[1];

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
  if (history.length > 0) {
    board = copyBoard(history.splice(-2, 1)[0]);
    console.log('hello');
  } else {
    board = [
      ['rb', 'nb', 'bb', 'qb', 'kb', 'bb', 'nb', 'rb'],
      ['pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['pw', 'pw', 'pw', 'pw', 'pw', 'pw', 'pw', 'pw'],
      ['rw', 'nw', 'bw', 'qw', 'kw', 'bw', 'nw', 'rw']
    ];
    initBoard();
  }
}

function movePiece(piece, p1, p2, br) {

  if (!p1.equals(p2) && br == null) {
    history.push(copyBoard(board));
    whiteMove = !whiteMove;
  }

  if (br == null) br = board;



  if (pickedPiece instanceof Pawn) {
    if (p2.x == 0 || p2.x == 7) {
      piece = new Queen(p2.y, p2.x, piece.isWhite);
    }
  }

  br[p1.x][p1.y] = '';
  br[p2.x][p2.y] = piece;

  piece.updatePrevPos();

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

    let p1 = posToIndex(p[0]);
    let p2 = posToIndex(p[1]);

    let boardCopy = copyBoard(board); 
    let a = checkForCheck(boardCopy);

    board = movePiece(pickedPiece, p1, p2);

    let b = checkForCheck(board);
    kingb.inCheck = b[0];
    kingw.inCheck = b[1];

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

// function highlightAvailableMoves() {
//   noStroke();
//   if (pickedPiece != null) {
//     for (let i = 0; i < 8; i++) {
//       for (let j = 0; j < 8; j++) {
//         let t;
//         if (pickedPiece.isWhite) t = (!kingw.inCheck);
//         else t = (!kingb.inCheck);

//         if (pickedPiece.isValidMove(i, j) && pickedPiece.isWhite == whiteMove) {
//           fill(125, 255, 0);
//           circle(j * tileSize + tileSize / 2, i * tileSize + tileSize / 2, 20);
//         }
//       }
//     }
//   }
// }

function checkForCheck(br) {
  let wCheck = false;
  let bCheck = false;

  if (br == null) br = board;

  for (let t of getAllPieces(br)) {
    if (t.isWhite && t.isValidMove(kingb.pos)) {
      bCheck = true;
    }

    if (!t.isWhite && t.isValidMove(kingw.pos)) {
      wCheck = true;
    }
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