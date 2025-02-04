import { Application, Container, Graphics, GraphicsOptions } from "pixi.js";
import { GlowFilter } from "pixi-filters";

const Hexagon = (x: number, y: number, size: number): number[] => {

  const angle = Math.PI / 3;
  const height = Math.sin(angle) * size;
  const halfSize = size / 2;

  const xOffset = x - size
  const yOffset = y + (size - height);

  const points = [
    xOffset + halfSize, yOffset - size,
    xOffset + size + halfSize, yOffset - size,
    xOffset + size * 2, yOffset - size + height,
    xOffset + size + halfSize, yOffset - size + height * 2,
    xOffset + halfSize, yOffset - size + height * 2,
    xOffset, yOffset - size + height
  ]

  return points;
}

interface ParticleOptions extends GraphicsOptions {
  
  radius: number;
  angle: number;
  velocity: number;
  id: number;
  strokeColor?: number;
  strokeWidth?: number;
}

interface ExplosionOptions extends GraphicsOptions {

  duration?: number;
  nbParticles?: number;
}

class Particle extends Graphics {

  private _radius: number;
  private _angle: number;
  private _velocity: number;
  private _strokeColor: number;
  private _strokeWidth: number;
  
  constructor(options: ParticleOptions) {
    super(options);
    this._radius = options.radius;
    this._angle = options.angle;
    this._velocity = options.velocity;
    this._strokeColor = options.strokeColor || 0xFFFFFF;
    this._strokeWidth = options.strokeWidth || 1;

    this.circle(0, 0, this._radius);
    this.stroke({ width: this._strokeWidth, color: this._strokeColor });
    this.filters = [new GlowFilter({ innerStrength: 0.5, outerStrength: 0.5, distance: 10, color: '#FF0000' })];
  }

  animate(step: number, duration: number) {
    const x = (Math.cos(this._angle) * step) * this._velocity;
    const y = (Math.sin(this._angle) * step) * this._velocity;
    this.position.set(x, y);
    this.alpha = 1 - step / duration;
  }
}

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

(async () => {
  // Create a new application
  const app = new Application();

  const explosions: Explosion[] = [];

  const onClick = (event: any) => {
    const explosion = new Explosion({ duration: 50, nbParticles: 10, position: event.global });

    explosions.push(explosion);
    app.stage.addChild(explosion);
    explosion.init();
  }

  // Initialize the application
  await app.init({ background: "#1E2426", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const graph = new Graphics();
  
  graph.poly(Hexagon(app.screen.width / 2, app.screen.height / 2, 100));
  graph.stroke({width: 2, color: 0xffffff });

  app.stage.addChild(graph);

  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;

  app.stage.addEventListener('pointerdown', onClick);

  // Listen for animate update
  app.ticker.add(() => {
    // * Delta is 1 if running at 100% performance *
    // * Creates frame-independent transformation *
    // console.log('Time:', time);
    // console.log('Explosions:', explosions.length);
    for (const explosion of explosions) {
      explosion.increment();
      if (explosion.shouldRemove) {
        explosions.splice(explosions.indexOf(explosion), 1);
        app.stage.removeChild(explosion);
      }
    }
  });
})();
