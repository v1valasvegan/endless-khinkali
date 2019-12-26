/* eslint-disable max-classes-per-file */
const getRandomInt = (start, end) => start + Math.floor(Math.random() * (end - start));

const intersects = (hero, item) => {
  const {
    x: hx1, y: hy1, width: hwidth, height: hheight,
  } = hero;
  const { x: ix1, y: iy1, width: iwidth } = item;
  const hx2 = hx1 + hwidth;
  const hy2 = hy1 + hheight;
  const ix2 = ix1 + iwidth;
  // console.log(`hero: x1: ${hx1}, x2: ${hx2}, y2: ${hy2}`);
  // console.log(`barrier: x1: ${ix1}, x2: ${ix2}, y1: ${iy1}`);
  return ((hx2 >= ix1 && hx2 <= ix2) || (hx1 >= ix1 && hx2 <= ix2)) && hy2 >= iy1;
};

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const root = document.getElementById('root');
root.appendChild(canvas);

const change = 3;
const jumpHeight = canvas.height * 0.4;
const rndRangeStart = 2000;
const rndRangeEnd = 5000;

class Background {
  // eslint-disable-next-line class-methods-use-this
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

class Hero {
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

class Barrier {
  constructor(height) {
    this.width = 30;
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

class App {
  constructor() {
    this.background = new Background();
    this.hero = new Hero();
    this.barriers = [];
    this.timer = 1;
    this.isTimerOn = false;
    this.score = 0;
  }

  purge = () => {
    const { barriers } = this;
    const { length } = barriers;
    if (length === 0) {
      return;
    }
    const lastItem = barriers[length - 1];
    if (lastItem && lastItem.x + lastItem.width < 0) {
      barriers.pop();
    }
  }

  addBarrier = () => {
    if (this.isTimerOn) {
      return;
    }
    this.isTimerOn = true;

    const makeBarrier = () => {
      const newBarrier = new Barrier(getRandomInt(50, 150));
      this.barriers = [newBarrier, ...this.barriers];
      this.isTimerOn = false;
    };
    setTimeout(() => makeBarrier(), getRandomInt(rndRangeStart, rndRangeEnd));
  }

  countScore = () => {
    const { hero, barriers } = this;
    const { x } = hero;
    const coordinates = barriers.map((item) => item.x + item.width);
    this.score = coordinates.find((x2) => x2 === x) ? this.score + 1 : this.score;
  }

  draw() {
    const {
      hero, barriers, background, timer, addBarrier, countScore, purge,
    } = this;
    background.draw();
    hero.draw();
    addBarrier();
    countScore();
    purge();
    barriers.forEach((b) => {
      b.draw(timer);
      if (intersects(hero, b)) {
        console.log('Hallelujah!!!');
      }
    });
  }

  step() {
    this.draw();
    requestAnimationFrame(() => this.step());
  }
}

const app = new App();
app.draw();
requestAnimationFrame(() => app.step());
