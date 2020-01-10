import { barrierHeightRange, barrierDelayRange, bonusHeightRange, bonusDelayRange } from '../const.js';
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
    this.barriers = [new Barrier(getRandomInt(...barrierHeightRange))];
    this.bonuses = [];
    this.timer = 1;
    this.isBonusTimerOn = false;
    this.isBarrierTimerOn = false;
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
    if (this.isBarrierTimerOn) {
      return;
    }
    this.isBarrierTimerOn = true;

    const makeBarrier = () => {
      const newBarrier = new Barrier(getRandomInt(...barrierHeightRange));
      this.barriers = [newBarrier, ...this.barriers];
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
      this.bonuses = [newBonus, ...this.bonuses];
      this.isBonusTimerOn = false;
    };
    setTimeout(() => makeBonus(), getRandomInt(...bonusDelayRange));
  }

  countScore = () => {
    const { hero, barriers } = this;
    const { x } = hero;
    const coordinates = barriers.map((item) => item.x + item.width);
    this.score = coordinates.find((x2) => x2 === x) ? this.score + 1 : this.score;
  }

  draw() {
    const {
      hero, barriers, background, timer, addBarrier, countScore, purge, addBonus, bonuses,
    } = this;
    background.draw();
    hero.draw();
    addBarrier();
    // addBonus();
    countScore();
    purge();
    barriers.forEach((b) => {
      b.draw(timer);
      if (intersects(hero, b)) {
        console.log('Hallelujah!!!');
      }
    });
    bonuses.forEach((b) => {
      b.draw(timer);
      if (intersects(hero, b)) {
        this.bonuses = this.bonuses.filter((i) => i !== b);
      }
    });
  }

  step() {
    this.draw();
    requestAnimationFrame(() => this.step());
  }
}
