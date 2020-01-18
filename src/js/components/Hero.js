import { canvas, ctx } from '../canvas.js';
import { jumpHeight, change, heroSrc } from '../const.js';
import makeImg from '../makeImg.js';

export default class Hero {
  constructor() {
    this.isJumping = false;
    this.jumpDirection = 'up';
    this.height = 80;
    this.width = 60;
    this.x = 50;
    this.y = canvas.height * 0.75 - this.height;
  }

    handleTouch = () => {
      if (this.isJumping) {
        return;
      }
      this.jumpDirection = 'up';
      this.isJumping = true;
    };

    draw() {
      ctx.fillStyle = 'white';
      document.addEventListener('click', this.handleTouch);
      let newAltitude;
      if (!this.isJumping) {
        newAltitude = this.y;
      } else {
        newAltitude = this.jumpDirection === 'up' ? this.y - change : this.y + change;
      }
      this.jumpDirection = this.y < jumpHeight ? 'down' : this.jumpDirection;
      this.y = newAltitude;

      ctx.drawImage(
        makeImg(this.width, this.height, heroSrc),
        this.x,
        this.y,
        this.width,
        this.height,
      );
      ctx.strokeRect(this.x, this.y, this.width, this.height);

      if (this.y > canvas.height * 0.75 - this.height - 1) {
        this.isJumping = false;
      }
    }
}
