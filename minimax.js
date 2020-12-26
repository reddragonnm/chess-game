function aiMove() {
    let moves = [];
    for (let p of getAllPieces(board)) {
        for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (p.canGo(createVector(i, j))) {
            //   movePiece(p, )
            moves.push([p, createVector(i, j)]);
            }
        }
        }
    }

    let move = random(moves);
    movePiece(move[0], move[1]);

    whiteMove = true;
}