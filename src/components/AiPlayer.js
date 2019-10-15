export default class AiPlayer {
  /**
   * Ai 持有的子
   * @param {Number} ownChess
   */
  constructor(ownChess, chessContainer) {
    this.ownChess = ownChess;
    this.chessContainer = chessContainer;
  }

  play() {
    return {
      ai_x: 1,
      ai_y: 1
    }
  }
}
