import { type Component, onMount, onCleanup } from "solid-js";
import { Application, useApplication } from "solid-pixi";
import { GlowFilter } from "pixi-filters";

import Hexagon from "../Shapes/Hexagon";
import Field from "../Shapes/Field";
import Explosion from '../Containers/Explosion';
import { Enemy } from "../Enemy";
import { Point } from "pixi.js";


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

    const minSize = Math.min(app!.screen.width, app!.screen.height);
    const radius = (minSize * 0.8) / 2;


    const onClick = (event: any) => {
        const explosion = new Explosion({ duration: 50, nbParticles: 10, position: event.global });
        
        gameState().addExplosion(explosion);
        app?.stage.addChild(explosion);
        explosion.init();
        console.log(gameState().explosions);

        const angle = Math.random() * (Math.PI * 2);
        const enemy = new Enemy({ angle, size: 10, strokeColor: 0xFFFFFF, strokeWidth: 1, distance: radius, offset });
        gameState().addEnemy(enemy);
        app?.stage.addChild(enemy);
        console.log(gameState().enemies);
    }
    
    app!.stage.addEventListener('pointerdown', onClick);
    
    let elapsed = 0.0;
    let lastSec = 0;

    gameState().setWave(waveNumber, waveLength);

    const offset = new Point(app!.screen.width / 2, app!.screen.height / 2);

    const ticker = (time: any) => {
        for (const explosion of gameState().explosions) {
            explosion.increment();
            if (explosion.shouldRemove) {
                gameState().removeExplosion(explosion);
                app?.stage.removeChild(explosion);
            }
        }

        elapsed += (time.deltaTime / 60.0) * 100;
        if (lastSec < (Math.floor(elapsed) / 100)) {
            if ((Math.floor(elapsed) / 100) % spawnRate === 0) {
                console.log('Should spawn an enemy!');
                // Randomize angle
                const angle = Math.random() * (Math.PI * 2);
                const enemy = new Enemy({ angle, size: 10, strokeColor: 0xFFFFFF, strokeWidth: 1, distance: radius, offset });
                app?.stage.addChild(enemy);
                gameState().addEnemy(enemy);
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
        <Hexagon
            centered
            size={100}
            stroke={{width: 2, color: 0xffffff }}
            filters={[
                new GlowFilter({ innerStrength: 0.5, outerStrength: 0.5, distance: 10, color: '#FF0000' })
            ]}
        />
        <Field centered radius={radius} stroke={{ width: 1, color: 0xffffff, alpha: 0.5 }} />
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