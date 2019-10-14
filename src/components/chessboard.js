
import React from 'react';

const BLACK_CHESS = 0
const WHITE_CHESS = 1
const EMPATY_CHESS = -1

export default class Chessboard extends React.Component {
  constructor() {
    super()
    //方格宽度
    this.width = 30
    //方格数量
    this.linenum = 15
    //-1表示空白，0表示黑，1表示白
    this.chessContainer = []
    //当前棋子颜色, 0 黑， 1白
    this.currentChessColor = 0;
    for (let i = 0; i < this.linenum; i++) {
      this.chessContainer[i] = []
      for (let j = 0; j < this.linenum; j++) {
        this.chessContainer[i][j] = -1
      }
    }
  }

  setChessContainer(x_line, y_line, currentChessColor) {
    this.chessContainer[x_line - 1][y_line - 1] = currentChessColor
  }

  initBlack(x, y) {
    let ctx = this.ctx;
    ctx.fillStyle = 'black'
    ctx.beginPath();
    ctx.arc(this.width * x, this.width * y, 4, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  componentDidMount() {
    this.c = document.getElementById("chessboard");
    this.c.addEventListener("click", (e) => this.clickBoard(e), false)
    let ctx = this.c.getContext("2d");
    this.ctx = ctx
    for (let i = 1; i <= this.linenum; i++) {
      ctx.moveTo(i * this.width, this.width);
      ctx.lineTo(i * this.width, this.width * this.linenum);
    }
    for (let i = 1; i <= this.linenum; i++) {
      ctx.moveTo(this.width, i * this.width);
      ctx.lineTo(this.width * this.linenum, i * this.width);
    }
    ctx.stroke()

    //绘制地图上的5个点
    this.initBlack(4, 4)
    this.initBlack(12, 4)
    this.initBlack(4, 12)
    this.initBlack(12, 12)
    this.initBlack(8, 8)
  }

  draw_chess(x_line, y_line, color) {
    let ctx = this.ctx
    color = (color === BLACK_CHESS ? 'black' : 'white')
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x_line * this.width, y_line * this.width, 10, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  clickBoard(e) {
    let x = e.pageX;
    let y = e.pageY;
    x -= this.c.offsetLeft;
    y -= this.c.offsetTop;
    let x_line = parseInt(Number(x / this.width).toFixed())
    let y_line = parseInt(Number(y / this.width).toFixed())
    if (x_line > 15 || x_line < 1 || y_line > 15 || y_line < 1) {
      return
    }
    this.x_line = x_line
    this.y_line = y_line
    this.draw_chess(x_line, y_line, this.currentChessColor)
    this.currentChessColor = (this.currentChessColor === BLACK_CHESS ? WHITE_CHESS : BLACK_CHESS)
    this.setChessContainer(x_line, y_line, this.currentChessColor);
  }

  render() {
    return <>
      <canvas id="chessboard" width="800" height="800"></canvas>
    </>
  }
}
