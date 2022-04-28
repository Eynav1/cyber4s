class Game {
  constructor(firstPlayer) {
    this.boardData = new BoardData();
    this.currentPlayer = firstPlayer;
    this.winner = undefined;
  }

  // Tries to move. Returns true if successful.
  tryMove(piece, row, col) {
    const possibleMoves = this.getPossibleMoves(piece);
    // possibleMoves looks like this: [[1,2], [3,2]]
    for (const possibleMove of possibleMoves) {
      // possibleMove looks like this: [1,2]
      if (possibleMove[0] === row && possibleMove[1] === col) {
        // There is a legal move
        const removedPiece = this.boardData.removePiece(row, col);
        piece.row = row;
        piece.col = col;
        if (removedPiece !== undefined && removedPiece.type === KING) {
          this.winner = piece.player
        }
        this.currentPlayer = piece.getOpponent();
        return true;
      }
    }
    return false;
  }

  getPossibleMoves(piece) {
    if (this.currentPlayer !== piece.player || this.winner !== undefined) {
      return [];
    }
    return piece.getPossibleMoves(this.boardData);
  }
}