function evalStaticBoard(board, nMoves) {
    let bPieces = 0;
    let wPieces = 0;

    for (let p of getAllPieces(board)) {
        if (p.isWhite) wPieces += p.points;
        else bPieces += p.points;
    }

    return (wPieces - bPieces) * 2 - nMoves;
}

function aiMove() {
    let moves = [];
    for (let p of getAllPieces(board)) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (p.canGo(createVector(i, j))) {
                    moves.push([p, createVector(i, j)]);
                }
            }
        }
    }

    let bestScore = -Infinity;
    let bestMove;

    for (let move of moves) {
        let pPos = move[0].pos.copy();
        let prevP = "";

        if (board[move[1].x][move[1].y] != "")
          prevP = board[move[1].x][move[1].y].copyPiece();

        board = movePiece(move[0], move[1]);

        move[0].updatePos(pPos);
        board[pPos.x][pPos.y] = move[0];
        board[move[1].x][move[1].y] = prevP;
    }

    let move = random(moves);
    console.log(move);
    movePiece(move[0], move[1]);
    whiteMove = true;
}

function minimax(board, depth, isMaximizing) {
    
}