let tileSize = 70;
let pickedPiece;

let board = [
  ['', '', '', '', '', '', '', ''],
  ['pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['rw', '', '', '', '', '', '', '']
];

// let board = [
//   ['rb', 'nb', 'bb', 'qb', 'kb', 'bb', 'nb', 'rb'],
//   ['pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb'],
//   ['', '', '', '', '', '', '', ''],
//   ['', '', '', '', '', '', '', ''],
//   ['', '', '', '', '', '', '', ''],
//   ['', '', '', '', '', '', '', ''],
//   ['pw', 'pw', 'pw', 'pw', 'pw', 'pw', 'pw', 'pw'],
//   ['rw', 'nw', 'bw', 'qw', 'kw', 'bw', 'nw', 'rw']
// ];

let human = 'w';
let ai = 'b';
let currentPlayer = 'w';

function isBoardValidMove(pos) {
  return true;
}


function setup() {
  createCanvas(tileSize * 8, tileSize * 8);
  initBoard();
}

function draw() {
  background(255);

  drawGrid();
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

function mouseReleased() {
  if (pickedPiece != null) {
    let pos = pickedPiece.drop();
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
      }
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
    p.show();
  }
}

function drawGrid() {
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