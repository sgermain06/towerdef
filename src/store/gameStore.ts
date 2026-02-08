import { createWithSignal } from "solid-zustand";
import Explosion from '../components/Containers/Explosion';
import Enemy from '../components/Enemy';
import { GameState } from '../interfaces';

export default createWithSignal<GameState>((set: any) => ({
    explosions: [],
    addExplosion: (explosion: Explosion) => set((state: GameState) => ({ explosions: [...state.explosions, explosion] })),
    removeExplosion: (explosion: Explosion) => set((state: GameState) => ({ explosions: state.explosions.filter((exp) => exp !== explosion) })),
    enemies: [],
    addEnemy: (enemy: typeof Enemy) => set((state: GameState) => ({ enemies: [...state.enemies, enemy] })),
    removeEnemy: (enemy: typeof Enemy) => set((state: GameState) => ({ enemies: state.enemies.filter((en) => en !== enemy) })),
    waveNumber: 1,
    waveDuration: 0,
    waveProgress: 0,
    setWave: (waveNumber: number, waveDuration: number) => set(() => ({ waveNumber, waveDuration })),
    setWaveProgress: (waveProgress: number) => set(() => ({ waveProgress })),
}));