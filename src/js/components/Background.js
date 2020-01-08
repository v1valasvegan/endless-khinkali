import { canvas, ctx } from '../canvas.js';

export default class Background {
  draw() {
    ctx.fillStyle = '#92ADD0';
    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    ctx.fillStyle = '#24913C';
    ctx.fillRect(
      0,
      canvas.height * 0.75,
      canvas.width,
      canvas.height,
    );
  }
}
