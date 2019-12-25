const getCoordinates = (obj) => {
  const { x: x1, y: y1, width, height } = obj;
  const x2 = x1 + width;
  const y2 = y1 - height;
  return ({
    top: { x1, y1, x2, y1 },
    right: { x2, y1, x2, y2 },
    bottom: { x2, y2, x1, y2 },
    left: { x1, y2, x1, y1 },
  });
};

const intersects = (hero, item) => {
	const { right: { x2: heroX2, y2: heroY2 }, left: { x1: heroX1 } } = hero;
	const { top: { x1, y1, x2 } } = item;

	//const isIntersecting = () => (heroX2 >= x1 && heroX2 <= x2 || heroX1 >= x1 && heroX2 <= x2) && heroY2 >= y1;
	const isIntersecting = () => heroX2 >= x1 && heroX2 <= x2 && heroY2 <= y1;
	return isIntersecting();
}

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
    this.x = 50;
    this.y = canvas.height * 0.75 - 50; 
    this.width = 50;
    this.height = 50;
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
    let newAltitude;
    if(!this.isJumping) {
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
    constructor () {
      this.x = 500;
      this.y = canvas.height * 0.75 - 80; 
      this.width = 30;
			this.height = 80;
		
  }

  draw(timer) {
    ctx.fillStyle = '#A61000';
		this.x -= timer;
    ctx.fillRect(
        this.x,
        this.y,
        this.width,
        this.height,
    )
  }
}

class App {
  constructor() {
    this.background = new Background();
    this.hero = new Hero();
    this.barrier = new Barrier();
		this.timer = 1;
		document.addEventListener('click', () => {
			console.log(getCoordinates(this.barrier));
			console.log(getCoordinates(this.hero));
		})
  }
  
  draw() {
		const { hero, barrier, background, timer } = this;
    background.draw();
    hero.draw();
		barrier.draw(timer);
		const heroCoord = getCoordinates(hero);
		const barrierCoord = getCoordinates(barrier);
		//console.log(intersects(heroCoord, barrierCoord));
		if (intersects(heroCoord, barrierCoord)) {
			console.log('Hallelujah!!!');
		}
	 }

	 

  step() {
    this.draw();

    requestAnimationFrame(() => this.step());
  }


}

const app = new App();
app.draw();
requestAnimationFrame(() => app.step());


const newHero = new Hero();
