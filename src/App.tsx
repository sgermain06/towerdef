import PixiCanvas from './components/PixiCanvas';

import styles from './App.module.css';

const App = async () => {
    
    const pixiCanvas = await PixiCanvas();

    return (
        <>
            <div class={styles.pixiContainer}>
                {pixiCanvas}
            </div>
            <div class={styles.gameContainer}>
                <h1>Tower Defense!</h1>
            </div>
        </>
    );
};

export default App;
