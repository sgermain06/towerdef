import { GraphicsOptions } from 'pixi.js';

export interface ParticleOptions extends GraphicsOptions {
  
  radius: number;
  angle: number;
  velocity: number;
  id: number;
  strokeColor?: number;
  strokeWidth?: number;
}

export interface ExplosionOptions extends GraphicsOptions {

  duration?: number;
  nbParticles?: number;
}