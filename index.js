const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const root = document.getElementById('root');
root.appendChild(canvas);

const change = 3;
const jumpHeight = canvas.height * 0.1;

class Background {
  draw() {
    ctx.fillStyle = '#92ADD0';
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height,
    )
    ctx.fillStyle = '#24913C';
    ctx.fillRect(
      0,
      canvas.height * 0.75,
      canvas.width,
      canvas.height,
    )
  }
}

class Hero {
  constructor () {
    this.isJumping = false;
    this.jumpDirection = 'up';
    this.height = canvas.height * 0.75 - 50;
  }
  
  handleTouch = (event) => {
    if (this.isJumping) {
      return;
    }
    this.jumpDirection = 'up';
    this.isJumping = true;
  };
  
  draw() {
    ctx.fillStyle = 'white';
    document.addEventListener('click', this.handleTouch);
    let newHeight;
    if(!this.isJumping) {
      newHeight = this.height;
    } else {
      newHeight = this.jumpDirection === 'up' ? this.height - change : this.height + change;
    }
    this.jumpDirection = this.height < jumpHeight ? 'down' : this.jumpDirection;
    this.height = newHeight;
    
    ctx.fillRect(
      50,
      this.height,
      50,
      50,
      );
      
      if (this.height > canvas.height * 0.75 - 51) {
        this.isJumping = false;
      }
  }
}
  class Barrier {
  draw(timer) {
    ctx.fillStyle = '#A61000';
    ctx.fillRect(
        500 - timer,
        canvas.height * 0.75 - 80,
        30,
        80,
    )
  }
}

class App {
  constructor() {
    this.background = new Background();
    this.hero = new Hero();
    this.barrier = new Barrier();
    this.timer = 0;
  }

  draw() {
    this.background.draw();
    this.hero.draw();
    this.barrier.draw(this.timer);
  }

  step() {
    this.timer += 1;
    this.draw();

    requestAnimationFrame(() => this.step());
  }


}

const app = new App();
app.draw();
requestAnimationFrame(() => app.step());