import { canvas, ctx } from '../canvas.js';
import { barrierWidth } from '../const.js';

export default class Barrier {
  constructor(height) {
    this.width = barrierWidth;
    this.height = height;
    this.x = canvas.width;
    this.y = canvas.height * 0.75 - this.height;
  }

  draw(timer) {
    ctx.fillStyle = '#A61000';
    this.x -= timer;
    ctx.fillRect(
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
