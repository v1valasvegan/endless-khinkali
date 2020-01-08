import { canvas, ctx } from '../canvas.js';

export default class Bonus {
  constructor(radius) {
    this.radius = radius;
    this.x = canvas.width;
    this.y = 10;
  }

  draw(timer) {
    ctx.fillStyle = 'green';
    this.x -= timer;
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      360,
    );
    ctx.fill();
  }
}
