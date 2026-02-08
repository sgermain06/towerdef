import { type Component } from 'solid-js';
import PixiCanvas from './components/PixiCanvas';

import { Box, LinearProgress } from '@suid/material';

import useStore from './store/gameStore';

import styles from './App.module.css';

const App: Component = () => {

    const gameStore = useStore();

    return (
        <>
            <div class={styles.pixiContainer}>
                <PixiCanvas useStore={useStore} />
            </div>
            <div class={styles.gameContainer}>
                <h1>Tower Defense!</h1>
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
