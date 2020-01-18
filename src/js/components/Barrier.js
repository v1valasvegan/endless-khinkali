import { canvas, ctx } from '../canvas.js';
// import { barrierSrc } from '../const.js';
// import makeImg from '../makeImg.js';

export default class Barrier {
  constructor(height) {
    this.width = height / 1.9;
    this.height = height;
    this.x = canvas.width;
    this.y = canvas.height * 0.75 - this.height;
  }

  draw(timer) {
    this.x -= timer;
    ctx.fillStyle = 'white';
    ctx.fillRect(
      this.x,
      this.y,
      this.width,
      this.height,
    );
    // ctx.drawImage(
    //   makeImg(this.width, this.height, barrierSrc),
    //   this.x,
    //   this.y,
    //   this.width,
    //   this.height,
    // );
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
