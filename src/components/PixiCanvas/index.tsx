import { Application, Graphics } from "pixi.js";
import { GlowFilter } from "pixi-filters";
import { createWithSignal } from "solid-zustand";

import Hexagon from "../Shapes/Hexagon";
import Explosion from '../Containers/Explosion';

interface GameState {
    explosions: Explosion[],
    addExplosion: (explosion: Explosion) => void,
    removeExplosion: (explosion: Explosion) => void,
}

const useStore = createWithSignal<GameState>((set) => ({
    explosions: [],
    addExplosion: (explosion: Explosion) => set((state) => ({ explosions: [...state.explosions, explosion] })),
    removeExplosion: (explosion: Explosion) => set((state) => ({ explosions: state.explosions.filter((exp) => exp !== explosion) })),
}));

const PixiCanvas = async () => {
    
    const gameState = useStore();
    
    const app = new Application();
    await app.init({ background: "#1E2426", resizeTo: window });
    
    const graph = new Graphics();
    
    graph.poly(Hexagon(app.screen.width / 2, app.screen.height / 2, 100));
    graph.stroke({width: 2, color: 0xffffff });
    graph.filters = [new GlowFilter({ innerStrength: 0.5, outerStrength: 0.5, distance: 10, color: '#FF0000' })];
    app.stage.addChild(graph);
    
    const onClick = (event: any) => {
        const explosion = new Explosion({ duration: 50, nbParticles: 10, position: event.global });
        
        gameState().addExplosion(explosion);
        app.stage.addChild(explosion);
        explosion.init();
    }
    
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    
    app.stage.addEventListener('pointerdown', onClick);
    
    app.ticker.add(() => {
        // * Delta is 1 if running at 100% performance *
        // * Creates frame-independent transformation *
        // console.log('Time:', time);
        // console.log('Explosions:', explosions.length);
        for (const explosion of gameState().explosions) {
            explosion.increment();
            if (explosion.shouldRemove) {
                gameState().removeExplosion(explosion);
                app.stage.removeChild(explosion);
            }
        }
    });
    
    return (
        <>
            {app.canvas}
        </>
    )
};

export default PixiCanvas;  