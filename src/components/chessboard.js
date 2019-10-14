
import React from 'react';

const BLACK_CHESS = 0
const WHITE_CHESS = 1
const EMPATY_CHESS = -1
//水平
const HORIZONTAL = 'horizontal'
//垂直
const VERTICAL = 'vertical'
//45倾斜方向
const DEGREE45 = 'degree45'
//135倾斜方向
const DEGREE135 = 'degree135'

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
    //禁止下子在同一个地方
    if (this.chessContainer[x_line - 1][y_line - 1] != -1) {
      return false
    }
    this.chessContainer[x_line - 1][y_line - 1] = currentChessColor
    return true
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
    let isSetChess = this.setChessContainer(x_line, y_line, this.currentChessColor);
    if (!isSetChess) {
      return
    }
    this.draw_chess(x_line, y_line, this.currentChessColor)
    let isWin = this.isWin(x_line, y_line, this.currentChessColor)
    isWin && alert('win')
    //下一个子设置为相反颜色
    this.currentChessColor = (this.currentChessColor === BLACK_CHESS ? WHITE_CHESS : BLACK_CHESS)
  }

  //寻找各个方位，是否有连续5个子
  isWin(x_line, y_line, currentChessColor) {
    //将canvas坐标转化为数组坐标
    let x = x_line - 1
    let y = y_line - 1
    let isWin = false
    isWin = this.getContinusChess(x, y, currentChessColor, HORIZONTAL) >= 5
    if (isWin) return true
    isWin = this.getContinusChess(x, y, currentChessColor, VERTICAL) >= 5
    if (isWin) return true
    isWin = this.getContinusChess(x, y, currentChessColor, DEGREE45) >= 5
    if (isWin) return true
    isWin = this.getContinusChess(x, y, currentChessColor, DEGREE135) >= 5
    if (isWin) return true
    return false
  }

  addContinusChessByDirect(x, y, currentChessColor, direct) {
    if (this.chessContainer[x][y] === -1) {
      return 0
    }
    if (this.chessContainer[x][y] !== currentChessColor) {
      return 0
    }
    switch (direct) {
      case 'x+':
        return this.addContinusChessByDirect(x + 1, y, currentChessColor, 'x+') + 1
      case 'x-':
        return this.addContinusChessByDirect(x - 1, y, currentChessColor, 'x-') + 1
      case 'y+':
        return this.addContinusChessByDirect(x, y + 1, currentChessColor, 'y+') + 1
      case 'y-':
        return this.addContinusChessByDirect(x, y - 1, currentChessColor, 'y-') + 1
      case 'x+y+':
        return this.addContinusChessByDirect(x + 1, y + 1, currentChessColor, 'x+y+') + 1
      case 'x-y-':
        return this.addContinusChessByDirect(x - 1, y - 1, currentChessColor, 'x-y-') + 1
      case 'x-y+':
        return this.addContinusChessByDirect(x - 1, y + 1, currentChessColor, 'x-y+') + 1
      case 'x+y-':
        return this.addContinusChessByDirect(x + 1, y - 1, currentChessColor, 'x+y-') + 1
    }
  }

  getContinusChess(x, y, currentChessColor, direct) {
    switch (direct) {
      case HORIZONTAL:
        return this.addContinusChessByDirect(x + 1, y, currentChessColor, 'x+') +
          this.addContinusChessByDirect(x - 1, y, currentChessColor, 'x-') + 1
      case VERTICAL:
        return this.addContinusChessByDirect(x, y + 1, currentChessColor, 'y+') +
          this.addContinusChessByDirect(x, y - 1, currentChessColor, 'y-') + 1
      case DEGREE45:
        return this.addContinusChessByDirect(x + 1, y + 1, currentChessColor, 'x+y+') +
          this.addContinusChessByDirect(x - 1, y - 1, currentChessColor, 'x-y-') + 1
      case DEGREE135:
        return this.addContinusChessByDirect(x - 1, y + 1, currentChessColor, 'x-y+') +
          this.addContinusChessByDirect(x + 1, y - 1, currentChessColor, 'x+y-') + 1
    }
  }

  render() {
    return <>
      <canvas id="chessboard" width="800" height="800"></canvas>
    </>
  }
}
