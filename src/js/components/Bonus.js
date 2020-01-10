import { canvas, ctx } from '../canvas.js';
import { bonusWidth } from '../const.js';

export default class Bonus {
  constructor(y) {
    this.width = bonusWidth;
    this.height = bonusWidth;
    this.x = canvas.width;
    this.y = y;
  }

  draw(timer) {
    ctx.fillStyle = 'yellow';
    this.x -= timer;
    ctx.fillRect(
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
