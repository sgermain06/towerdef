import { Container } from 'pixi.js';

import Particle from '../Shapes/Particle';

import { ExplosionOptions } from '../../interfaces';

class Explosion extends Container {

  private _count: number = 0;
  private _duration: number;
  private _nbParticles: number;

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
        id: i,
        radius: 2,
        angle,
        velocity,
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
    return this._count >= this._duration;
  }

  increment() {
    this._count++;
    for (const particle of this._particlesArray) {
      particle.animate(this._count, this._duration);
    }
  }
}

export default Explosion;