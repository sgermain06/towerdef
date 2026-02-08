import { GraphicsOptions, Point } from 'pixi.js';
import Explosion from '../components/Containers/Explosion';
import Enemy from '../components/Enemy';

export interface AnimatedObject {
    
    animate: (step: number) => void;
    shouldRemove: (step: number) => boolean;
}

export interface ParticleOptions extends GraphicsOptions {
    
    radius: number;
    angle: number;
    velocity: number;
    duration: number;
    strokeColor?: number;
    strokeWidth?: number;
}

export interface ExplosionOptions extends GraphicsOptions {
    
    duration?: number;
    nbParticles?: number;
}

export interface EnemyOptions extends GraphicsOptions {
    distance: number;
    size: number;
    angle: number;
    strokeColor?: number;
    strokeWidth?: number;
    offset?: Point;
}

export interface GameState {
    explosions: Explosion[],
    addExplosion: (explosion: Explosion) => void,
    removeExplosion: (explosion: Explosion) => void,
    enemies: typeof Enemy[],
    addEnemy: (enemy: typeof Enemy) => void,
    removeEnemy: (enemy: typeof Enemy) => void,
    waveNumber: number,
    waveDuration: number,
    waveProgress: number,
    setWave: (waveNumber: number, waveDuration: number) => void,
    setWaveProgress: (waveProgress: number) => void,
}
