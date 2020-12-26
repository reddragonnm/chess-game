function evalStaticBoard(board, nMoves) {
    let bPieces = 0;
    let wPieces = 0;

    for (let p of getAllPieces(board)) {
        if (p.isWhite) wPieces++;
        else bPieces++;
    }

    return (wPieces - bPieces) - nMoves;
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

    let move = random(moves);
    movePiece(move[0], move[1]);

    whiteMove = true;
}