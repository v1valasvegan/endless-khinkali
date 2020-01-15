import {
  barrierHeightRange,
  barrierDelayRange,
  bonusHeightRange,
  bonusDelayRange,
} from '../const.js';
import getRandomInt from '../getRandomInt.js';
import Hero from './Hero.js';
import Barrier from './Barrier.js';
import Background from './Background.js';
import Bonus from './Bonus.js';
import intersects from '../intersects.js';
import reload from '../reload.js';

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

  draw() {
    const {
      hero, barriers, background, timer, addBarrier, purge, addBonus, bonuses,
    } = this;
    background.draw();
    hero.draw();
    addBarrier();
    addBonus();
    this.bonuses = purge(bonuses);
    this.barriers = purge(barriers);
    barriers.forEach((b) => {
      const { x: hx } = hero;
      b.draw(timer);
      if (intersects(hero, b)) {
        reload();
      }
      if (b.x + b.width === hx) {
        this.score += 1;
      }
    });
    bonuses.forEach((b) => {
      b.draw(timer);
      if (intersects(hero, b)) {
        this.bonuses = this.bonuses.filter((i) => i !== b);
        this.score += 10;
      }
    });
  }

  step() {
    this.draw();
    requestAnimationFrame(() => this.step());
  }
}
