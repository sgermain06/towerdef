import { Filter, StrokeInput } from 'pixi.js';
import { type Component } from 'solid-js';
import { Graphics, useApplication } from 'solid-pixi';

interface HexagonInterface {
    centered?: boolean;
    x?: number;
    y?: number;
    size: number;
    filters?: Filter[];
    stroke: StrokeInput;
}

const Hexagon: Component<HexagonInterface> = (props) => {

    const app = useApplication();

    const { size, centered = false, filters = [], stroke } = props;
    let { x = 0, y = 0 } = props;

    if (centered) {
        x = app!.screen.width / 2;
        y = app!.screen.height / 2;
    }
    const angle = Math.PI / 3;
    const height = Math.sin(angle) * size;
    const halfSize = size / 2;
    
    const xOffset = x - size
    const yOffset = y + (size - height);
    
    const points = [
        halfSize, -size,
        size + halfSize, -size,
        size * 2, -size + height,
        size + halfSize, -size + height * 2,
        halfSize, -size + height * 2,
        0, -size + height,
        halfSize, -size
    ];

    return (
        <Graphics
            x={xOffset}
            y={yOffset}
            filters={filters}
            draw={[
                ['poly', points],
                ['stroke', stroke]
            ]}
        />
    );
}

export default Hexagon;
