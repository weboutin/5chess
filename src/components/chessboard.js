
import React from 'react';

export default class Chessboard extends React.Component {
  componentDidMount() {
    this.c = document.getElementById("chessboard");
    this.c.addEventListener("click", (e) => this.clickBoard(e), false)
    let ctx = this.c.getContext("2d");
    this.ctx = ctx
    for (let i = 1; i < 16; i++) {
      ctx.moveTo(i * 30, 30);
      ctx.lineTo(i * 30, 450);
    }
    for (let i = 1; i < 16; i++) {
      ctx.moveTo(30, i * 30);
      ctx.lineTo(450, i * 30);
    }
    ctx.stroke()//绘制地图上的5个点
    ctx.fillStyle = 'black'
    ctx.beginPath();
    ctx.arc(30 * 4, 30 * 4, 4, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'black'
    ctx.beginPath();
    ctx.arc(30 * 12, 30 * 4, 4, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'black'
    ctx.beginPath();
    ctx.arc(30 * 4, 30 * 12, 4, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'black'
    ctx.beginPath();
    ctx.arc(30 * 12, 30 * 12, 4, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'black'
    ctx.beginPath();
    ctx.arc(30 * 8, 30 * 8, 4, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();;
  }

  draw_chess(x_line, y_line, color) {
    let ctx = this.ctx
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x_line * 30, y_line * 30, 10, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  clickBoard(e) {
    let x = e.pageX;
    let y = e.pageY;
    x -= this.c.offsetLeft;
    y -= this.c.offsetTop;
    let x_line = parseInt(Number(x / 30).toFixed())
    let y_line = parseInt(Number(y / 30).toFixed())
    if (x_line > 15 || x_line < 1 || y_line > 15 || y_line < 1) {
      return
    }
    this.x_line = x_line
    this.y_line = y_line
    this.draw_chess(x_line, y_line, 'black')

  }

  render() {
    return <>
      <canvas id="chessboard" width="800" height="800"></canvas>
    </>
  }
}
