import PixiCanvas from './components/PixiCanvas';
import { createWithSignal } from "solid-zustand";

import { Box, Button, LinearProgress } from '@suid/material';

import Explosion from './components/Containers/Explosion';

import styles from './App.module.css';
import { type Component } from 'solid-js';

export interface GameState {
    explosions: Explosion[],
    addExplosion: (explosion: Explosion) => void,
    removeExplosion: (explosion: Explosion) => void,
    waveNumber: number,
    waveDuration: number,
    waveProgress: number,
    setWave: (waveNumber: number, waveDuration: number) => void,
    setWaveProgress: (waveProgress: number) => void,
}

const useStore = createWithSignal<GameState>((set) => ({
    explosions: [],
    addExplosion: (explosion: Explosion) => set((state) => ({ explosions: [...state.explosions, explosion] })),
    removeExplosion: (explosion: Explosion) => set((state) => ({ explosions: state.explosions.filter((exp) => exp !== explosion) })),
    waveNumber: 1,
    waveDuration: 0,
    waveProgress: 0,
    setWave: (waveNumber: number, waveDuration: number) => set(() => ({ waveNumber, waveDuration })),
    setWaveProgress: (waveProgress: number) => set(() => ({ waveProgress })),
}));

const App: Component = () => {

    const gameStore = useStore();

    const updateWave = () => {
        const newNumber = gameStore().waveProgress + 1;
        console.log('Updating wave to:', newNumber);
        gameStore().setWaveProgress(newNumber);
    };

    return (
        <>
            <div class={styles.pixiContainer}>
                <PixiCanvas useStore={useStore} />
            </div>
            <div class={styles.gameContainer}>
                <h1>Tower Defense!</h1>
                <Button onClick={updateWave}>Update Wave</Button>
                <div class={styles.duration}>
                    <Box sx={{ width: '100px', height: '20px' }}>
                        <LinearProgress variant="determinate" value={(gameStore().waveProgress / gameStore().waveDuration) * 100} />
                    </Box>
                </div>
            </div>
        </>
    );
};

export default App;
