import {
  barrierHeightRange,
  barrierDelayRange,
  bonusHeightRange,
  bonusDelayRange,
} from '../const.js';
import { ctx } from '../canvas.js';
import getRandomInt from '../getRandomInt.js';
import Hero from './Hero.js';
import Barrier from './Barrier.js';
import Background from './Background.js';
import Bonus from './Bonus.js';
import intersects from '../intersects.js';

export default class App {
  constructor() {
    this.background = new Background();
    this.hero = new Hero();
    this.barriers = [new Barrier((getRandomInt(...barrierHeightRange)))];
    this.bonuses = [];
    this.timer = 1.5;
    this.isBonusTimerOn = false;
    this.isBarrierTimerOn = false;
    this.score = 0;
  }

  purge = (coll) => coll.filter(({ x, width }) => x + width > 0);

  addBarrier = () => {
    if (this.isBarrierTimerOn) {
      return;
    }
    this.isBarrierTimerOn = true;

    const makeBarrier = () => {
      const newBarrier = new Barrier(getRandomInt(...barrierHeightRange));
      this.barriers = [...this.barriers, newBarrier];
      this.isBarrierTimerOn = false;
    };

    setTimeout(() => makeBarrier(), getRandomInt(...barrierDelayRange));
  }

  addBonus = () => {
    if (this.isBonusTimerOn) {
      return;
    }
    this.isBonusTimerOn = true;

    const makeBonus = () => {
      const newBonus = new Bonus(getRandomInt(...bonusHeightRange));
      this.bonuses = [...this.bonuses, newBonus];
      this.isBonusTimerOn = false;
    };
    setTimeout(() => makeBonus(), getRandomInt(...bonusDelayRange));
  }

  reloadApp = () => {
    this.barriers = [];
  }

  draw() {
    const {
      hero, barriers, background, timer, addBarrier, purge, addBonus, bonuses,
    } = this;
    background.draw();
    hero.draw();
    addBarrier();
    addBonus();
    this.bonuses = purge(bonuses);
    // eslint-disable-next-line no-restricted-syntax
    for (const b of barriers) {
      if (intersects(hero, b)) {
        console.log('Intersection');
        this.barriers = [];
        this.bonuses = [];
        this.isBonusTimerOn = false;
        this.isBarrierTimerOn = false;
        this.score = 0;
        window.location.reload(true);
        break;
      }
      if (b.x + b.width < 0) {
        this.score += 1;
        this.barriers = purge(barriers);
      }
      b.draw(timer);
    }
    bonuses.forEach((b) => {
      b.draw(timer);
      if (intersects(hero, b)) {
        this.bonuses = this.bonuses.filter((i) => i !== b);
        this.score += 10;
      }
    });
    ctx.font = '20px serif';
    ctx.fillStyle = 'black';
    ctx.fillText(`Счёт: ${this.score}`, 10, 30);
  }

  step() {
    this.draw();
    requestAnimationFrame(() => this.step());
  }
}
