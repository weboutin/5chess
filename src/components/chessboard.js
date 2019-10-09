
import React from 'react';

export default class Chessboard extends React.Component {
  componentDidMount() {
    let c = document.getElementById("chessboard");
    let ctx = c.getContext("2d");
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

  render() {
    return <>
      <canvas id="chessboard" width="800" height="800"></canvas>
    </>
  }
}
