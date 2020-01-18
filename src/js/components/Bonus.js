import { canvas, ctx } from '../canvas.js';
import { bonusWidth, bonusSrc, bonusHeight } from '../const.js';
import makeImg from '../makeImg.js';

export default class Bonus {
  constructor(y) {
    this.width = bonusWidth;
    this.height = bonusHeight;
    this.x = canvas.width;
    this.y = y;
  }

  draw(timer) {
    ctx.fillStyle = 'yellow';
    this.x -= timer;
    ctx.drawImage(
      makeImg(this.width, this.height, bonusSrc),
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
