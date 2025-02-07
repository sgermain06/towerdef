import { type Component, onMount, onCleanup } from "solid-js";
import { Application, useApplication } from "solid-pixi";
import { GlowFilter } from "pixi-filters";

import Hexagon from "../Shapes/Hexagon";
import Explosion from '../Containers/Explosion';

let spawnRate = 2.5;
let waveLength = 20;
let waveProgress = 0;
let waveNumber = 1;

const TowerDef: Component<{ useStore: any }> = (props) => {

    const { useStore } = props;

    const gameState = useStore();

    const app = useApplication();

    app!.stage.eventMode = 'static';
    app!.stage.hitArea = app!.screen;

    const hexagonFilters = [new GlowFilter({ innerStrength: 0.5, outerStrength: 0.5, distance: 10, color: '#FF0000' })];

    const onClick = (event: any) => {
        const explosion = new Explosion({ duration: 50, nbParticles: 10, position: event.global });
        
        gameState().addExplosion(explosion);
        app?.stage.addChild(explosion);
        explosion.init();
        console.log(gameState().explosions);
    }
    
    app?.stage.addEventListener('pointerdown', onClick);
    
    let elapsed = 0.0;
    let lastSec = 0;

    gameState().setWave(waveNumber, waveLength);

    const ticker = (time: any) => {
        for (const explosion of gameState().explosions) {
            explosion.increment();
            if (explosion.shouldRemove) {
                gameState().removeExplosion(explosion);
                app?.stage.removeChild(explosion);
                console.log(gameState().explosions);
            }
        }

        elapsed += (time.deltaTime / 60.0) * 100;
        if (lastSec < (Math.floor(elapsed) / 100)) {
            if ((Math.floor(elapsed) / 100) % spawnRate === 0) {
                console.log('Should spawn an enemy!');
            }

            if ((Math.floor(elapsed) / 100) % 1 === 0) {
                waveProgress++;
                gameState().setWaveProgress(waveProgress);
                if (gameState().waveProgress >= waveLength) {
                    waveProgress = 0;
                    waveNumber++;
                    gameState().setWave(waveNumber, waveLength);
                }
            }

            lastSec = Math.floor(elapsed) / 100;
        }
    };

    onMount(() => {
        console.log('Adding ticker!');
        app!.ticker.add(ticker);
    });

    onCleanup(() => {
        console.log('Removing ticker!');
        app!.ticker.remove(ticker);
    });

    return <>
        <Hexagon centered size={100} stroke={{width: 2, color: 0xffffff }} filters={hexagonFilters} />
    </>
};

const PixiCanvas: Component<{ useStore: any }> = (props) => {
    const { useStore } = props;

    return (
        <>
            <Application background={'#1E2426'} resizeTo={window}>
                <TowerDef useStore={useStore} />
            </Application>
        </>
    )
};

export default PixiCanvas;  