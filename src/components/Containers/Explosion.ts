import { Container } from 'pixi.js';

import Particle from '../Shapes/Particle';

import { ExplosionOptions } from '../../interfaces';

class Explosion extends Container {

  private _count: number = 0;
  private _duration: number;
  private _nbParticles: number;

  private _maxExtraDuration: number = 5;

  private _particlesArray: Particle[] = [];

  constructor(options?: ExplosionOptions) {
    super(options);
    this._duration = options?.duration || 1000;
    this._nbParticles = options?.nbParticles || 10;
  }

  init() {

    for (let i = 0; i < this._nbParticles; i++) {
      // Randomize angle
      const angle = Math.random() * (Math.PI * 2);
      const velocity = Math.random() * 0.4 + 0.4;
      const particle = new Particle({
        radius: 2,
        angle,
        velocity,
        duration: this._duration + (Math.floor(Math.random() * (this._maxExtraDuration * 2 + 1)) - this._maxExtraDuration),
        strokeColor: 0x9999FF,
      });
      this._particlesArray.push(particle);
      this.addChild(particle);
    }
  }

  get particles() {
    return this._particlesArray;
  }

  get shouldRemove() {
    return this._particlesArray.length == 0;
  }

  increment() {
    this._count++;
    for (const particle of this._particlesArray) {
      if (particle.shouldRemove(this._count)) {
        this._particlesArray = this._particlesArray.filter(p => p != particle);
      }
      else {
        particle.animate(this._count);
      }
    }
  }
}

export default Explosion;