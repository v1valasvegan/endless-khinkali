import { canvas, ctx } from '../canvas.js';
import { bgSrc } from '../const.js';
import makeImg from '../makeImg.js';

export default class Background {
  draw() {
    ctx.fillStyle = '#92ADD0';
    ctx.drawImage(
      makeImg(this.width, this.height, bgSrc),
      0,
      0,
      canvas.width,
      canvas.height,
    );
    // ctx.fillStyle = '#24913C';
    // ctx.fillRect(
    //   makeImg(this.width, this.height, bgTableSrc),
    //   0,
    //   canvas.height * 0.75,
    //   canvas.width,
    //   canvas.height,
    // );
  }
}
