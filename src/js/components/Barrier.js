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
    const img = new Image(this.width, this.height);
    img.src = './barrier.png';
    ctx.drawImage(
      img,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
const newImg = document.createElement('img');
newImg.src = './barrier.png';

console.log(newImg);
console.log(newImg.src);
