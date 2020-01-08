import { canvas, ctx } from '../canvas.js';
import { jumpHeight, change } from '../const.js';

export default class Hero {
  constructor() {
    this.isJumping = false;
    this.jumpDirection = 'up';
    this.height = 50;
    this.width = 50;
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

      ctx.fillRect(
        this.x,
        this.y,
        this.width,
        this.height,
      );

      if (this.y > canvas.height * 0.75 - 51) {
        this.isJumping = false;
      }
    }
}
