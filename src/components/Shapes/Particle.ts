import { Graphics } from 'pixi.js';
import { GlowFilter } from 'pixi-filters';

import { ParticleOptions } from '../../interfaces';

class Particle extends Graphics {

  private _radius: number;
  private _angle: number;
  private _velocity: number;
  private _duration: number;
  private _strokeColor: number;
  private _strokeWidth: number;
  
  constructor(options: ParticleOptions) {
    super(options);
    this._radius = options.radius;
    this._angle = options.angle;
    this._velocity = options.velocity;
    this._duration = options.duration;
    this._strokeColor = options.strokeColor || 0xFFFFFF;
    this._strokeWidth = options.strokeWidth || 1;

    this.circle(0, 0, this._radius);
    this.stroke({ width: this._strokeWidth, color: this._strokeColor });
    this.filters = [new GlowFilter({ innerStrength: 0.5, outerStrength: 0.5, distance: 4, color: '#FFFFFF' })];
  }

  animate(step: number) {
    const easeOut = this.easeOutCubic(step/this._duration);
    const x = ((Math.cos(this._angle) * this._duration) * this._velocity) * easeOut;
    const y = ((Math.sin(this._angle) * this._duration) * this._velocity) * easeOut;
    this.position.set(x, y);
    this.alpha = (1 - this.easeInCubic(step / this._duration));
  }

  shouldRemove(step: number): boolean {
    return step > this._duration;
  }

  private easeInCubic(x: number): number {
    return x * x * x;
  }

  private easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
  }
}

export default Particle;