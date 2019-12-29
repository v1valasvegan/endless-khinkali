/* eslint-disable import/extensions */
/* eslint-disable max-classes-per-file */
import { barrierHeightRange, delayRange } from '../const.js';
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
    this.bonus = new Bonus(20);
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
      const newBarrier = new Barrier(getRandomInt(...barrierHeightRange));
      this.barriers = [newBarrier, ...this.barriers];
      this.isTimerOn = false;
    };
    setTimeout(() => makeBarrier(), getRandomInt(...delayRange));
  }

  countScore = () => {
    const { hero, barriers } = this;
    const { x } = hero;
    const coordinates = barriers.map((item) => item.x + item.width);
    this.score = coordinates.find((x2) => x2 === x) ? this.score + 1 : this.score;
  }

  draw() {
    const {
      hero, barriers, background, timer, addBarrier, countScore, purge, bonus,
    } = this;
    background.draw();
    hero.draw();
    bonus.draw();
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
