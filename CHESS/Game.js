class Game {
  constructor(firstPlayer) {
    this.boardData = new BoardData();
    this.currentPlayer = firstPlayer;
    this.winner = undefined;
  }

  // Tries to move. Returns true if successful.
  tryMove(piece, row, col) {
    const possibleMoves = this.getPossibleMoves(piece);
    for (const possibleMove of possibleMoves) {
      //if There is a legal move
      if (possibleMove[0] === row && possibleMove[1] === col) {
        const removedPiece = this.boardData.removePiece(row, col);
        piece.row = row;
        piece.col = col;
        //if we eat the king
        if (removedPiece !== undefined && removedPiece.type === KING) {
          this.winner = piece.player
        }
        this.currentPlayer = piece.getOpponent();
        return true;
      }
    }
    return false;
  }
  //when we have a winner no one can move
  getPossibleMoves(piece) {
    if (this.currentPlayer !== piece.player || this.winner !== undefined) {
      return [];
    }else{
    return piece.getPossibleMoves(this.boardData);
    }
  }
}